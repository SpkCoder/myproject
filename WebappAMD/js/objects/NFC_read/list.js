�}�  �  �03��L}�u
��55����T �X],� �f�ݔ�r\��e:��eT��y�m�R���:���q�E9�ְ�)J&������|=�:�M�N�$���d3���_pW�a�`�����I&�[����&�U�R�[�!qpQ�{%e� ao�%؝�@W��D	�Ͻ�sA<�}Ç��4^�{�f�����`C{"��c��i����ݐ5HJf��W�>��k��b,���I0�i3O�d޴�%^!����uj��D"��*�?�_�b� ^���o����In�1��2{�o�N.���z���E��݂p�;�K�J�8E�
�/ӑ�6��n�'�>����0g䪑Y�z�>҅�zٙ�L�cr��sm���%�qASf
��G�K0Ժ joT��AF֍�] Rw�Ds��`�G�)�-�J��1]k���ٻ��k��Z����",)�X�o��)�S٢j����`�*�pd�˾�jG7X�9�{�Iv��%g�l,
        dataType:"json",
    })
    .success(function (data, status, headers, config) {
    	if(data.rows[0]){
    		$scope.objectData = data.rows[0];
    	}else{
    		alert("该nfc卡片录入设备id有误，不能获取到相关数据");
    		window.history.go(-1);
    	}
    })
	
	$scope.formTypeChange = function(url){
//		alert(httpBefore + $scope.form_type + $scope.read_object_id);
		location.href = httpBefore + url + $scope.read_object_id;
	}

	
	
	
	


}]; 
});