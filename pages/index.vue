<template>
    <div class="p-5 bg-white dark:bg-gray-900 antialiased text-white">
        <form>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                        id="name"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Mon site"
                        required
                >
            </div>

            <div class="mb-6">
                <label for="domain" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domaine</label>
                <input
                        id="domain"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="monsite.fr"
                        required
                >
            </div>
            <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
        <ul>
            <li v-for="website in websites" :key="website.id">
                {{ website.name }}, {{ website.domain }}, visitor: 0
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { io } from 'socket.io-client'

type Website = {
  id: number
  name: string
  domain: string
}

const websites = ref([] as Website[])

const socket = io(apiUrl)

socket.on('news', (news: { hello: string }) => {
  console.log(news)
})
socket.on('current-visitors', (visitors: number) => {
  console.log(visitors)
})

const getWebsites = async () => {
  const res = await axios.get(`${apiUrl}/websites`)
  websites.value = res.data
}
getWebsites()
</script>
