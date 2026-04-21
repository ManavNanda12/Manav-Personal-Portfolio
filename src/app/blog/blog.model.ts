export type BlockType = 'heading' | 'paragraph' | 'code' | 'callout' | 'list' | 'divider';

export interface ContentBlock {
  type:     BlockType;
  level?:   2 | 3;
  text?:    string;
  lang?:    string;
  code?:    string;
  variant?: 'info' | 'tip' | 'warning';
  items?:   string[];
}

export interface BlogPost {
  id?:            string;   // MongoDB _id as string (absent on static/legacy data)
  slug:           string;
  title:          string;
  excerpt:        string;
  coverGradient:  string;
  coverEmoji:     string;
  date:           string;   // ISO date string e.g. '2025-03-15'
  readTime:       number;   // minutes
  views:          number;
  likeCount:      number;
  tags:           string[];
  content:        ContentBlock[];
}

export interface SkeletonPost {
  label:        string;
  shimmerWidth: string[];
}

export interface BlogComment {
  id:           string;
  displayName:  string | null;
  isAnonymous:  boolean;
  body:         string;
  createdAt:    string;  // ISO date string
}
