<template>
  <div class="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Loading",
  };
</script>
<style>
  .loading {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner-border {
    color: rgb(109, 197, 154);
  }
</style>