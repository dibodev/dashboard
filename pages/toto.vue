<template>
    <div class="bg-gray-900 h-screen px-4">
        <div class="relative top-0 sm:py-3 py-2 z-10">
            <div class="items-center w-full flex">
                <div class="flex items-center w-full">
                    <div class="relative">
                        <div>
                            <a
                                    class="block ml-1 md:ml-2 mr-auto text-xs md:text-sm font-bold text-gray-500 dark:text-gray-300"
                                    href="/plausible.io?period=realtime"
                            >
                                <svg
                                        class="inline w-2 mr-1 md:mr-2 text-green-500 fill-current"
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="8" cy="8" r="8"/>
                                </svg>
                                47 <span class="hidden sm:inline-block">current visitors</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid gap-4">
            <div class="relative w-full mt-2 rounded shadow-xl bg-gray-700">
                <div class="fade-enter-active">
                    <div>
                        <div id="top-stats-container" class="flex flex-wrap" style="height: auto;">
                            <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer border-r lg:border-r-0">
                                <div>
                                    <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap flex w-content border-b text-indigo-700 dark:text-indigo-500 border-indigo-700 dark:border-indigo-500">
                                        Unique visitors
                                    </div>
                                    <div class="my-1 space-y-2">
                                        <div>
<span class="flex items-center justify-between whitespace-nowrap"><p
        id="visitors"
        class="font-bold text-xl dark:text-gray-100"
>3.4M</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer lg:border-l border-gray-300">
                                <div>
                                    <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap flex w-content border-b group-hover:text-indigo-700 dark:group-hover:text-indigo-500 border-transparent">
                                        Total visits
                                    </div>
                                    <div class="my-1 space-y-2">
                                        <div>
<span class="flex items-center justify-between whitespace-nowrap"><p
        id="visits"
        class="font-bold text-xl dark:text-gray-100"
>4.8M</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer lg:border-l border-gray-300 border-r lg:border-r-0">
                                <div>
                                    <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap flex w-content border-b group-hover:text-indigo-700 dark:group-hover:text-indigo-500 border-transparent">
                                        Total pageviews
                                    </div>
                                    <div class="my-1 space-y-2">
                                        <div>
<span class="flex items-center justify-between whitespace-nowrap"><p
        id="pageviews"
        class="font-bold text-xl dark:text-gray-100"
>11.7M</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer lg:border-l border-gray-300">
                                <div>
                                    <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap flex w-content border-b group-hover:text-indigo-700 dark:group-hover:text-indigo-500 border-transparent">
                                        Views per visit
                                    </div>
                                    <div class="my-1 space-y-2">
                                        <div>
<span class="flex items-center justify-between whitespace-nowrap"><p
        id="views_per_visit"
        class="font-bold text-xl dark:text-gray-100"
>2.4</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer lg:border-l border-gray-300 border-r lg:border-r-0">
                                <div>
                                    <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap flex w-content border-b group-hover:text-indigo-700 dark:group-hover:text-indigo-500 border-transparent">
                                        Bounce rate
                                    </div>
                                    <div class="my-1 space-y-2">
                                        <div>
<span class="flex items-center justify-between whitespace-nowrap"><p
        id="bounce_rate"
        class="font-bold text-xl dark:text-gray-100"
>60%</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative px-4 md:px-6 w-1/2 my-4 lg:w-auto group select-none cursor-pointer lg:border-l border-gray-300">
                                <div>
                                    <div class="text-xs font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400 whitespace-nowrap flex w-content border-b group-hover:text-indigo-700 dark:group-hover:text-indigo-500 border-transparent">
                                        Visit duration
                                    </div>
                                    <div class="my-1 space-y-2">
                                        <div>
<span class="flex items-center justify-between whitespace-nowrap"><p
        id="visit_duration"
        class="font-bold text-xl dark:text-gray-100"
>3m 05s</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <div class="fade-enter-active">
                    <div class="relative h-96 w-full z-0">
                        <LineChart/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LineChart from '~/components/charts/LineChartOld.vue'
</script>
