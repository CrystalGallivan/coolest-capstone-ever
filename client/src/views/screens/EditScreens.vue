<template>
  <div class="edit-screens">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <ul>
            <li v-for="sign in signs" :key="sign._id" :signId="sign._id">
              <div class="row" id="selected-sign">
                <div class="col-6" id="sign-title">
                  <p>{{sign.title}}</p>
                </div>
                <div class="col-6" id="sign-subtitle">
                  <p>{{sign.subTitle}}</p>
                  <edit-sign :sign="sign" :signId="sign._id" />
                </div>
              </div>
              <menu-item :signId="sign._id" :menuItems="sign.menuItem" :sign="sign" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MenuItem from '@/components/MenuItem.vue'
  import EditSign from '@/components/EditSign.vue'
  export default {
    name: "EditScreens",
    props: {
      signId: String,
      menuItems: Array,
      sign: Object
    },
    data() {
      return {
        backgroundImage: "@/assets/tile-bkg-teal.jpg"
      }
    },
    created() {
      this.$store.dispatch("getAllSigns")
    },
    computed: {
      signs() {
        return this.$store.state.signs
      },
    },
    methods: {

    },
    components: {
      MenuItem,
      EditSign
    }
  }
</script>
<style scoped>
  .edit-screens {
    background-image: url(https://attachments.office.net/owa/cgallivan%40thomascuisine.com/service.svc/s/GetAttachmentThumbnail?id=AQMkADY5NWY2MzcyLTNkNWEtNDhhYy1hMGU5LTA1NGE4NWEzZTEyYgBGAAADQ41M20%2FLuE6h1uU7yimvLgcABbZ%2BdG83EkeHQSPpgftjHAAAAgEJAAAABbZ%2BdG83EkeHQSPpgftjHAABwTC37wAAAAESABAAyA9P7rDtB0uLNr%2FsqtPrYg%3D%3D&thumbnailType=2&owa=outlook.office.com&scriptVer=2020020301.19&X-OWA-CANARY=RLOnevfcekCTBwHpHBbzUvCIkom9rtcYEFSw5CeaEaIC_fjn1kZyfHZtuANqmLyl5ctQTopkZ5s.&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2MzU4ODUyMzRCOTI1MkRERTAwNTc2NkQ5RDlGMjc2NTY1RjYzRTIiLCJ4NXQiOiJWaldJVWpTNUpTM2VBRmRtMmRueWRsWmZZLUkiLCJ0eXAiOiJKV1QifQ.eyJvcmlnaW4iOiJodHRwczovL291dGxvb2sub2ZmaWNlLmNvbSIsInZlciI6IkV4Y2hhbmdlLkNhbGxiYWNrLlYxIiwiYXBwY3R4c2VuZGVyIjoiT3dhRG93bmxvYWRAZmRlZGVlM2YtYTJlMS00NWRkLWExYWEtZmM0M2JjOGRlN2ZkIiwiaXNzcmluZyI6IldXIiwiYXBwY3R4Ijoie1wibXNleGNocHJvdFwiOlwib3dhXCIsXCJwcmltYXJ5c2lkXCI6XCJTLTEtNS0yMS0zMzg2MjEyOTIxLTI3MjY1MTU1MTctMTE0MDkxOTAxMC0zODQ0NTUzXCIsXCJwdWlkXCI6XCIxMTUzODM2Mjk2ODMzNDUxNTUxXCIsXCJvaWRcIjpcIjcxNjU1MDc4LWQyMjctNDIwMC1hZWIyLTgzOTdlNGNlZGU0MFwiLFwic2NvcGVcIjpcIk93YURvd25sb2FkXCJ9IiwibmJmIjoxNTgxNDAzMjc4LCJleHAiOjE1ODE0MDM4NzgsImlzcyI6IjAwMDAwMDAyLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQiLCJhdWQiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXR0YWNobWVudHMub2ZmaWNlLm5ldEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQifQ.fnN0pjmqPKM1gLVI7_9Da2FyqGrcp92rCjy_V9VVhEMffmJktpbahs3uVdJqO17FewNH03h_j4Bl_BOPz-oYW-fUg82Aw_UG5Z0NBfEt8WiGbAmNJqUucGE5FO9tWI05Ak5EM_y4U4qu5H3m__QYli1y6xc7Lt4uOkBgYEtR-OkSV7jCUEKrqriO3bzcC6hBo7fdD_3mkKP7lSSRU3i1sLrzLutk9LSuf0Pd1R5R06YVKMDarLh_dhwfhC5gIClSLmKbA3KXtODLxIMHPh0qrMX7N609nJXwLnyJPWN5FAcK6D8eGmdQfZ6jSGGymXsQDXju1zaQ-Uu4QUTme3pgAA&animation=true);
    /* background-image: src("../src/assets/tile-bkg-teal.jpg"); */
    background-attachment: fixed;
    background-size: contain;
    background-size: cover;
    background-repeat: no-repeat;
  }

  #sign-title,
  #sign-subtitle {
    padding: 0px;
    margin: 0px;
  }

  #sign-title {
    color: rgb(109, 197, 164);
    font-size: 6.5vw;
    font-family: Lobster, cursive;
    display: flex;
    align-items: flex-start;
  }

  /* #selected-sign :hover {
    outline: 4px solid rgb(109, 197, 154);
  } */

  #sign-subtitle {
    color: whitesmoke;
    font-size: 4vw;
    display: flex;
    align-items: flex-end;
  }
</style>