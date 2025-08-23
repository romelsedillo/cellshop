export type Order = {
  id: string;
  email: string;
  products: string; // still a string from DB
  created_at: string;
  status: string;
};
export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};
