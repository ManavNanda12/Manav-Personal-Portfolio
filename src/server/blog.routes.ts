import { Router, Request, Response } from 'express';
import { ObjectId }                  from 'mongodb';
import * as crypto                   from 'crypto';
import { getDb }                     from './mongo';

const router = Router();

// Prevent browser caching API responses (avoids stale 304s)
router.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// ─── helpers ────────────────────────────────────────────────────────────────

function hashIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip  = (raw?.split(',')[0] ?? req.ip ?? '').trim();
  return crypto.createHash('sha256').update(ip).digest('hex');
}

async function postBySlug(slug: string) {
  const db   = await getDb();
  const post = await db.collection('blog_posts').findOne({ slug, status: 'published' });
  return { db, post };
}

// ─── GET /api/blog/posts ─────────────────────────────────────────────────────
// Returns all published posts with their tags, newest first.
router.get('/posts', async (_req: Request, res: Response) => {
  try {
    const db    = await getDb();
    const posts = await db.collection('blog_posts')
      .find({ status: 'published' })
      .sort({ date: -1 })
      .toArray();

    // Attach tags to each post
    const postIds = posts.map(p => p['_id']);
    const postTags = await db.collection('post_tags')
      .find({ postId: { $in: postIds } }).toArray();
    const tagIds = postTags.map(pt => pt['tagId']);
    const tags   = await db.collection('tags')
      .find({ _id: { $in: tagIds } }).toArray();

    const tagMap  = new Map(tags.map(t => [t['_id'].toString(), t['name'] as string]));
    const ptByPost = new Map<string, string[]>();
    for (const pt of postTags) {
      const pid = pt['postId'].toString();
      const arr = ptByPost.get(pid) ?? [];
      const name = tagMap.get(pt['tagId'].toString());
      if (name) arr.push(name);
      ptByPost.set(pid, arr);
    }

    const result = posts.map(p => ({
      id:             p['_id'].toString(),
      slug:           p['slug'],
      title:          p['title'],
      excerpt:        p['excerpt'],
      coverGradient:  p['coverGradient'],
      coverEmoji:     p['coverEmoji'],
      date:           p['date'],
      readTime:       p['readTime'],
      views:          p['views']    ?? 0,
      likeCount:      p['likeCount'] ?? 0,
      tags:           ptByPost.get(p['_id'].toString()) ?? []
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

// ─── GET /api/blog/posts/:slug ───────────────────────────────────────────────
// Returns a single post with full content blocks and tags.
router.get('/posts/:slug', async (req: Request, res: Response) => {
  try {
    const { db, post } = await postBySlug(req.params['slug'] as string);
    if (!post) { res.status(404).json({ error: 'Post not found' }); return; }

    const [blocks, postTags] = await Promise.all([
      db.collection('content_blocks')
        .find({ postId: post['_id'] }).sort({ order: 1 }).toArray(),
      db.collection('post_tags')
        .find({ postId: post['_id'] }).toArray()
    ]);

    const tagIds = postTags.map(pt => pt['tagId']);
    const tags   = await db.collection('tags')
      .find({ _id: { $in: tagIds } }).toArray();

    res.json({
      id:             post['_id'].toString(),
      slug:           post['slug'],
      title:          post['title'],
      excerpt:        post['excerpt'],
      coverGradient:  post['coverGradient'],
      coverEmoji:     post['coverEmoji'],
      date:           post['date'],
      readTime:       post['readTime'],
      views:          post['views']    ?? 0,
      likeCount:      post['likeCount'] ?? 0,
      tags:           tags.map(t => t['name'] as string),
      content:        blocks.map(b => ({
        type:    b['type'],
        level:   b['level'],
        text:    b['text'],
        lang:    b['lang'],
        code:    b['code'],
        variant: b['variant'],
        items:   b['items']
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load post' });
  }
});

// ─── POST /api/blog/posts/:slug/view ────────────────────────────────────────
// Fire-and-forget view counter increment (no body needed).
router.post('/posts/:slug/view', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    await db.collection('blog_posts').updateOne(
      { slug: req.params['slug'] as string, status: 'published' },
      { $inc: { views: 1 }, $set: { updatedAt: new Date() } }
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'View tracking failed' });
  }
});

// ─── POST /api/blog/posts/:slug/like ────────────────────────────────────────
// Body: { token: string }  (UUID stored in visitor's localStorage)
// Inserts into post_likes (unique on postId+token). If duplicate → unlike.
// Returns { liked: boolean, count: number }
router.post('/posts/:slug/like', async (req: Request, res: Response) => {
  const { token } = req.body as { token?: string };
  if (!token || token.length < 8) { res.status(400).json({ error: 'Invalid token' }); return; }

  try {
    const { db, post } = await postBySlug(req.params['slug'] as string);
    if (!post) { res.status(404).json({ error: 'Post not found' }); return; }

    const postId  = post['_id'] as ObjectId;
    const ipHash  = hashIp(req);
    const existing = await db.collection('post_likes').findOne({ postId, cookieToken: token });

    let liked: boolean;
    if (existing) {
      // Unlike — remove the record and decrement
      await db.collection('post_likes').deleteOne({ _id: existing['_id'] });
      await db.collection('blog_posts').updateOne(
        { _id: postId },
        { $inc: { likeCount: -1 }, $set: { updatedAt: new Date() } }
      );
      liked = false;
    } else {
      // Like — insert and increment
      await db.collection('post_likes').insertOne({ postId, cookieToken: token, ipHash, likedAt: new Date() });
      await db.collection('blog_posts').updateOne(
        { _id: postId },
        { $inc: { likeCount: 1 }, $set: { updatedAt: new Date() } }
      );
      liked = true;
    }

    const updated = await db.collection('blog_posts').findOne({ _id: postId });
    res.json({ liked, count: updated?.['likeCount'] ?? 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Like failed' });
  }
});

// ─── GET /api/blog/posts/:slug/comments ─────────────────────────────────────
// Returns visible comments, newest first.
router.get('/posts/:slug/comments', async (req: Request, res: Response) => {
  try {
    const { db, post } = await postBySlug(req.params['slug'] as string);
    if (!post) { res.status(404).json({ error: 'Post not found' }); return; }

    const comments = await db.collection('comments')
      .find({ postId: post['_id'], status: 'visible' })
      .sort({ createdAt: -1 })
      .project({ ipHash: 0 })      // never expose IP hash to client
      .toArray();

    res.json(comments.map(c => ({
      id:          c['_id'].toString(),
      displayName: c['displayName'] ?? null,
      isAnonymous: c['isAnonymous'] ?? true,
      body:        c['body'],
      createdAt:   c['createdAt']
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load comments' });
  }
});

// ─── POST /api/blog/posts/:slug/comments ────────────────────────────────────
// Body: { body: string, displayName?: string }
// Rate limit: max 3 visible comments per IP hash per 24 hours.
router.post('/posts/:slug/comments', async (req: Request, res: Response) => {
  const { body, displayName } = req.body as { body?: string; displayName?: string };

  if (!body || body.trim().length < 2) {
    res.status(400).json({ error: 'Comment body is required (min 2 chars)' });
    return;
  }
  if (body.trim().length > 2000) {
    res.status(400).json({ error: 'Comment too long (max 2000 chars)' });
    return;
  }

  try {
    const { db, post } = await postBySlug(req.params['slug'] as string);
    if (!post) { res.status(404).json({ error: 'Post not found' }); return; }

    const ipHash  = hashIp(req);
    const since   = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await db.collection('comments').countDocuments({
      ipHash,
      createdAt: { $gte: since }
    });

    if (recentCount >= 3) {
      res.status(429).json({ error: 'You can post up to 3 comments per 24 hours.' });
      return;
    }

    const name = displayName?.trim().slice(0, 50) || null;
    const doc = {
      postId:      post['_id'],
      displayName: name,
      isAnonymous: !name,
      body:        body.trim(),
      status:      'visible',
      ipHash,
      createdAt:   new Date()
    };

    const inserted = await db.collection('comments').insertOne(doc);
    res.status(201).json({
      id:          inserted.insertedId.toString(),
      displayName: name,
      isAnonymous: !name,
      body:        doc.body,
      createdAt:   doc.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

export default router;
