<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Project name</a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active"><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
        <ul  v-if='msg' class="nav navbar-nav navbar-right">
          <li id="fat-menu" class="dropdown">
            <a id="drop3" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              {{msg}}更多
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="drop3">
              <li><router-link to="/blog">个人博客</router-link></li>
              <li><a href="#">重置密码</a></li>
              <li><router-link :to="{path:'/profile/'+ phone}">个人信息</router-link></li>
              <li role="separator" class="divider"></li>
              <li><a @click="logOut">退出</a></li>
            </ul>
          </li>
        </ul>
        <ul   v-else class="nav navbar-nav navbar-right">
          <li ><a  href="" class="btn" data-toggle="modal"  data-target="#sign-in">登陆</a></li>
          <li ><a  href="" class="btn" data-toggle="modal"  data-target="#sign-up">注册</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default{
     name: "nav",
    data(){
      return{
          msg:localStorage.getItem('username'),
          phone:localStorage.getItem('phone'),
      }
    },
    mounted:function () {
    },
    methods:{
      logOut:function () {
          localStorage.removeItem('username');
          localStorage.removeItem('phone');
          window.location.href='#/';
          window.location.reload()

      }
    }

  }
</script>


<style>

</style>
