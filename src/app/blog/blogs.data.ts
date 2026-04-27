import { SkeletonPost } from './blog.model';

// Blog post content now lives in MongoDB (blog_posts + content_blocks collections).
// Only the coming-soon skeleton placeholders remain static here.

export const SKELETON_POSTS: SkeletonPost[] = [
  {
    label:        'Optimising Angular Performance with OnPush & Signals',
    shimmerWidth: ['75%', '55%', '90%', '40%']
  },
  {
    label:        'From EmailJS to Make.com: Cutting Mail Latency by 80%',
    shimmerWidth: ['65%', '80%', '50%', '70%']
  }
];
