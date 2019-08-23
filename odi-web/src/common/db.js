export default {
    findData: function (_this, url, reqData, callback) {
        _this.$http.get(url + '?' + reqData, { responseType: 'text', credentials: true })
            .then(function (res) {
                // console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    },
    insertData: function (_this, url, reqData, callback) {
        _this.$http.post(url, reqData, {emulateJSON: true, responseType: 'text', credentials: true })
            .then(function (res) {
                //console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    },
    updateData: function (_this, url, reqData, callback) {
        _this.$http.post(url, reqData, {emulateJSON:true, responseType: 'text', credentials: true })
            .then(function (res) {
                //console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    },
    delData: function (_this, url, reqData, callback) {
        _this.$http.post(url, reqData, {emulateJSON:true, responseType: 'text', credentials: true })
            .then(function (res) {
                //console.log(res.data);
                callback(res.data);
            }, function (err) {
                callback(err);
            });
    }
}

