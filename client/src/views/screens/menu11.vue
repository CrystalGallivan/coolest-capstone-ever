<template>
  <div class="menu11" id="menu11">
    <loading v-if="loading == true" />
    <div v-else id="menu11-border">
      <div class="container-fluid" id="menu11-body" @click="openFullscreen">
        <div class="row" id="header-title">
          <div class="col-2" id="logo-col">
            <img src="@/assets/c36TacoP7408CP1080px.png" id="hr-icon" alt="" />
          </div>
          <div class="col-9">
            <p id="head-title">{{ activeSign.title }}</p>
            <hr id="header-line" />
          </div>
        </div>
        <div class="row" id="price-option">
          <div
            class="col-3 offset-1"
            v-for="menuOption in menuOptions"
            :key="menuOption._id"
          >
            <ul>
              <p id="price">
                {{ menuOption.menuOptionTitle }}
              </p>
              <li id="price-option" v-html="menuOption.description"></li>
            </ul>
          </div>
        </div>
        <div class="row" id="wednesday-option">
          <div class="col-12">
            <p id="wednesday-option-title">
              Every Wednesday - Crisp Taco Salad Shells
            </p>
          </div>
        </div>
        <div class="row" id="body-content">
          <div class="col-4" id="options-1">
            <div class="row">
              <div class="col">
                <p id="options-title">BASE / Calories / Portion</p>
              </div>
            </div>
            <ul id="end-of-option">
              <li
                v-if="baseMenuItems.length > 0"
                id="options-list-item"
                v-for="baseMenuItem in baseMenuItems.splice(0, 3)"
                :key="baseMenuItem._id"
              >
                {{ baseMenuItem.name }} / {{ baseMenuItem.calories }} /
                {{ baseMenuItem.portionSize }}
              </li>
            </ul>
            <ul id="end-of-option">
              <li
                v-if="baseMenuItems.length > 0"
                id="options-list-item"
                v-for="baseMenuItem in baseMenuItems.splice(0, 2)"
                :key="baseMenuItem._id"
              >
                {{ baseMenuItem.name }} / {{ baseMenuItem.calories }} /
                {{ baseMenuItem.portionSize }}
              </li>
            </ul>
            <ul id="end-of-option">
              <li
                id="options-list-item"
                v-for="baseMenuItem in baseMenuItems.splice(0, 2)"
                :key="baseMenuItem._id"
              >
                {{ baseMenuItem.name }} / {{ baseMenuItem.calories }} /
                {{ baseMenuItem.portionSize }}
              </li>
            </ul>
          </div>
          <div class="col-4" id="options-2">
            <p id="options-title">PROTEIN / calories/ portion</p>
            <ul
              v-if="proteinMenuItems.length > 0"
              v-for="proteinMenuItem in proteinMenuItems"
              :key="proteinMenuItem._id"
            >
              <li id="options-list-item">
                {{ proteinMenuItem.name }} / {{ proteinMenuItem.calories }} /
                {{ proteinMenuItem.portionSize }}
              </li>
              <li id="description" v-html="proteinMenuItem.description"></li>
            </ul>
          </div>
          <div class="col-4" id="options">
            <p id="options-title">TOPPINGS / calories / portion</p>
            <ul
              v-if="toppingsMenuItems.length > 0"
              v-for="toppingsMenuItem in toppingsMenuItems.slice(0, 3)"
              :key="toppingsMenuItem._id"
            >
              <li id="options-list-item">
                {{ toppingsMenuItem.name }} / {{ toppingsMenuItem.calories }} /
                {{ toppingsMenuItem.portionSize }}
              </li>
            </ul>
            <ul>
              <li
                id="add-on-option"
                v-if="addOnMenuItems.length > 0"
                v-for="addOnMenuItem in addOnMenuItems"
                :key="addOnMenuItem._id"
              >
                {{ addOnMenuItem.name }} / {{ addOnMenuItem.calories }} /
                {{ addOnMenuItem.portionSize }}
                <p id="add-on-option-price">{{ addOnMenuItem.price }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Menu11",
  data() {
    return {
      backgroundImage: "../assets/tile-bkg-teal.jpg",
      elem: document.documentElement,
      loading: false,
      isScheduled: false,
      reRender: false,
      isLoading: true,
    };
  },
  created() {
    this.$store.dispatch("getSignsByCategory", "Southwest");
  },
  mounted() {
    this.timer();
    this.timeout = setInterval(
      () => this.$store.dispatch("checkForUpdatedSign", "Southwest"),
      60000
    );
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
      "menuOptions",
      "baseMenuItems",
      "proteinMenuItems",
      "toppingsMenuItems",
      "addOnMenuItems",
    ]),
    ...mapState([
      "kitchenId",
      "signs",
      "activeSign",
      "signIsScheduled",
      "menuItemsOfTheDay",
      // "loading",
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
  },
};
</script>
<style scoped>
.menu11 {
  background-color: rgb(5, 38, 45);
  background-image: url(https://attachments.office.net/owa/cgallivan%40thomascuisine.com/service.svc/s/GetAttachmentThumbnail?id=AQMkADY5NWY2MzcyLTNkNWEtNDhhYy1hMGU5LTA1NGE4NWEzZTEyYgBGAAADQ41M20%2FLuE6h1uU7yimvLgcABbZ%2BdG83EkeHQSPpgftjHAAAAgEJAAAABbZ%2BdG83EkeHQSPpgftjHAABwTC37wAAAAESABAAyA9P7rDtB0uLNr%2FsqtPrYg%3D%3D&thumbnailType=2&owa=outlook.office.com&scriptVer=2020020301.19&X-OWA-CANARY=RLOnevfcekCTBwHpHBbzUvCIkom9rtcYEFSw5CeaEaIC_fjn1kZyfHZtuANqmLyl5ctQTopkZ5s.&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2MzU4ODUyMzRCOTI1MkRERTAwNTc2NkQ5RDlGMjc2NTY1RjYzRTIiLCJ4NXQiOiJWaldJVWpTNUpTM2VBRmRtMmRueWRsWmZZLUkiLCJ0eXAiOiJKV1QifQ.eyJvcmlnaW4iOiJodHRwczovL291dGxvb2sub2ZmaWNlLmNvbSIsInZlciI6IkV4Y2hhbmdlLkNhbGxiYWNrLlYxIiwiYXBwY3R4c2VuZGVyIjoiT3dhRG93bmxvYWRAZmRlZGVlM2YtYTJlMS00NWRkLWExYWEtZmM0M2JjOGRlN2ZkIiwiaXNzcmluZyI6IldXIiwiYXBwY3R4Ijoie1wibXNleGNocHJvdFwiOlwib3dhXCIsXCJwcmltYXJ5c2lkXCI6XCJTLTEtNS0yMS0zMzg2MjEyOTIxLTI3MjY1MTU1MTctMTE0MDkxOTAxMC0zODQ0NTUzXCIsXCJwdWlkXCI6XCIxMTUzODM2Mjk2ODMzNDUxNTUxXCIsXCJvaWRcIjpcIjcxNjU1MDc4LWQyMjctNDIwMC1hZWIyLTgzOTdlNGNlZGU0MFwiLFwic2NvcGVcIjpcIk93YURvd25sb2FkXCJ9IiwibmJmIjoxNTgxNDAzMjc4LCJleHAiOjE1ODE0MDM4NzgsImlzcyI6IjAwMDAwMDAyLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQiLCJhdWQiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXR0YWNobWVudHMub2ZmaWNlLm5ldEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQifQ.fnN0pjmqPKM1gLVI7_9Da2FyqGrcp92rCjy_V9VVhEMffmJktpbahs3uVdJqO17FewNH03h_j4Bl_BOPz-oYW-fUg82Aw_UG5Z0NBfEt8WiGbAmNJqUucGE5FO9tWI05Ak5EM_y4U4qu5H3m__QYli1y6xc7Lt4uOkBgYEtR-OkSV7jCUEKrqriO3bzcC6hBo7fdD_3mkKP7lSSRU3i1sLrzLutk9LSuf0Pd1R5R06YVKMDarLh_dhwfhC5gIClSLmKbA3KXtODLxIMHPh0qrMX7N609nJXwLnyJPWN5FAcK6D8eGmdQfZ6jSGGymXsQDXju1zaQ-Uu4QUTme3pgAA&animation=true);
  background-size: 100%;
  background-repeat: inherit;
  margin-top: -11vh;
  padding-top: 3vh;
  max-width: 100%;
  max-height: 100%;
}

#menu11-border {
  padding: 1.25vw;
}

#menu11-body {
  outline: 3px solid rgb(246, 192, 14);
  padding-bottom: 3vh;
}

ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

#title,
#head-title {
  color: rgb(246, 192, 14);
  text-align: left;
}

#head-title {
  font-size: 7vw;
  font-family: "Open Sans", sans-serif;
  margin-bottom: -1%;
  margin-top: 2%;
}

#add-on-option {
  margin-top: 50px;
}

#description {
  margin-bottom: 25px;
  font-size: 1.5vw;
}

#end-of-option {
  margin-bottom: 25px;
}

#wednesday-option-title {
  outline: 1px solid rgb(65, 113, 156);
  padding: 5px;
  margin: 10px;
  font-size: 1.5vw;
  color: rgb(246, 192, 14);
}

#bcp-col {
  margin-right: -10px;
  margin-left: -10px;
  padding: 0px;
}

#options-title,
#add-on-option-price {
  color: rgb(246, 192, 14);
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.5vw;
}

#hr-icon {
  max-width: 95%;
  max-height: 95%;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
}

#header-line {
  height: 0px;
  margin-top: 1px;
  margin-bottom: 10px;
  border: 0;
  border-top: 3px solid whitesmoke;
}
p {
  margin-bottom: 0px;
}
#options-list-item,
#description,
#end-of-option,
#price-option,
#add-on-option {
  font-size: 1.25vw;
}

#price {
  font-size: 1.5vw;
}
</style>
