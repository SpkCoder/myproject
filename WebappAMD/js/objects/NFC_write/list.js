�}  �  e���i[�}�u
��`5����n��lz���`�L�f�r�� Q�FjP��h-%� _H�Ic�����jJ��A1v�])�a	���\�bQض̫�/rňnw����Y����9��*c[7ɭ�;� P~�,ϖ��/.��j7 vNO|���x�njeĕ�`��Mb<ն��y-��F��L�]���|�B�Qp:= ���8I�\eK��w�.T�9���\�Z��Co�C��xg%�6;s+�6k��M�TgͰh]-a��k�7���gc�ƭ�Ɛ���dcM��ߧ�� uI��}�VјA>�w��?�Hq+'���N�b���ak�CDi�!���UL�`�v(��cr��sm���%�qASf
��G�K0Ժ joT��AF֍�] Rw�Ds��`�G�)�-�J��1]k���ٻ��k��Z����",)�X�o��)�S٢j����`�*�pd�˾�jG7X�9�{�Iv��%g�
	
	$scope.btn_nfc_read = function(){
		if(window.ncp){
			var str = window.ncp.callOnJs4();  //通过ncp代理调用android方法
			if(str){
				str = str.split("/")[1];
				str = str.substr(5);
//				alert(str);
				$scope.read_object_id = str;
			}
			return;
		}
		
		readyRead = true;
        waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");
	}

	

}]; 
});