<template>
  <div id="app">
  	<v-header :msg="leftMenu" @topMenuOver="emitView"></v-header>
  	<v-aside @leftMenuOver="emitTopMenu"></v-aside>
    <router-view :msg="topMenu"/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Vheader from '@/components/v_header'; 
import Vaside from '@/components/v_aside'; 
import Vfooter from '@/components/v_footer';	
export default {
  name: 'App',
  components: {
    'v-header': Vheader,
    'v-aside': Vaside,
  	'v-footer': Vfooter,
  },
  data () {
        return {
          leftMenu: false,
          topMenu: false
        }
  },
  methods: {
      emitTopMenu(data) {
          this.leftMenu = true;
      },
      emitView(data) {
          this.topMenu = true;
      }
  }
}
</script>

