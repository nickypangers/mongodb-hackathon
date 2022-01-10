<template>
  <div class="py-2 px-4 min-w-min">
    {{ title }}
  </div>
</template>
<script>
export default {
  name: 'ProductBadge',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
