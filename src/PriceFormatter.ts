class PriceFormatter {
    static format(price: number, currency: string): string {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currency
        }).format(price);
    }
}

export default PriceFormatter;
