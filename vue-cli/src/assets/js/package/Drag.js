;(function(global){
    //开启严格模式
    "use strict";
    
    //构造函数定义一个类    传参数
    function Drag(inbox,outbox,limit)
	{
	   this.inbox=document.getElementById(inbox);
	   if(outbox=="window")
	   {
		  this.outWidth=document.documentElement.clientWidth;
	      this.outHeight=document.documentElement.clientHeight;
	   }else
	   {
	   	  this.outbox=document.getElementById(outbox);
	   	  this.outWidth=this.outbox.offsetWidth;
	   	  this.outHeight=this.outbox.offsetHeight;
	   }
	   this.limit=limit;
	   
	}
 
 
    //原型链上提供方法
	Drag.prototype.dragFn=function()
	{
	   var that=this;
	   this.inbox.onmousedown=function(event)
	   {   
	   	   this.x=0;
	   	   this.y=0;
	   	   this.x=event.clientX-that.inbox.offsetLeft;
		   this.y=event.clientY-that.inbox.offsetTop;
		   var that2=this;
		   document.onmousemove=function(event)
		   {
		   	    this.outX=event.clientX-that2.x;
				this.outY=event.clientY-that2.y;
				this.oWidth=that.outWidth-that.inbox.offsetWidth;
				this.oHeight=that.outHeight-that.inbox.offsetHeight;
				// console.log(oWidth+" "+oHeight);
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
		   
		   return false;//解决firefox低版本的bug问题
	
	   };
	
	};
    
    
    //兼容CommonJs规范 
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Drag;
    };
    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { 
        return Drag; 
    });
    //注册全局变量，兼容直接使用script标签引入插件
    if(global.Drag){
    	throw new Error("global.Drag Already exist")
    }else{
    	global.Drag = Drag;
    }
    
})(this);