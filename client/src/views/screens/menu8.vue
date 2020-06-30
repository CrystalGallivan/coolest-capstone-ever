<template>
  <div class="menu8">
    <div id="menu8-border">
      <div class="container-fluid" id="menu8-body" @click="openFullscreen">
        <div class="row">
          <div v-show="date.getHours() > 9 && date.getMinutes() > 30" class="col-12 grill-lunch">
            <grill-lunch />
          </div>
          <div v-show="date.getHours() < 9 && date.getMinutes() < 30" class="col-12 grill-breakfast">
            <grill-breakfast />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from "@/components/Loading.vue";
  import GrillBreakfast from "@/components/GrillBreakfast.vue";
  import GrillLunch from "@/components/GrillLunch.vue";
  import { mapState } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    name: "Menu8",
    props: ["signId"],
    data() {
      return {
        backgroundImage: "../assets/tile-bkg-teal.jpg",
        elem: document.documentElement,
        isScheduled: false,
        reRender: false,
        isLoading: true,
        domDescription: [],
        kitchenName: "",
        date: new Date()
      };
    },

    beforeDestroy() {
      clearInterval(this.timeout);
      clearInterval(this.timer);
    },
    computed: {
      ...mapGetters([
        "scheduledMenuItems",
        "getSignTemplate",
        "scheduled",
        "signsLength",
      ]),
      ...mapState([
        "kitchenId",
        "signs",
        "activeSign",
        "signIsScheduled",
        "menuItemsOfTheDay",
        "loading",
        "rerender",
      ]),
    },
    methods: {
      openFullscreen() {
        try {
          if (this.elem.requestFullscreen) {
            this.elem.requestFullscreen();
          } else if (this.elem.mozRequestFullScreen) {
            /* Firefox */
            this.elem.mozRequestFullScreen();
          } else if (this.elem.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            this.elem.webkitRequestFullscreen();
          } else if (this.elem.msRequestFullscreen) {
            /* IE/Edge */
            this.elem.msRequestFullscreen();
          }
        } catch (error) {
          console.log(error);
        }
      },
      timer() {
        setInterval(this.load, 1);
      },
      load() {
        if (this.loading == true) {
          this.isLoading = false;
        }
      },
    },
    components: {
      Loading,
      GrillLunch,
      GrillBreakfast
    },
  };
</script>

<style scoped>
  .menu8 {
    background: url(../../assets/tile-bkg-teal.jpg);
    background-size: 100%;
    min-width: 100vw;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
  }

  #menu8-border {
    padding: 1.25vw;
  }

  #menu8-body {
    outline: 3px solid rgb(109, 197, 154);
    min-height: 95vh;
  }
</style>