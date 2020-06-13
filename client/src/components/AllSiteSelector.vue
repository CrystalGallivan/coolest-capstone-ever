<template>
  <div class="all-site-selector">
    <div class="all-site-selector-card card">
      <div class="card-content">
        <label for="#all-sites">Sites</label>
        <select
          v-model="siteId"
          @change="selectSite($event)"
          id="all-sites"
          class="form-control"
          placeholder="Owner"
          required
        >
          <option disabled value="">Choose Site</option>
          <option v-for="site in allSites" :key="site._id">{{
            site.name
          }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import mapState from "vuex";
export default {
  name: "AllSiteSelector",
  created() {
    this.$store.dispatch("getAllSites");
  },
  computed: mapState(["allSites"]),
  methods: {
    selectSite(e) {
      let site = e.target.value;
      this.$store.dispatch("selectSite", this.siteId);
    },
  },
};
</script>
<style scoped></style>
