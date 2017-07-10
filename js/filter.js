(function(angular){
	angular.module('car')
	.filter('startFrom',StartForm);
		function StartForm(){
		return function(data,start){
	    if (!data || !data.length) { return; }
			return data.slice(start);
		}
	}
})(window.angular);