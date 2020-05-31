<template>
    <div class="main">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-if="flag">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="你已经看到了我的底线"
        style="min-height: 100%"
        @load="onLoad">
        <van-swipe-cell v-for="(item,index) in list" :key="index" :title="item.filename">
          <van-card :desc="item.msg" :title="item.filename" class="goods-card" @click="toread(item.fileid)" thumb="http://thumbs.dreamstime.com/t/%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%96%87%E4%BB%B6%E5%9C%A8%E5%B9%B3%E7%9A%84%E9%95%BF%E7%9A%84%E9%98%B4%E5%BD%B1%E6%A0%B7%E5%BC%8F%E7%9A%84txt%E8%B1%A1-%E4%B8%80%E7%BD%91%E6%B1%87%E9%9B%86%E8%B1%A1%E5%8F%AF%E4%BB%A5%E4%B8%BAui%EF%BC%8C-ux%E4%BD%BF%E7%94%A8-125775883.jpg">
            <template #footer v-if="bottomshow">
            <span>
              <van-icon color="#ffeb3b" name="star" v-if="item.colnum" />
              <van-icon color="#DCDFE6" name="star" v-else />
              {{item.colnum}}收藏
            </span>
          </template>
          </van-card>
          <template #right v-if="!bottomshow">
            <van-button square text="移出" type="danger" class="delete-button" @click="updstatus(item.fileid,'updshelfstatus',1)" />
          </template>
        </van-swipe-cell>
      </van-list>
      </van-pull-refresh>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-else>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="你已经看到了我的底线"
        style="min-height: 100%"
        @load="onLoad">
        <van-swipe-cell v-for="(item,index) in list" :key="index" :title="item.filename">
          <van-card :desc="item.msg" :title="item.filename" class="goods-card" @click="routeto(item.fileid)" thumb="http://thumbs.dreamstime.com/t/%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%96%87%E4%BB%B6%E5%9C%A8%E5%B9%B3%E7%9A%84%E9%95%BF%E7%9A%84%E9%98%B4%E5%BD%B1%E6%A0%B7%E5%BC%8F%E7%9A%84txt%E8%B1%A1-%E4%B8%80%E7%BD%91%E6%B1%87%E9%9B%86%E8%B1%A1%E5%8F%AF%E4%BB%A5%E4%B8%BAui%EF%BC%8C-ux%E4%BD%BF%E7%94%A8-125775883.jpg">
            <template #tags>
              <van-tag plain type="danger">{{item.class}}</van-tag>
            </template>
            <template #footer>
              <span>
                <van-icon color="#ffeb3b" name="star" v-if="item.colnum" />
                <van-icon color="#DCDFE6" name="star" v-else />
                {{item.colnum}}收藏
              </span>
              <span v-show="item.status" style="padding: 0 10px">
                <van-icon color="#4caf50" name="share" v-if="item.status==='已共享' " />
                <van-icon color="#DCDFE6" name="share" v-else />
                {{item.status}}
              </span>
            </template>
          </van-card>
          <template #right>
            <van-button v-if="!bottomshow" type="danger" text="删除" style="margin-left: 5px" class="delete-button" @click="updstatus(item.fileid,'updfilestatus',-1)" />
            <van-button v-if="!bottomshow && item.status==='已共享' " type="primary" text="取消共享" style="margin-left: -4px" class="delete-button" @click="updstatus(item.fileid,'updfilestatus',0)" />
            <van-button v-if="!bottomshow && item.status !=='已共享' " type="primary" text="共享" style="margin-left: -4px" class="delete-button" @click="updstatus(item.fileid,'updfilestatus',1)" />
            <van-button v-if="item.trantype" type="danger" text="删除" style="margin-left: 5px" class="delete-button" @click="updstatus(item.fileid,item.trantype,-1)" />
          </template>
        </van-swipe-cell>
      </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { SwipeCell } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Toast);
  Vue.use(SwipeCell);
    export default {
        name: "Doclist",
        props:['pageflag','userid','condition','bottomshow','parflag'],
        data(){
            return{
              list: [],
              loading: false,
              finished: false,
              flag:false,
              refreshing:false,
              myparflag: false,
            }
        },
        methods: {
          updstatus(fileid,trantype,status){
              this.$axios.post('/api/appreadact',{
                trantype:trantype,  //操作类型
                userid:this.userid,  //用户名
                fileid:fileid,
                status:status,
              })
              .then((response)=>{
                let code=response.data.respcode;//返回状态码
                let msg=response.data.respmsg;//返回信息
                if (code === "000000") {  //成功
                  this.getlist();
                }
                else {
                  Toast.fail(msg);
                }
              })
              .catch((error) => {
                  Toast.fail('请求异常');
              });
          },
          getlist(){
              this.loading = true;
              this.$axios.post('/api/appview',{
                trantype:'getlist',  //操作类型
                userid:this.userid,  //用户名
                condition:this.condition, // 请求类型
              })
              .then((response)=>{
                let code=response.data.respcode;//返回状态码
                let msg=response.data.respmsg;//返回信息
                if (code === "000000") {  //成功
                  this.list = response.data['list'];
                  this.loading = false;
                  this.finished = true;
                  if(this.refreshing){
                      this.refreshing = !this.refreshing;
                  }
                  if(this.list.length===0){
                      this.myparflag = true;
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
            if(this.condition==='我的上传'){
                this.$router.push({name:'bookinfo',query: {colnum:0,id:val}})
            }else {
                this.$router.push({name:'bookinfo',query: {id:val}})
            }
          },
          toread(val){
              this.$router.push({name:'readbook',query: {id:val}})
          }
        },
        watch:{
          pageflag:{
            handler(val){
                this.flag = this.pageflag;
            },
            deep:true,
            immediate:true
          },
          parflag:{
              handler(val){
                  this.myparflag = this.parflag;
              },
              deep:true
          },
          myparflag:{
              handler(val){
                  this.$emit('update:parflag',val)
              },
              deep:true
          }
        },
    }
</script>

<style scoped>
  .main{
    /*background-color: #F2F6FC;*/
  }
  .goods-card {
    margin-top: 5px;
    padding: 5px 10px 5px 10px;
    background-color: #ffffff;
  }

  .delete-button {
    height: 100%;
    /*width: 50%;*/
  }
</style>
