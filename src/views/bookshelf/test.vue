<template>
    <div class="main">
      <input type="text" v-model="inputtext">
      <input type="file" @change="copeFile" id="fileinp">
      <span>{{file}}</span>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                inputtext:'',
                file:'',
            }
        },
        methods:{
          copeFile(e){
              console.log(e.target)
              const file = e.target.files[0];
              const reader = new FileReader();
              let self = this;
              console.log('file=',file)
              self.file = file;
              reader.readAsText(file)
              setTimeout(()=>{
                  self.inputtext = reader.result;
              },1000)
          },
          copeFile2(){
          },
        },
    }
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
  }
</style>
