import BaseApiService from '~/services/BaseApiService'
import type { AnalyticsProjectCommand } from '~/models/AnalyticsProjectModel'
import AnalyticsProjectModel, { AnalyticsProjectWithVisitorCount } from '~/models/AnalyticsProjectModel'

export default class AnalyticsProjectService extends BaseApiService {
  static async getAll (): Promise<AnalyticsProjectWithVisitorCount[]> {
    try {
      return await this.get('/projects')
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  static async createProject (project: AnalyticsProjectCommand): Promise<AnalyticsProjectModel | null> {
    try {
      return await this.post('/projects', project)
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  }

  static async updateProject (project: AnalyticsProjectCommand, id: number): Promise<AnalyticsProjectModel | null> {
    try {
      return await this.put(`/projects/${id}`, project)
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error)
      return null
    }
  }

  static async deleteProject (id: number): Promise<void> {
    try {
      await this.delete(`/projects/${id}`)
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error)
    }
  }
}
