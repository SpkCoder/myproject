/*  common  */


$(document).ready(function() {
	
	/* 清除margin*/
	$(".ulm2n li:nth-child(2n)").css("margin-right","0");
	$(".ulm3n li:nth-child(3n)").css("margin-right","0");
	$(".ulm4n li:nth-child(4n)").css("margin-right","0");
	$(".ulm5n li:nth-child(5n)").css("margin-right","0");
	$(".ulm6n li:nth-child(6n)").css("margin-right","0");
	
	/* 清除padding*/
	$(".ulp2n li:nth-child(2n)").css("padding-right","0");
	$(".ulp3n li:nth-child(3n)").css("padding-right","0");
	$(".ulp4n li:nth-child(4n)").css("padding-right","0");
	$(".ulp5n li:nth-child(5n)").css("padding-right","0");
	$(".ulp6n li:nth-child(6n)").css("padding-right","0");
	
	$(".ulb3n li:nth-child(3n)").css("border-right","none");

});









$(function(){
	
	$("#link").hover(function()
	{
		$(this).find("#link_box").stop().slideDown();
		
	},function()
	{
		$(this).find("#link_box").stop().slideUp();
		
	});
	
	
	
    $(".tabmenu ul li").mouseover(function(){
    $(this).addClass("selected").siblings().removeClass("selected");      
    var index=$(this).index();                                                          
    $(this).parents(".tab").find(".tabbox dd").eq(index).fadeIn(1000).siblings().fadeOut(1); 
 
    });
	
	

	
	
	
	
	
	$(".soft_b ul li").hover(function()
	{
		$(this).find("p").stop().slideDown();
		
	},function()
	{
		$(this).find("p").stop().slideUp();
		
	});
	
	

	
	function scrollnews(obj){
		var timer;
		var listTop = 0;
		var liheight = $(obj+" ul li").outerHeight(true);
		var lilen = $(obj+" ul li").length; 
	 	var cloneli=$(obj+" ul li:lt(5)").clone(true);
		$(obj+" ul").append(cloneli);

		var topFn= function(){
			if(listTop<=-liheight*lilen){
				$(obj+" ul").css("top",0);
				listTop = 0;
				}
			listTop = listTop-liheight;
			$(obj+" ul").stop().animate({"top":listTop},200);
			};	
		
		timer=setInterval(topFn, 2000);
		
	};
	
	scrollnews(".scroll_box");
	

	
	
	
	/*joinUs*/
	function Cy_rolling(){
		
		var listleft=0;
		var lilen = $(".Cy_rolling ul li").length;  
		var liwidth = 305; 

             $(".Cy_rolling ul li").click(function(){
             $(this).addClass("active").siblings().removeClass("active");      
             var index=$(this).index();                                                          
			 $(".img_list img").eq(index).show().siblings("img").hide();
			 $(".box_list dd").eq(index).show().siblings("dd").hide();
 
             });
	
		
			var rightFn= function(){
				listleft=listleft-liwidth;
				if(listleft<=-liwidth*lilen)
				{
				   listleft=0;

				}

				   $(".Cy_rolling ul").css("left",listleft);
			
				};	

			var leftFn= function(){
				listleft=listleft+liwidth;
				if(listleft>=0)
				{
					listleft=0;

				}
				
				   $(".Cy_rolling ul").css("left",listleft);
				

				};	

			$(".Cy_next").click(rightFn);
			$(".Cy_pre").click(leftFn);
	
	}
	
	Cy_rolling();
	
	
	
	
	
});








$(function(){
	$('#fullPage').fullpage({
		//anchors: ['page1', 'page2', 'page3', 'page4'], //导航菜单
		//menu: '#menu', //导航菜单
		navigation: 'true', //圆点
		afterLoad: function(anchorLink, index){
			//console.log(index);
	         $(".section"+index).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).addClass(ani);
		     }); 
			
	         $(".abus"+index).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).addClass(ani);
		     }); 
			
		},
		onLeave: function(index, direction){
	         $(".section"+index).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).removeClass(ani);
		     }); 
			
	         $(".abus"+index).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).removeClass(ani);
		     }); 
			
		},
		
		afterSlideLoad: function(anchorLink, index,slideIndex,direction){
			//alert(slideIndex);
	         $(".section"+index+" .slide").eq(slideIndex).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).addClass(ani);
		     }); 
			
		},
		onSlideLeave: function(anchorLink, index,slideIndex,direction){
	          $(".section"+index+" .slide").eq(slideIndex).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).removeClass(ani);
		     }); 
		},
		
  });
	
	
    //setInterval(function(){$.fn.fullpage.moveSlideRight();}, 3000);  /* 向右自动滚动*/
    //setInterval(function(){$.fn.fullpage.moveSectionDown();}, 3000);  /* 向下自动滚动*/
    
	
});













window.onload = function(){
   	
	 $(".section1 .slide1").find("[data-animate]").each(function(index, element){
		var ani=$(this).attr("data-animate");
		$(this).addClass(ani);
	 }); 
	
	
	$(".abus1").find("[data-animate]").each(function(index, element){
		var ani=$(this).attr("data-animate");
		$(this).addClass(ani);
	 }); 
};










$(function(){
	 
	
});


















