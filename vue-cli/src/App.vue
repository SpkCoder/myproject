<template>
  <div id="app">
  	<v-header></v-header>
  	<v-aside></v-aside>
    <router-view/>
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
          
        }
  },
  methods: {

  }
}
</script>

