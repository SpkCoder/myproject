




  var tmpDown; //导出的二进制对象
  function downloadExl(id, type) 
  {

            
            var jsonStr="";
            var jsonArr=[];
            
            var tdLength=$("#"+id+" tr").eq(0).children("td").length;
            var trLength=$("#"+id+" tr").length;
            var trList=$("#"+id+" tr");
            var theadList=trList.eq(0).children("td");

            for(var i=0;i<trLength; i++)
            {
                var tdList=trList.eq(i).children("td");
                var tdArr=[];
                for(var j=1;j<tdLength; j++)
                {
                   var theadTdStr=theadList.eq(j).text();
                   if(theadTdStr != "附件" && theadTdStr != "维修申报" && theadTdStr != "明细" && theadTdStr != "提交审批"){
                   	var tdStr=tdList.eq(j).text();
                   	tdArr.push('"'+theadTdStr+'":'+'"'+tdStr+'"');
                   }
                   
                }
                var tdObj="{"+tdArr.join(",")+"}";
                jsonArr.push(tdObj);
            } 
            
          
           jsonStr="["+jsonArr.join(",")+"]";

           var json=JSON.parse(jsonStr);   //必须转换成json对象
           //console.log(json);
   
          



            var keyMap = []; //获取键
            for (k in json[0]) {
                keyMap.push(k);
            }
            var tmpdata = []; //用来保存转换好的json 
            json.map(function (v, i) {
                return keyMap.map(function (k, j) {
                    return Object.assign({}, {
                        v: v[k],
                        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                    });
                });
            }).reduce(function (prev, next) {
                return prev.concat(next);
            }).forEach(function (v, i) {
                return tmpdata[v.position] = {
                    v: v.v
                };
            });
            var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ['mySheet'], //保存的表标题
                Sheets: {
                    'mySheet': Object.assign({}, tmpdata, //内容
                    {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                    })
                }
            };
            tmpDown = new Blob([s2ab(XLSX.write(tmpWB, { bookType: type == undefined ? 'xlsx' : type, bookSST: false, type: 'binary' //这里的数据是用来定义导出的格式类型
            }))], {
                type: ""
            }); //创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            document.getElementById("xlsx_export").href = href; //绑定a标签
            document.getElementById("xlsx_export").click(); //模拟点击实现下载
            setTimeout(function () {
                //延时释放
                URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);

  }






 //字符串转字符流
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }return buf;
  }





  // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    var temCol = '',
        s = '',
        m = 0;
    while (n > 0) {
        m = n % 26 + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
    }
    return s;
}