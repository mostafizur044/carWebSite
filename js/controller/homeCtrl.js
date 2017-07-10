(function(angular){
	angular.module('car')
	.controller('homeCtrl',HomeCtrl);
	HomeCtrl.$inject = ['$scope','fireService'];
	function HomeCtrl($scope, fireService){
		$scope.cardata  = function(){
			var url = "https://carsite-80aee.firebaseio.com/items/cars.json";
			fireService.getData(url).then(function(data){
      		$scope.myInterval = 3000;
      		$scope.cars = data;
			$scope.subCars = fireService.chunk($scope.cars);
			console.log("array " , $scope.subCars);
			$scope.totalItems = $scope.subCars.length;
			var brandName = fireService.brandName($scope.cars);
			$scope.brandcount = fireService.brandcount(brandName,$scope.cars);
			console.log($scope.brandcount);
		   })
		   .catch(function(response){
		      console.log(response.status);
		   });
		}
		$scope.cardata();

		$scope.maxSize=3;
	  	$scope.currentPage=1;
	  	$scope.viewby = 4;
	  	$scope.itemsPerPage = $scope.viewby;
	  	$scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; 
            }       
        $scope.numItem = [4,10,15,20];

        $scope.search = '';
		$scope.filter = function(){
			var array = angular.copy($scope.subCars);
			var filterArray = fireService.filterHome(array,$scope.search,$scope.cars);
			$scope.subCars = fireService.chunk(filterArray);
			$scope.totalItems = $scope.subCars.length;
		};

		$scope.bodytype = function(){
			var url = "https://carsite-80aee.firebaseio.com/items/bodyType.json";
      		fireService.getData(url).then(function(data){
      		console.log(data);
      		$scope.bodyType = data;
		   })
		   .catch(function(response){
		      console.log(response.status);
		   });
		}
		$scope.bodytype();

		$scope.start = 0;
		$scope.end = 6;
		$scope.showMore = function(){
			$scope.end = $scope.brandcount.length;
		}
		$scope.hideMore = function(){
			$scope.end = 6;
		}	
		
		$scope.resetPrice = function(){
			$scope.minprice = '';
			$scope.maxprice = '';
		}
		$scope.resetYear = function(){
			$scope.minyear = '';
			$scope.maxyear = '';
		}
		$scope.resetMileage = function(){
			$scope.minmileage = '';
			$scope.maxmileage = '';
		}		
		$scope.range = function(min,max,search){
			var array = angular.copy($scope.subCars);
			var filterArray = fireService.rangeFilter(array,min,max,$scope.cars,search);
			$scope.subCars = fireService.chunk(filterArray);
			$scope.totalItems = $scope.subCars.length;
			console.log(filterArray);
		}

		$scope.brand = [];
		$scope.checkbox = function(search,num){
			var checkedArray = fireService.checkBox(search,$scope.brand);
			console.log(checkedArray);
			var array = angular.copy($scope.subCars);
			var filterArray = fireService.checkBoxFilter(array,$scope.cars,checkedArray,num);
			$scope.subCars = fireService.chunk(filterArray);
			$scope.totalItems = $scope.subCars.length;
			console.log(filterArray);
		}


	}
})(window.angular);	















































// var imageUrl = fireService.getImageUrl() ;
			// var carImage = $firebaseArray(imageUrl);
			// //console.log("before " , carImage);

			
			// carImage.$loaded()
			// .then(function() {
			// 	console.log(carImage);
			// 	//************** Carsuoel*************
   //  			$scope.myInterval = 3000;
			// 	$scope.cars = carImage;
			// 	//************** grid divide**********
			// 	// var chunk = function(arr, size=2) {
			//  //    var newArr = [];
			//  //      for (let i=0; i < arr.length; i+=size) {
			//  //          newArr.push(arr.slice(i, i+size));
			//  //      }
			//  //    return newArr;
			// 	// };
			// 	// $scope.subCars = chunk($scope.cars);
			// 	// console.log("array " , $scope.subCars);
			// 	//*************************************
				
  	// 		})
  	// 		.catch(function(error) {
   //  			console.log("Error:", error);
  	// 		});