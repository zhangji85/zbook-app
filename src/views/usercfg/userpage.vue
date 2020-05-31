<template>
    <div class="user-main">
      <div class="head-box">
        <van-row :gutter="10">
          <van-col span="6" offset="2" v-if="!usershow">
            <van-image round width="3rem" height="3rem" src="../../../static/images/usermr.jpg">
            </van-image>
          </van-col>
          <van-col span="6" offset="2" v-else>
            <van-image round width="3rem" height="3rem" :src="userprofile">
            </van-image>
          </van-col>
          <van-col span="16" class="head-text">
            <span class="text" v-if="usershow">{{username}}</span>
            <span class="text" @click="tologin" v-else>登录/注册</span>
          </van-col>
        </van-row>
        <van-row style="padding: 10px">
          <template v-for="item in basicinfo">
            <van-col span="8">
              <span class="value-text">{{item.value}}</span>
              <br>
              <span class="name-text">{{item.name}}</span>
            </van-col>
          </template>
        </van-row>
      </div>
      <div class="body-box">
        <van-cell-group>
          <van-cell title="个人信息" icon="manager-o" is-link @click="pagejump('userinfo')" />
          <van-cell title="我的上传" icon="points" is-link  @click="pagejump('myhandlist')" />
          <van-cell title="我的收藏" icon="star-o" is-link  @click="pagejump('mykeeplist')" />
          <van-cell title="文档上传" icon="upgrade" is-link @click="pagejump('Dochand')" />
        </van-cell-group>
      </div>
      <div class="foot-box" v-show="usershow">
        <van-cell-group>
          <van-cell title="退出当前账号" style="color: #F56C6C" @click="show=true" />
        </van-cell-group>
      </div>
      <div>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        cancel-text="取消"
        @cancel="onCancel"
        description="确定退出登录?"
      />
      </div>
    </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "userpage",
        data(){
            return{
              basicinfo:[
                 {
                     name:'上传',
                     value:'-',
                 },
                 {
                     name:'收藏',
                     value:'-',
                 },
                 {
                     name:'书架',
                     value:'-',
                 },
             ],
              show: false,
              usershow: false,
              username:'',
              userid:'',
              userprofile:'',
              actions: [
                { name: '退出登录',color: '#F56C6C'},
              ],
            }
        },
        created(){
          this.getlocalname();
        },
        mounted(){
          if(this.userid){
              this.getuserpage();
          }
        },
        methods:{
            // 获取用户相关信息
            getuserpage(){
               this.$axios.post('/api/appview',{
                trantype:'getuserpage',  //操作类型
                userid:this.userid,  //用户id
              })
              .then((response)=>{
                let code=response.data.respcode;//返回状态码
                let msg=response.data.respmsg;//返回信息
                if (code === "000000") {
                  this.username = response.data['username'];
                  this.basicinfo = response.data['basicinfo'];
                  this.userprofile = response.data['userprofile'];
                  this.$setLocalStorage('username',this.username);  //将用户名存入缓存中
                }
                else {
                  Toast.fail(msg);
                }
              })
              .catch((error) => {
                  Toast.fail('请求异常');
              });
            },
            onCancel() {
              this.show = false;
              // Toast('已取消');
            },
            // 跳转登录页面
            tologin(){
              this.$router.push({name:'login'})
            },
            // 跳转页面（多项公用）
            pagejump(name){
                if(this.userid){
                    this.$router.push({name:name})
                }else {
                    Toast.fail('未登录');
                }
            },
            // 获取缓存userid
            getlocalname(){
              if(this.$getLocalStorage('userid')){
                  this.userid = this.$getLocalStorage('userid');
                  this.username = this.$getLocalStorage('username');
                  this.usershow = true;
              }else {
                  this.userid = '';
                  this.usershow = false;
              }
            },
            onSelect(item) {
              this.$removeLocalStorage('username');
              this.$removeLocalStorage('userid');
              this.getlocalname();
              this.show = false;
              // Toast(item.name);
            }
        }
    }
</script>

<style scoped>
  .user-main{
    position: relative;
    background-color: #F2F6FC;
    height: 100%;
  }
  .head-box{
    padding: 20px 10px 20px 10px;
    text-align: center;
    background-image: linear-gradient(#C5D0F0, #F2F6FC);
  }
  .head-text{
    text-align: left;
    font-size: 1.25rem;
    margin-top: 0.5rem;
    font-weight: bold;
    color: #909399;
  }
  .value-text{
    font-family: impact, sans-serif;
    font-size: 1rem;
    color: #909399;
    font-weight: bold;
  }
  .name-text{
    font-size: 0.75rem;
    color: #C0C4CC;
  }
  .body-box, .foot-box{
    padding: 0px 5px 10px 5px;
    border-radius: 5px;
  }
  .foot-box{
    text-align: center;
  }
</style>
