<template>
    <div class="user-info">
      <van-sticky>
        <van-nav-bar
          title="个人信息"
          left-arrow
          @click-left="onClickLeft"
        />
      </van-sticky>
      <van-form scroll-to-error validate-first @submit="onSubmit">
        <van-field label="用户名：" v-model="userinfo.username" disabled />
        <van-field name="uploader" label="头像：">
          <template #input>
            <van-uploader :max-count="1" :after-read="onRead" :max-size="3 * 1024 * 1024" v-model="userinfo.userprofile" />
          </template>
        </van-field>
        <van-field maxlength="32" v-model="userinfo.nickname" label="昵称：" />
        <van-field readonly clickable name="picker" v-model="userinfo.sex" label="性别：" placeholder="点击选择性别" @click="showsexpicker = true" />
          <van-popup v-model="showsexpicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="sexlist"
              @confirm="onsexConfirm"
              @cancel="showsexpicker = false"
            />
          </van-popup>
        <van-field readonly clickable name="area" v-model="userinfo.location" placeholder="点击选择地区" label="地区：" @click="showArea = true" />
          <van-popup v-model="showArea" position="bottom">
            <van-area
              :area-list="areaList"
              @confirm="onareaConfirm"
              @cancel="showArea = false"
            />
          </van-popup>
        <van-field v-model="userinfo.email" label="Email：" placeholder="请输入邮箱" :rules="[{validator, message: '邮箱格式错误'}]" />
        <van-field rows="2" autosize maxlength="36" type="textarea" show-word-limit v-model="userinfo.signature" placeholder="留下您的个性签名" label="个性签名：" />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading="loading" @click="handuserinfo">
            保存
          </van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
  import AreaList from '../../assets/js/area';
  import { Toast } from 'vant';
    export default {
        name: "userinfo",
        components:{AreaList},
        data(){
            return{
                userinfo:{
                  userid:18,
                  username:'zhang85', // 用户名
                  userprofile:[], // 头像
                  nickname:'张先生',  // 昵称
                  sex:'', // 性别
                  location:'', // 地区
                  email:'', // email
                  signature:'听闻小姐治家有方，余生愿闻其详。' // 个性签名
                },
                sexlist:['男','女','未知'],
                showsexpicker: false,
                showArea: false,
                areaList:AreaList,
                user_id:'',
                loading: false,
            }
        },
        created(){
          this.getlocalname();
        },
        mounted(){
          this.getuserinfo();
        },
        methods:{
            // 保存用户相关信息
            handuserinfo(){
               this.loading = true;
               this.$axios.post('/api/appuseract',{
                trantype:'updUserinfo',  //操作类型
                userid:this.user_id,  //用户id
                userinfo:this.userinfo,
              })
              .then((response)=>{
                let code=response.data.respcode;//返回状态码
                let msg=response.data.respmsg;//返回信息
                if (code === "000000") {
                  this.loading = false;
                  Toast.fail(msg);
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
            // 获取图片信息
            onRead(file){
              this.userinfo.userprofile[0]['name'] = file.file['name']
            },
            // 获取用户相关信息
            getuserinfo(){
               this.$axios.post('/api/appview',{
                trantype:'getuserinfo',  //操作类型
                userid:this.user_id,  //用户id
              })
              .then((response)=>{
                let code=response.data.respcode;//返回状态码
                let msg=response.data.respmsg;//返回信息
                if (code === "000000") {
                  this.userinfo = response.data['userinfo'];
                  console.log('userinfo',this.userinfo)
                }
                else {
                  Toast.fail(msg);
                }
              })
              .catch((error) => {
                  Toast.fail('请求异常');
              });
            },
            // 获取缓存userid
            getlocalname(){
              if(this.$getLocalStorage('userid')){
                  this.user_id = this.$getLocalStorage('userid');
              }else {
                  this.userid = '';
              }
            },
            // 邮箱格式验证
            validator(val){
                if(val){
                    var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    return reg.test(val)
                }else {
                    return true
                }
            },
            // 数据保存
            onSubmit(values) {

              console.log('submit', this.userinfo);
            },
            // 性别选择
            onsexConfirm(value) {
              this.userinfo.sex = value;
              this.showsexpicker = false;
            },
            // 地区选择
            onareaConfirm(values) {
              this.userinfo.location = values.map((item) => item.name).join('/');
              this.showArea = false;
            },
            onClickLeft() {
              this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>
  .user-info{
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
