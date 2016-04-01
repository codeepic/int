describe('flattenArray function', function(){
	
	it('should throw an error if passed an empty array as parameter', function(){
		expect(function(){
			Utility.flattenArray([])
		}).toThrowError();
	});

	it('should throw an error if passed a parameter which is not an array', function(){
		expect(function(){
			Utility.flattenArray(3);
		}).toThrowError();
	});

	it('should throw an error if passed null parameter', function(){
		expect(function(){
			Utility.flattenArray(null);
		}).toThrowError();
	});

	it('should throw an error if passed undefined parameter', function(){
		expect(function(){
			Utility.flattenArray(undefined);
		}).toThrowError();
	});

	it('should throw an error if passed no parameter', function(){
		expect(function(){
			Utility.flattenArray();
		}).toThrowError();
	});

	it('should return flattened array when passed an array or nested array', function(){
		expect(Utility.flattenArray(['simple'])).toEqual(['simple']);
		expect(Utility.flattenArray([undefined, null, 0, Function])).toEqual([undefined, null, 0, Function]);
		expect(Utility.flattenArray([1, 2, 'Mark'])).toEqual([1,2,'Mark']);
		expect(Utility.flattenArray([['1 level deep', 2, [3, ['inside', 'inside', ['deeper']]]],4])).toEqual(['1 level deep', 2, 3, 'inside', 'inside', 'deeper', 4]);
	});

});