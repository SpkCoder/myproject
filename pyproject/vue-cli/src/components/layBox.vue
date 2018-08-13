<template>
	<div id="formApp" class="formBox" v-show="formBoxShow"> 
		  <h4 id="dragbur"><span>Add</span><i class="el-icon-circle-close" @click="closeBox()"></i></h4>
			<span>{{Version}}</span>  	
	</div>
  
</template>

<script>
export default {
  name: 'layBox',
  data () {
    return {
      Version: 'Version 18-03-08',
    }
  },
  props: {
        formBoxShow: {
            type: Boolean,
            required: true
        }
	},
	methods: {
	    closeBox () {
	        this.$emit('closeBox');
	    }
	}
}
</script>


