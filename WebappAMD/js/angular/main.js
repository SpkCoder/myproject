'use strict';
require.config({
    paths: {
        'angular': 'angular.min',
        'angular-route': 'angular-route',
        'angularAMD': 'angularAMD.min',
        'ngload': 'ngload.min',
        'jsxlsx': '../js-xlsx-master/xlsx.full.min',
        'conxlsx': '../js-xlsx-master/xlsx.config',
        'xlsx-model': '../angular-xlsx/xlsx-model',
        'ZeroClipboard': '../ueditor/third-party/zeroclipboard/ZeroClipboard'
    },
    shim: {"angular": { 
                  exports: "angular" 
                },
          'angularAMD': { 
                  deps: ['angular'],
                  exports: "angularAMD" 
                }, 
          'ngload': { 
                  deps: ['angularAMD'],
                  exports: "ngload" 
                },
          'angular-route': { 
                  deps: ['angular'],
                  exports: "angular-route" 
                },
          'jsxlsx': { 
                  exports: "jsxlsx" 
               },
          'conxlsx': { 
                  exports: "conxlsx" 
                },
          'xlsx-model': {
                  deps: ['angular'],
                  exports: "xlsx-model" 
                },
          'ZeroClipboard': {
                exports: "ZeroClipboard" 
              }
          
    },
    deps: ['app']
    
});



require(['ZeroClipboard'],function(ZeroClipboard){
    window['ZeroClipboard']=ZeroClipboard;
});



