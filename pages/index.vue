<template>
    <div class="p-5 bg-white dark:bg-gray-900 antialiased text-white h-screen">
        <div class="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DomainCard/>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { io } from 'socket.io-client'
import DomainCard from '~/components/cards/DomainCard.vue'

// definePageMeta({
//   nuxtI18n: {
//     en: true,
//     fr: true
//   }
// })

type Website = {
    id: number
    name: string
    domain: string
}

const websites = ref([] as Website[])

if (apiUrl) {
  const socket = io(apiUrl)

  socket.on('news', (news: { hello: string }) => {
    console.log(news)
  })
  socket.on('current-visitors', (visitors: number) => {
    console.log(visitors)
  })

  const getWebsites = async () => {
    const res = await axios.get(`${apiUrl}/projects`)
    websites.value = res.data
  }
  getWebsites()
}
</script>
