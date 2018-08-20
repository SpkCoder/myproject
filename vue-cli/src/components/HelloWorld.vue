<template>
	<div class="vue-body clearfix">
	  <div class="list-page-point">
		   <div class="container">
		     <p><i class="layui-icon" style="font-size: 14px;"></i><span>User&gt;&gt;User List</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
  	  <div class="container clearfix">
			  <div class="hello">
			    <h1>{{ msg }}</h1>
			    <h2>index.html</h2>
			    <ul>
			      <li>
			        <a
			          href="#/"
			          target="_self"
			        >
			          index.html
			        </a>
			      </li>
			      <li>
			        <a
			          href="#/page/testList"
			          target="_self"
			        >
			          testList.html
			        </a>
			      </li>
			    </ul>
			    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
			  </div>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'index.html'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
