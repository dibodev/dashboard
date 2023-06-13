import BaseModel from '~/services/models/BaseModel'

export type AnalyticsProjectCommand = {
  domain: string;
}
export default class AnalyticsProjectModel extends BaseModel {
  id: number
  domain: string
  favicon: string | null
  active?: boolean = false

  constructor (analyticsProject: AnalyticsProjectModel) {
    super(analyticsProject.createdAt, analyticsProject.updatedAt)
    this.id = analyticsProject.id
    this.domain = analyticsProject.domain
    this.favicon = analyticsProject.favicon
    this.active = analyticsProject.active || this.active
  }
}

export type AnalyticsProjectWithVisitorCount = { project: AnalyticsProjectModel, visitorLast24Hours: number }
