<template>
  <div id="app">
    <Navgation></Navgation>
    <router-view></router-view>
    <SignIn></SignIn>
    <SignUp></SignUp>
  </div>
</template>
<script>

import Navgation from './components/navigation.vue'
import SignIn from './components/sign-in.vue'
import SignUp from './components/sign-up.vue'
export default {
  name: 'app',
  components:{ Navgation,SignIn,SignUp

  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
