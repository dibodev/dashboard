import { defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
  // define global rules
  defineRule('required', required)
})
