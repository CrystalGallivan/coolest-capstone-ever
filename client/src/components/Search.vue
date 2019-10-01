<template>
  <div class="search">
    <input type="text">

  </div>
</template>
<script>
  export default {
    name: 'search',
    props: {
      items: {
        type: Array,
        required: false,
        default: () => []
      },

    }
  }
</script>