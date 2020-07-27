<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onselect"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      chosenAddressId: 0,
      list: ""
    };
  },
  created() {
    const _this = this;
    const userid = _this.$store.state.userInfo.id;
    axios
      //.get("/api/address/list", {
      .get("http://139.159.144.143:8181/address/list", {
        params: {
          id: userid
        }
      })
      .then(function(resp) {
        _this.list = resp.data.data;
      });
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["cartFoods", "info"])
  },
  methods: {
    onAdd() {
      this.$router.push("/addressNew");
    },
    onEdit(item) {
      let data = JSON.stringify(item);
      this.$router.push({ path: "/addressEdit", query: { item: data } });
    },
    onselect(item) {
      const shopname = this.$store.state.info.name;
      const uid = this.$store.state.userInfo.id;
      const cartfoods = this.$store.state.cartFoods;
      console.log(cartfoods[0].name);
      var foods = new Array();

      //var count=0;
      var num = 0;
      while (cartfoods[num]) {
        var food = {};
        food.name = cartfoods[num].name;
        food.count = cartfoods[num].count;
        food.price = cartfoods[num].price;
        foods[num] = food;
        num++;
      }

      let orderForm = {
        shopname: shopname,
        name: item.name,
        tel: item.tel,
        userid: uid,
        address: item.address,
        //specsId: this.$store.state.specsId,
        //quantity: this.$store.state.quantity,
        cartFoods: foods
      };
      const _this = this;
      // axios.post("/api/order/create", orderForm).then(function(resp) {
      axios
        .post("http://139.159.144.143:8181/order/create", orderForm)
        .then(function(resp) {
          console.log(resp.data.code);
          if (resp.data.code === 0) {
            let instance = Toast("下单成功");
            setTimeout(() => {
              instance.close();
              _this.$router.push("/detail?orderId=" + resp.data.data.orderId);
            }, 1000);
          }
        });
    }
  }
};
</script>