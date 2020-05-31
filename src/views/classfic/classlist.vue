<template>
    <div class="main">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <van-row class="row" v-for="(items,indexs) in alllist" :key="indexs">
            <van-col span="11" offset="1" class="col-left">
              <div class="name-icon"></div>
              {{items.name}}
            </van-col>
            <van-col span="12" class="col-right">
              <van-button size="small" :to="{name:'classdetails', query: {name:items.name} }" style="border: none;background-color: rgba(0,0,0,0)">
                <span style="font-size: 15px">更多</span>
                <van-icon name="arrow" />
              </van-button>
            </van-col>
            <van-col span="24" v-for="(item,index) in items.list" :key="index">
              <van-card :desc="item.msg" :title="item.filename" class="goods-card" @click="routeto(item.fileid)" thumb="http://thumbs.dreamstime.com/t/%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%96%87%E4%BB%B6%E5%9C%A8%E5%B9%B3%E7%9A%84%E9%95%BF%E7%9A%84%E9%98%B4%E5%BD%B1%E6%A0%B7%E5%BC%8F%E7%9A%84txt%E8%B1%A1-%E4%B8%80%E7%BD%91%E6%B1%87%E9%9B%86%E8%B1%A1%E5%8F%AF%E4%BB%A5%E4%B8%BAui%EF%BC%8C-ux%E4%BD%BF%E7%94%A8-125775883.jpg">
                <template #footer>
                  <span style="padding-right: 10px">
                    <van-icon color="#ffeb3b" name="star" v-if="item.colnum" />
                    <van-icon color="#DCDFE6" name="star" v-else />
                    {{item.colnum}}收藏
                  </span>
                </template>
              </van-card>
            </van-col>
          </van-row>

        </van-list>
      </van-pull-refresh>



    </div>
</template>

<script>
  import Vue from 'vue';
  import { Col, Row } from 'vant';

  Vue.use(Col);
  Vue.use(Row);
    export default {
        name: "classlist",
        data(){
            return {
              list: [],
              alllist:[],
              loading: false,
              finished: false,
              refreshing: false
            }
        },
        methods:{
          getlist(){
              this.loading = true;
              this.$axios.post('/api/appview',{
                trantype:'getSharelist',  //操作类型
              })
              .then((response)=>{
                let code=response.data.respcode;//返回状态码
                let msg=response.data.respmsg;//返回信息
                if (code === "000000") {  //成功
                  this.alllist = response.data['alllist'];
                  this.loading = false;
                  this.finished = true;
                  if(this.refreshing){
                      this.refreshing = !this.refreshing;
                  }
                }
                else {
                  Toast.fail(msg);
                  this.loading = false;
                  this.finished = true;
                  if(this.refreshing){
                      this.refreshing = !this.refreshing;
                  }
                }
              })
              .catch((error) => {
                  Toast.fail('请求异常');
                  this.loading = false;
                  this.finished = true;
                  if(this.refreshing){
                      this.refreshing = !this.refreshing;
                  }
              });
          },
          onRefresh(){
            this.refreshing = true;
            this.getlist();
          },
          onLoad() {
             this.getlist();
          },
          routeto(val){
            this.$router.push({name:'bookinfo',query: {id:val}})
          },
        },
    }
</script>

<style scoped>
  .main{
    position: relative;
  }
  .row{
    padding: 10px 0 10px 0;
  }
  .goods-card{
    background-color: #ffffff;
    padding: 5px;
    margin-bottom: 5px;
  }
  .col-left{
    font-size: 1rem;
    font-weight: bolder;
    border-left: 3px solid #00C98C;
    padding-left: 8px;
    border-radius: 2px;
  }
  .col-right{
    text-align: right;
    padding-left: 15px;
  }
</style>
