<template>
  <section class="order">
    <HeaderTop title="订单列表" />
    <!--<section class="order_no_login">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
    -->
    <section class="order_no_login">
      <li v-for="item in list" :key="item.buyername">
        <van-card :price="item.orderamount" :desc="item.buyername" :title="item.shopname">
          <template #tags>
            <van-tag plain type="danger" v-if="item.getstatus != '0'">已接单</van-tag>
            <van-tag plain type="danger" v-if="item.finishstatus != '0'">已完成</van-tag>
          </template>
          <template #footer>
            <van-button
              size="mini"
              v-show="item.getstatus != '0'"
              @click="showDeliverInfo(item.orderid)"
            >查看配送信息</van-button>
            <van-button size="mini" @click="showinfo(item.orderid)">查看订单详情</van-button>
            <van-button
              size="mini"
              v-show="item.finishstatus != '1'"
              @click="changeDeliverOrder(item.orderid)"
            >确认收货</van-button>
          </template>
        </van-card>
        <van-divider />
      </li>
    </section>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { MessageBox, Toast, Divider } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      showflag: true
    };
  },

  components: {
    HeaderTop
  },
  created() {
    const _this = this;
    const userid = _this.$store.state.userInfo.id;
    axios
      // .get("/api/order/list", {
      .get("http://139.159.144.143:8181/order/list", {
        params: {
          id: userid
        }
      })
      .then(function(resp) {
        _this.list = resp.data.data;
      });
  },
  methods: {
    showDeliverInfo(orderid) {
      this.$router.push("/deliverinfo?orderId=" + orderid);
    },
    showinfo(orderid) {
      this.$router.replace("/info?orderId=" + orderid);
    },
    changeDeliverOrder(orderid) {
      const _this = this;
      MessageBox.confirm("确认收货?").then(
        action => {
          axios
            //.get("/api/deliverOrder/change", {
            .get(" http://139.159.144.143:8181/deliverOrder/change", {
              params: {
                id: orderid
              }
            })
            .then(function(resp) {
              console.log(resp.data);
              if (resp.data.code === 0) {
                axios
                  //.get("/api/deliverOrder/finish", {
                  .get("http://139.159.144.143:8181/deliverOrder/finish", {
                    params: {
                      id: orderid
                    }
                  })
                  .then(function(resp) {
                    if (resp.data.code === 0) {
                      _this.$router.push("/comment?orderId=" + orderid);
                    }
                  });
              }
            });
        },
        action => {
          console.log("点击了取消");
        }
      );
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.order { // 订单
  width: 100%;

  .header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 25px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;
      }
    }
  }

  .order_no_login {
    padding-top: 50px;
    width: 100%;
    margin: 0 auto;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>
