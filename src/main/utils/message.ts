export interface IMessage {
  type: string
  message: string
}

export class Message implements IMessage {
  type: string
  message: string

  constructor(type: string, message?: string) {
    this.type = type
    this.message = message || ''
  }
}
