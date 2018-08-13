define(["jquery"], function ($) {
	
//   var drag = new drag("formBox","window");
//   drag.dragFn();

      //拖拽
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
  
  
  //输出API
  var int = new drag();
  
  
  //输出API
  return{
           int:int
        };
        
});   