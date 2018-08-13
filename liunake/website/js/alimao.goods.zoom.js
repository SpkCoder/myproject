$(document).ready(function(){
$('#alm_smallimg li img').bind("mouseenter",function(){
$(".alm_figimg img").attr("src", $(this).attr("src"));
$(".alm_bigimg img").attr("src", $(this).attr("rel"));
})
if(navigator.userAgent.match(/mobile/i)){
$(function(){
var startX,startY,endX,endY,_x,_y;
document.querySelector('#mousetrap').addEventListener("touchstart", touchStart, false);
document.querySelector('#mousetrap').addEventListener("touchmove", touchMove, false);
document.querySelector('#mousetrap').addEventListener("touchend", touchEnd, false); 
function touchStart(e) {
var touch = e.touches[0];
startX = touch.pageX;
startY = touch.pageY;
_x=startX-$('#mousetrap').offset().left;
_y=startY-$('#mousetrap').offset().top;
$('#mousetrap').addClass("no-mousetrap");
$(".alm_bigimg").fadeIn(300);
$(".alm_bigimg img").css({maxHeight:'inherit',maxWidth:'inherit'});
var mbigw = $(".alm_bigimg img").width()-$(".alm_bigimg").width();
var mbigh = $(".alm_bigimg img").height()-$(".alm_bigimg").height();
var mmw = $('#mousetrap').width();
var mmh = $('#mousetrap').height();
mnw = mbigw/mmw;
mnh = mbigh/mmh;
var mnowX = (_x*mnw);
var mnowY = (_y*mnh);
$(".alm_bigimg img").css({left:-mnowX,top:-mnowY});
}
function touchMove(e) {
var touch = e.touches[0];
endX = touch.pageX;
endY = touch.pageY;
var mX = endX-$('#mousetrap').offset().left;
var mY = endY-$('#mousetrap').offset().top;
var mmw = $('#mousetrap').width();
var mmh = $('#mousetrap').height();
var mtX = mX*mnw;
var mtY = mY*mnh;
if(mX>0 && mX<mmw && mY>0 && mY<mmh){$(".alm_bigimg img").css({left:-mtX,top:-mtY})}
}
function touchEnd(e) {
var touch = e.touches[0];
$(".alm_bigimg").fadeOut(300);
$('#mousetrap').removeClass("no-mousetrap");
e.stopPropagation();
}})
}else{
var pageX, pageY;
$('#mousetrap').on("mousemove",function(e){
pageX = e.pageX;
pageY = e.pageY;
cX = pageX-$(this).offset().left;
cY = pageY-$(this).offset().top;
cX=parseInt(cX);
cY=parseInt(cY);
$('#mousetrap').addClass("no-mousetrap");
$(".alm_bigimg").fadeIn(300);
$(".alm_bigimg img").css({maxHeight:'inherit',maxWidth:'inherit'});
var bigw = $(".alm_bigimg img").width();
var bigh = $(".alm_bigimg img").height();
var kw = $(".alm_bigimg").width();
var kh = $(".alm_bigimg").height();
var mw = $('#mousetrap').width();
var mh = $('#mousetrap').height();
var pw = bigw-kw;
var ph = bigh-kh;
nw = pw/mw;
nh = ph/mh;
var nowX = (cX*nw);
var nowH = (cY*nh);
$(".alm_bigimg img").css({left:-nowX,top:-nowH});
})
$('#mousetrap').on("mouseleave",function(e){	
$(".alm_bigimg").fadeOut(300);
$('#mousetrap').removeClass("no-mousetrap");
})		
}

/*details_tab*/
$('.details_tab li').click(function(){
$(this).addClass('curr').siblings().removeClass();
$(".details > div").slideUp().eq($('.details_tab li').index(this)).slideDown();
})

/*mobile menu*/
if($("body").width()<768){
$('#details_menu').on("tap",function(){
$('.details_tab ul').stop(true).slideToggle();
});

$("body").on("tap",function(e){
var _con = $('#details_menu');
if(!_con.is(e.target) && _con.has(e.target).length==0){
$('.details_tab ul').slideUp();
}})
}

})

