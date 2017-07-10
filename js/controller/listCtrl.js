(function(angular){
	angular.module('car')
	.controller('listCtrl',ListCtrl);
	
	ListCtrl.$inject = ['$scope', 'fireService','$interval'];
	
	function ListCtrl ($scope, fireService,$interval){

		$scope.listOfData = function(){
			var url = "https://carsite-80aee.firebaseio.com/items/appointments.json";
			fireService.getData(url).then(function(data){
			$scope.lists = fireService.addKey(data);
      		$scope.objectToArray = fireService.objectToArray($scope.lists);
      		$scope.listArray = angular.copy($scope.objectToArray);
      		$scope.totalItems = $scope.listArray.length;
		   })
		   .catch(function(response){
		      console.log(response.status);
		   });
		};

		$scope.listOfData();
		
	    $scope.maxSize=3;
	  	$scope.currentPage=1;
	  	$scope.viewby = 5;
	  	$scope.itemsPerPage = $scope.viewby;

	  	$scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; 
            }       

        $scope.numItem = [3,5,10,15,20,25];

        //*********************Final Sorting***************  

        $scope.sortReverse = true;
        $scope.sortType = "";

        $scope.orderby = function(name){
          $scope.currentPage = 1;
          fireService.sorting($scope.listArray, name, $scope.sortReverse);
          $scope.group = '';
        };

        $scope.group = '';
        $scope.check = false;
        $scope.clicked = function(click) {
        	$scope.check = click; 
        	$scope.groupBy($scope.group);
        }
		 $scope.groupBy = function(option){ //debugger;
		 	fireService.groupBy(option,$scope.listArray,$scope.check);
		 	$scope.sortType = "";
		 };
//************************************************************************

		//********************filter**************************
		$scope.search = '';
		$scope.filter = function(){
			$scope.totalItems = fireService.filter($scope.listArray,$scope.search,$scope.objectToArray);
			$scope.group = '';
			$scope.sortType = "";
		};

		  ///**************filter end****************

        
	

		$scope.alert = function(){
			setTimeout(function() {
		   		$('#alertModal').modal('hide');
		   	}, 3000);
		};

		$scope.editInfo = function(id){
		   	$scope.edit = fireService.editInfo(id,$scope.listArray);
		   	console.log(id,$scope.edit);
		   };

		$scope.update = function(id){
		    console.log(id);
		   	$scope.edited = {
		        personName: $scope.edit.personName,
				number: $scope.edit.number,
				date: $scope.edit.date,
				carName: $scope.edit.carName
        	};
        	fireService.updateList(id,$scope.edited).then(function(data){
        		console.log("Edit Done:", data);
        		//$scope.listOfData();
        	})
        	.catch(function(response){
		      	console.log(response.status);
		   	});
        	$scope.userForm.$setPristine();
        	$scope.edited = {};
        	$('#editModal').modal('hide');
        	$scope.color = "info";
        	$scope.alert();
		   };

		 $scope.delete = function(list){
		 	$scope.id = list.id;
		 	$scope.name = list.personName;
		 	console.log($scope.id, list);
		 };

		$scope.deleteInfo = function(id){
			fireService.deleteInfo(id).then(function(data){
        		console.log("Delete Done", data);
        	})
        	.catch(function(response){
		      	console.log(response.status);
		   	});
		   	$('#deleteModal').modal('hide');
		   	$scope.color = "danger";
		   	$scope.alert();
		   	setTimeout(function() {
		   		$scope.listOfData();
		   	}, 2000);
		};


		$scope.statusCheck = function(date){
			$scope.status = fireService.status(date);
		};

		$interval (function(){
			$scope.status
		},2000);

		 

	} 
		
})(window.angular);

