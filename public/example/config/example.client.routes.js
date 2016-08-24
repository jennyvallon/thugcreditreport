angular.module('example').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/snitch', {
            templateUrl: 'example/views/snitch.client.view.html'
        }).when('/movework', {
            templateUrl: 'example/views/movework.client.view.html'
        }).when('/evadepolice', {
            templateUrl: 'example/views/evadepolice.client.view.html'
        }).when('/', {
            templateUrl: 'example/views/example.client.view.html'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);