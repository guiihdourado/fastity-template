interface IAuthenticateUserUseCaseResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

export { IAuthenticateUserUseCaseResponse }
