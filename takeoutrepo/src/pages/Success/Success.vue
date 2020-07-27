<template>
  <div>
    <van-image width="100" height="100" :src="imgUrl" />
    <van-cell :title="amount" />
    <van-cell-group class="goods-cell-group">
      <van-cell class="goods-express">
        <van-col span="21">配送方式</van-col>
        <van-col>渝乐外卖</van-col>
      </van-cell>
    </van-cell-group>
    <van-button type="primary" size="large" @click="showInfo">查看订单</van-button>
  </div>
</template>

<script>
export default {
  name: "Success",
  data() {
    return {
      orderId: null,
      amount: null,
      imgUrl: require("../../common/imgs/paysuccess.png")
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.amount = this.$route.query.amount;
  },
  methods: {
    showInfo() {
      this.$router.push("/Order");
      // this.$router.push("/info?orderId=" + this.orderId);
    }
  }
};
</script>

<style scoped>
</style>