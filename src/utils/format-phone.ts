export function formatPhone(phone: string) {
  if (phone.length <= 6) {
    return phone.replace(/\D/g, '')
  } else if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  } else {
    return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }
}