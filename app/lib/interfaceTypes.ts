export interface CartType {
  userId: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }>;
}
