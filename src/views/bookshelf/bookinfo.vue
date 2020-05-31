<template>
    <div class="main">
      <van-card  :title="filename" class="goods-card" thumb="http://thumbs.dreamstime.com/t/%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%96%87%E4%BB%B6%E5%9C%A8%E5%B9%B3%E7%9A%84%E9%95%BF%E7%9A%84%E9%98%B4%E5%BD%B1%E6%A0%B7%E5%BC%8F%E7%9A%84txt%E8%B1%A1-%E4%B8%80%E7%BD%91%E6%B1%87%E9%9B%86%E8%B1%A1%E5%8F%AF%E4%BB%A5%E4%B8%BAui%EF%BC%8C-ux%E4%BD%BF%E7%94%A8-125775883.jpg">
      </van-card>
      <van-row style="margin-top: 10px">
        <van-col span="24" class="title-col">内容简介</van-col>
        <van-col span="24" class="value-col">
          {{fileinfo}}
        </van-col>
      </van-row>
      <van-row class="btn-row">
        <van-col :span="24-colnum" class="item-col">
          <van-button round plain type="primary" class="btn-item" @click="joinshelf">{{shelftext}}</van-button>
        </van-col>
        <van-col :span="colnum" class="item-col" v-if="colnum">
          <van-button round plain type="warning" class="btn-item" @click="joincol">{{coltext}}</van-button>
        </van-col>
        <van-col span="24" class="item-col-read">
          <van-button round type="danger" class="btn-read" @click="toread">开始阅读</van-button>
        </van-col>
      </van-row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Col, Row } from 'vant';
    import { Toast } from 'vant';

    Vue.use(Toast);
    Vue.use(Col);
    Vue.use(Row);
    export default {
        name: "bookinfo",
        data(){
          return{
            userid:'',
            fileid:'',
            filename:'',
            fileinfo:'',
            shelftext:'',
            coltext:'',
            colnum: 12,
          }
        },
        created() {
          var location = this.$route.query;
          this.fileid = location.id;
          console.log(location.colnum);
          if(location.colnum===0){
              this.colnum = location.colnum;
          }
          this.getlocalname()
        },
        mounted(){
          this.getbookinfo()
        },
        methods:{
            getbookinfo(){
                this.$axios.post('/api/appview',{
                  trantype:'getbookinfo',  //操作类型
                  userid:this.userid,  //用户名
                  fileid:this.fileid,
                })
                .then((response)=>{
                  let code=response.data.respcode;//返回状态码
                  let msg=response.data.respmsg;//返回信息
                  if (code === "000000") {  //登录成功，并提示
                      this.filename = response.data['filename'];
                      this.fileinfo = response.data['fileinfo'];
                      this.shelftext = response.data['shelftext'];
                      this.coltext = response.data['coltext'];
                  }
                  else {
                    Toast.fail(msg);
                  }
                })
                .catch((error) => {
                    Toast.fail('请求异常');
                });
            },
            joincol(){
                this.$axios.post('/api/appreadact',{
                  trantype:'joincol',  //操作类型
                  userid:this.userid,  //用户名
                  fileid:this.fileid,
                })
                .then((response)=>{
                  let code=response.data.respcode;//返回状态码
                  let msg=response.data.respmsg;//返回信息
                  if (code === "000000") {  //登录成功，并提示
                      this.coltext = response.data['coltext'];
                  }
                  else {
                    Toast.fail(msg);
                  }
                })
                .catch((error) => {
                    Toast.fail('请求异常');
                });
            },
            joinshelf(){
                this.$axios.post('/api/appreadact',{
                  trantype:'joinshelf',  //操作类型
                  userid:this.userid,  //用户名
                  fileid:this.fileid,
                })
                .then((response)=>{
                  let code=response.data.respcode;//返回状态码
                  let msg=response.data.respmsg;//返回信息
                  if (code === "000000") {  //登录成功，并提示
                      this.shelftext = response.data['shelftext'];
                  }
                  else {
                    Toast.fail(msg);
                  }
                })
                .catch((error) => {
                    Toast.fail('请求异常');
                });
            },
            getlocalname(){
              if(this.$getLocalStorage('userid')){
                  this.userid = this.$getLocalStorage('userid');
              }
            },
            toread(){
                this.$router.push({name:'readbook',query: {id:this.fileid}})
            }
        },
    }
</script>

<style scoped>
  .main{
    position: relative;
  }
  .goods-card{
    width: 70%;
    margin-left: 15%;
    background-color: rgba(255,255,255,0.1);
  }
  .title-col{
    text-align: left;
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
  }
  .value-col{
    font-size: 12px;
    padding: 10px 10px 10px 10px;
  }
  .btn-row{
    margin-top: 30px;
  }
  .item-col{
    padding: 10px 20px 10px 20px;
  }
  .item-col-read{
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 10px;
  }
  .btn-item{
    width: 100%;
  }
  .btn-read{
    width: 100%;
  }
</style>
