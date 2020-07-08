<template>
  <div class="menu8" :id="mode">
    <div id="menu8-border">
      <div class="container-fluid" id="menu8-body" @click="openFullscreen">
        <div class="row">
          <div v-show="date.getHours() >= 10" class="col-12 grill-lunch">
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
        date: new Date(),
        mode: "cafe17c"
      };
    },
    mounted() {
      this.checkRouter()
      this.toggleTheme()
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
      async checkRouter() {
        if (this.$router.currentRoute.path == "/menu8/cafe-17c") {
          this.kitchenName = "Cafe 17C";
          this.mode = "cafe17c"
        } else if (this.$router.currentRoute.path == "/menu8/cafe-36") {
          this.kitchenName = "Cafe 36";
          this.mode = "cafe36"
        }
      },
      toggleTheme() {
        this.mode = this.mode === 'cafe17c' ? 'cafe17c' : 'cafe36'
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
  #cafe17c {
    --cafe-font-color: rgb(109, 197, 154);
    --cafe-outline: 3px solid rgb(109, 197, 154);
  }

  #cafe36 {
    --cafe-font-color: rgb(246, 192, 14);
    --cafe-outline: 3px solid rgb(246, 192, 14);
  }

  #menu8-body {
    outline: var(--cafe-outline)
  }

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
    min-height: 95vh;
  }
</style>