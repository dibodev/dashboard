import { defineStore } from 'pinia'
import AnalyticsProjectModel from '#models/AnalyticsProjectModel'
import type {
  AnalyticsProjectCommand,
  AnalyticsProjectWithVisitorCount
} from '#models/AnalyticsProjectModel'
import { useAppStore } from '#stores/app.store'
import AnalyticsProjectLoader from '#loaders/AnalyticsProjectLoader'

export const useAnalyticsProjectStore = defineStore('analyticsProjectStore', {
  state: () => ({
    _projects: [] as AnalyticsProjectModel[],
    _projectsWithVisitorCount: [] as AnalyticsProjectWithVisitorCount[],
    _project: {} as AnalyticsProjectModel
  }),
  actions: {
    setProjects (projects: AnalyticsProjectModel[]) {
      this._projects = projects
    },

    setProject (project: AnalyticsProjectModel) {
      this._project = project
    },

    setProjectsWithVisitorCount (projects: AnalyticsProjectWithVisitorCount[]) {
      this._projectsWithVisitorCount = projects
    },
    getProjectByDomain (domain: string): AnalyticsProjectModel | undefined {
      return this._projects.find(p => p.domain === domain)
    },

    /* API */
    async fetchProjects (): Promise<AnalyticsProjectWithVisitorCount[]> {
      useAppStore().setPending(true)
      const res = await AnalyticsProjectLoader.getAll()
      this.setProjects(res.map(p => p.project))
      this.setProjectsWithVisitorCount(res)
      useAppStore().setPending(false)
      return res
    },

    async updateProject (project: AnalyticsProjectCommand, id: number): Promise<AnalyticsProjectModel | null> {
      if (this._project.id === id) {
        this.setProject({ ...this._project, ...project })
      }

      const index = this._projects.findIndex(p => p.id === id)
      if (index !== -1) {
        this._projects[index] = { ...this._projects[index], ...project }
      }
      return await AnalyticsProjectLoader.updateProject(project, id)
    },

    async createProject (project: AnalyticsProjectCommand): Promise<AnalyticsProjectModel | null> {
      const createdProject = await AnalyticsProjectLoader.createProject(project)
      if (createdProject) {
        if (!this._projects) {
          this.setProjects([])
        }
        this._projects.unshift(createdProject)
      }
      return createdProject
    },

    async deleteProject (id: number): Promise<void> {
      await AnalyticsProjectLoader.deleteProject(id)
      this.setProjects(this._projects.filter(p => p.id !== id))
    }
  },
  getters: {
    project: (state): AnalyticsProjectModel => state._project,
    projects: (state): AnalyticsProjectModel[] => state._projects,
    projectsWithVisitorCount: (state): AnalyticsProjectWithVisitorCount[] => state._projectsWithVisitorCount
  }
})
