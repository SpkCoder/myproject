(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4684"],{Sxzp:function(n,e,t){"use strict";var o=t("b5qv");t.n(o).a},Yfch:function(n,e,t){"use strict"},b5qv:function(n,e,t){},c11S:function(n,e,t){"use strict";var o=t("gTgX");t.n(o).a},gTgX:function(n,e,t){},ntYl:function(n,e,t){"use strict";t.r(e);t("Yfch");var o={name:"Login",data:function(){return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:function(n,e,t){e?t():t(new Error("Please input username"))}}],password:[{required:!0,trigger:"blur",validator:function(n,e,t){e.length<5?t(new Error("Please input password")):t()}}]},loading:!1,pwdType:"password",redirect:void 0}},watch:{$route:{handler:function(n){this.redirect=n.query&&n.query.redirect},immediate:!0}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log(n.loginForm),n.loading=!0,n.$store.dispatch("Login",n.loginForm).then(function(){n.loading=!1,n.$router.push({path:n.redirect||"/user/list"})}).catch(function(){n.loading=!1})})}}},s=(t("c11S"),t("Sxzp"),t("KHd+")),r=Object(s.a)(o,function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:n.loginForm,rules:n.loginRules,"auto-complete":"on","label-position":"left"}},[t("h3",{staticClass:"title"},[n._v("AVID")]),n._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),t("el-input",{attrs:{name:"username",type:"text","auto-complete":"on",placeholder:"username"},model:{value:n.loginForm.username,callback:function(e){n.$set(n.loginForm,"username",e)},expression:"loginForm.username"}})],1),n._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),t("el-input",{attrs:{type:n.pwdType,name:"password","auto-complete":"on",placeholder:"password"},nativeOn:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.handleLogin(e):null}},model:{value:n.loginForm.password,callback:function(e){n.$set(n.loginForm,"password",e)},expression:"loginForm.password"}}),n._v(" "),t("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[t("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),t("div",{staticClass:"SignDiv"},[t("span",[n._v("No Sign Up?  ")]),n._v(" "),t("router-link",{attrs:{to:"/sign"}},[n._v("Sign Up")])],1),n._v(" "),t("el-form-item",[t("el-button",{staticStyle:{width:"100%"},attrs:{loading:n.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),n.handleLogin(e)}}},[n._v("\n        Login\n      ")])],1)],1)],1)},[],!1,null,"a2df736c",null);r.options.__file="index.vue";e.default=r.exports}}]);