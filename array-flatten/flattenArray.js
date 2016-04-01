var	Utility = (function(){

	function flattenArray(arr){

		if(!Array.isArray(arr) || arr.length === 0){
			throw new Error('The parameter passed to flattenArray function has to be a not empty array');
		}
		
		var flattened = [];

		flatten(arr);

		function flatten(arr){
			arr.forEach(function(item){
				if(Array.isArray(item)){
					flatten(item);
				}else{
					flattened.push(item);
				}
			});
		}

		return flattened;
	}

	return {
		flattenArray: flattenArray 
	}
})();
