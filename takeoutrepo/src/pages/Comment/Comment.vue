<template>
  <div class="main fuwupingjia">
    <h5>服务评价页面</h5>
    <div class="fuWuPingJia">
      <van-rate v-model="value" :size="25" :readonly="false" @change="pingJIa" />
      <span class="neiRong">{{ pingJia }}</span>
      <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="请输入您宝贵的建议。"
          rows="1"
          :autosize="true"
          clearable
          maxlength="150"
        />
      </van-cell-group>
      <!-- 评价提交按钮 -->
      <van-button type="info" @click="tiJiaoPingJia">提交评价</van-button>
    </div>
  </div>
</template>


<script>
import { Button, Toast, Rate, Field, CellGroup, Notify } from "vant";
import axios from "axios";
import { log } from "util";
import { mapState } from "vuex";

export default {
  components: {
    "van-button": Button,
    Toast: Toast,
    "van-rate": Rate,
    "van-cell-group": CellGroup,
    "van-field": Field,
    Notify
  },
  data() {
    return {
      // 服务评价分数
      value: 0,
      //   文字评价信息
      message: "",
      pingJia: "请你作出评价"
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },

  methods: {
    //   评价分值变化触发
    pingJIa() {
      if (this.value && this.value === 1) {
        this.pingJia = "较差";
      } else if (this.value && this.value === 2) {
        this.pingJia = "差";
      } else if (this.value && this.value === 3) {
        this.pingJia = "一般";
      } else if (this.value && this.value === 4) {
        this.pingJia = "满意";
      } else if (this.value && this.value === 5) {
        this.pingJia = "非常满意";
      }
      console.log(111111);
    },
    tiJiaoPingJia() {
      if (!this.value)
        return Notify({
          message: "请您作出评价",
          duration: 1000,
          background: "#f44"
        });

      Toast.success("感谢您的评价！");
      const _this = this;
      let from = {
        value: _this.value,
        message: _this.message,
        orderid: _this.$route.query.orderId,
        userid: _this.$store.state.userInfo.id
      };
      //axios.post("/api/order/comment/", from).then(function(resp) {
      axios
        .post("http://139.159.144.143:8181/order/comment/", from)
        .then(function(resp) {
          _this.data = resp.data.data;
          _this.$router.push("/profile");
        });
    }
  }
};
</script>

<style scoped>
.main,
body {
  background-color: #efeff4 !important;
  font-size: 14px;
}
.fuWuPingJia {
  position: relative;
  width: 100%;
  padding: 20px;
  background-color: #fff;
}
.fuwupingjia .van-button {
  margin-top: 50px;
}
.fuwupingjia .van-cell {
  height: 200px;
  background-color: #efeff4;
  font-size: 14px;
}
.van-button--info {
  border: 1px;
}
.fuWuPingJia .neiRong {
  position: absolute;
  top: 20px;
  left: 175px;
  width: 30%;
  height: 30px;
  /* background-color: pink; */
}
.neiRong {
  font-size: 14px;
  color: rgb(255, 210, 30);
}
</style>
