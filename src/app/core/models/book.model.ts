export interface Book {
  isbn: string;
  title: string;
  subtitle: string;
  categories: string[];
  author: string | string[];
  published: string | number;
  publisher: string;
  pages: number;
  description: string;
  website: string;
  image?: string;
}
