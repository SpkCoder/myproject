<template>
  <div class="header clearfix">
       <div class="container clearfix">
        <div class="logo-left"><img src="../assets/image/ecast.png"></div>
	      <div class="logo-right">
	        <img src="../assets/image/vqlogo.png">
	        <span>{{Version}}</span> 
	      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vheader',
  data () {
    return {
      Version: 'Version 18-03-08'
    }
  },
  methods: {
        
  }
}
</script>


