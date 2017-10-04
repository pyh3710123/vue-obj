<template>
  <div class="container">
    <form class="uploadForm"
          encType="multipart/form-data">
      <div class="form-group fileUpload">
        <label class="btn btn-primary">
          <input type="file"
                 id="fileUpload"
                 name="fileUpload"
                 @change="checkFile"
          />
        </label>
      </div>
      <button type="button"
              class="btn btn-primary"
              @click="submit"
      >上传</button>
    </form>
  </div>
</template>
<script>
  import $ from 'jquery'
  import axios from 'axios'
    export default {
      name:'uploadfile',
      data(){
        return{
          files:'',
          apiUrl:"http://localhost:3009/api",
          year:'',
          month:'',
          timestr:'',
        }
      },
      props:{
        phoneUrl:""
      },
      methods:{
        checkFile:function (e) {
          this.files=e.target.files;
        },
        submit:function () {
          const now = new Date();
          this.year= now.getFullYear();
          this.month= now.getMonth() ;
          this.timestr = Date.now();
          console.log(this.files);
          var file=this.files[0];
          var URL=`${this.apiUrl}/upload-profile/${this.phoneUrl}/${this.year}/${this.month}/${this.timestr}`;
         if(this.files.length>0){
           var formData = new FormData();
           formData.append('fileUpload', file, file.name);
           axios({
             method:'POST',
             url:URL,
             headers:{'enctype': 'multipart/form-data'},
             data:formData
           }).then(function (response) {
             if(response.data.code==1){
               window.location.reload()
             }
           }).catch(function (error) {
             console.log(error)
           })

         }
            }
      }
    }
</script>

<style>

</style>
