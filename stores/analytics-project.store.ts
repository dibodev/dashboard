import { defineStore } from 'pinia'
import AnalyticsProjectModel, { AnalyticsProjectCommand } from '~/services/models/AnalyticsProjectModel'
import { useAppStore } from '~/stores/app.store'
import AnalyticsProjectService from '~/services/AnalyticsProjectService'

export const useAnalyticsProjectStore = defineStore('analyticsProjectStore', {
  state: () => ({
    _projects: [] as AnalyticsProjectModel[],
    _project: {} as AnalyticsProjectModel
  }),
  actions: {
    setProjects (projects: AnalyticsProjectModel[]) {
      this._projects = projects
    },

    setProject (project: AnalyticsProjectModel) {
      this._project = project
    },

    async fetchProjects (): Promise<AnalyticsProjectModel[]> {
      useAppStore().setPending(true)
      const projects = await AnalyticsProjectService.getAll()
      this.setProjects(projects)
      useAppStore().setPending(false)
      return projects
    },

    async updateProject (project: AnalyticsProjectCommand, id: number): Promise<AnalyticsProjectModel | null> {
      if (this._project.id === id) {
        this.setProject({ ...this._project, ...project })
      }

      const index = this._projects.findIndex(p => p.id === id)
      if (index !== -1) {
        this._projects[index] = { ...this._projects[index], ...project }
      }
      return await AnalyticsProjectService.updateProject(project, id)
    },

    async createProject (project: AnalyticsProjectCommand): Promise<AnalyticsProjectModel | null> {
      const createdProject = await AnalyticsProjectService.createProject(project)
      if (createdProject) {
        if (!this._projects) {
          this.setProjects([])
        }
        this._projects.unshift(createdProject)
      }
      return createdProject
    },

    async deleteProject (id: number): Promise<void> {
      await AnalyticsProjectService.deleteProject(id)
      this.setProjects(this._projects.filter(p => p.id !== id))
    }
  },
  getters: {
    project: (state): AnalyticsProjectModel => state._project,
    projects: (state): AnalyticsProjectModel[] => state._projects
  }
})
