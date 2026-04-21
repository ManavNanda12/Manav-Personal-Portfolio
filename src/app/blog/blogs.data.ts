import { BlogPost, SkeletonPost } from './blog.model';

export const BLOGS: BlogPost[] = [
  {
    slug: 'building-mn-ai-cloudflare-workers-grok',
    title: 'Building MN.AI: Cloudflare Workers + Grok AI in Angular',
    excerpt: 'How I built a contextual AI chatbot for my portfolio using Cloudflare Workers as a secure proxy, Grok AI for the responses, and Angular for the UI — with zero API key exposure in the browser.',
    coverGradient: 'linear-gradient(135deg, #120820 0%, #0a0a1f 50%, #081a20 100%)',
    coverEmoji: '🤖',
    date: '2025-03-15',
    readTime: 8,
    tags: ['Angular', 'Cloudflare Workers', 'Grok AI', 'TypeScript'],
    content: [
      {
        type: 'paragraph',
        text: 'Most portfolio chatbots are either static FAQ widgets or expensive OpenAI calls with no real context about the person behind the portfolio. I wanted something different — an AI that actually knows my work, responds contextually, and costs essentially nothing to run at hobby scale. This is a full walkthrough of how I built MN.AI from scratch.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Architecture'
      },
      {
        type: 'callout',
        variant: 'info',
        text: 'Browser → Angular ChatService → Cloudflare Worker (edge, free tier) → Grok AI API. The Worker injects a system prompt loaded with my background and acts as a secure proxy. No API keys ever touch the browser.'
      },
      {
        type: 'paragraph',
        text: 'The key insight is keeping the AI\'s context injection on the server side. The Angular app only sends the conversation messages — the Cloudflare Worker prepends the system prompt before forwarding to Grok. This means I can update my "personality brief" without touching the frontend.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Setting Up the Cloudflare Worker'
      },
      {
        type: 'paragraph',
        text: 'The entire backend is a single Worker file. It handles CORS, injects the system prompt, and proxies the request to Grok\'s completion endpoint. The API key lives as a Cloudflare secret — never in source control.'
      },
      {
        type: 'code',
        lang: 'javascript',
        code: `export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const { messages } = await request.json();

    const systemPrompt = \`You are MN.AI, an assistant embedded in
Manav Nanda's developer portfolio. Manav is a Full-Stack Developer
specialising in Angular, .NET Core, and AI integrations.
Be concise, helpful, and reference his real projects when relevant.\`;

    const response = await fetch(
      'https://api.x.ai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + env.GROK_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'grok-3-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};`
      },
      {
        type: 'heading',
        level: 2,
        text: 'Angular Service Layer'
      },
      {
        type: 'paragraph',
        text: 'On the Angular side, the service maintains a conversation history array and sends the full context window on each request. This is what gives MN.AI its multi-turn memory — the model sees every previous exchange, not just the latest message.'
      },
      {
        type: 'code',
        lang: 'typescript',
        code: `@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly workerUrl =
    'https://mn-ai.your-subdomain.workers.dev';

  private history: { role: string; content: string }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<string> {
    this.history.push({ role: 'user', content: userMessage });

    return this.http
      .post<any>(this.workerUrl, { messages: this.history })
      .pipe(
        map(res => {
          const reply = res.choices[0].message.content;
          this.history.push({ role: 'assistant', content: reply });
          return reply;
        })
      );
  }

  clearHistory(): void {
    this.history = [];
  }
}`
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Typed Response Effect'
      },
      {
        type: 'paragraph',
        text: 'Rather than dumping the full response instantly, the UI types it out character by character using a simple interval loop. It makes the AI feel more alive, and it masks the fact that the entire response arrived at once over HTTP.'
      },
      {
        type: 'code',
        lang: 'typescript',
        code: `typeReply(fullText: string): void {
  this.isTyping = true;
  let i = 0;

  const tick = setInterval(() => {
    this.currentReply = fullText.slice(0, ++i);

    if (i >= fullText.length) {
      clearInterval(tick);
      this.isTyping = false;
      this.messages.push({ role: 'assistant', content: fullText });
      this.currentReply = '';
      this.scrollToBottom();
    }
  }, 18); // ~55 chars/sec — feels natural
}`
      },
      {
        type: 'heading',
        level: 2,
        text: 'Key Takeaways'
      },
      {
        type: 'list',
        items: [
          'Cloudflare Workers cold-start is essentially zero — responses feel instant on the edge.',
          'A rich system prompt transforms a generic LLM into a contextual assistant that knows your projects.',
          'Sending the full conversation history (not just the latest message) enables coherent multi-turn dialogue.',
          'Always proxy AI calls through a server — never expose API keys in browser-side code.',
          'The free tier of Cloudflare Workers handles hobby-scale traffic with zero cost.'
        ]
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Start with a minimal system prompt and iterate. The quality of the context you inject matters more than the model you choose — a well-prompted smaller model beats a poorly-prompted large one every time.'
      }
    ]
  }
];

export const SKELETON_POSTS: SkeletonPost[] = [
  {
    label: 'Optimising Angular Performance with OnPush & Signals',
    shimmerWidth: ['75%', '55%', '90%', '40%']
  },
  {
    label: 'From EmailJS to Make.com: Cutting Mail Latency by 80%',
    shimmerWidth: ['65%', '80%', '50%', '70%']
  }
];
