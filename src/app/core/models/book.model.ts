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

// published is either numeric (year) or string (date)
// if not numeric take the Year part
export const formatBook = (book: Book): Book => {
  let published = book.published;
  if (isNaN(Number(published))) {
    published = new Date(published).getFullYear();
  }
  return { ...book, published };
};
