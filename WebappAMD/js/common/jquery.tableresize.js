/*
用法：$("#table_id").tableresize();
*/  
(function ($) {
    $.fn.tableresize = function (options) {
        
        //设定user-select样式，防止内容被选中
        var set_user_select = function (jqueryobj, val) {
            jqueryobj.css("-moz-user-select", val).css("-webkit-user-select", val).css("-ms-user-select", val);
        };
        $(this).each(function () {
            if (!$.tableresize) {
                $.tableresize = {};
            }
            var _table = $(this);
            var _table_width =null;
            var _tr = _table.find("tr").first();
            var _td = _tr.children();
            
            var _tableObj = $.tableresize;
            _tableObj._currentTd = null, _tableObj._currentTd_width = null,_tableObj._currentPageX = null;
            _td.mousemove(function (e) {
                var _thisTd = $(this);
                var left = _thisTd.offset().left, top = _thisTd.offset().top, width = _thisTd.outerWidth(), height = _thisTd.outerHeight(), right = left + width, bottom = top + height, pageX = e.pageX, pageY = e.pageY;
                var rightSide = Math.abs(right - pageX) <= 5 && pageY > top && pageY < bottom;
                if(rightSide)
                {
                    _table.css("cursor", "e-resize");
                    _tableObj._currentTd=_thisTd;
                }
                else {
                     _table.css("cursor", "auto");
                }
                set_user_select(_table, "none");
            });

            _td.mouseout(function (e) {
                _table.css("cursor", "auto");
                set_user_select(_table, "auto");
            });
            
            _td.mousedown(function (e) {
               if(_tableObj._currentTd){
                    _tableObj._currentPageX = e.pageX;
                    _tableObj._currentTd_width=_tableObj._currentTd.width();
                    _table_width=_table.width();
                    set_user_select(_table, "auto");
                    $("body,html").mousemove(function (e) {
                        var changeWidth = e.pageX - _tableObj._currentPageX;
                        //console.log(changeWidth);
                        _tableObj._currentTd.width(_tableObj._currentTd_width + changeWidth);
                        _table.width(_table_width + changeWidth);
                        _table.prev(".user_title").width(_table_width + changeWidth);
                        _table.css("cursor", "e-resize");
                        set_user_select(_table, "none");
                    
                    });
                   $("body,html").mouseup(function (e) {
                        _tableObj._currentTd = null;
                        $("body,html").off("mousemove");
                        _table.css("cursor", "auto");
                        set_user_select(_table, "auto");
                    });

                  }

            });

        });
    };
})(jQuery);