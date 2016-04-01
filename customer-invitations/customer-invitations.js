function CustomerInvitations(customers){
	if(!Array.isArray(customers) || customers.length === 0){
		throw new Error('Customers data should be entered as an array');
	}

	this.customers = customers;
	this.customersListEl;
	this.customersLivingClose = [];
	this.maximumDistance = 100000;
	
	this.intercomOfficeGPS = {
		latitude: 53.3381985,
		longitude: -6.2592576
	};
}

CustomerInvitations.prototype.createCustomerList = function(){
	this.filterCustomersLivingClose();
	this.sortCustomers();
	this.displayCustomersList();
};

CustomerInvitations.prototype.filterCustomersLivingClose = function(){
	var self = this;
	this.customersLivingClose = this.customers.filter(function(customer){
		return self.calculateDistance(customer) <= self.maximumDistance;;
	});
};

CustomerInvitations.prototype.calculateDistance = function(customer){
	if(!customer.latitude || !customer.longitude){
		throw new Error('Customer latitude and longitude can\'t be empty');
	}

	var earthRadius = 6371000,
		customerLat = parseInt(customer.latitude, 10) 
		intercomLatInRad = this.convertToRadians(this.intercomOfficeGPS.latitude),
		customerLatInRad = this.convertToRadians(customerLat),
		latitudeDifferenceInRad = this.convertToRadians(customerLat - this.intercomOfficeGPS.latitude),
		longitudeDifferenceInRad = this.convertToRadians(parseInt(customer.longitude, 10) - this.intercomOfficeGPS.longitude);

	var a = Math.sin(latitudeDifferenceInRad / 2) * Math.sin(latitudeDifferenceInRad / 2) +
			Math.cos(intercomLatInRad) * Math.cos(customerLatInRad) *
			Math.sin(longitudeDifferenceInRad / 2) * Math.sin(longitudeDifferenceInRad / 2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

	return earthRadius * c;
};

CustomerInvitations.prototype.convertToRadians = function(degrees){
	return degrees * Math.PI / 180;
};

CustomerInvitations.prototype.sortCustomers = function(){
	this.customersLivingClose.sort(function(current, next){
		return current.user_id < next.user_id ? -1 : 1;
	});
};

CustomerInvitations.prototype.displayCustomersList = function(){
	var self = this;
	this.customersListEl = document.getElementById('customers');
	this.customersLivingClose.forEach(function(customer){
		self.displayCustomer(customer);
	});
	
};

CustomerInvitations.prototype.displayCustomer = function(customer){
	if(!customer.user_id || typeof customer.user_id !== 'number'){
		throw new Error('Customer should have user_id which is a number.');
	}

	if(!customer.name){
		throw new Error('Customer name can\'t be empty.');
	}

	var liEl = document.createElement('li'),
			liContent = customer.user_id + '. ' + customer.name
	
	liEl.innerHTML = liContent;

	this.customersListEl.appendChild(liEl);
};

console.log('cleanup');