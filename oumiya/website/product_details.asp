<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>欧米亚</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="css/animate.css" rel="stylesheet" type="text/css">
<link href="css/swiper.min.css" rel="stylesheet" type="text/css">
<!--[if lte IE9]> 
<script src="js/html5shiv.js"></script>
<link href="css/html5shiv.css" rel="stylesheet" type="text/css"> 
<![endif]-->

</head>

<body style="background: #000;">


<!--======head========--> 
<!--#include file="userkj/header.asp"--> 




<div style="clear: both; height: 100px; width: 100%;"></div>
 <div class="list_nav"><a class="curr" href="product_list.asp" target="_self">玄关</a><a href="product_list.asp" target="_self">茶几</a><a href="product_list.asp" target="_self">角几</a><a href="product_list.asp" target="_self">沙发</a><a href="product_list.asp" target="_self">椅子</a><a href="product_list.asp" target="_self">书架、屏风</a></div>




<div class="product_list">
	<div class="container clearfix">
              


           <!--======轮播========-->
			<div class="swiperloop2 clearfix" id="swiperloop2">

				<!-- Swiper -->
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
						   <img class="img100" alt="" src="images/cp10.png">
						</div>
						<div class="swiper-slide">
						   <img class="img100" alt="" src="images/cp10.png">
						</div>
						<div class="swiper-slide">
						   <img class="img100" alt="" src="images/cp10.png">
						</div>
					</div>
				</div>
				<!-- Add dian -->
				<div class="swiper-pagination"></div>
				<!-- Add Arrows -->
				<div class="swiper-button-next"><p class="btn_p">下一款</p></div>
				<div class="swiper-button-prev"><p class="btn_p">上一款</p></div>

			</div>
	  

	  <h3 class="new_cp"><span>新品推荐</span></h3>
      <ul class="clearfix ulm4n" style="margin-top: 40px;">
		  <li class="scale"><a href="product_details.asp"><img class="img100" alt="" src="images/cp07.png"><p>CY-13002</p></a></li>
		  <li class="scale"><a href="product_details.asp"><img class="img100" alt="" src="images/cp07.png"><p>CY-13002</p></a></li>
		  <li class="scale"><a href="product_details.asp"><img class="img100" alt="" src="images/cp07.png"><p>CY-13002</p></a></li>
	      <li class="scale"><a href="product_details.asp"><img class="img100" alt="" src="images/cp07.png"><p>CY-13002</p></a></li>
	  </ul>
  
  
  
	  </div>	
</div>







<!--======footer========--> 
<!--#include file="userkj/footer.asp"--> 







<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/common.js"></script>
<script type="text/javascript" src="js/swiper-3.3.1.jquery.min.js"></script>

    <script>
    var swiper = new Swiper('.swiperloop2 .swiper-container', {
		effect : 'slide',  // fade  cube  coverflow  flip
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 0,  //图片间距
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
		loop: true, //轮播
    });
    </script>
</body>
</html>