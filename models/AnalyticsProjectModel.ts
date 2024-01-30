import BaseModel from '~/models/BaseModel'

export type AnalyticsProjectCommand = {
  domain: string;
}
export default class AnalyticsProjectModel extends BaseModel {
  id: number
  domain: string
  favicon: string | null = '/images/placeholder_favicon.ico'
  active?: boolean = false

  constructor (analyticsProject: AnalyticsProjectModel) {
    super(analyticsProject.createdAt, analyticsProject.updatedAt)
    this.id = analyticsProject.id
    this.domain = analyticsProject.domain
    this.favicon = analyticsProject.favicon || this.favicon
    this.active = analyticsProject.active || this.active
  }
}

export type AnalyticsProjectWithVisitorCount = { project: AnalyticsProjectModel, visitorLast24Hours: number }
