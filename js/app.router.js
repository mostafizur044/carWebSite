(function(angular){
	angular.module('car')
    .config(uiRouterFunction); 

    uiRouterFunction.$inject= ['$stateProvider','$urlRouterProvider'];
    function uiRouterFunction($stateProvider, $urlRouterProvider){

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .state('detail', {
            url: '/detail/:obj',
            templateUrl: 'views/details.html',
            controller: 'detailCtrl'
        })
        .state('list', {
             url: '/list',
            templateUrl: 'views/list.html',
            controller: 'listCtrl'    
        });

    $urlRouterProvider.otherwise('/home');

    }

})(window.angular);

