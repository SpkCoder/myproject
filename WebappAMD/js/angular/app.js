
//app模块依赖"angular", 'angularAMD', 'angular-route' 并且加载进来
define(["angular","angularAMD","angular-route","jsxlsx","conxlsx","xlsx-model"], function (angular, angularAMD) {

    var app = angular.module("ngreq-app", ["ngRoute","xlsx-model"]);

    app.config(function ($routeProvider) {

            $routeProvider
            .when(
                "/",
                angularAMD.route({
                    templateUrl: '/page/system/welcome/list.html'+ timeStamp,
                    controllerUrl: '../js/common/ctrl_index.js'+ timeStamp
                })
            )
            .when(
                "/page/system/local_site/list",
                angularAMD.route({
                    templateUrl: '/page/system/local_site/list.html'+ timeStamp,
                    controllerUrl: '../js/system/local_site/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/dept/list",
                angularAMD.route({
                    templateUrl: '/page/system/dept/list.html'+ timeStamp,
                    controllerUrl: '../js/system/dept/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/model_base/list",
                angularAMD.route({
                    templateUrl: '/page/system/model_base/list.html'+ timeStamp,
                    controllerUrl: '../js/system/model_base/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user/list",
                angularAMD.route({
                    templateUrl: '/page/system/user/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/work_flow/list",
                angularAMD.route({
                    templateUrl: '/page/work/work_flow/list.html'+ timeStamp,
                    controllerUrl: '../js/work/work_flow/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/work_jiedian/list/:id",
                angularAMD.route({
                    templateUrl: '/page/work/work_jiedian/list.html'+ timeStamp,
                    controllerUrl: '../js/work/work_jiedian/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/work_do/list",
                angularAMD.route({
                    templateUrl: '/page/work/work_do/list.html'+ timeStamp,
                    controllerUrl: '../js/work/work_do/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/role/list",
                angularAMD.route({
                    templateUrl: '/page/system/role/list.html'+ timeStamp,
                    controllerUrl: '../js/system/role/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_role/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_role/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_role/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_online/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_online/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_online/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_online/map",
                angularAMD.route({
                    templateUrl: '/page/system/user_online/map.html'+ timeStamp,
                })
            )
            .when(
                "/page/system/user_online_history/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_online_history/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_online_history/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_log/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_log/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_log/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/page_list_template/list",
                angularAMD.route({
                    templateUrl: '/page/system/page_list_template/list.html'+ timeStamp,
                    controllerUrl: '../js/system/page_list_template/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/class_base/list",
                angularAMD.route({
                    templateUrl: '/page/system/class_base/list.html'+ timeStamp,
                    controllerUrl: '../js/system/class_base/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/dept_privilege/list",
                angularAMD.route({
                    templateUrl: '/page/system/dept_privilege/list.html'+ timeStamp,
                    controllerUrl: '../js/system/dept_privilege/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/version/list",
                angularAMD.route({
                    templateUrl: '/page/system/version/list.html'+ timeStamp,
                    controllerUrl: '../js/system/version/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_online_history/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_online_history/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_online_history/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/work_flow/list",
                angularAMD.route({
                    templateUrl: '/page/work/work_flow/list.html'+ timeStamp,
                    controllerUrl: '../js/work/work_flow/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/wait/list",
                angularAMD.route({
                    templateUrl: '/page/work/wait/list.html'+ timeStamp,
                    controllerUrl: '../js/work/wait/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/query/list",
                angularAMD.route({
                    templateUrl: '/page/work/query/list.html'+ timeStamp,
                    controllerUrl: '../js/work/query/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/monitor/list",
                angularAMD.route({
                    templateUrl: '/page/work/monitor/list.html'+ timeStamp,
                    controllerUrl: '../js/work/monitor/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/change/list",
                angularAMD.route({
                    templateUrl: '/page/work/change/list.html'+ timeStamp,
                    controllerUrl: '../js/work/change/list.js'+ timeStamp
                })
            )
            .when(
                "/page/work/work_do_jiedian/list/:id",
                angularAMD.route({
                    templateUrl: '/page/work/work_do_jiedian/list.html'+ timeStamp,
                    controllerUrl: '../js/work/work_do_jiedian/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/model_function/list",
                angularAMD.route({
                    templateUrl: '/page/system/model_function/list.html'+ timeStamp,
                    controllerUrl: '../js/system/model_function/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/reset_password/list",
                angularAMD.route({
                    templateUrl: '/page/system/reset_password/list.html'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_class/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_class/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/count/list",
                angularAMD.route({
                    templateUrl: '/page/objects/count/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/count/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/objects_file/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_file/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_file/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/unit_class/list",
                angularAMD.route({
                    templateUrl: '/page/objects/unit_class/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/unit_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_parameter/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_parameter/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_parameter/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/parameter_template/list",
                angularAMD.route({
                    templateUrl: '/page/objects/parameter_template/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/parameter_template/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_base/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_base/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_base/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/NFC_write/list",
                angularAMD.route({
                    templateUrl: '/page/objects/NFC_write/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/NFC_write/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/NFC_read/list/:id",
                angularAMD.route({
                    templateUrl: '/page/objects/NFC_read/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/NFC_read/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/task/list",
                angularAMD.route({
                    templateUrl: '/page/check/task/list.html'+ timeStamp,
                    controllerUrl: '../js/check/task/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/work_time/list",
                angularAMD.route({
                    templateUrl: '/page/check/work_time/list.html'+ timeStamp,
                    controllerUrl: '../js/check/work_time/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/check_time/list",
                angularAMD.route({
                    templateUrl: '/page/check/check_time/list.html'+ timeStamp,
                    controllerUrl: '../js/check/check_time/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/plan/list/:id",
                angularAMD.route({
                    templateUrl: '/page/check/plan/list.html'+ timeStamp,
                    controllerUrl: '../js/check/plan/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/record/list/:id",
                angularAMD.route({
                    templateUrl: '/page/check/record/list.html'+ timeStamp,
                    controllerUrl: '../js/check/record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/check_detail/list/:id/:work_do_id/:work_state",
                angularAMD.route({
                    templateUrl: '/page/check/check_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/check/check_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/check/list/:id",
                angularAMD.route({
                    templateUrl: '/page/check/check/list.html'+ timeStamp,
                    controllerUrl: '../js/check/check/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/group/list",
                angularAMD.route({
                    templateUrl: '/page/check/group/list.html'+ timeStamp,
                    controllerUrl: '../js/check/group/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/check_group_list/list/:id/:subject",
                angularAMD.route({
                    templateUrl: '/page/check/check_group_list/list.html'+ timeStamp,
                    controllerUrl: '../js/check/check_group_list/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/group_object/list/:id/:subject",
                angularAMD.route({
                    templateUrl: '/page/check/check_group_object/list.html'+ timeStamp,
                    controllerUrl: '../js/check/check_group_object/list.js'+ timeStamp
                })
            )
            .when(
                "/page/check/check_need/list",
                angularAMD.route({
                    templateUrl: '/page/check/check_need/list.html'+ timeStamp,
                    controllerUrl: '../js/check/check_need/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/brand_class/list",
                angularAMD.route({
                    templateUrl: '/page/parts/brand_class/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/brand_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/parts_base/list",
                angularAMD.route({
                    templateUrl: '/page/parts/parts_base/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/parts/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/parts_class/list",
                angularAMD.route({
                    templateUrl: '/page/parts/parts_class/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/parts_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/parts_in/list",
                angularAMD.route({
                    templateUrl: '/page/parts/parts_in/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/parts_in/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/parts_out/list",
                angularAMD.route({
                    templateUrl: '/page/parts/parts_out/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/parts_out/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/storage/list",
                angularAMD.route({
                    templateUrl: '/page/parts/storage/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/storage_info/list.js'+ timeStamp
                })
            )
            .when(
                "/page/parts/storage_product/list",
                angularAMD.route({
                    templateUrl: '/page/parts/storage_product/list.html'+ timeStamp,
                    controllerUrl: '../js/parts/storage_product/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/task/list",
                angularAMD.route({
                    templateUrl: '/page/repaire/task/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/task/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/plan_repaire/list/:id",
                angularAMD.route({
                    templateUrl: '/page/repaire/plan_repaire/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/plan_repaire/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/owner_repaire/list/:id",
                angularAMD.route({
                    templateUrl: '/page/repaire/record_repaire_owner/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/record_repaire_owner/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/out_repaire/list/:id",
                angularAMD.route({
                    templateUrl: '/page/repaire/plan_repaire_out/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/plan_repaire_out/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/record_repaire/list/:id/:work_do_id/:work_state",
                angularAMD.route({
                    templateUrl: '/page/repaire/record_repaire/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/record_repaire/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/fault_class/list",
                angularAMD.route({
                    templateUrl: '/page/repaire/repaire_class/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/repaire_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/record_repaire_out/list/:id/:work_do_id/:work_state",
                angularAMD.route({
                    templateUrl: '/page/repaire/record_repaire_out/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/record_repaire_out/list.js'+ timeStamp
                })
            )
            .when(
                "/page/repaire/repaire_parts/list/:id/:form_id/:btn_show",
                angularAMD.route({
                    templateUrl: '/page/repaire/repaire_parts/list.html'+ timeStamp,
                    controllerUrl: '../js/repaire/repaire_parts/list.js'+ timeStamp
                })
            )
            .when(
                "/page/improve/plan/list/:id",
                angularAMD.route({
                    templateUrl: '/page/improve/plan/list.html'+ timeStamp,
                    controllerUrl: '../js/improve/plan/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/tast/list",
                angularAMD.route({
                    templateUrl: '/page/maintenance/task_maintenance/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/task_maintenance/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/plan_year/list",
                angularAMD.route({
                    templateUrl: '/page/maintenance/plan_maintenance_year/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/plan_maintenance_year/list.js'+ timeStamp
                })
            )
            .when(
                "/page/improve/improve_group/list",
                angularAMD.route({
                    templateUrl: '/page/improve/improve_group/list.html'+ timeStamp,
                    controllerUrl: '../js/improve/improve_group/list.js'+ timeStamp
                })
            )
            .when(
                "/page/improve/improve_detail/list",
                angularAMD.route({
                    templateUrl: '/page/improve/improve_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/improve/improve_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/improve/record/list/:id",
                angularAMD.route({
                    templateUrl: '/page/improve/record/list.html'+ timeStamp,
                    controllerUrl: '../js/improve/record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/improve/detail_record/list/:id/:work_do_id/:work_state",
                angularAMD.route({
                    templateUrl: '/page/improve/detail_record/list.html'+ timeStamp,
                    controllerUrl: '../js/improve/detail_record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/group/list",
                angularAMD.route({
                    templateUrl: '/page/maintenance/group/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/group/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/maintenance_group_list/list",
                angularAMD.route({
                    templateUrl: '/page/maintenance/maintenance_group_list/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/maintenance_group_list/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/maintenance_group_object/list",
                angularAMD.route({
                    templateUrl: '/page/maintenance/maintenance_group_object/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/maintenance_group_object/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_status/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_status/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_status/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/record/list/:id",
                angularAMD.route({
                    templateUrl: '/page/maintenance/record_maintenance/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/record_maintenance/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_status_record/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_status_record/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_status_record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/maintenance/record_maintenance_detail/list/:id/:work_do_id/:work_state",
                angularAMD.route({
                    templateUrl: '/page/maintenance/record_maintenance_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/maintenance/record_maintenance_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/project/list",
                angularAMD.route({
                    templateUrl: '/page/project/project/list.html'+ timeStamp,
                    controllerUrl: '../js/project/project/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/project_run/list",
                angularAMD.route({
                    templateUrl: '/page/project/project_run/list.html'+ timeStamp,
                    controllerUrl: '../js/project/project_run/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/invoice/list",
                angularAMD.route({
                    templateUrl: '/page/project/project_invoice/list.html'+ timeStamp,
                    controllerUrl: '../js/project/project_invoice/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/project_detail/list/:id",
                angularAMD.route({
                    templateUrl: '/page/project/project_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/project/project_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/project_detail_record/list/:id",
                angularAMD.route({
                    templateUrl: '/page/project/project_detail_record/list.html'+ timeStamp,
                    controllerUrl: '../js/project/project_detail_record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/class_project/list",
                angularAMD.route({
                    templateUrl: '/page/project/class_project/list.html'+ timeStamp,
                    controllerUrl: '../js/project/class_project/list.js'+ timeStamp
                })
            )
            .when(
                "/page/project/class_cost/list",
                angularAMD.route({
                    templateUrl: '/page/project/class_n/list.html'+ timeStamp,
                    controllerUrl: '../js/project/class_n/list.js'+ timeStamp
                })
            )
            .when(
                "/page/events/record/list",
                angularAMD.route({
                    templateUrl: '/page/events/record/list.html'+ timeStamp,
                    controllerUrl: '../js/events/record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/events/record_detail/list",
                angularAMD.route({
                    templateUrl: '/page/events/record_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/events/record_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/objects_allocation/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_allocation/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_allocation/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/class_template/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_class_template/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_class_template/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/class/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_class/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/grade_class_form/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_class_form/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_class_form/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/class_base/list",
                angularAMD.route({
                    templateUrl: '/page/grade/class_base/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/class_base/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/class_month/list",
                angularAMD.route({
                    templateUrl: '/page/grade/class_month/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/class_month/list.js'+ timeStamp
                })
            )
            .when(
                "/page/inspect/record/list",
                angularAMD.route({
                    templateUrl: '/page/inspect/record_inspect/list.html'+ timeStamp,
                    controllerUrl: '../js/inspect/record_inspect/list.js'+ timeStamp
                })
            )
            .when(
                "/page/files/files_list/list",
                angularAMD.route({
                    templateUrl: '/page/files/files_list/list.html'+ timeStamp,
                    controllerUrl: '../js/files/files_list/list.js'+ timeStamp
                })
            )
            .when(
                "/page/files/files_policy/list",
                angularAMD.route({
                    templateUrl: '/page/files/files_policy/list.html'+ timeStamp,
                    controllerUrl: '../js/files/files_policy/list.js'+ timeStamp
                })
            )
            .when(
                "/page/files/files_class/list",
                angularAMD.route({
                    templateUrl: '/page/files/class_files/list.html'+ timeStamp,
                    controllerUrl: '../js/files/class_files/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/contract_class/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_class/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/template/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_template/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_template/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/template_detail/list",
                angularAMD.route({
                    templateUrl: '/page/contract/template_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/template_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/base/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_base/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_base/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/base_detail/list",
                angularAMD.route({
                    templateUrl: '/page/contract/base_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/base_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/plan/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_plan/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_plan/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/record/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_record/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/invoice/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_invoice/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_invoice/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/privilege/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_privilege/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_privilege/list.js'+ timeStamp
                })
            )
            .when(
                "/page/contract/contract_project/list",
                angularAMD.route({
                    templateUrl: '/page/contract/contract_project/list.html'+ timeStamp,
                    controllerUrl: '../js/contract/contract_project/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/base_detail/list",
                angularAMD.route({
                    templateUrl: '/page/objects/base_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/base_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/grade_class_main/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_class_main/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_class_main/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/month_template/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_month_template/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_month_template/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/grade_month_main/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_month_main/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_month_main/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/month/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_month/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_month/list.js'+ timeStamp
                })
            )
            .when(
                "/page/grade/grade_month_form/list",
                angularAMD.route({
                    templateUrl: '/page/grade/grade_month_form/list.html'+ timeStamp,
                    controllerUrl: '../js/grade/grade_month_form/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_setup/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_setup/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_setup/list.js'+ timeStamp
                })
            )
            .when(
                "/page/objects/object_person/list",
                angularAMD.route({
                    templateUrl: '/page/objects/object_person/list.html'+ timeStamp,
                    controllerUrl: '../js/objects/object_person/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online/online_video/list",
                angularAMD.route({
                    templateUrl: '/page/online/online_video/list.html'+ timeStamp,
                    controllerUrl: '../js/online/online_video/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_online/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_online/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_online/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_online_history/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_online_history/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_online_history/list.js'+ timeStamp
                })
            )
            .when(
                "/page/system/user_online_history/map",
                angularAMD.route({
                    templateUrl: '/page/system/user_online_history/map.html'+ timeStamp,
                })
            )
            .when(
                "/page/system/user_login_status/list",
                angularAMD.route({
                    templateUrl: '/page/system/user_login_status/list.html'+ timeStamp,
                    controllerUrl: '../js/system/user_login_status/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/monitor_page_default/list",
                angularAMD.route({
                    templateUrl: '/page/monitor/monitor_page_default/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/monitor_page_default/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/monitor_class_default/list/:page_id",
                angularAMD.route({
                    templateUrl: '/page/monitor/monitor_class_default/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/monitor_class_default/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/monitor_page_show/list/:page_id",
                angularAMD.route({
                    templateUrl: '/page/monitor/monitor_page_show/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/monitor_page_show/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/monitor_page_user/list/:page_id",
                angularAMD.route({
                    templateUrl: '/page/monitor/monitor_page_user/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/monitor_page_user/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/monitor_class_user/list/:page_id",
                angularAMD.route({
                    templateUrl: '/page/monitor/monitor_class_user/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/monitor_class_user/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/gallery_class/list",
                angularAMD.route({
                    templateUrl: '/page/monitor/gallery_class/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/gallery_class/list.js'+ timeStamp
                })
            )
            .when(
                "/page/monitor/lamp_gallery/list",
                angularAMD.route({
                    templateUrl: '/page/monitor/lamp_gallery/list.html'+ timeStamp,
                    controllerUrl: '../js/monitor/lamp_gallery/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/Config/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/Config/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/Config/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/DeviceInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/DeviceInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/DeviceInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/DeviceDetailInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/DeviceDetailInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/DeviceDetailInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/CollectModule/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/CollectModule/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/CollectModule/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/PartInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/PartInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/PartInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/MonitorItemConfigInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/MonitorItemConfigInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/MonitorItemConfigInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/MonitorItemConfigInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/MonitorItemConfigInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/MonitorItemConfigInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/ParamItemConfigInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/ParamItemConfigInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/ParamItemConfigInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/AlarmItemConfigInfo/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/AlarmItemConfigInfo/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/AlarmItemConfigInfo/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/SelfFunctionInstance/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/SelfFunctionInstance/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/SelfFunctionInstance/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/SelfFormulaInstance/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/SelfFormulaInstance/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/SelfFormulaInstance/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/QueryTableFunction/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/QueryTableFunction/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/QueryTableFunction/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/ConfigFileOperateLog/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/ConfigFileOperateLog/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/ConfigFileOperateLog/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_config/AlarmItemAndMonitorItem/list",
                angularAMD.route({
                    templateUrl: '/page/online_config/AlarmItemAndMonitorItem/list.html'+ timeStamp,
                    controllerUrl: '../js/online_config/AlarmItemAndMonitorItem/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_task/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_task/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_task/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_group/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_group/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_group/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_group_detail/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_group_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_group_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_group_object/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_group_object/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_group_object/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_record/list/:id",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_record/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_record_detail/list/:id/:work_do_id/:work_state",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_record_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_record_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_run_record/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_run_record/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_run_record/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/need/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_need/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_need/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_realtime/HistoryMonitorItemData/list/:MonitorDeviceid",
                angularAMD.route({
                    templateUrl: '/page/online_realtime/HistoryMonitorItemData/list.html'+ timeStamp,
                    controllerUrl: '../js/online_realtime/HistoryMonitorItemData/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_realtime/HistoryAlarmItemData/list/:MonitorDeviceid",
                angularAMD.route({
                    templateUrl: '/page/online_realtime/HistoryAlarmItemData/list.html'+ timeStamp,
                    controllerUrl: '../js/online_realtime/HistoryAlarmItemData/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_realtime/list",
                angularAMD.route({
                    templateUrl: '/page/online_realtime/list.html'+ timeStamp,
                    controllerUrl: '../js/online_realtime/list.js'+ timeStamp
                })
            )
            .when(
                "/page/smooth/smooth_run_record_detail/list",
                angularAMD.route({
                    templateUrl: '/page/smooth/smooth_run_record_detail/list.html'+ timeStamp,
                    controllerUrl: '../js/smooth/smooth_run_record_detail/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_realtime/RealTimeGps/list",
                angularAMD.route({
                    templateUrl: '/page/online_realtime/RealTimeGps/list.html'+ timeStamp,
                    controllerUrl: '../js/online_realtime/RealTimeGps/list.js'+ timeStamp
                })
            )
            .when(
                "/page/online_realtime/HistoryGps/list",
                angularAMD.route({
                    templateUrl: '/page/online_realtime/HistoryGps/list.html'+ timeStamp,
                    controllerUrl: '../js/online_realtime/HistoryGps/list.js'+ timeStamp
                })
            )
            
            .otherwise(angularAMD.route({
                    templateUrl: '/page/system/welcome/list.html'+ timeStamp,
                }));

    });


    app.directive('onFinishRenderIndex', function ($timeout) {       
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinishedIndex');
                    });
                }
            }
        }
    });


    app.directive('onFinishRender', function ($timeout) {       
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    });

    app.directive('object', function () {       //代替ng-include
        return {
            restrict: 'E',
            templateUrl: '/page/common/objectCom.html'+timeStamp
        }

    });

    app.directive('contract', function () {       //代替ng-include
        return {
            restrict: 'E',
            templateUrl: '/page/common/contractCom.html'+timeStamp
        }

    });



    app.directive('parts', function () {       //代替ng-include
        return {
            restrict: 'E',
            templateUrl: '/page/common/partsCom.html'+timeStamp
        }

    });

    app.directive('approve', function () {       //代替ng-include
        return {
            restrict: 'E',
            templateUrl: '/page/common/approveCom.html'
        }

    });



    app.directive('project', function () {       //代替ng-include

        return {
            restrict: 'E',
            templateUrl: '/page/common/projectCom.html'+timeStamp
        }

    });




    app.filter('trustHtml', function ($sce) {
            
            return function (input) {
                
                return $sce.trustAsHtml(input);

            }

    });

    
    //定义app模块
    return angularAMD.bootstrap(app);
});



