export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
});

export function priceFormatterInput(value: string) {
    value = value.replace("R$", "").trim();
    value = value.replace(/^(0+)/g, "")
    value = value.replace(/[^\w\s]|\s|[A-Z]/gi, '')
    var len = value.length;

    len == 1 ? value = value.replace(/(\d)/, "0,0$1") : '';
    len == 2 ? value = value.replace(/(\d)/, "0,$1") : ''
    len > 2 ? value = value.replace(/(\d{2})$/, ',$1') : '';
    len == 6 ? value = value.replace(/(\d{1})/, '$1.') : '';
    len == 7 ? value = value.replace(/(\d{2})/, '$1.') : '';
    len == 8 ? value = value.replace(/(\d{3})/, '$1.') : '';
    len == 9 ? value = value.replace(/(\d{1})(\d{3})/, '$1.$2.') : '';
    len == 10 ? value = value.replace(/(\d{2})(\d{3})/, '$1.$2.') : '';
    len == 11 ? value = value.replace(/(\d{3})(\d{3})/, '$1.$2.') : '';
    len == 12 ? value = value.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.') : '';
    len == 13 ? value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3.') : '';
    return value;
}