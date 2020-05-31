<template>
  <div class="base">
<!--    头部-->
    <van-sticky>
      <van-nav-bar class="head" title="You Are Beautiful" left-text="返回" @click-left="getback" @click-right="getuser" left-arrow>
      <template slot="right">
        <van-icon name="weapp-nav" @click="handmenu=true" />
      </template>
    </van-nav-bar>
    </van-sticky>
    <!-- 底部-->
      <van-tabbar route v-if="flag" style="background-color: #ebebeb">
        <van-tabbar-item icon="wap-home-o" replace to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="bar-chart-o" replace to="/booklist">书架</van-tabbar-item>
        <van-tabbar-item icon="apps-o" replace to="/classlist">共享</van-tabbar-item>
        <van-tabbar-item icon="user-o" replace to="/userpage">我的</van-tabbar-item>
      </van-tabbar>

      <van-action-sheet
        v-model="handmenu"
        :actions="actions"
        description="上传的文档会自动加入书架"
        @select="onSelect"
        cancel-text="取消"
        @cancel="onCancel"
      />
      <div class="body">
        <router-view/>
      </div>
  </div>
</template>
<script>
    import Vue from 'vue';
    import { ActionSheet } from 'vant';
    import { Toast } from 'vant';

    Vue.use(ActionSheet);
    export default {
        data() {
            return {
                flag: true,
                fag: true,
                boxheight: '',
                handmenu:false,
                actions: [
                  { name: '文档上传' }
                ],
            }
        },
        mounted() {
            this.boxheight = document.documentElement.clientHeight
            console.log(this.boxheight)
        },
        methods: {
            getback() {
                this.$router.go(-1);
            },
            show(data) {
                this.fag = data;
                console.log('flag=',this.fag)
            },
            getuser() {
                // this.$router.push({name: 'user'})
            },
            onCancel(){
                this.handmenu = false;
            },
            onSelect(item) {
              // 默认情况下点击选项时不会自动收起
              // 可以通过 close-on-click-action 属性开启自动收起
              this.handmenu = false;
              if(this.$getLocalStorage('username')){
                  this.$router.push({name:'Dochand'})
              }else {
                  Toast.fail('未登录');
              }
            },
        },
    }
</script>
<style scoped>
  .base {
    background-color: #fff;
    margin-bottom: 52px;
    width: 100%;
    height: 100%;
  }
  .head{
    background-color: #00C98C;
  }
  .body{
    background-color: #F2F6FC;
    position: relative;
    height: 100%;
  }
</style>
