(function(angular){
	angular.module('car')
	.service('fireService',fireService);
	fireService.$inject = ['$http', '$q'];
	function fireService($http, $q){
		

		    this.getData = function(url) {
		        var deferred = $q.defer();
		        $http.get(url)
		        .then(function(response){
		           deferred.resolve(response.data);
		        })
		        .catch(function(response){
		          deferred.reject(response);
		        });
		        return deferred.promise;
		    }

		    this.chunk = function(arr, size=2) {
				    var newArr = [];
				      for (let i=0; i < arr.length; i+=size) {
				          newArr.push(arr.slice(i, i+size));
				      }
				    return newArr;
			}


			this.detail = function(fullName,data){
					var car = []; 
				    for (var i = 0; i < data.length; i++) {			  	
						if (data[i].fullName === fullName ) {
							car = data[i];
							break;
						}
					}
					return car;
			}

			this.addList = function(data) {
		    	var url = "https://carsite-80aee.firebaseio.com/items/appointments.json";
		    	var param = data;
		        var deferred = $q.defer();
		        $http.post(url, param)
		        .then(function(response){
		           deferred.resolve(response.data);
		        })
		        .catch(function(response){
		          deferred.reject(response);
		        });
		        return deferred.promise;
		    }

		    this.status = function(date){
				var status = "";
				var difference = new Date() - new Date(date);

				if (difference >= 0) {
					return status = "Expired";
				} else {
					return status = "Active";
				}		    	
		    }


		    this.addKey = function(obj){
		    	var objectKey ={};
		    	for (key in obj) {
						obj[key].id = key;
						//obj[key].status = this.status (obj[key].date);
    				}
    				objectKey = obj;
    				console.log("Object: ",objectKey);
    				return objectKey;
		    }

		    this.objectToArray= function(obj){
		    	var array= [];
					for (key in obj) {
    					array.push(obj[key]);
    					}
    				console.log("array: ",array);
    				return array;
		    }
			
			this.editInfo = function(id,array){					
					var edit = [];
				    for (let i = 0; i < array.length; i++) {			  	
						if (array[i].id === id) {
							edit = array[i];
							break;
						}
					}
					return edit;
			}

			this.updateList = function(id, data) {
		    	var url = "https://carsite-80aee.firebaseio.com/items/appointments/"+ id + ".json";
		    	var param = data;
		        var deferred = $q.defer();
		        $http.put(url, param)
		        .then(function(response){
		           deferred.resolve(response.data);
		        })
		        .catch(function(response){
		          deferred.reject(response);
		        });
		        return deferred.promise;
		    }

		    this.deleteInfo = function(id) {
		    	var url = "https://carsite-80aee.firebaseio.com/items/appointments/"+ id + ".json";
		        var deferred = $q.defer();
		        $http.delete(url)
		        .then(function(response){
		           deferred.resolve(response.data);
		        })
		        .catch(function(response){
		          deferred.reject(response);
		        });
		        return deferred.promise;
		    }

		    this.sorting = function(array, proName,desc){
		          array.sort(function(a, b){ 
		            var nameA=a[proName].toLowerCase(), nameB=b[proName].toLowerCase(), temp;
		            console.log(typeof a[proName] , typeof a[proName] === "string");
		           
		           if(desc){
		             temp = nameA; nameA= nameB; nameB=temp;
		           }
		           if (nameA < nameB)
		            return -1
		           if (nameA > nameB)
		            return 1
		           return 0
		          });
        	}

        	this.filter = function(result,serach, array){
			    var results = result;
				results.length = 0;
			    for(var i = 0; i < array.length; ++i){
			      if(serach.length > 0){
			        if(array[i].personName.toLowerCase().includes(serach.toLowerCase())|| array[i].carName.toLowerCase().includes(serach.toLowerCase()) 
			          	|| array[i].number.toString().toLowerCase().includes(serach) || array[i].date.toString().toLowerCase().includes(serach))
			        	{
			          
			           		results.push(array[i]);
			        	}
			  
			      	} else {
			        	 	results.push(array[i]);
			      		}
			    	}
			    	return total = results.length;
		 	}

		 	this.groupBy = function(option,data,asc){ 
			 	var groupOrder = [];
			 	var check = data;
			 	var proName = '';
			 	var inner = '';
			 	if (option === 'Name') {
			 		proName = 'personName';
			 		inner = 'date';
			 	} else if(option === 'Car Name'){
			 		proName = 'carName';
			 		inner = 'personName';
			 	} else {
			 		proName = 'date';
			 		inner = 'personName';
			 	}
			 	for (var i = 0; i < check.length; i++) {
			 		if (groupOrder.indexOf(check[i][proName]) === -1) {
			 			groupOrder.push(check[i][proName]);
			 		}	
			 	}
			 	if(asc) {
			 			groupOrder.reverse();
			 		} else {
			 			groupOrder.sort();
			 		}
			 	console.log(groupOrder); 
			 	data.sort(function(a, b) {
					  if (groupOrder.indexOf(a[proName]) < groupOrder.indexOf(b[proName])) {
					    return -1;
					  } else if (groupOrder.indexOf(a[proName]) > groupOrder.indexOf(b[proName])) {
					    return 1;
					  } else if (a[inner] < b[inner]) {
					    return -1;
					  } else if (a[inner] > b[inner]) {
					    return 1;
					  } else {
					    return 0;
					  }
				});
		 	}

		 	this.filterHome = function(result,serach, array){
			    var results = result;
				results.length = 0;
			    for(var i = 0; i < array.length; ++i){
			      if(serach.length > 0){
			        if(array[i].fullName.toLowerCase().includes(serach.toLowerCase())|| array[i].modelName.toLowerCase().includes(serach.toLowerCase()))
			        	{
			          
			           		results.push(array[i]);
			        	}
			  
			      	} else {
			        	 	results.push(array[i]);
			      		}
			    	}
			    	return total = results;
		 	}

		 	this.brandName = function(array){
		 		var brand = [];
			 	var check = array;
			 	for (var i = 0; i < check.length; i++) {
			 		if (brand.indexOf(check[i].brand) === -1) {
			 			brand.push(check[i].brand);
			 		}	
			 	}
			 	return brand;
		 	}

		 	this.brandcount = function(nam,data){ 
		 		var brand = [], count=0, name={}, groupOrder = [];
		 		var brandTotla = nam;
			 	var check = data;
				 	for (let i = 0; i < brandTotla.length; i++) {
				 		for (let j = 0; j < check.length; j++) {
				 			if (brandTotla[i]===check[j].brand) {
				 				count++;
				 			}		
				 		}
				 		name = {
				 			"brand": brandTotla[i],
				 			"count": count
				 			}			 		
				 		brand.push(name);
				 		count = 0;
				 	}
					
					for (let i = 0; i < brand.length; i++) {
				 		if (groupOrder.indexOf(brand[i].count) === -1) {
				 			groupOrder.push(brand[i].count);
				 		}	
			 		}
			 		groupOrder.sort(function(a,b){
			 			return b - a;
			 		});

				 	console.log(groupOrder); 
				 	return brand.sort(function(a, b) {
							  if (groupOrder.indexOf(a.count) < groupOrder.indexOf(b.count)) {
							    return -1;
							  } else if (groupOrder.indexOf(a.count) > groupOrder.indexOf(b.count)) {
							    return 1;
							  } else if (a.brand < b.brand) {
							    return -1;
							  } else if (a.brand > b.brand) {
							    return 1;
							  } else {
							    return 0;
							  }
						});
		 	}

		 	this.rangeFilter = function(data,min,max,array,serach){
		 		var results = data;
				results.length = 0; 
			    for(var i = 0; i < array.length; ++i){

			      if(min > 0 && max > 0){
			      		if (min <= parseInt(array[i][serach]) && max >= parseInt(array[i][serach])){
			      			results.push(array[i]);
			      		}
			      } else if((min == 0 || min == null) && max > 0){
			      		if (max >= parseInt(array[i][serach])){
			      			results.push(array[i]);
			      		}
			      } else if((max == 0 || max == null) && min > 0){
			      		if (min <= parseInt(array[i][serach])){
			      			results.push(array[i]);
			      		}
			      } else {
			      	results.push(array[i]);
			      }
			    }    
			  return total = results;			      	
		 	}


		 	this.checkBox = function(nam,array){
		 		var brand = array;

			 	if (brand.indexOf(nam) > -1) {
			 		brand.splice(brand.indexOf(nam), 1);	
			 	} else {
			 		brand.push(nam);
			 	}	
			 	
			 	return brand;
		 	}

		 	this.checkBoxFilter = function(data,array,name,serach){ //debugger;
		 		var results = data;
				results.length = 0;
				if (name.length > 0) {
					for (let i = 0; i < name.length; i++) {
						for (let j = 0; j < array.length; j++) {
							if (name[i]===array[j][serach]) {
								results.push(array[j]);
							}
						}
					}
					return results;

				} else {
					return array;
				}       				
		 	}





	}
		
	
})(window.angular);


