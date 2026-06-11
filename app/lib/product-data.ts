export interface Product {
  id: number;
  title: string;
  text: string;
  h: string;
  price?: string;
  category?: string;
  seller?: string;
  image?: string;
}

export const products: Product[] = [
  { id: 1,  title: "Product 1",  text: "Short description.", h: "h-48" },
  { id: 2,  title: "Product 2",  text: "Short description.", h: "h-32" },
  { id: 3,  title: "Product 3",  text: "Short description.", h: "h-56" },
  { id: 4,  title: "Product 4",  text: "Short description.", h: "h-32" },
  { id: 5,  title: "Product 5",  text: "Short description.", h: "h-56" },
  { id: 6,  title: "Product 6",  text: "Short description.", h: "h-40" },
  { id: 7,  title: "Product 7",  text: "Short description.", h: "h-56" },
  { id: 8,  title: "Product 8",  text: "Short description.", h: "h-32" },
  { id: 9,  title: "Product 9",  text: "Short description.", h: "h-48" },
  { id: 10, title: "Product 10", text: "Short description.", h: "h-40" },
  { id: 11, title: "Product 11", text: "Short description.", h: "h-56" },
  { id: 12, title: "Product 12", text: "Short description.", h: "h-32" },
  { id: 13, title: "Product 13", text: "Short description.", h: "h-48" },
  { id: 14, title: "Product 14", text: "Short description.", h: "h-32" },
  { id: 15, title: "Product 15", text: "Short description.", h: "h-56" },
  { id: 16, title: "Product 16", text: "Short description.", h: "h-32" },
  { id: 17, title: "Product 17", text: "Short description.", h: "h-56" },
  { id: 18, title: "Product 18", text: "Short description.", h: "h-40" },
  { id: 19, title: "Product 19", text: "Short description.", h: "h-56" },
  { id: 20, title: "Product 20", text: "Short description.", h: "h-32" },
  { id: 21, title: "Product 21", text: "Short description.", h: "h-48" },
  { id: 22, title: "Product 22", text: "Short description.", h: "h-40" },
  { id: 23, title: "Product 23", text: "Short description.", h: "h-56" },
  { id: 24, title: "Product 24", text: "Short description.", h: "h-32" },
];