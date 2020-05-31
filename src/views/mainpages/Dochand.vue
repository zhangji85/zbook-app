<template>
    <div class="main">
      <van-nav-bar
        title="文档上传"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="body">
        <van-form>
          <van-field name="uploader" label="文档上传">
            <template #input v-if="filename==='' ">
              <van-uploader :accept="'text/*'" :after-read="afterRead">
                <van-button round size="small" type="primary">上传文档</van-button>
              </van-uploader>
            </template>
            <template #input v-else>
              <span>{{filename}}</span>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="classvalue"
            label="分类"
            placeholder="点击选择分类"
            @click="showPicker = true"
          />
          <van-field name="switch" label="是否共享">
            <template #input>
              <van-switch v-model="switchChecked" size="20" />
            </template>
          </van-field>
          <van-field
              v-model="contentinfo"
              rows="1"
              autosize
              label="内容简介"
              type="textarea"
              maxlength="150"
              placeholder="请输入内容简介"
            />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" :loading="loading" @click="handdoc">
              提交
            </van-button>
          </div>

          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
      </van-form>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Form } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Form);
    export default {
        name: "Dochand",
        data(){
            return{
              classvalue: '',
              columns: ['小说', '说明书', '其他'],
              showPicker: false,
              switchChecked:false,
              contentinfo:'',
              filename:'',
              file:'',
              loading: false,

            }
        },
        created(){
          this.getlocalname();
        },
        methods: {
          // 获取用户相关信息
          handdoc(){
               this.loading = true;
               if(this.file){
               this.$axios.post('/api/appuseract',{
                    trantype:'handdoc',  //操作类型
                    userid:this.user_id,  //用户id
                    filename:this.filename,
                    file:this.file,
                    classvalue:this.classvalue,
                    contentinfo:this.contentinfo,
                    share: this.switchChecked,
                  })
                  .then((response)=>{
                    let code=response.data.respcode;//返回状态码
                    let msg=response.data.respmsg;//返回信息
                    if (code === "000000") {
                      this.loading = false;
                      Toast.success(msg);
                      this.onClickLeft();
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
               }else {
                   Toast.fail('文档不能为空');
                    this.loading = false;
               }

          },
          onConfirm(value) {
            this.classvalue = value;
            this.showPicker = false;
          },
          afterRead(file) {
            // 此时可以自行将文件上传至服务器
            this.filename = file.file.name;
            this.file = file.content;
          },
          onClickLeft() {
            this.$router.go(-1);
          },
          // 获取缓存userid
          getlocalname(){
            if(this.$getLocalStorage('userid')){
                this.user_id = this.$getLocalStorage('userid');
            }else {
                this.userid = '';
                this.$router.go(-1);
            }
          },
        },
    }
</script>

<style scoped>
  .main{
    position: relative;
  }
  .body{
    margin: 5px 0 20px 0;
  }
</style>
