/*  common.js  */

$(function(){
	
	var swiper = new Swiper('#swiperloop1 .swiper-container', {
		effect : 'slide',  // fade  cube  coverflow  flip
	    pagination: '.swiper-pagination',
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    paginationClickable: true,
	    spaceBetween: 0,  //图片间距
	    centeredSlides: true,
	    autoplay: 3000,
	    autoplayDisableOnInteraction: false,
		loop: true, //轮播
		onSlideChangeEnd: function(swiper){
	        //console.log(swiper.activeIndex);
	        $("#swiperloop1 .swiper-slide").find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).removeClass(ani);
			});
            $("#swiperloop1 .swiper-slide").eq(swiper.activeIndex).find("[data-animate]").each(function(index, element){
				var ani=$(this).attr("data-animate");
				$(this).addClass(ani);
			}); 
	    }
	});


	var swiper = new Swiper('#swiperloop7 .swiper-container', {
		effect : 'slide',  // fade  cube  coverflow  flip
	    pagination: '.swiper-pagination',
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    paginationClickable: true,
	    spaceBetween: 0,  //图片间距
	    centeredSlides: true,
	    autoplay: 3000,
	    autoplayDisableOnInteraction: false,
		loop: true //轮播
	});
	

    $(window).bind("scroll",function(){
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



    // pc nav
    $(".header-pc ul li a").on('click', function() {
    	var li = $(this).parent("li");
    	li.addClass("current").siblings("li").removeClass("current");
		var target = $(this).attr('href');
	    $('html, body').animate({
		   scrollTop: $("div[data-target='"+target+"']").offset().top
		}, 1000);
	});



    // mobile nav
    $(".header-mobile .btn_open").on('click', function() {
    	if($(".header-mobile .navbox").css("right") == "-200px"){
    		$(".header-mobile .navbox").animate({
			   right: "0px"
			}, 500);
    	}else{
    		$(".header-mobile .navbox").animate({
			   right: "-200px"
			}, 500);
    	}
	});

	$(".header-mobile .btn_close").on('click', function() {
    	$(".header-mobile .navbox").animate({
		   right: "-200px"
		}, 500);
	});


	$(".header-mobile ul li a").on('click', function() {
    	var li = $(this).parent("li");
    	li.addClass("current").siblings("li").removeClass("current");
		var target = $(this).attr('href');
	    $('html, body').animate({
		   scrollTop: $("div[data-target='"+target+"']").offset().top
		}, 1000);

		$(".header-mobile .btn_close").click();
	});


	
	
	
});




