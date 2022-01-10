<template>
  <p
    class="text-xs p-1.5 rounded-lg w-min text-white"
    :class="getCategoryColor(category)"
  >
    {{ category }}
  </p>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CategoryLabel',
  props: {
    category: {
      type: String,
      default: '',
    },
  },
  mixins: [global],
}
</script>
