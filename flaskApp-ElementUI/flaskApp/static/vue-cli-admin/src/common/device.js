export default {
    os: function () {
        var os = "";
        var arr = ["Mac", "Windows", "Linux", "Android"];
        var device = {
            Mac: /macintosh|mac os x/i.test(navigator.userAgent),
            Windows: /windows|win32/i.test(navigator.userAgent),
            Linux: /linux/i.test(navigator.userAgent),
            Android: /Android/i.test(navigator.userAgent)
        };
        arr.forEach(function (item, index) {
            if (device[item] == true){
                os = item;
            }
        });
        return os;
    }()
}

