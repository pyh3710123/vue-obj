<template>
  <!--登陆模态框-->
  <div class="modal fade" tabindex="-1" role="dialog" id="sign-in">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="clearAllInput" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">用户登陆</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal"
                action=""
                method="POST"
          >
            <div class="form-group">
              <label htmlfor="inputEmail3" class="col-sm-2 control-label">电话号码</label>
              <div class="col-sm-9">
                <input type="phone" class="form-control" v-model="valuePhone" @change="checkInput" placeholder="请输入电话号码" name="phone" >
                <div v-if="phoneBoolean" class="alert alert-danger" role="alert">{{phoneDanger}}</div>
              </div>
            </div>
            <div class="form-group">
              <label htmlfor="inputPassword3" class="col-sm-2 control-label">密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control"  v-model="valuePassword" @change="checkInput" placeholder="请输入密码" name="password">
                <div v-if="passwordBoolean" class="alert alert-danger" role="alert">{{passwordDanger}}</div>
              </div>
            </div>
            <div class="form-group">
              <label htmlfor="inputPassword3" class="col-sm-2 control-label">验证码</label>
              <div class="col-sm-3">
                <input type="text" class="form-control" v-model="valueCaptcha" @change="checkInput"  name="captcha" placeholder="请输入验证码">
                <div v-if="captchaBoolean" class="alert alert-danger" role="alert">{{captchaDanger}}</div>
                <img :src="captchaUrl"  alt="" id="changeImg-sign-in" style="background: #eee;margin-top: 10px">
                <p>看不清楚？<a @click="changeCaptchaUrl">点我换一张</a></p>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="button" class="btn btn-default" @click="submit">登录</button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="clearAllInput" id="closeModel">关闭</button>
        </div>
      </div>
    </div>
  </div><!--end-->
</template>
<script>
import $ from 'jquery'
import validator from 'validator'
import axios from 'axios'
  export default{
    data(){
      return{
         valuePhone:"",
         valuePassword:"",
         valueCaptcha:"",
         captchaUrl:"http://localhost:3009/api/captcha",
         phoneDanger:'请输入正确的手机号码',
         passwordDanger:'密码长度错误，请核对',
         captchaDanger:'验证码长度错误，请核对',
         phoneRet:false,
         passwordRet:false,
         captchaRet:false,
         phoneBoolean:false,
         passwordBoolean:false,
         captchaBoolean:false
      }
    },
    methods:{
      checkInput:function (e) {
        var tagName=e.target.name;
     if(tagName==='phone'){
       if(!validator.isMobilePhone(this.valuePhone,'zh-CN')){
          this.phoneRet=false;
          this.phoneBoolean=true;
       }
       else {
         this.phoneRet=true;
         this.phoneBoolean=false;
       }
       if(validator.isLength(this.valuePhone.trim(),{min:0,max:0})){
         this.phoneBoolean=false;
       }
     }
        if(tagName==='password'){
          if(!validator.isLength(this.valuePassword,{min:6,max:12})){
            this.passwordRet=false;
            this.passwordBoolean=true;
          }else {
            this.passwordRet=true;
            this.passwordBoolean=false;
          }
          if(validator.isLength(this.valuePassword.trim(),{min:0,max:0})){
            this.passwordBoolean=false;
          }
        }
        if(tagName==='captcha'){
          if(!validator.isLength(this.valueCaptcha,{min:4,max:4})){
            this.captchaRet=false;
            this.captchaBoolean=true;
          }else {
            this.captchaRet=true;
            this.captchaBoolean=false;
          }
          if(validator.isLength(this.valueCaptcha.trim(),{min:0,max:0})){
            this.captchaBoolean=false;
          }
        }
      },
      submit:function () {
        var This=this;
          if(this.phoneRet && this.passwordRet && this.captchaRet){
            alert('准许通过');
           /*var Data='phone='+this.valuePhone+'&'+'password='+this.valuePassword+'&'+'captcha='+this.valueCaptcha;*/
            var Data=`phone=${this.valuePhone}&password=${this.valuePassword}&captcha=${this.valueCaptcha}`;
           axios.post("http://localhost:3009/api/sign-in",Data)
             .then(function (response) {
               if(response.data.code==1){
                 var User=response.data.user;
                 This.$store.commit('getPhone',User.phone);
                 This.$store.commit('getUser',User.username);
                 $('#closeModel').click();
                 window.location.href='#/person/'+response.data.user.phone;
               }else{
                 alert(response.data.msg)
               }
             }).catch(function (error) {
              console.log(error)
           })
           console.log(Data)
          }else {
            if(!this.phoneRet){
              this.passwordBoolean=true;
            }else {
              this.passwordBoolean=false;
            }
            if(!this.passwordRet){
              this.passwordBoolean=true;
            }else {
              this.passwordBoolean=false;
            }
            if(!this.captchaRet){
              this.captchaBoolean=true;
            }else {
              this.captchaBoolean=false;
            }
          }
      },
      changeCaptchaUrl:function () {
          this.captchaUrl="http://localhost:3009/api/captcha"+"?t="+ Date.now()+Math.random();
      },
      clearAllInput:function () {
            this.valuePhone='';
            this. valuePassword='';
            this.valueCaptcha='';
      }
    },

  }
</script>


<style>

</style>
