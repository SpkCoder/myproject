;(function(global){
     //  var drag = new drag("formBox","window");
    //   drag.dragFn();

	function drag()
	{
		 _this = this;
		 this.getArgs = function (inbox,outbox,limit) {
		 	 _this.inbox=document.getElementById(inbox);
		 	 _this.title=document.getElementById("dragbur");
		   if(outbox=="window")
		   {
		      _this.outWidth=document.documentElement.clientWidth;
		      _this.outHeight=document.documentElement.clientHeight;
		   }else
		   {
		      _this.outbox=document.getElementById(outbox);
		      _this.outWidth=_this.outbox.offsetWidth;
		      _this.outHeight=_this.outbox.offsetHeight;
		   }
		   _this.limit=limit;
		   
		 }

	    
	}
	
	
	drag.prototype.dragFn=function(inbox,outbox,limit)
	{
		 var that=this;
		 this.getArgs(inbox,outbox,limit);
	   this.title.onmousedown=function(event)
	   {   
	       
	     this.x=0;
	     this.y=0;
	     this.x=event.clientX-that.inbox.offsetLeft;
	     this.y=event.clientY-(that.inbox.offsetTop - document.documentElement.scrollTop);
	     var that2=this;
	     //console.log(this.x +":"+this.y);
	     document.onmousemove=function(event)
	     {
	      this.outX=event.clientX-that2.x;
	      this.outY=event.clientY-that2.y;
	      this.oWidth=that.outWidth-that.inbox.offsetWidth;
	      this.oHeight=that.outHeight-that.inbox.offsetHeight;
	      //console.log(this.outX+":"+this.outY);
	      if(that.limit=="limitX")
	      {
	        if(this.outX<0)
	        {
	          this.outX=0;   //限制左边
	        }
	        else if (this.outX>this.oWidth)
	        {
	          this.outX=this.oWidth;   //限制右边
	        }
	      }else if(that.limit=="limitY")
	      {
	        if(this.outY<0)
	        {
	          this.outY=0;     
	        }
	        else if (this.outY>this.oHeight)
	        {
	          this.outY=this.oHeight; 
	        }
	      }else if(that.limit=="limitXY")
	      {
	        if(this.outX<0)
	        {
	          this.outX=0;  
	        }
	        else if (this.outX>this.oWidth)
	        {
	          this.outX=this.oWidth;   
	        }
	        if(this.outY<0)
	        {
	          this.outY=0;    
	        }
	        else if (this.outY>this.oHeight)
	        {
	          this.outY=this.oHeight;  
	        }
	      }
	      
	      that.inbox.style.left=this.outX+'px';
	      that.inbox.style.top=this.outY+'px';
	      
	          
	     };
	     document.onmouseup=function(event)
	     {
	      document.onmousemove=null;
	      document.onmouseup=null;  
	     };
	     
	     return false;
	
	   };
	
	};
	
	drag.prototype.resizeFn=function(inbox,formApp)
	{
		var box_width = $("#"+inbox).width();
      	var box_height = $("#"+inbox).height();
      	var left_px = ($(window).width() - box_width)/2 +"px";
      	var top_px = ($(window).height() - box_height)/2 +"px";
      	
  		$("#"+inbox+" .closeBtn").on("click",function () {
  			formApp.resetForm();
  			$("#"+inbox).removeAttr("style"); 
  		});
  		$("#"+inbox+" .plusBtn").on("click",function () {
  			$("#"+inbox).css({left:0, top:0, "max-width":"100%", "max-height":"100%"});
  			$("#"+inbox+" .plusBtn").hide();
  			$("#"+inbox+" .minusBtn").show();
  		});
  		$("#"+inbox+" .minusBtn").on("click",function () {
  			$("#"+inbox).removeAttr("style"); 
  			$("#"+inbox).css({display:"block",left:left_px,top:0});
  			$("#"+inbox+" .minusBtn").hide();
  			$("#"+inbox+" .plusBtn").show();
  		});
  		$("#"+inbox+" .minusBtn").trigger("click");
	}
  
    



    //兼容CommonJs规范 
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = drag;
    };
    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { 
        return drag; 
    });
    //注册全局变量，兼容直接使用script标签引入插件
    if(global.drag){
      throw new Error("global.drag Already exist")
    }else{
      global.drag = drag;
    }
    
})(this);



