<template>
  <div>
    <div class="title">
      <h1>This is the AdminKitchens component</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: [],
    data() {
      return {}
    },
    computed: {
      users() {
        return this.$store.state.users
      }
    },
    methods: {},
    components: {}
  }
</script>