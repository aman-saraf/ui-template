interface IAPIError {
  message: string
}

export abstract class APIError implements IAPIError {
  public readonly message: string

  constructor(message: string) {
    this.message = message
  }
}
