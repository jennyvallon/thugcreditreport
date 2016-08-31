angular.module('simulator').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/snitch', {
            templateUrl: 'simulator/views/snitch.client.view.html'
        }).when('/movework', {
            templateUrl: 'simulator/views/movework.client.view.html'
        }).when('/evadepolice', {
            templateUrl: 'simulator/views/evadepolice.client.view.html'
        }).when('/', {
            templateUrl: 'simulator/views/instructions.client.view.html'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);