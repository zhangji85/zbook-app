<template>
    <div class="main">
      <van-sticky>
        <van-nav-bar
          :title="name"
          left-arrow
          @click-left="onClickLeft"
        />
      </van-sticky>
      <Doclist :pageflag.sync="pageflag" userid="share" :condition="name" :bottomshow="true"></Doclist>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Col, Row } from 'vant';
  import Doclist from "../../components/Doclist";

  Vue.use(Col);
  Vue.use(Row);
    export default {
        name: "classdetails",
        components:{
          Doclist
        },
        data(){
            return{
              name:'',
              list:[],
              loading: false,
              finished: false,
              refreshing: false,
              pageflag:true,
              parflag:false,
            }
        },
        created() {
          var location = this.$route.query;
          this.name = location.name;
        },
        methods:{
          onLoad() {
            setTimeout(() => {
              if (this.refreshing) {
                this.list = [];
                this.refreshing = false;
              }

              for (let i = 0; i < 6; i++) {
                this.list.push(this.list.length + 1);
              }
              this.loading = false;

              if (this.list.length >= 6) {
                this.finished = true;
              }
            }, 1000);
          },
          onRefresh() {
            // 清空列表数据
            this.list = [];
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
          },
          onClickLeft() {
            this.$router.go(-1);
          },
        },
    }
</script>

<style scoped>
  .main{
    position: relative;
  }
  .row{
    padding-top: 5px;
  }
  .goods-card{
    padding: 5px;
    margin-bottom: 5px;
  }
  .col-left{
    font-size: 20px;
    font-weight: bolder;
    padding-left: 15px;
  }
</style>
