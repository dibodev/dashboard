<template>
    <div>
        <div v-if="!mapLoaded" class="flex items-center justify-center h-full">
            <Spinner />
        </div>
        <div>
            <div id="map-container"/>
            <div class="flex items-center gap-3">
                <button
                    class="zoom-button inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent leading-6 rounded-md hover:bg-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                    data-zoom="reset"
                    @click="resetZoom">
                    0
                </button>
                <button
                    class="zoom-button inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent leading-6 rounded-md hover:bg-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                    data-zoom="out"
                    @click="zoomOut">
                    -
                </button>
                <button
                    class="zoom-button inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent leading-6 rounded-md hover:bg-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                    data-zoom="in"
                    @click="zoomIn">
                    +
                </button>
                <div id="zoom-info"/>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>
import Spinner from '#components/ui/Spinner.vue'

const props = defineProps({
    countries: {
        type: Array,
        required: true
    },
    darkTheme: {
        type: Boolean,
        default: true
    }
})

const map = ref()
const mapLoaded = ref(false)
const zoom = ref()
const colors = ref({})

// Cette fonction change le zoom en fonction de la direction passée en paramètre
// Elle prend un troisième argument (scale) qui est la nouvelle échelle à laquelle faire le zoom
const changeZoom = (direction, scale = null) => {
    const center = [map.value.svg[0][0].getBoundingClientRect().width / 2, map.value.svg[0][0].getBoundingClientRect().height / 2]
    const translate = zoom.value.translate()
    // Si la nouvelle échelle n'est pas fournie, on calcule l'échelle en fonction de la direction du zoom
    scale = scale || (direction === 'in' ? zoom.value.scale() * 1.1 : zoom.value.scale() / 1.1)
    const translate0 = [(center[0] - translate[0]) / zoom.value.scale(), (center[1] - translate[1]) / zoom.value.scale()]
    const l = [translate0[0] * scale + translate[0], translate0[1] * scale + translate[1]]
    translate[0] += center[0] - l[0]
    translate[1] += center[1] - l[1]
    zoom.value.scale(scale).translate(translate)
    zoom.value.event(d3.select(map.value.svg[0][0]))
}

const zoomIn = () => changeZoom('in')

const zoomOut = () => changeZoom('out')

// Cette fonction réinitialise le zoom à l'échelle 1 en utilisant la fonction changeZoom
const resetZoom = () => changeZoom(null, 1)

// Cette fonction initialise le comportement de zoom
const setupZoom = () => {
    const zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on('zoom', function () {
            d3.select(map.value.svg[0][0]).select('g').attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')')
        })

    d3.select(map.value.svg[0][0]).call(zoom)

    return zoom
}

// Cette fonction récupère le dataset à partir des propriétés des pays
const getDataset = () => {
    const dataset = {}

    if (props.countries) {
        props.countries.forEach(function (item) {
            dataset[item.alpha_3] = {
                numberOfThings: item.visitors,
                flag: item.flag
            }
        })
    }

    return dataset
}

const drawMapColor = () => {
    const onlyValues = props.countries ? props.countries.map(function (obj) {
        return obj.visitors
    }) : []
    const maxValue = Math.max.apply(null, onlyValues)

    const paletteScale = d3.scale.linear()
        .domain([0, maxValue])
        .range([
            props.darkTheme ? '#2e3954' : '#f3ebff',
            props.darkTheme ? '#6366f1' : '#a779e9'
        ])

    if (props.countries) {
        props.countries.forEach(function (item) {
            colors.value[item.alpha_3] = paletteScale(item.visitors)
        })
    }

    map.value.updateChoropleth(colors.value)
}

// Cette fonction construit la carte en fonction du dataset
const drawMap = () => {
    const dataset = getDataset()
    const defaultFill = props.darkTheme ? '#2d3747' : '#f8fafc'
    const highlightFill = props.darkTheme ? '#374151' : '#F5F5F5'
    const borderColor = props.darkTheme ? '#1f2937' : '#dae1e7'
    const highlightBorderColor = props.darkTheme ? '#4f46e5' : '#a779e9'

    map.value = new Datamap({
        element: document.getElementById('map-container'),
        responsive: true,
        projection: 'mercator',
        fills: { defaultFill },
        data: dataset,
        geographyConfig: {
            borderColor,
            highlightBorderWidth: 2,
            highlightFillColor: (geo) => {
                return colors.value[geo.id] || highlightFill
            },
            highlightBorderColor,
            popupTemplate: (geo, data) => {
                const pluralizedLabel = data && data.numberOfThings > 1 ? 'Visitors' : 'Visitor'
                return [
                    '<div class="hoverinfo dark:bg-gray-800 dark:shadow-gray-900 dark:border-gray-900 dark:text-gray-200">',
                    data && data.flag ? '<span class="mr-1">' + data.flag + '</span>' : '',
                    '<strong>', geo.properties.name, ' </strong>',
                    '<br><strong class="dark:text-indigo-400">', data ? data.numberOfThings : '0', '</strong> ', pluralizedLabel,
                    '</div>'
                ].join('')
            }
        },
        done: (datamap) => {
            let mousedown = false
            const mousePos = { x: 0, y: 0 }

            datamap.svg.selectAll('.datamaps-subunit')
                .on('mousedown', () => {
                    mousedown = true
                    mousePos.x = d3.event.clientX // Position x de la souris
                    mousePos.y = d3.event.clientY // Position y de la souris
                })
                .on('mouseup', (geo) => {
                    if (mousedown && mousePos.x === d3.event.clientX && mousePos.y === d3.event.clientY) {
                        const country = props.countries?.find(c => c.alpha_3 === geo.id)

                        if (country) {
                            console.log({
                                country: country.code,
                                country_name: country.name
                            })
                        }
                    }
                    mousedown = false
                })
        }
    })

    drawMapColor()
    zoom.value = setupZoom()
}

onMounted(() => {
    console.log('mounted')
    drawMap()
    mapLoaded.value = true
    window.addEventListener('resize', resizeMap)
})

// Cette fonction redimensionne la carte lors du redimensionnement de la fenêtre
const resizeMap = () => {
    map.value.svg.remove() // Supprimer l'élément SVG existant
    map.value = null // Supprimer la référence à l'ancienne carte
    zoom.value = null // Supprimer la référence à l'ancien zoom
    drawMap() // Reconstruire la carte et le zoom
}

watch(() => props.countries, () => {
    map.value.updateChoropleth(getDataset(), { reset: true })
})

watch(() => props.darkTheme, () => {
    // recréer la carte si le thème change
})

onUnmounted(() => {
    window.removeEventListener('resize', resizeMap)
})

</script>

<style>
.hoverinfo {
    box-shadow: 1px 1px 5px #1a202c !important;
    border-color: #1a202c !important;
    background-color: rgb(31, 41, 55) !important;
}
.datamaps-subunit {
    cursor: pointer;
}
</style>
