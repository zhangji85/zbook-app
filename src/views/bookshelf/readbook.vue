<template>
  <div class="main">
    <van-sticky>
    <van-nav-bar
      title=""
      left-arrow
      right-text="智能搜索"
      @click-left="onClickLeft"
      @click-right="onClickRight">
    </van-nav-bar>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getdetail"
    >
    <div class="detail-box">
      {{text}}
    </div>
    </van-list>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Form } from 'vant';
  import { NavBar } from 'vant';
  import { Toast } from 'vant';
  import { Field } from 'vant';
  import { Loading } from 'vant';

  Vue.use(Loading);
  Vue.use(Field);
  Vue.use(Toast);
  Vue.use(NavBar);
  Vue.use(Form);
    export default {
        name: "readbook",
        data(){
            return {
                fileid:'',
                begin_num:0,
                text:'',
                loading:false,
                finished:false,

            }
        },
        created() {
          var location = this.$route.query;
          this.fileid = location.id;
        },
        mounted(){
            this.loading = true;
            this.text = '';
            this.getdetail();
            // setTimeout(()=>{
            //     this.text = this.textlist;
            //     this.loading = false;
            // },3000)
        },
        methods:{
          getdetail(){
            this.$axios.post('/api/appreadact',{
              trantype:'docpreview',  //操作类型
              fileid: this.fileid,
              begin_num: this.begin_num,
            })
            .then((response)=>{
              let code=response.data.respcode;//返回状态码
              let msg=response.data.respmsg;//返回信息
              if (code === "000000") {
                this.loading = false;
                if(response.data['doc_data']){
                    this.text = this.text + response.data['doc_data'];
                    this.begin_num = response.data['begin_num'];
                }else {
                    this.finished = true;
                }

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
          onClickRight(){
            this.$router.push({name:'search',query: {id:this.fileid}})
          },
        },
    }
</script>

<style scoped>
  .main{
    min-height: 100%;
  }
  .detail-box{
    background-color: #ffffff;
    font-size: 1.25rem;
    line-height: 2.25rem;
    padding: 10px 20px;
  }
</style>
