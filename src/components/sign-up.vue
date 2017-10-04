<template>
  <!--注册模态框-->
  <div class="modal fade" tabindex="-1" role="dialog" id="sign-up">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="clearAllInput" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">账号注册</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal"
                action=""
                method="POST"
                id="sign-up-form">
            <div class="form-group">
              <label htmlfor="inputEmail3" class="col-sm-2 control-label">电话号码</label>
              <div class="col-sm-9">
                <input type="phone" class="form-control"  @change="checkInput"  v-model="valuePhone" placeholder="请输入电话号码" name="phone">
              </div>
            </div>
            <p class="bg-danger" id="Error"></p>
            <div class="form-group">
              <label htmlfor="inputPassword3" class="col-sm-2 control-label">密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" @change="checkInput" v-model="valuePassword" placeholder="请输入密码" name="password">
              </div>
            </div>
            <div class="form-group">
              <label htmlfor="inputPassword3" class="col-sm-2 control-label">确认密码</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" @change="checkInput"  v-model="valuePasswordAgain" placeholder="请再次确认密码" name="password1">
              </div>
            </div>
            <div class="form-group">
              <label htmlfor="inputPassword3" class="col-sm-2 control-label">验证码</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" @change="checkInput"  v-model="valueCaptcha" placeholder="请输入验证码" name="captcha">
                <img :src=captchaUrl alt="" @click="changIMG" style="background: #eee;margin-top: 10px">
                <p>看不清楚？<a @click="changIMG">点我换一张</a></p>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="button" class="btn btn-default" @click="submit">注册</button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="clearAllInput" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import validator from 'validator'
  import axios from 'axios'
  export default{
    data(){
      return{
        valuePhone:"",
        valuePassword:"",
        valuePasswordAgain:"",
        valueCaptcha:"",
        captchaUrl:"http://localhost:3009/api/captcha",
        apiUrl:"http://localhost:3009/api",
        phoneRet:false,
        passwordRet:false,
        passwordAgainRet:false,
        captchaRet:false
      }
    },
    methods:{
      checkInput:function (e) {
        var tagName=e.target.name;
        if(tagName==='phone'){
          if(!validator.isMobilePhone(this.valuePhone,'zh-CN')){
            alert('请输入正取的手机号码');
            this.phoneRet=false;
          }else {
            this.phoneRet=true;
          }
        }
        if(tagName==='password'){
          if(!validator.isLength(this.valuePassword,{min:6,max:12})){
            alert('密码位数6到12位');
            this.passwordRet=false;
          }else {
            this.passwordRet=true;
          }
        }
        if(tagName==='password1'){
          if(this.valuePassword!==this.valuePasswordAgain){
            this.passwordAgainRet=false;
            alert('2次输入的密码不相等')
          }else {
            this.passwordAgainRet=true;
          }
        }
        if(tagName==='captcha'){
          if(!validator.isLength(this.valueCaptcha,{min:4,max:4})){
            alert('验证码位数为4位');
            this.captchaRet=false;
          }else {
            this.captchaRet=true;
          }
        }
      },
      submit:function () {
        if(this.phoneRet && this.passwordRet && this.captchaRet&& this.passwordAgainRet) {
          alert('准许通过');
          var Data=`phone=${this.valuePhone}&password=${this.valuePassword}&password1=${this.valuePasswordAgain}&captcha=${this.valueCaptcha}`;
          console.log(Data)
          axios.post(this.apiUrl+'/sign-up',Data)
            .then(function (response) {
              if(response.data.code==1){
                window.location.href="#/profile/"+response.data.phone;
              }else {
                alert(response.data.msg)
              }
            }).catch(function (error) {
            console.log(error)
          })
        }else {
          alert('信息输入不准确')
        }
      },
      changIMG:function () {
        this.captchaUrl="http://localhost:3009/api/captcha"+"?t="+ Date.now()+Math.random();
      },
  clearAllInput:function () {
    this.valuePhone='';
    this. valuePassword='';
    this.valueCaptcha='';
    this.valuePasswordAgain=''
  }
    }
  }
</script>


<style>

</style>
