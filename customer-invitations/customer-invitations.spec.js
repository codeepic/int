describe('customerInvitations function', function(){

	describe('should throw an error when passed', function(){
		
		var customerInvitations;

		it('parameter that is not an array', function(){
			expect(function(){
				new CustomerInvitations(2);
			}).toThrowError();
		});
	
		it('an empty array as a parameter', function(){
			expect(function(){
				new CustomerInvitations([]);
			}).toThrowError();
		});
	});

	describe('createCustomerList should call 2nd level functions: ', function(){
		
		beforeEach(function(){

			customerInvitations = {
				filterCustomersLivingClose: function(){},
				sortCustomers: function(){},
				displayCustomersList: function(){},
			};

			spyOn(customerInvitations, 'filterCustomersLivingClose');
			spyOn(customerInvitations, 'sortCustomers');
			spyOn(customerInvitations, 'displayCustomersList');

			customerInvitations.filterCustomersLivingClose();
			customerInvitations.sortCustomers();
			customerInvitations.displayCustomersList();

		});

		it('filterCustomersLivingClose should be called by createCustomerList', function(){
			expect(customerInvitations.filterCustomersLivingClose).toHaveBeenCalled();
		});

		it('sortCustomers should be called by createCustomerList', function(){
			expect(customerInvitations.sortCustomers).toHaveBeenCalled();
		});

		it('filterCustomersLivingClose should be called by createCustomerList', function(){
			expect(customerInvitations.displayCustomersList).toHaveBeenCalled();
		});

	});

	describe('', function(){
		var customerInvitations;
		var mockCustomerData = [{
				"latitude": "52.986375",
				"user_id": 12,
				"name": "Christina McArdle",
				"longitude": "-6.043701"
			}, {
				"latitude": "51.92893",
				"user_id": 1,
				"name": "Alice Cahill",
				"longitude": "-10.27699"
			}, {
					"latitude": "53.1489345",
					"user_id": 31,
					"name": "Alan Behan",
					"longitude": "-6.8422408"
			}, {
				"latitude": "53.807778",
				"user_id": 28,
				"name": "Charlie Halligan",
				"longitude": "-7.714444"
			}
		];		

		beforeEach(function(){
			customerInvitations = new CustomerInvitations(mockCustomerData);
		});

		it('filterCustomersLivingClose function should return only the customers living closer than 100km from Intercom Dublin office', function(){
			customerInvitations.filterCustomersLivingClose();

			expect(customerInvitations.customersLivingClose[0]).toEqual(mockCustomerData[2]);		
		});

		it('calculateDistance function should return the distance in radians', function(){
			expect(customerInvitations.calculateDistance(mockCustomerData[0])).not.toBeNull();
		});

		it('calculateDistance function should throw an error if customer latitude or longitude is not defined', function(){
			var mockCustomer = {
				"user_id": 31,
				"name": "Alan Behan",
				"longitude": null
			};

			expect(function(){
				customerInvitations.calculateDistance(mockCustomer);				
			}).toThrowError();

			expect(customerInvitations.calculateDistance(mockCustomerData[0])).not.toBeNull();
		});

		it('sortCustomers function should sort customers living close by user_id in ascending order', function(){
			customerInvitations.filterCustomersLivingClose();			
			customerInvitations.sortCustomers();

			expect(customerInvitations.customersLivingClose[0].user_id).toEqual(28);	
			expect(customerInvitations.customersLivingClose[1].user_id).toEqual(31);	
		});

		describe('', function(){

			beforeEach(function(){
				setUpHTMLFixture();
			});

			it('displayCustomersList should have the HTML customer list element defined', function(){
				customerInvitations.displayCustomersList();
				expect(customerInvitations.customersListEl).toBeDefined();
			});

		});

		it('displayCustomer function should throw an error if user_id is null or not a number', function(){

			var mockCustomer1 = {
				"latitude": "52.986375",
				"user_id": null,
				"name": "Christina McArdle",
				"longitude": "-6.043701"
			};

			var mockCustomer2 = {
				"latitude": "52.986375",
				"user_id": '12',
				"name": "Christina McArdle",
				"longitude": "-6.043701"
			};

			expect(function(){
				customerInvitations.displayCustomer(mockCustomer1);				
			}).toThrowError();

			expect(function(){
				customerInvitations.displayCustomer(mockCustomer2);				
			}).toThrowError();

		})

	});
});

function setUpHTMLFixture(){
	setFixtures(
			'<div>' +
				'<h1></h1>' +
				'<ul id="customers">' +
				'</ul>' +
			'</div>'
		);
}
