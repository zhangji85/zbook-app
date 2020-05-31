<template>
    <div class="main">
      <template v-if="parflag">
        <div class="par-box">
          <van-empty description="您的书架空空如也" class="custom-image" image="../../../static/images/custom-empty-image.png">
            <van-button round type="danger" class="bottom-button" to="/myhandlist">
              去加入
            </van-button>
            <van-button round type="primary" class="bottom-button" to="/classlist">
              去共享社区看看
            </van-button>
          </van-empty>
        </div>
      </template>
      <template v-else>
        <Doclist :pageflag.sync="pageflag" :userid="userid" :condition=" '书架' " :parflag.sync="parflag"></Doclist>
      </template>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Doclist from "../../components/Doclist";
    import { Empty } from 'vant';

    Vue.use(Empty);
    export default {
        name: "booklist",
        components:{
          Doclist
        },
        data(){
          return {
              pageflag: true,
              userid:'',
              parflag: false,
          }
        },
        created(){
          this.getlocalname();
        },
        methods:{
          getlocalname(){
            if(this.$getLocalStorage('userid')){
                this.userid = this.$getLocalStorage('userid');
            }
          },
        },
    }
</script>

<style scoped>
  .main{
    position: relative;
    min-height: 100%;
    background-color: #F2F6FC;
  }
  .par-box{
    position: relative;
    text-align: center;
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
