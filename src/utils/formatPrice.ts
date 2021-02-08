export default function formatPrice(numb: number, currency: string): string {
  return (
    Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(numb)
  )
};
