export interface Sort{
  orders: Order[];
}

export interface Order {
  field: string;
  direction: 'asc' | 'desc';
}
