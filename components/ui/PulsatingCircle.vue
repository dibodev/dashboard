<template>
  <span :style="`--pulsating-circle-color: ${props.color}`" class="pulsating-circle"/>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: '#10B981'
  }
})
</script>

<style lang="scss" scoped>
$size: 10px;
.pulsating-circle {
  display: inline-block;
  width: $size;
  height: $size;
  position: relative;

  &::before {
    animation: pulse-ring 2s cubic-bezier(.215, .61, .355, 1) infinite;
    background-color: var(--pulsating-circle-color);
    border-radius: 45px;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 300%;
    margin-left: -100%;
    margin-top: -100%;
    position: relative;
    width: 300%;
  }

  &::after {
    animation: pulse-dot 2s cubic-bezier(.455,.03,.515,.955) -.4s infinite;
    background-color: var(--pulsating-circle-color);
    border-radius: 15px;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(.33)
  }
  50% {
    transform: scale(1)
  }
  40%,
  to {
    opacity: 0
  }
}

@keyframes pulse-dot {
  0% {
    transform: scale(.8)
  }
  25% {
    transform: scale(1)
  }
  50%,
  to {
    transform: scale(.8)
  }
}
</style>
