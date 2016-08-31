var mainApplicationModuleName = 'mean'; 
var mainApplicationModule = angular.module(mainApplicationModuleName
   , ['ngRoute','simulator']);
var url='';
   
mainApplicationModule.config(['$locationProvider',
 function($locationProvider) {
   $locationProvider.hashPrefix('!');
 }
]);
   
angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
    //global factories??
    $("input[name='simulatedAction']").each(function(){
        $(this).click(function(){
          url=$(this).attr('data-url'); 
          window.location.href="/simulator#!/"+url;
        }); 
    });
    
        
});