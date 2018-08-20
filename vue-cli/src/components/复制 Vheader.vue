<template>
  <div class="header">
    <h1 @click="noticeGroup()">{{ test }}</h1>
    <div>
        <img src="../assets/images/logo.png">
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Vheader',
  props: {
  	test: {
            type: String,
            required: false
        }
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
        noticeGroup () {
            this.$emit('introduce',{
                name: "xx",
            });
            this.$http.get("http://localhost:8001/nodejs/userList?action=findData&searchJson=&prePageNum=10&currPage=1", {responseType: 'text'})
						.then(function(data){
							console.log(data.body)
						},function(err){
							console.log("err")
						});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
