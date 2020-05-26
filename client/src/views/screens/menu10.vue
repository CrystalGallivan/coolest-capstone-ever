<template>
  <div class="menu10">
    <div id="menu10-border">
      <div v-show="signIsScheduled == true" class="container-fluid" id="menu10-body" @click="openFullscreen">
        <div class="row" id="header-title-row">
          <div class="col-2" id="logo-col">
            <img src="@/assets/c17cSoupP353C1080px.png" id="hr-icon" alt="">
          </div>
          <div class="col-19" id="header-col">
            <p id="head-title">{{sign.category}}</p>
            <p id="head-subtitle">{{sign.subTitle}}</p>
          </div>
          <div class="row" id="hr-row">
            <div class="col-10 offset-2">
              <hr id="header-line">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6" v-for="menuItem in menuItems" :key="menuItem._id">
            <div v-show="isScheduled == true || menuItem.hide == false" id="menu-item">
              <p id="menu-item-name">{{menuItem.name}}</p>
              <p id="menu-item-calories"> Calories: {{menuItem.calories}}</p>
              <p id="menu-item-description">{{menuItem.description}}</p>
              <p id="menu-item-contains">Contains: {{menuItem.protein}} /</p>
              <p v-if="a.checked == true" id="menu-item-contains" v-for="a in menuItem.allergens" :key="a._id">
                {{a.allergen}},</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Menu10",
    data() {
      return {
        backgroundImage: "../assets/tile-bkg-teal.jpg",
        elem: document.documentElement,
        isScheduled: false,
        // menuItemsOfTheDay: []
        // signIsScheduled: false,
      }
    },
    mounted() {
      this.$store.dispatch("getSignTemplate", "Soup")
      this.timer()
    },
    computed: {
      kitchenId() {
        return this.$store.state.kitchenId
      },
      signs() {
        return this.$store.state.signs
      },
      sign() {
        return this.$store.state.activeSign
      },
      menuItems() {
        // return this.$store.state.activeSign.menuItem
        // if (this.sign._id) {
        return this.$store.state.menuItemsOfTheDay
        // }
      },
      signIsScheduled() {
        return this.$store.state.signIsScheduled
      }
    },
    methods: {

      openFullscreen() {
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) { /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) { /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
      },
      timer() {
        setInterval(this.currentDate, 20000)
        setInterval(this.getMenuItems, 3000)
      },
      currentDate() {
        if (this.sign._id) {
          return this.$store.dispatch('scheduled')
        }
      },
      getMenuItems() {
        if (this.sign._id) {
          this.$store.dispatch("scheduledMenuItems")
        }
      },
    }
  }
</script>
<style scoped>
  .menu10 {
    background-color: rgb(5, 38, 45);
    background-image: url(https://attachments.office.net/owa/cgallivan%40thomascuisine.com/service.svc/s/GetAttachmentThumbnail?id=AQMkADY5NWY2MzcyLTNkNWEtNDhhYy1hMGU5LTA1NGE4NWEzZTEyYgBGAAADQ41M20%2FLuE6h1uU7yimvLgcABbZ%2BdG83EkeHQSPpgftjHAAAAgEJAAAABbZ%2BdG83EkeHQSPpgftjHAABwTC37wAAAAESABAAyA9P7rDtB0uLNr%2FsqtPrYg%3D%3D&thumbnailType=2&owa=outlook.office.com&scriptVer=2020020301.19&X-OWA-CANARY=RLOnevfcekCTBwHpHBbzUvCIkom9rtcYEFSw5CeaEaIC_fjn1kZyfHZtuANqmLyl5ctQTopkZ5s.&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2MzU4ODUyMzRCOTI1MkRERTAwNTc2NkQ5RDlGMjc2NTY1RjYzRTIiLCJ4NXQiOiJWaldJVWpTNUpTM2VBRmRtMmRueWRsWmZZLUkiLCJ0eXAiOiJKV1QifQ.eyJvcmlnaW4iOiJodHRwczovL291dGxvb2sub2ZmaWNlLmNvbSIsInZlciI6IkV4Y2hhbmdlLkNhbGxiYWNrLlYxIiwiYXBwY3R4c2VuZGVyIjoiT3dhRG93bmxvYWRAZmRlZGVlM2YtYTJlMS00NWRkLWExYWEtZmM0M2JjOGRlN2ZkIiwiaXNzcmluZyI6IldXIiwiYXBwY3R4Ijoie1wibXNleGNocHJvdFwiOlwib3dhXCIsXCJwcmltYXJ5c2lkXCI6XCJTLTEtNS0yMS0zMzg2MjEyOTIxLTI3MjY1MTU1MTctMTE0MDkxOTAxMC0zODQ0NTUzXCIsXCJwdWlkXCI6XCIxMTUzODM2Mjk2ODMzNDUxNTUxXCIsXCJvaWRcIjpcIjcxNjU1MDc4LWQyMjctNDIwMC1hZWIyLTgzOTdlNGNlZGU0MFwiLFwic2NvcGVcIjpcIk93YURvd25sb2FkXCJ9IiwibmJmIjoxNTgxNDAzMjc4LCJleHAiOjE1ODE0MDM4NzgsImlzcyI6IjAwMDAwMDAyLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQiLCJhdWQiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXR0YWNobWVudHMub2ZmaWNlLm5ldEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQifQ.fnN0pjmqPKM1gLVI7_9Da2FyqGrcp92rCjy_V9VVhEMffmJktpbahs3uVdJqO17FewNH03h_j4Bl_BOPz-oYW-fUg82Aw_UG5Z0NBfEt8WiGbAmNJqUucGE5FO9tWI05Ak5EM_y4U4qu5H3m__QYli1y6xc7Lt4uOkBgYEtR-OkSV7jCUEKrqriO3bzcC6hBo7fdD_3mkKP7lSSRU3i1sLrzLutk9LSuf0Pd1R5R06YVKMDarLh_dhwfhC5gIClSLmKbA3KXtODLxIMHPh0qrMX7N609nJXwLnyJPWN5FAcK6D8eGmdQfZ6jSGGymXsQDXju1zaQ-Uu4QUTme3pgAA&animation=true);
    background-size: 100%;
    background-repeat: inherit;
    /* background-image: require('../assets/tile-bkg-teal.jpg'); */
    margin-top: -8vh;
    max-width: 100%;
    max-height: 100%;
  }

  #menu10-border {
    padding: 1.25vw;
  }

  #menu10-body {
    outline: 3px solid rgb(109, 197, 154);
    padding-bottom: 3vh;


  }

  #head-title {
    color: rgb(109, 197, 154);
    text-align: left;
  }

  #head-title,
  #head-subtitle {
    display: inline;
  }

  #head-subtitle {
    font-family: 'PT Sans Narrow', sans-serif;
    font-size: 2.5vw;
    /* font-weight: bold; */
  }

  #head-title {
    font-size: 7vw;
    font-family: 'PT Sans Narrow', sans-serif;
    font-style: bold;
    margin-bottom: -1%;
    margin-top: 2%;
    margin-right: 37vw;
  }

  #logo-cal {
    padding: 0px;
  }



  #hr-row {
    height: 100%;
    width: 100%;
  }

  #hr-icon {
    max-width: 100%;
    max-height: 100%;
    padding: 0px;

  }

  #header-col {
    padding: 0px;
    display: flex;
    align-items: baseline;
  }

  #header-line {
    height: 0px;
    margin-top: -25px;
    margin-bottom: 10px;
    border: 0;
    border-top: 3px solid whitesmoke;
  }

  #menu-item {
    font-family: 'Open Sans', sans-serif;
    margin: .5vw;
    padding: .5vw;
    max-width: 100%;
    max-height: 100%;
  }

  #menu-item-name {
    font-size: 2.5vw;
    color: rgb(109, 197, 154);
  }

  #menu-item-calories {
    font-size: 1.75vw;
    color: rgb(109, 197, 154);
  }

  #menu-item-description {
    font-size: 1.5vw;
  }

  #menu-item-contains {
    font-size: 1.25vw;
    margin: 0px;
    display: inline;
    font-weight: bold;
  }
</style>