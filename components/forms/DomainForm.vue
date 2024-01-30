<template>
    <Form @submit="submit">
<div class="mb-6">
            <label for="domain" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domaine</label>
            <Field
              v-model="values.domain"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="domain"
              rules="required"
              required
            />
            <ErrorMessage name="domain" />
        </div>
        <button
                type="submit"
                class="inline-flex items-center justify-center px-5 py-3
        font-medium text-white bg-indigo-600 border border-transparent leading-6
        rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline
        transition duration-150 ease-in-out">
            Créer
        </button>
    </Form>
</template>
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useAnalyticsProjectStore } from '~/stores/analytics.project.store.js'

/* HOOKS */
const router = useRouter()

const values = ref({
  domain: ''
})

/* METHOD */
const submit = async () => {
  const project = await useAnalyticsProjectStore().createProject(values.value)
  if (project) {
    await router.push('/')
  }
}
</script>
