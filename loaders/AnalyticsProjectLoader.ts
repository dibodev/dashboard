import AnalyticsProjectModel from '#models/AnalyticsProjectModel'
import type { AnalyticsProjectWithVisitorCount, AnalyticsProjectCommand } from '#models/AnalyticsProjectModel'
import AnalyticsProjectService from '#services/AnalyticsProjectService'

export default class AnalyticsProjectLoader {
    static createMany (analyticsProjects: AnalyticsProjectModel[]) {
        return analyticsProjects.map(analyticsProject => new AnalyticsProjectModel(analyticsProject))
    }

    static create (analyticsProject: AnalyticsProjectModel) {
        return new AnalyticsProjectModel(analyticsProject)
    }

    static async getAll (): Promise<AnalyticsProjectWithVisitorCount[]> {
        const res = await AnalyticsProjectService.getAll()
        return res.map((p) => {
            return {
                ...p,
                project: this.create(p.project)
            }
        })
    }

    static async updateProject (project: AnalyticsProjectCommand, id: number): Promise<AnalyticsProjectModel | null> {
        const updatedProject = await AnalyticsProjectService.updateProject(project, id)
        if (updatedProject) {
            return this.create(updatedProject)
        }
        return null
    }

    static async createProject (project: AnalyticsProjectCommand): Promise<AnalyticsProjectModel | null> {
        const createdProject = await AnalyticsProjectService.createProject(project)
        if (createdProject) {
            return this.create(createdProject)
        }
        return null
    }

    static async deleteProject (id: number): Promise<void> {
        await AnalyticsProjectService.deleteProject(id)
    }
}
