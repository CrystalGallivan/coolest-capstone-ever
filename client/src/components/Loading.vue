<template>
  <div class="loading">
    <div id="title-loading">
      <h1>Loading</h1>
    </div>
    <div id="loading-parent">
      <div id="loading-child">
        <img id="loading-icon" src="../assets/icons8-loading-round-24.png" alt="icon">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Loading",
    data() {
      return {
        currentAngle: 0
      }
    },
    mounted() {
      this.timer()
    },
    methods: {
      timer() {
        setInterval(this.load, 1)
      },
      load() {
        this.currentAngle += 1;
        $("#loading-parent").css({ transform: 'rotate(' + this.currentAngle + 'deg)' });
        $("#loading-child").css({ transform: 'rotate(-' + this.currentAngle + 'deg)' });
        console.log("Tried to load")
      }
    }
  }
</script>
<style>
  .loading {
    min-height: 95vh;
    min-width: 95vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #title-loading {
    padding-right: 10px;
  }

  #loading-parent {
    position: relative;
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: rotate(0deg);
    transition: transform 0.2s linear;
  }

  #loading-child {
    position: absolute;
    width: 13.33px;
    height: 13.33px;
    transform: rotate(0deg);
    transition: transform 0.2s linear;
    top: -6.9px;
    left: 18.6px;
  }

  #loading-icon {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;

  }
</style>