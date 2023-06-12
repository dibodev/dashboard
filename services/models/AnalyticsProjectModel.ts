import BaseModel from '~/services/models/BaseModel'

export type AnalyticsProjectCommand = {
  domain: string;
}
export default class AnalyticsProjectModel extends BaseModel {
  id: number
  domain: string
  favicon: string | null

  constructor (id: number, domain: string, favicon: string, createdAt: string, updatedAt: string) {
    super(createdAt, updatedAt)
    this.id = id
    this.domain = domain
    this.favicon = favicon
  }
}
