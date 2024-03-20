import AnalyticsProjectService from '#services/AnalyticsProjectService'
import type { AnalyticsProjectWithVisitorCount } from '#models/AnalyticsProjectModel'

export default defineSitemapEventHandler(async () => {
    const projects: AnalyticsProjectWithVisitorCount[] = await AnalyticsProjectService.getAll()

    const analyticsProjectRoutes: string[] = projects.map((project: AnalyticsProjectWithVisitorCount): string => `/analytics/${project.project.domain}`)

    return [
        ...analyticsProjectRoutes
    ]
})
