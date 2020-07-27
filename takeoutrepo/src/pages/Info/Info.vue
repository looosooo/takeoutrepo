<template>
  <div class="good">
    <!--<van-cell-group>
      <van-cell title="收货人" :value="data.buyerName" icon="location-o" />
      <van-cell title="收货地址" :value="data.buyerAddress" />
      <van-cell title="商品金额" :value="data.orderAmount" />
      <van-cell title="联系方式" :value="data.buyerPhone" />
    </van-cell-group>
    -->
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col span="16">
          <van-icon name="location-o" style="margin-right: 30px;" />
          商家地址：{{data.shopAddress}}
        </van-col>
        <van-col>联系方式：{{data.shopPhone}}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell class="goods-express">
        <van-col span="21">配送方式</van-col>
        <van-col>渝乐外卖</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell class="goods-express">
        <van-col span="21">收货地址</van-col>
        <van-col>{{data.buyerAddress}}</van-col>
      </van-cell>
    </van-cell-group>

    <li>
      <van-cell-group class="goods-cell-group">
        <van-cell class="goods-express" style="font-weight: bold">
          <van-col span="20">商品金额</van-col>
          <van-col style="color: red">￥{{data.orderAmount }}</van-col>
        </van-cell>
      </van-cell-group>
    </li>
    <li v-for="item in data.food" :key="item.count">
      <van-card :num="item.count" :price="item.price" :title="item.name" />
    </li>

    <van-button type="primary" to="/order">返回</van-button>
  </div>
</template>

<script>
import axios from "axios";
import {
  Tag,
  Col,
  Icon,
  Card,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from "vant";
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
  created() {
    const _this = this;
    axios
      //.get("/api/order/detail/" + this.$route.query.orderId)
      .get(
        "http://139.159.144.143:8181/order/detail/" + this.$route.query.orderId
      )
      .then(function(resp) {
        _this.data = resp.data.data;
      });
  },
  data() {
    return {
      data: {
        orderId: "1586242977480760998",
        buyerName: "小明",
        phoneName: "Honor 8A",
        payStatus: 1,
        freight: 10,
        tel: "13636363636",
        address: "浙江省杭州市江干区789号",
        num: 1,
        specs: "32GB",
        price: "2800.00.00",
        icon: "../static/e84a2e03-7f19-41d2-98a5-a5c16b7e252d.jpg",
        amount: 2800
      }
    };
  },
  methods: {
    payStatusTrans(status) {
      if (status == 1) return "已支付";
      if (status == 0) return "未支付";
    }
  }
};
</script>