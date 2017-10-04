<template>
  <div id="aa">
    <input v-model="msg" placeholder="输入" @blur="addNew">
    <ul>
      <li v-for="it in item" v-bind:class="{juge: it.isFash}" @click=" Finish(it)">{{it.fash}}</li>
    </ul>
  </div>
</template>
<script>
export default{
  data(){
    return{
      msg:" ",
      item:[
        {
          fash:"哈哈",
          isFash:true
        },
        {
          fash:"呵呵",
          isFash:false
        }
      ],
      isClass:'red',
      test:'blue'
    }
  },
  methods: {
     Finish:function (item) {
       this.item.map(function (it) {
             it.isFash=false;
       })
       item.isFash=true;

     },
      addNew: function (){
      console.log(this.msg)
    }
  }

}
</script>


<style>
  .juge{
    background: green;
  }
.red{
  background: red;
}
  .blue{
    background: blue;
  }
</style>
