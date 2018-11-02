document.addEventListener("deviceready", init, false);
function init() {
    
    //相机
	function onSuccess(imageData) {
		console.log('success');
		var image = document.getElementById('myImage');
		image.src = imageData;

		var options = {
			onError: function() {
				alert('ERROR');
			}
		};

		var effect = {
			vignette: 0.6,
			sepia: true
		};

		new VintageJS(image, options, effect);

	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}	

	//Use from Camera
	document.querySelector("#takePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.CAMERA,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});

	//Use from Library
	document.querySelector("#usePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});


    //二维码
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	var resultDiv = document.querySelector("#results");

	function startScan() {
		cordova.plugins.barcodeScanner.scan(
			function (result) {
				var s = "Result: " + result.text + "<br/>" +
				"Format: " + result.format + "<br/>" +
				"Cancelled: " + result.cancelled;
				resultDiv.innerHTML = s;
			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);
	}

}


