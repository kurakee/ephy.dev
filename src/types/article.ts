export interface Article {
  title: string;
  description: string;
  publishedAt: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
  tags?: string[];
}
