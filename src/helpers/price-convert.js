export const toVietnamesePrice = (price) => {
  if (price === 0) {
    return '0'
  }
  const number = price.toString()
  const result = number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return '₫' + result
}
