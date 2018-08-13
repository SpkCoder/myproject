var device = {
	Mac : /macintosh|mac os x/i.test(navigator.userAgent),
	Windows : /windows|win32/i.test(navigator.userAgent),
	Linux : /linux/i.test(navigator.userAgent),
	Android : /Android/i.test(navigator.userAgent)
}
for(item in device){
	if(device[item] == true){
		device.os = item;
	}
}
