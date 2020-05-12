<template>
  <div class="menu11" id="menu11">
    <div id="menu11-border">
      <div class="container-fluid" id="menu11-body" @click="openFullscreen">
        <div class="row" id="header-title">
          <div class="col-2" id="logo-col">
            <img src="@/assets/southwestlogo.png" id="hr-icon" alt="">
          </div>
          <div class="col-9">
            <p id="head-title">Southwest</p>
            <hr id="header-line">
          </div>
        </div>
        <div class="row" id="price-option">
          <div class="col-3 offset-1">
            <ul>
              <p id="price">$6.75</p>
              <li id="price-option">Burrito</li>
              <li id="price-option">Burrito Bowl</li>
              <li id="price-option">Salad</li>
              <li id="price-option">3 Soft Tacos</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <p id="price">$5.25</p>
              <li id="price-option">Smaller Burrito</li>
              <li id="price-option">Smaller Bowl</li>
              <li id="price-option">Smaller Salad</li>
            </ul>
          </div>
          <div class="col-3">
            <ul>
              <p id="price">$2.25</p>
              <li id="price-option">Crisp Taco</li>
              <li id="price-option">Soft Taco</li>
            </ul>
          </div>
        </div>
        <div class="row" id="wednesday-option">
          <div class="col-12">
            <p id="wednesday-option-title">Every Wednesday - Crisp Taco Salad Shells</p>
          </div>
        </div>
        <div class="row" id="body-content">
          <div class="col-4" id="options-1">
            <div class="row">
              <div class="col">
                <p id="options-title">BASE / Calories / Portion</p>
              </div>
            </div>
            <ul>
              <li id="options-list-item">12” flour tortilla / 270 / 1 tortilla</li>
              <li id="options-list-item">10” flour tortilla / 218 / 1 tortilla</li>
              <li id="end-of-option">Romaine lettuce / 50 / 1 cup</li>
            </ul>
            <ul>
              <li id="options-list-item">Crisp corn taco / 50 / 1 tortilla</li>
              <li id="end-of-option">Soft flour taco / 55 / 1 tortilla</li>
            </ul>
            <ul>
              <li id="options-list-item">Cilantro rice / 200 / ½ cup</li>
              <li id="end-of-option">Pinto beans / 200 / ½ cup</li>
            </ul>
          </div>
          <div class="col-4" id="options-2">
            <p id="options-title">PROTEIN / calories/ portion</p>
            <ul>
              <li id="options-list-item">Chicken tinga / 400 / 5 oz</li>
              <li id="description">Chicken thigh, tomato, onion, cilantro, garlic, cumin</li>
            </ul>
            <ul>
              <li id="options-list-item">Pork al pastor / 280 / 5 oz</li>
              <li id="description">Pork shoulder, pineapple, onion, cilantro, spices</li>
            </ul>
            <ul>
              <li id="options-list-item">Butternut squash / 80 / 5 oz</li>
              <li id="description">
                <<< VEGETARIAN <<< squash, seasonings</li>
            </ul>
          </div>
          <div class="col-4" id="options">
            <p id="options-title">TOPPINGS / calories / portion</p>
            <ul>
              <li id="options-list-item">Sour cream / 120 / 1 oz</li>
              <li id="options-list-item">Cheddar cheese / 220 / 1 oz</li>
              <li id="options-list-item">Cotija cheese / 220 / 1 oz</li>
            </ul>
            <ul>
              <li id="add-on-option">Guacamole / 170 / 1 oz</li>
              <li>
                <p id="add-on-option-price">+ 75 cents</p>
              </li>
            </ul>
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Menu11",
    data() {
      return {
        backgroundImage: "../assets/tile-bkg-teal.jpg",
        elem: document.documentElement
      }
    },
    mounted() {
      // elem = document.documentElement;
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
      }
    }
  }
</script>
<style scoped>
  .menu11 {
    background-color: rgb(5, 38, 45);
    background-image: url(https://attachments.office.net/owa/cgallivan%40thomascuisine.com/service.svc/s/GetAttachmentThumbnail?id=AQMkADY5NWY2MzcyLTNkNWEtNDhhYy1hMGU5LTA1NGE4NWEzZTEyYgBGAAADQ41M20%2FLuE6h1uU7yimvLgcABbZ%2BdG83EkeHQSPpgftjHAAAAgEJAAAABbZ%2BdG83EkeHQSPpgftjHAABwTC37wAAAAESABAAyA9P7rDtB0uLNr%2FsqtPrYg%3D%3D&thumbnailType=2&owa=outlook.office.com&scriptVer=2020020301.19&X-OWA-CANARY=RLOnevfcekCTBwHpHBbzUvCIkom9rtcYEFSw5CeaEaIC_fjn1kZyfHZtuANqmLyl5ctQTopkZ5s.&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2MzU4ODUyMzRCOTI1MkRERTAwNTc2NkQ5RDlGMjc2NTY1RjYzRTIiLCJ4NXQiOiJWaldJVWpTNUpTM2VBRmRtMmRueWRsWmZZLUkiLCJ0eXAiOiJKV1QifQ.eyJvcmlnaW4iOiJodHRwczovL291dGxvb2sub2ZmaWNlLmNvbSIsInZlciI6IkV4Y2hhbmdlLkNhbGxiYWNrLlYxIiwiYXBwY3R4c2VuZGVyIjoiT3dhRG93bmxvYWRAZmRlZGVlM2YtYTJlMS00NWRkLWExYWEtZmM0M2JjOGRlN2ZkIiwiaXNzcmluZyI6IldXIiwiYXBwY3R4Ijoie1wibXNleGNocHJvdFwiOlwib3dhXCIsXCJwcmltYXJ5c2lkXCI6XCJTLTEtNS0yMS0zMzg2MjEyOTIxLTI3MjY1MTU1MTctMTE0MDkxOTAxMC0zODQ0NTUzXCIsXCJwdWlkXCI6XCIxMTUzODM2Mjk2ODMzNDUxNTUxXCIsXCJvaWRcIjpcIjcxNjU1MDc4LWQyMjctNDIwMC1hZWIyLTgzOTdlNGNlZGU0MFwiLFwic2NvcGVcIjpcIk93YURvd25sb2FkXCJ9IiwibmJmIjoxNTgxNDAzMjc4LCJleHAiOjE1ODE0MDM4NzgsImlzcyI6IjAwMDAwMDAyLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQiLCJhdWQiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXR0YWNobWVudHMub2ZmaWNlLm5ldEBmZGVkZWUzZi1hMmUxLTQ1ZGQtYTFhYS1mYzQzYmM4ZGU3ZmQifQ.fnN0pjmqPKM1gLVI7_9Da2FyqGrcp92rCjy_V9VVhEMffmJktpbahs3uVdJqO17FewNH03h_j4Bl_BOPz-oYW-fUg82Aw_UG5Z0NBfEt8WiGbAmNJqUucGE5FO9tWI05Ak5EM_y4U4qu5H3m__QYli1y6xc7Lt4uOkBgYEtR-OkSV7jCUEKrqriO3bzcC6hBo7fdD_3mkKP7lSSRU3i1sLrzLutk9LSuf0Pd1R5R06YVKMDarLh_dhwfhC5gIClSLmKbA3KXtODLxIMHPh0qrMX7N609nJXwLnyJPWN5FAcK6D8eGmdQfZ6jSGGymXsQDXju1zaQ-Uu4QUTme3pgAA&animation=true);
    background-size: 100%;
    background-repeat: inherit;
    /* background-image: require('../assets/tile-bkg-teal.jpg'); */
    margin-top: -8vh;
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
    font-family: Arial, Helvetica, sans-serif;
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