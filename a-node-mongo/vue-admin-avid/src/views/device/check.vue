<template>
  <div class="app-container">
    <iframe id="iframeBox" name="iframeBox" src="" frameborder="0" width="100%" height="100%"></iframe>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
  mounted: function () {
    var _this = this;
    document.getElementById("iframeBox").src = 'http://127.0.0.1:6001/users/data/' + _this.$route.params.id;
  },
  methods: {
    view(row) {
       //console.log(row);
    }
  }
  
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
