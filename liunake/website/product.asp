<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width,maximum-scale=1.0,initial-scale=1.0">
<title>纽莱可</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="css/swiper.min.css" rel="stylesheet" type="text/css">
<link href="css/animate.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="favicon.ico">
<!--[if lte IE9]> 
<script src="js/html5shiv.js"></script>
<link href="css/html5shiv.css" rel="stylesheet" type="text/css"> 
<![endif]-->
</head>
<body>


<!--======head========--> 
<!--#include file="userkj/header.asp"--> 






<!--======p_banner========-->
<section class="p_banner2 clearfix changeimg" data-thumb="images/p_banner01_medium.jpg" data-mobile="images/p_banner01_small.jpg"  style="background:url(images/p_banner01_big.jpg) no-repeat center;background-size:auto 100%;">
  <div class="container clearfix">
     
      
  </div>
</section>










<section class="product_a clearfix" >
  <div class="container clearfix">
  
  
  
  
     <aside class="left">
      <div class="left-1">
      
        <div class="title" >
          <h2>产品中心</h2>
        </div>
          <ul >
            <li><a href="product.asp" target="_self">纽莱可系列</a><span></span></li>
            <li><a href="product.asp" target="_self">欧选系列</a><span></span></li>
            <li><a href="product.asp" target="_self">代膳系列</a><span></span></li>
            <li><a href="product.asp" target="_self">营养品系列</a><span></span></li>
          </ul>
      </div>
      
      
      
      <div class="left-2">
         <div class="box">
            <h3>400-820-7890</h3>
            <h4>营养咨询热线</h4>
            <img alt="" src="images/wechat.png">
            <p>更多营养推荐咨询<br> 请关注纽莱可微信公众号</p>
         </div>
      </div>
      
   </aside>
   
   
   <!--moble menu-->
  <select name="pageselect" onchange="self.location.href=options[selectedIndex].value" >          
     <option value="product.asp" selected="selected">纽莱可系列</option>
     <option value="product.asp">欧选系列</option>
     <option value="product.asp">代膳系列</option>
     <option value="product.asp">营养品系列</option>
  </select>
   
   
   
   <aside class="right">
        <div class="cpbox">
          <ul class="clearfix ">
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
            <li><a href="product_details.asp" target="_self"><img alt="" src="images/cp3.png"><p>澳优精装孕妇奶粉</p><div></div></a></li>
          </ul>
       </div> 
         
      <div class="line" style="clear:both; border-bottom:1px dashed #d7d7d7;" ></div>

       <!--页码-->
      <div class="page" id="page">
        
          <a href="" title="第一页" class="pageFitst">第一页</a>
          <a href="" title="上一页" class="pagePrev">上一页</a>
          <span><a href="" class="nl current">1</a>
                 <a href="">2</a> 
          </span>
          <a href="" title="下一页" class="pageNext">下一页</a>
          <a href="" title="最后一页" class="pageLast">最后一页</a>
                      
      </div>

   
   </aside>
   
   
   
   
   
  </div>
</section>









<!--======foot ========--> 
<!--#include file="userkj/footer.asp"--> 



<script src="js/jquery-1.11.0.min.js" ></script> 
<!-- Initialize Swiper --> 
<script src="js/swiper-3.3.1.jquery.min.js"></script> 
<script>
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
		loop: true,
		
    });
    </script> 
<script src="js/common.js"></script> 
</body>
</html>
