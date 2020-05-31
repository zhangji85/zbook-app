<template>
  <div class="main">
    <van-sticky>
      <van-nav-bar
        title="注册"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-sticky>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="passwords"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ validator, message: '请再次确认密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" :loading="loading" loading-text="注册中..." native-type="submit">
          注册
        </van-button>
      </div>
      <div style="margin: 16px;">
        <span @click="tologin" class="bottom-text">已有账号?去登录</span>
      </div>
    </van-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Form } from 'vant';
  import { NavBar } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Toast);
  Vue.use(NavBar);
  Vue.use(Form);
    export default {
        name: "register",
        data(){
            return{
                username:'',
                password:'',
                passwords:'',
                loading:false,
            }
        },
        methods:{
          onSubmit(values) {
            this.loading = true;
            this.$axios.post('/api/useract',{
              trantype:'register',  //操作类型
              username:this.username,  //用户名
              password:this.$md5(this.password)  //密码md5加密
            })
            .then((response)=>{
              let code=response.data.respcode;//返回状态码
              let msg=response.data.respmsg;//返回信息
              if(code === "000000"){ //注册成功
                  Toast.success('注册成功');
                  this.tologin();
                  this.loading = false;
              }
              else{   //注册失败
                Toast.fail(msg);
                this.loading = false;
              }
            })
            .catch((error) => {
                Toast.fail('请求异常');
                this.loading = false;
            });
          },
          onClickLeft() {
            this.$router.go(-1);
          },
          tologin(){
              this.$router.push({name:'login'})
          },
          validator(){
            if(this.password ===this.passwords){
                return true
            }else {
                return false
            }
          },
        },
        watch:{
          password:{
              handler(val){
                  this.passwords = '';
              },
              deep:true
          }
        },
    }
</script>

<style scoped>
  .bottom-text{
    color: darkgray;
    font-size: 14px;
    margin-left: 20px;
  }
</style>
