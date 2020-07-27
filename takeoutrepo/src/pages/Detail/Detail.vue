<template>
  <div class="good">
    <van-cell-group>
      <van-cell title="收货人" :value="data.buyerName" icon="location-o" />
      <van-cell title="收货地址" :value="data.buyerAddress" />
      <van-cell title="商品金额" :value="data.orderAmount" />
      <van-cell title="联系方式" :value="data.buyerPhone" />
    </van-cell-group>

    <li v-for="item in data.food" :key="item.count">
      <van-card :num="item.count" :price="item.price" :title="item.name" />
    </li>

    <!--
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col>
          <van-icon name="location-o" style="margin-right: 30px;" />
          收货人：{{data.buyerName}}
        </van-col>
        <van-col>{{data.buyerPhone}}</van-col>

         <van-col span="21" style="padding-left: 43px;font-size: 13px">收货地址：{{data.buyerAddress}}</van-col>
      </van-cell>
    </van-cell-group>

    <li v-for="item in data.food" :key="item.count">
      <van-card :num="item.count" :price="item.price" :title="item.name" />
    
    </li>

    
    <van-cell-group class="goods-cell-group">
      <van-cell class="goods-express" style="font-weight: bold">
        <van-col span="20">商品金额</van-col>
        <van-col style="color: red">￥{{data.orderAmount*100}}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell class="goods-express" style="font-weight: bold">
        <van-col span="20">运费</van-col>
        <van-col style="color: red">￥{{data.freight}}</van-col>
      </van-cell>
    </van-cell-group>
    -->

    <van-submit-bar :price="data.orderAmount*100" button-text="确认付款" @submit="onSubmit" />
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  Card,
  Toast,
  CellGroup,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";
import axios from "axios";
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    return {
      data: {
        orderId: "1586242977480760998",
        buyerName: "小明",
        phoneName: "Honor 8A",
        payStatus: 0,
        freight: 10,
        buyerPhone: "13636363636",
        buyerAddress: "浙江省杭州市江干区789号",
        num: 1,
        specs: "32GB",
        price: "2800.00",
        icon: "../static/e84a2e03-7f19-41d2-98a5-a5c16b7e252d.jpg",
        orderAmount: 2800,

        food: [
          { name: "小米粥", price: 32, count: 3 },
          { name: "大白粥", price: 11, count: 2 }
        ]
      }
    };
  },
  created() {
    const _this = this;
    axios
      //.get("/api/order/detail/" + this.$route.query.orderId)
      .get(
        " http://139.159.144.143:8181/order/detail/" + this.$route.query.orderId
      )

      .then(function(resp) {
        _this.data = resp.data.data;
      });
  },
  methods: {
    onSubmit: function() {
      const _this = this;
      axios
        //.get("/api/order/pay/" + this.$route.query.orderId)
        .get(
          " http://139.159.144.143:8181/order/pay/" + this.$route.query.orderId
        )
        .then(function(resp) {
          if (resp.data.data.orderStatus == "1") {
            let instance = Toast("订单" + _this.data.orderId + "支付成功");
            setTimeout(() => {
              instance.close();
              _this.$router.push(
                "/success?orderId=" +
                  _this.data.orderId +
                  "&amount=" +
                  _this.data.orderAmount
              );
            }, 1000);
          } else if (resp.data.data.orderStatus == "0") {
            let instance = Toast("金额不足，请充值！！！");
            etTimeout(() => {
              instance.close();
              _this.$router.push("/profile");
            }, 1000);
          } else if (resp.data.data.orderStatus == "2") {
            let instance = Toast("已支付订单");
            etTimeout(() => {
              instance.close();
              _this.$router.push("/order");
            }, 1000);
          }
        });
    }
  }
};
</script>

<style>
</style>

