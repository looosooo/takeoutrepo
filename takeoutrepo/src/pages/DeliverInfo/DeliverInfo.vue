<template>
  <div class="goods">
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col span="16">
          <van-icon name="location-o" style="margin-right: 30px;" />
          配送员：{{data.username}}
        </van-col>
        <van-col>联系方式：{{data.mobile}}</van-col>
        <van-col>目前地址：{{data.address}}</van-col>
      </van-cell>
    </van-cell-group>

    <van-button size="mini" type="primary" to="/order">返回</van-button>
  </div>
</template>

<script>
import axios from "axios";
import {
  Tag,
  Col,
  Icon,
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
      //.get("/api/deliver/clientInfo/" + this.$route.query.orderId)
      .get(
        "http://139.159.144.143:8181/deliver/clientInfo/" +
          this.$route.query.orderId
      )

      .then(function(resp) {
        _this.data = resp.data.data;
      });
  },
  data() {
    return {
      data: {
        username: "小明",
        mobile: "13636363636",
        address: "重庆市"
      }
    };
  }
};
</script>