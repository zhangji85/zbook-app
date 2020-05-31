<template>
  <div class="mykeep-main">
    <van-sticky>
      <van-nav-bar
        title="我的收藏"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <template v-if="parflag">
      <div class="par-box">
        <van-empty description="您还没有任何收藏" class="custom-image" image="../../../static/images/custom-empty-image.png">
          <van-button round type="danger" class="bottom-button" to="/classlist">
            去收藏
          </van-button>
        </van-empty>
      </div>
    </template>
    <template v-else>
      <Doclist :pageflag.sync="pageflag" :condition=" '我的收藏' " :userid="userid" :bottomshow="bottomshow" :parflag.sync="parflag"></Doclist>
    </template>
  </div>
</template>

<script>
    import Vue from 'vue';
    import Doclist from "../../components/Doclist";
    import { Empty } from 'vant';

    Vue.use(Empty);
    export default {
        name: "Mykeeplist",
        components:{
          Doclist
        },
        data(){
            return{
                userid:'',
                pageflag:false,
                bottomshow:true,
                parflag: false,
            }
        },
        created(){
          this.getlocalname();
        },
        methods:{
          // 获取缓存userid
          getlocalname(){
            if(this.$getLocalStorage('userid')){
                this.userid = this.$getLocalStorage('userid');
            }else {
                this.userid = '';
            }
          },
          onClickLeft() {
            this.$router.go(-1);
          },
        },
    }
</script>

<style scoped>
  .mykeep-main{
    min-height: 100%;
    background-color: #F2F6FC;
  }
  .par-box{
    position: relative;
    min-height: 100%;
    width: 100%;
  }
  .bottom-button{
    width: calc(100vw - 25vw);
    margin-bottom: 20px;
  }
</style>
<style>
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>
