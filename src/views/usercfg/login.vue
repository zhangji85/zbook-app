<template>
  <div class="main">
    <van-sticky>
      <van-nav-bar
        title="登录"
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
      <div style="margin: 16px;">
        <van-button round block type="info" :loading="loading" loading-text="登录中..." native-type="submit">
          登录
        </van-button>
      </div>
      <div style="margin: 16px;">
        <span @click="toregister" class="bottom-text">没有账号?去注册</span>
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
        name: "login",
        data(){
            return{
                username:'',
                password:'',
                loading:false,
            }
        },
        methods:{
          onSubmit(values) {
            this.loading = true;
            this.$axios.post('/api/useract',{
              trantype:'login',  //操作类型
              username:this.username,  //用户名
              password:this.$md5(this.password),  //密码md5加密
            })
            .then((response)=>{
              let code=response.data.respcode;//返回状态码
              let msg=response.data.respmsg;//返回信息
              if (code === "000000") {  //登录成功，并提示
                Toast.success('登录成功');
                this.$setLocalStorage('username',this.username);  //将用户名存入缓存中
                this.$setLocalStorage('userid',response.data['uid']);  //将用户id存入缓存中
                this.loading = false;
                this.$router.push({name:'userpage'})
              }
              else {
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
          toregister(){
              this.$router.push({name:'register'})
          },
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
