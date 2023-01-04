export type OrdersType = {
    id: string;
    amount: number;
    amountShipping: number;
    images: [];
    items: [Items[]];
    timestamp: number;
}

type Items = {
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    id: string;
    object: string;
    quantity: string;
    price: [object],
}