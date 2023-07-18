import { defineStore } from 'pinia'
import type { LocationQueryValue } from 'vue-router'

type Query = { [p: string]: string | null | undefined | LocationQueryValue[] }
export const useRouterStore = defineStore('routerStore', {
    state: () => ({}),
    actions: {
        async setQuery (query: Query): Promise<void> {
          await useRouter().push({
            path: this.currentRoute,
            query: { ...this.query, ...query }
          })
        }
    },
    getters: {
        currentRoute: (): string => {
            return useRoute().path
        },
        query: (): Query => {
            return useRoute().query
        }
    }
})
