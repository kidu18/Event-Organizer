export const calculateTotal = (items: { price: number; qty: number }[]) => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
};
