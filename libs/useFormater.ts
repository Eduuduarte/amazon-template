export const useFormater = () => ({
    formtPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
        })
    }
});