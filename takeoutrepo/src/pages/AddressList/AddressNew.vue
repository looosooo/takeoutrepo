<template>
  <van-address-edit :area-list="areaList" show-delete @save="onSave" @delete="onDelete" />
</template>

<script>
import AreaList from "../../api/area";
import { mapState } from "vuex";
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "AddressNew",
  data() {
    return {
      areaList: AreaList
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    onSave(item) {
      const _this = this;
      const { id } = _this.userInfo;
      //this.$store.state.userInfo.id
      item.id = this.$store.state.userInfo.id;
      console.log(item); //15323534562
      //axios.post("/api/address/create", item).then(function(resp) {
      axios
        .post("  http://139.159.144.143:8181/address/create", item)
        .then(function(resp) {
          if (resp.data.code == 0) {
            let instance = Toast("添加成功");
            setTimeout(() => {
              instance.close();
              _this.$router.push("/addressList");
            }, 1000);
          }
        });
    },
    onDelete() {
      history.go(-1);
    }
  }
};
</script>

<style scoped>
</style>