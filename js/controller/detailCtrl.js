(function(angular){
	'use strict'
	angular.module('car')
	.controller('detailCtrl',DetailCtrl);
	DetailCtrl.$inject = ['$scope', '$stateParams','fireService'];
	function DetailCtrl($scope, $stateParams, fireService){
		
		var fullName =  $stateParams.obj;
		console.log(fullName); 
		$scope.cardata  = function(){
			var url = "https://carsite-80aee.firebaseio.com/items/cars.json";
			fireService.getData(url).then(function(data){
      			$scope.car = fireService.detail(fullName,data);
				console.log($scope.car);
		   })
		   .catch(function(response){
		      console.log(response.status);
		   });
		}
		$scope.cardata();

		$scope.first = "";
		$scope.last = "";
		$scope.changeName = function() {
        $scope.personName = $scope.first + " " + $scope.last;
    	}
		$scope.date = ""; 
		$scope.addItem = function(){
			var appointment = {};
			appointment = {
				personName: $scope.personName,
				number: $scope.number,
				date: $scope.date,
				carName: $scope.car.fullName
			};
			fireService.addList(appointment).then(function(data){
        		console.log("Add Done:", data);
        	})
        	.catch(function(response){
		      	console.log(response.status);
		   	});
        	$scope.userForm.$setPristine();
   			$scope.first = "";
			$scope.last = "";
			$scope.date = "";
			$scope.number = "";
        	$('#myModal').modal('hide');
			setTimeout(function() {
		   		$('#alertModal').modal('hide');
		   	}, 3000);
		};







		$(function () {
                $('#datetimepicker1').datetimepicker();
            });
	}
})(window.angular);
