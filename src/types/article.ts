export interface Article {
  title: string;
  description: string;
  publishedAt: Date;
  href: string;
  image: {
    src: string;
    alt: string;
  };
  tags?: string[];
}
