export default {
    findData: function (_this, reqData, callback) {
        _this.$http.get(_this.url + '?' + reqData + '&timeStamp=' + Date.now(), { responseType: 'text', withCredentials: true })
        .then(function (data) {
            //console.log(data.body);
            callback(data.body);
        }, function (err) {
            callback(err);
        });
    },
    insertData: function (_this, reqData, callback) {
        _this.$http.post(_this.url + '?' + '&timeStamp=' + Date.now(), reqData, { responseType: 'text', withCredentials: true })
            .then(function (data) {
                //console.log(data.body);
                callback(data.body);
            }, function (err) {
                callback(err);
            });
    },
    updateData: function (_this, reqData, callback) {
        _this.$http.post(_this.url + '?' + '&timeStamp=' + Date.now(), reqData, { responseType: 'text', withCredentials: true })
            .then(function (data) {
                //console.log(data.body);
                callback(data.body);
            }, function (err) {
                callback(err);
            });
    },
    delData: function (_this, reqData, callback) {
        _this.$http.post(_this.url + '?' + '&timeStamp=' + Date.now(), reqData, { responseType: 'text', withCredentials: true })
            .then(function (data) {
                //console.log(data.body);
                callback(data.body);
            }, function (err) {
                callback(err);
            });
    }
}

