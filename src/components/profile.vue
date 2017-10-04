<template>
<div>
  <Uploadfile v-bind:phoneUrl="phoneUrl"></Uploadfile>
  <form class="form-horizontal"
        action="/users/profile-save"
        method="POST"
        id="change-form-post">
  <div class="form-group">
    <label  class="col-sm-2 control-label" style="">头像</label>
    <img :src="picture" class="img-thumbnail" style="width: 140px;height: 140px"/>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">电话号码</label>
    <div class="col-sm-4">
      <input name="phone" class="form-control"  v-model="phoneUrl" readOnly />
    </div>
  </div>
  <div class="form-group">
    <label   class="col-sm-2 control-label">真实姓名</label>
    <div class="col-sm-4">
      <input type="text"
             class="form-control"
             id="user-real-name"
             placeholder="真实姓名(1-6)"
             v-model="realname"
             @change="checkInput"
             name="realname"/>
      <div v-if="realnameBoolean" class="alert alert-danger" role="alert">{{realnameDanger}}</div>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-2 control-label">用户名</label>
    <div class="col-sm-4">
      <input type="text"
             class="form-control"
             id="user-name"
             v-model="username"
             @change="checkInput"
             placeholder="用户名(3-8)"
             name="username" />
      <div v-if="usernameBoolean" class="alert alert-danger" role="alert">{{usernameDanger}}</div>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-2 control-label">生日</label>
    <div class="col-sm-4">
     <input type="date"  class="form-control" v-model="age" @change="checkInput"  name="age"/>
      <div v-if="ageBoolean" class="alert alert-danger" role="alert">{{ageDanger}}</div>
    </div>
  </div>
  <div class="form-group">
    <label  class="col-sm-2 control-label">性别</label>
    <div class="col-sm-4">
      <label>男</label>
      <input type="radio" name="gender" @change="checkInput" v-model="gender" value="1" />
      <label>女</label>
      <input type="radio" name="gender" @change="checkInput" v-model="gender"  value="0" />
      <div v-if="genderBoolean" class="alert alert-danger" role="alert">{{genderDanger}}</div>
    </div>
  </div>
  <div class="form-group">
    <label   class="col-sm-2 control-label">邮箱</label>
    <div class="col-sm-4">
      <input type="email"
             class="form-control"
             id="user-email"
             v-model="email"
             @change="checkInput"
             placeholder="邮箱"
             name="email" />
      <div v-if="emailBoolean" class="alert alert-danger" role="alert">{{emailDanger}}</div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-3">
      <div>
        <button type="button" @click="submit" class="btn btn-primary" style="">提交</button>
      </div>
    </div>
  </div>
  </form>
  </div>
</div>
</template>
<script>
  import Uploadfile from '../components/uploadfile.vue'
  import validator from 'validator'
  import $ from 'jquery'
  import axios from 'axios'
    export default {
      name:'profile',
      data(){
        return{
          realname:'',
          username:'',
          age:'',
          email:'',
          gender:'',
          apiUrl:"http://localhost:3009/api",
          Url:"http://localhost:3009",
          picture:'',
          ageRet:false,
          genderRet:false,
          realnameRet:false,
          usernameRet:false,
          emailRet:false,
          realnameDanger:'请填写正确的真实姓名且不能有空格',
          usernameDanger:'请填写正确的用户名且不能有空格',
          ageDanger:'请填写正确的生日信息',
          genderDanger:'请选择性别',
          emailDanger:'请填写正确的邮箱',
          realnameBoolean:false,
          usernameBoolean:false,
          emailBoolean:false,
          ageBoolean:false,
          genderBoolean:false,
          phoneUrl:window.location.href.split('/').pop()
          }
        },
      methods:{
        checkInput:function(e) {
          var tagName=e.target.name;
          var reg = /\s/g;
          if(tagName==='realname'){
            if(!validator.isLength(this.realname,{min:1,max:6})||reg.test(this.realname)){
              this.realnameRet=false;
              this.realnameBoolean=true;
            }
            else {
              this.realnameRet=true;
              this.realnameBoolean=false;
            }
          }
          if(tagName==='username'){
            if(!validator.isLength(this.username,{min:3,max:8})||reg.test(this.username)){
              this.usernameRet=false;
              this.usernameBoolean=true;
            }else {
              this.usernameRet=true;
              this.usernameBoolean=false;
            }
          }
          if(tagName==='email'){
            if(!validator.isEmail(this.email.trim())){
              this.emailRet=false;
              this.emailBoolean=true;
            }else {
              this.emailRet=true;
              this.emailBoolean=false;
            }
          }
          if(tagName==='gender'){
               if(this.gender){
                 this.genderRet=true;
                 this.genderBoolean=false;
               }else {
                 this.genderRet=false;
                 this.genderBoolean=true;
               }
          }
          if(tagName==='age'){
            if(this.age){
              this.ageRet=true;
              this.ageBoolean=false;
            }else {
              this.ageRet=false;
              this.ageBoolean=true;
            }
          }
        },
        submit:function () {
          var This=this;
          if(this.realnameRet&&this.usernameRet&&this.genderRet&&this.age&&this.emailRet){
            var Date=`phone=${this.phoneUrl}&realname=${this.realname}`+
            `&username=${this.username}&gender=${this.gender}&age=${this.age}&email=${this.email}`;
            console.log(Date,"22233")
            axios.post(this.apiUrl+'/profile-save',Date)
              .then(function (response) {
                if(response.data.code==1){
                  This.$store.commit('getUser',response.data.username);
                  This.$store.commit('getPhone',response.data.phone);
                  window.location.href='#/person/'+response.data.phone
                }
              }).catch(function (error) {
              console.log(error)
            })
          }else {
           if(!this.realnameRet){
             this.realnameBoolean=true;
           }else {
             this.realnameBoolean=false;
           }
            if(!this.usernameRet){
              this.usernameBoolean=true;
            }
            else {
              this.usernameBoolean=false;
            }
            if(!this.genderRet){
              this.genderBoolean=true;
            }else {
              this.genderBoolean=false;
            }
            if(!this.age){
              this.ageBoolean=true;
            }else {
              this.ageBoolean=false;
            }
            if(!this.emailRet){
             this.emailBoolean=true;
            }else {
              this.emailBoolean=false;
            }
          }
        }
      },
      mounted:function () {
        var This=this;
        console.log(this.apiUrl+'/profile/'+this.phoneUrl);
          axios.get(this.apiUrl+'/profile/'+this.phoneUrl).then(function (response) {
            This.picture=This.Url+response.data.user.picture;
            var User=response.data.user
            This.username=User.username;
            This.email=User.email;
            This.realname=User.realname;
            This.age=User.age.split('T')[0];
            This.gender=User.gender;
          }).catch(function (error) {
            console.log(error)
          })
      },
      components:{
        Uploadfile
      }
    }
</script>

<style>

</style>
