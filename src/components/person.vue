<template>
<div>
  <div class="container jumbotron" style="margin-top: 100px">
    <h1>{{username}}的博客主页</h1>
    <p class="lead"> 你可以在这里和喜欢电脑组装的朋友们一起交流.</p>
      <img :src="picture" v-if="pictureRet" class="img-responsive img-thumbnail" alt="Responsive image" style="width:140px;height:140px">
      <img src="images/nohead.jpg" v-else class="img-responsive img-thumbnail" alt="Responsive image" style="width:140px;height:140px">
      <h4 style="color: #2472ee" >说点什么？</h4>
    <form action="" id="sayBlog" style="margin-top: 30px">
      <input type="text" class="form-control" placeholder="标题" id="title" name="title">
                    <textarea  placeholder="请在此处介绍自己..." class="form-control" rows="10" style="resize: none ;margin-top: 20px" name="content" id="content">
                    </textarea>
      <button type="button" class="btn btn-primary" style="margin-top: 20px">发布</button>
    </form>
  </div>
  <div class="container">
    <ul id="itemContainer">
      <li v-for="blog in blogs">
        <div class="post_item" >
          <div class="post_item_body">
            <h3><a class="titlelnk" target="_blank">
              {{blog.title}}
            </a></h3>
            <p class="post_item_summary">
              <a  target="_blank">
                 <img :src="blog.authorPicture" v-if="blog.authorPicture" width="48" height="48" class="pfs" alt="图片"/>
                 <img  width="48" height="48" v-else class="pfs" src="../../static/images/nohead.jpg" alt="图片"/>
              </a>
              {{blog.content}}
            </p>
            <div class="post_item_foot">
              <a  class="lightblue"></a>
              发布于
                <span class="article_comment"><a  title="" class="gray">
        评论({{blog.comment}})</a></span>
       <span class="article_comment"><a title="" class="gray">
        点赞({{blog.like}})</a></span>
       <span class="article_comment"><a title="" class="gray">
        踩({{blog.hate}})</a></span>
                 <span class="article_comment"><a title="" class="gray">
        阅读({{blog.read}})</a></span>
              <span class="article_view"><a class="gray" >删除</a></span></div>
          </div>
          <hr>
        </div>
      </li>
    </ul>
    <div class="holder" style="float: right"></div>
  </div>
</div>
</template>
<script>
  import axios from 'axios'
  export default{
    name:'person',
     data(){
       return{
         msg:"sds",
         username:'111',
         realname:'',
         picture:'',
         blogs:[],
         pictureRet:false,
         pictureUrl:"http://localhost:3009",
         phoneUrl:window.location.href.split('/').pop()
       }
     },
    mounted:function () {
       var This=this;
      axios.get("http://localhost:3009/api/list-sn/"+this.phoneUrl)
        .then(function (response) {
          console.log(This.username);
          var User=response.data.user;
          var Blog=response.data.blog;
          if(User.picture.length>0){
            This.pictureRet=true;
          }else {
            This.pictureRet=false;
          }
        Blog.map(function (item) {
          console.log(item.authorPicture);
           if(item.authorPicture!==undefined){
             item.authorPicture=This.pictureUrl+item.authorPicture
           }else {
             item.authorPicture=false;
           }
        });
          This.username=User.username;
          This.picture=This.pictureUrl+User.picture;
          This.blogs=Blog;
          console.log(This.blogs)
        }).catch(function (error) {
        console.log(error)
      })
    }
  }
</script>

<style>
  .post_item_summary{
    line-height:1.8em;
    margin-bottom:5px;
    color:#333;
    overflow:hidden;
    padding-right:5px;
    font-size:12px;
    padding-top:5px;
    word-wrap:break-word;
  }
  .article_comment>a{
    color: #ff117a;
    text-decoration: none;
  }
  #itemContainer{
    list-style: none;
  }
</style>
