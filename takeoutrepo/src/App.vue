<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";

export default {
  data() {
    return {
      position: {
        longitude: 29.57337,
        latitude: 106.46615
      }
    };
  },
  mounted() {
    this.getUserInfo();
    this.getAddress(this.position.latitude + "," + this.position.longitude);
    // this.$store.dispatch('getAddress')
    /*document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      console.log("cordova is ready");
    }
    this.getUserInfo();
    this.getposition(1);
    this.getAddress(this.position.latitude + "," + this.position.longitude);
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.getposition(1);
        this.getAddress(this.position.latitude + "," + this.position.longitude);
        console.log(this.position.latitude + "," + this.position.longitude);
      }, 10000);
    }

    this.destroyed = function() {
      clearInterval(this.timer);
    };
    */
  },

  methods: {
    ...mapActions(["getAddress", "getUserInfo"]),

    getposition: function(val) {
      var me = this;
      var onSuccess = function(position) {
        me.position.latitude = position.coords.latitude;
        me.position.longitude = position.coords.longitude;
      };

      // onError Callback receives a PositionError object
      //
      var error = function(error) {
        me.getposition.longitude = error.code;
      };
      navigator.geolocation.getCurrentPosition(onSuccess, error, {
        maximumAge: 30000,
        timeout: 30000,
        enableHighAccuracy: val
      });
    }
  },

  components: {
    FooterGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>