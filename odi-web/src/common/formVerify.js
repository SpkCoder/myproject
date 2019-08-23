export default {
    rules: function (field_en, data_type) {
        var obj = {};
        field_en.forEach(function (field,index) {
            if (data_type[index] == "text") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (/['|"]+/.test(value)) {
                                return callback(new Error('输入的文本不能包含英文单引号或双引号'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "textarea") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (/['|"]+/.test(value)) {
                                return callback(new Error('输入的文本不能包含英文单引号或双引号'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "int") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[1-9][0-9]*$/.test(value)) {
                                return callback(new Error('请输入正整数'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "int(6)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[1-9][0-9]{5}$/.test(value)) {
                                return callback(new Error('请输入6位正整数'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "decimal(2)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[1-9]*[0]?\.[0-9]{2}$/.test(value)) {
                                return callback(new Error('请保留2位小数'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "decimal(4)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[1-9]*[0]?\.[0-9]{4}$/.test(value)) {
                                return callback(new Error('请保留4位小数'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "date(yyyy-MM-dd HH:mm:ss)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ][0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)) {
                                return callback(new Error('请输入正确格式'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "date(YYYY)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[0-9]{4}$/.test(value)) {
                                return callback(new Error('请输入正确格式'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "date(YYYY-MM)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[0-9]{4}-[0-9]{2}$/.test(value)) {
                                return callback(new Error('请输入正确格式'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "date(yyyy-MM-dd)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
                                return callback(new Error('请输入正确格式'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } else if (data_type[index] == "date(HH:mm:ss)") {
                obj[field] = [
                    {
                        validator: function (rule, value, callback) {
                            if (! /^[0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)) {
                                return callback(new Error('请输入正确格式'));
                            }
                            callback();
                        },
                        trigger: 'blur'
                    }
                ]
            } 
        
        });

        obj["username"] = [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
                validator: function (rule, value, callback) {
                    if (! /[(\w)]{1,30}/.test(value)) {
                        return callback(new Error('用户名必须是字母数字下划线组合'));
                    }
                    callback();
                },
                trigger: 'blur'
            }
        ];

        obj["password"] = [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
                validator: function (rule, value, callback) {
                    if (! /[(\w)]{6,30}/.test(value)) {
                        return callback(new Error('密码必须是字母数字下划线组合且长度>=6'));
                    }
                    
                    callback();
                },
                trigger: 'blur'
            }
        ];
        return obj;
    }
}
