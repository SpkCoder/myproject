export default {
    findData: function (_this, reqData, callback) {
        _this.$http.get(_this.url + '?' + reqData, { responseType: 'text', credentials: true })
        .then(function (res) {
            // console.log(res.data);
            callback(res.data);
        }, function (err) {
            callback(err);
        });
    },
    insertData: function (_this, reqData, callback) {
        _this.$http.post(_this.url, reqData, {emulateJSON: true, responseType: 'text', credentials: true })
            .then(function (res) {
                //console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    },
    updateData: function (_this, reqData, callback) {
        _this.$http.post(_this.url, reqData, {emulateJSON:true, responseType: 'text', credentials: true })
            .then(function (res) {
                //console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    },
    delData: function (_this, reqData, callback) {
        _this.$http.post(_this.url, reqData, {emulateJSON:true, responseType: 'text', credentials: true })
            .then(function (res) {
                //console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    }
}

