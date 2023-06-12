export default class BaseModel {
  createdAt: string
  updatedAt: string
  constructor (createdAt: string, updatedAt: string) {
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
