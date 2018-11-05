<template>
  <f7-page>
    <f7-navbar title="Left Panel"></f7-navbar>
    <f7-block strong>
      <p>Left panel content goes here</p>
    </f7-block>
    <f7-block-title>Load page in panel</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title>Load page in main view</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item>
    </f7-list>
    <p><a v-show="show_a" href="#" class="panel-close">Close me</a></p>
    <p><a class="panel-close-my" @click="closeme" href="#" >Close me my</a></p>
  </f7-page>
</template>
<script>
export default {
  data(){
     var _this = this;
     return {
        show_a: _this.global_islogin
     }
  },
  methods: {
      closeme: function(){
         console.log("closeme");
         var mainView = this.$f7.view.main;
         mainView.router.navigate("/form/");
         this.$f7.panel.close();
      }
  },
  watch: {
     show_a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  created(){
       console.log("panel-left.vue");
       console.log(this.$f7);
       
  }

}
</script>