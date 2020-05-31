<template>
  <div class="main">
<!--     <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">-->
<!--        <van-swipe-item>1</van-swipe-item>-->
<!--        <van-swipe-item>2</van-swipe-item>-->
<!--        <van-swipe-item>3</van-swipe-item>-->
<!--        <van-swipe-item>4</van-swipe-item>-->
<!--      </van-swipe>-->
<!--      <van-sticky :offset-top="50">-->
<!--        <van-search v-model="search_value" placeholder="请输入搜索关键词" />-->
<!--      </van-sticky>-->
      <van-tabs v-model="active" sticky :offset-top="45" swipeable class="tabs-box">
        <van-tab title="推荐">
          <Doclist :pageflag.sync="pageflag" :condition=" '推荐' " :bottomshow="bottomshow" :parflag.sync="parflag"></Doclist>
        </van-tab>
        <van-tab title="最新">
          <Doclist :pageflag.sync="pageflag" :condition=" '最新' " :bottomshow="bottomshow" :parflag.sync="parflag"></Doclist>
        </van-tab>
      </van-tabs>
  </div>
</template>


<script>
  import Vue from 'vue';
  import { Toast } from 'vant';
  import { Lazyload } from 'vant';
  import { Tab, Tabs } from 'vant';
  import Doclist from "../../components/Doclist";
  Vue.use(Tab);
  Vue.use(Tabs);
  Vue.use(Lazyload)
    export default {
        name: "home",
        components:{
          Doclist
        },
        data(){
            return{
               images: [
                  'https://img.yzcdn.cn/vant/apple-1.jpg',
                  'https://img.yzcdn.cn/vant/apple-2.jpg'
              ],
               search_value:'',
               active: 0,
               pageflag: false,
               bottomshow:true,
               parflag: false,
            }
        },
        methods: {
          onSearch(val) {
            Toast(val);
          },
          onCancel() {
            Toast('取消');
          }
        },
    }
</script>

<style scoped>
  .my-swipe .van-swipe-item{
    /*position: relative;*/
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .tabs-box{
    border: none;
  }
</style>
<style>
  .tabs-box .van-tabs__nav--line{
    height: 35px;
    padding-bottom: 15px;
  }
  .tabs-box .van-tabs__wrap{
    height: 35.5px;
  }
  .tabs-box .van-tab{
    line-height: 35px;
    font-size: 12px;

  }
</style>
