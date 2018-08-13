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



 /*多个选项卡*/
$(document).ready(function(){
    $(".tabmenu ul li").click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");      
    var index=$(this).index();                                                          
    $(this).parents(".tab").find(".tabbox dd").eq(index).show().siblings().hide();                                   
 
   });
});




/*左侧折叠菜单
$(document).ready(function(){
	
	$('.m-title1').click(function(){
		var mul = $(this).next('ul');
		$(this).parents('dl').find('.menuson').slideUp();
		if(mul.is(':visible')){
			$(this).next('.menuson').slideUp();
			$(this).removeClass('selected');

		}else{
			$(this).next('.menuson').slideDown();
		    $(this).parents('dl').find('.m-title1').removeClass('selected');
			$(this).addClass('selected');
		}
	});

});

*/






$(document).ready(function(){
	


		$(".header .pc-nav > li").hover(function(){
			
		    $(this).find(".pc-menu").stop(true,false).slideDown(500);
		 
		 },function(){
			
		   $(this).find(".pc-menu").stop(true,false).slideUp(500);
			
		});


});






$(document).ready(function(){
	
		$("#searchBtn").click(function(){
			
		    $("#out_search").slideDown(500);
			$(".head-icon").hide();
			
		});

		$("#shutDown").click(function(){
			
		    $("#out_search").slideUp(500);
			$(".head-icon").show();
			
		});


});





window.onload = function(){
	$(window).scrollTop(1);

};


$(window).bind("scroll",function(){
	
	
	if($(window).scrollTop()>50 && screen.width>768)
	    {
		  $('.header').slideUp(500);
		  $("#out_search").slideUp(500);
		  $(".head-icon").show();

		}
		else{
			$('.header').slideDown(500);
			}
		
		
			
	
	$("[data-animate]").each(function(index, element) {
		var s = $(this).offset().top;
		var v=$(this).attr("data-animate");
		if (s >= $(window).scrollTop() && s < ($(window).scrollTop()+$(window).height())){
			
		$(this).addClass(v);
		setTimeout(function(){
					$(this).removeClass(v);						
				},1000);
		
		}
	
	});
   
   
});








if ($("body").width() <= 768) {
	
    $(".pc-nav").remove();
    $(".head-icon").remove();
    $("#out_search").remove();
    $(".product_a .left").remove();
    $("#moble_time").text($("#pc_time").text());
    $("#pc_time").remove();

		 
}






/*mobile menu*/
 
if ($("body").width() <= 768) {
	
    $("#m_menu").click(function() {
		
		 
        if ( $(this).hasClass("menuicon-out") ) {
            $(this).removeClass("menuicon-out").addClass("menuicon-in");
        } else {
            $(this).removeClass("menuicon-in").addClass("menuicon-out");
        }
        $("#sf-menu").stop(true).slideToggle().toggleClass("menufade");
    });
   $('.sf-menu > li > span').on("click",
    function() {
        $(this).next().slideToggle(300).parent().siblings().children('ul').slideUp();
    }); 
}




/*切换图片*/

$(".changeimg").each(function (){
	
	var thumbSrc = $(this).attr("data-thumb");
	var mobileSrc = $(this).attr("data-mobile");
	
	if ($("body").width() > 768 && $("body").width() <= 980) {
	  $(this).css({"background":"url(" +thumbSrc+ ") no-repeat center","background-size":"auto 100%"});	
		
	}
	else if($("body").width() <= 768){
	  $(this).css({"background":"url(" +mobileSrc+ ") no-repeat center","background-size":"auto 100%"});
	}
	
	
	
});








