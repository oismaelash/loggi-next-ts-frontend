export function formatDate(date: string): string {
  const newDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Intl.DateTimeFormat('pt-BR', options).format(newDate)
}
