module.exports = class extends think.Model {

     /**
   * demo页面查询
   * @params fieldJson    字段
   * @params whereJson    查询
   * @params sortJson     排序
   * @params limit        每页条数
   * @params offset       当前页
   * @params table        表名
   * @params groupJson    分组
   */

    findAndCount(params, sql, sql_count){
        if(sql){
            //sql 查询
            return Promise.all([this.query(sql), this.query(sql_count)]);
        }else{
            //json 查询
            let fieldStr = '*';
            let whereStr = '';
            let sortStr = '';
            let groupStr = '';

            if(params.fieldJson && Object.keys(params.fieldJson).length>0){
                fieldStr = '';
                for(let k in params.fieldJson){
                    fieldStr += k+', ';
                }
                // fieldStr= fieldStr.substr(0,fieldStr.length-2);
            };
            if(params.whereJson && Object.keys(params.whereJson).length>0){
                whereStr = '';
                for(let k in params.whereJson){
                    let value = params.whereJson[k];
                    if(typeof(value) === 'string'){
                        if(/^\/[.]*\/$/.test(value)){
                            whereStr += k+' like "%'+value.replace(/^\//,'').replace(/\/$/,'')+'%" and ';
                        }else if(/^\/\^[.]*/.test(value)){
                            whereStr += k+' like "'+value.replace(/^\/\^/,'').replace(/\/$/,'')+'%" and ';
                        }else if(/[.]*\$\/$/.test(value)){
                            whereStr += k+' like "%'+value.replace(/^\//,'').replace(/\$\/$/,'')+'" and ';
                        }else{
                            whereStr += k+' = "'+value+'" and ';
                        }
                    }else if(typeof(value) === 'number'){
                        whereStr += k+' = '+value+' and ';
                    }else if(value.constructor === Object){
                        if(Object.keys(value).indexOf('$gt') != -1){
                            whereStr += k+' > '+value['$gt']+' and ';
                        }
                        if(Object.keys(value).indexOf('$lt') != -1){
                            whereStr += k+' < '+value['$lt']+' and ';
                        }
                        if(Object.keys(value).indexOf('$gte') != -1){
                            whereStr += k+' >= '+value['$gte']+' and ';
                        }
                        if(Object.keys(value).indexOf('$lte') != -1){
                            whereStr += k+'<= '+value['$lte']+' and ';
                        }
                        if(Object.keys(value).indexOf('$ne') != -1){
                            whereStr += k+'!= '+value['$ne']+' and ';
                        }
                        if(Object.keys(value).indexOf('$in') != -1){
                            if(value['$in'].constructor === Array){
                                JSON.stringify(value['$in']).replace('[','(')
                                whereStr += k+' in '+JSON.stringify(value['$in']).replace(/\[/,'(').replace(/\]/,')')+' and ';
                            }
                        }
                        if(Object.keys(value).indexOf('$nin') != -1){
                            if(value['$nin'].constructor === Array){
                                JSON.stringify(value['$nin']).replace('[','(')
                                whereStr += k+' not in '+JSON.stringify(value['$nin']).replace(/\[/,'(').replace(/\]/,')')+' and ';
                            }
                        }
                    }else if(value.constructor === Array && k==='$or'){
                        let or_str = ''
                        for(let k2 in value){
                            for(let k3 in value[k2]){
                                if(typeof(value[k2][k3]) === 'string'){
                                    or_str += k3+' = "'+value[k2][k3]+'" or ';
                                }else if(typeof(value[k2][k3]) === 'number'){
                                    or_str += k3+' = '+value[k2][k3]+' or ';
                                }else{
                                    //
                                }
                            }
                        }
                        or_str= or_str.substr(0,or_str.length-4);
                        if(or_str){ whereStr += '('+or_str+')'+' and '; }
                    }else{
                        //
                    }
                }
                whereStr= whereStr.substr(0,whereStr.length-5);
            };
            if(params.sortJson && Object.keys(params.sortJson).length>0){
                sortStr = '';
                for(let k in params.sortJson){
                    if(params.sortJson[k] > 0){
                        sortStr += k+' asc, ';
                    }else{
                        sortStr += k+' desc, ';
                    }
                }
                sortStr= sortStr.substr(0,sortStr.length-2);
            };
            
            if(params.groupJson && Object.keys(params.groupJson).length>0){
                for(let k in params.groupJson){
                    let value = params.groupJson[k];
                    if(value.constructor === Object){
                        if(Object.keys(value).indexOf('$sum') != -1){
                            fieldStr += 'sum('+value['$sum']+') as '+k+', ';
                        }
                    }else{
                        groupStr += k+', ';
                    }
                }
                groupStr= groupStr.substr(0,groupStr.length-2);
            };
            
            if(fieldStr.length>1){
                fieldStr= fieldStr.substr(0,fieldStr.length-2);
            }
            let sql_count = 'select count(*) as number from `'+params.table+'`';
            let sql = 'select '+fieldStr+' from `'+params.table+'`';
            if(whereStr){
                sql_count += ' where ' + whereStr;
                sql += ' where ' + whereStr;
            }
            if(groupStr){
                sql_count += ' group by ' + groupStr;
                sql_count = 'select count(*) as number from ('+sql_count+') gyd';
                sql += ' group by ' + groupStr;
            }
            if(sortStr){
                sql += ' order by ' + sortStr;
            }
            sql += ' limit '+params.offset+','+params.limit;
            
            return Promise.all([this.query(sql), this.query(sql_count)]);

        }

    }

   

};
