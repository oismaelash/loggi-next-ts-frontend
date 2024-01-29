export const jwt =
  typeof window !== 'undefined'
    ? localStorage.getItem(process.env.NEXT_PUBLIC_JWT_NAME) : null

export const sessionStatus = jwt ? true : false

export const setJwt = () => {
  if (sessionStatus) {
    localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_NAME)
  }
}