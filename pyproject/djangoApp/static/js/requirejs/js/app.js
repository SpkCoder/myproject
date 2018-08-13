require.config({
    
    //存放js的基目录,paths路径基于这个目录
    //默认这个目录的文件会全部加载
    baseUrl: 'js/lib',
    
    //加载js/com/sub.js
    paths: {
        text: '../lib/text',
        sub: '../com/sub'
    }
});

// Start the main com logic.
require(['jquery','canvas','sub'], function ($,canvas,sub) {
    //jQuery, canvas and the com/sub module are all
    //loaded and can be used here now.
    
    // $(".btn").click(function(){
    //     alert(0);
    // });

    $(".btn").click(function(){
        alert(sub.name); 
        alert(sub.add(100,20)); 

        require(['text!../page/about.html'], function (html) {
            $(".box").html(html);
             //console.log(html);
        });
       
        

    });
    
    

});