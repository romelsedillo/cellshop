export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  brand: string;
  price: number;
  featured?: boolean;
  latest?: boolean;
};
