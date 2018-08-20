<template>
  <div id="app">
  	<v-header></v-header>
  	<v-menu></v-menu>
  	<router-view/>
  </div>
</template>

<script>
import Vheader from '@/components/Vheader';	
import Vmenu from '@/components/Vmenu';	
export default {
  name: 'App',
  components: {
  	'v-header': Vheader,
  	'v-menu': Vmenu,
  },
  data () {
        return {
            test:'xx'
        }
  },
  methods: {
        introduceSelf (opt) {
            this.test = opt.name;
        }
  }
}
</script>

