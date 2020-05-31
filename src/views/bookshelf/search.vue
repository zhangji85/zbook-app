<template>
    <div class="main">
      <van-sticky>
        <van-nav-bar
        title="智能搜索"
        left-arrow
        @click-left="onClickLeft">
      </van-nav-bar>
      </van-sticky>
      <van-sticky :offset-top="40">
        <van-search v-model="question" placeholder="请输入搜索问题" @search="getanswer" />
      </van-sticky>
      <div v-if="loading" style="height: 100%;text-align: center;margin-top: 50%;">
        <van-loading size="30px">
          <span style="font-size: 20px">拼命寻找答案中...</span>
        </van-loading>
      </div>
      <div v-for="item in answers" v-else>
        <van-field
          v-model="item.answer"
          :loading="loading"
          rows="1"
          autosize
          readonly
          :label="item.label"
          type="textarea"
          placeholder="暂无答案"
        />
      </div>
    </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "search",
        data(){
            return{
              fileid:'',
              question:'',
              loading:false,
              answers:[],
            }
        },
        created() {
          var location = this.$route.query;
          this.fileid = location.id;
        },
        methods:{
          // 获取答案
          getanswer(){
            if(this.question){
                this.answers = [];
                this.loading = true;
                this.$axios.post('/api/appreadact',{
                  trantype:'create_answer',  //操作类型
                  question:this.question,  //问题
                  fileid:this.fileid,
                },{timeout:300000})
                .then((response)=>{
                  let code=response.data.respcode;//返回状态码
                  let msg=response.data.respmsg;//返回信息
                  if (code === "000000") {
                      this.loading = false;
                      this.answers = response.data['answerlist'];
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
            }
            else {
              Toast.fail('请填写问题！');
            }

          },
          onClickLeft() {
            this.$router.go(-1);
          },
        },
    }
</script>

<style scoped>

</style>
