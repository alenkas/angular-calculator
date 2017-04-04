angular.module('calculatorApp', [])
	.controller('CalculatorController', function($scope){
		var cartList = this;
		$scope.errorMessage = "";
		$scope.showErrorMessage = false;
		cartList.products = [
			{product: "Телефон", price: "100"},
			{product: "Магнитофон", price: "200"},
			{product: "Миелофон", price: "300"}
		];

		cartList.addProduct = function(){
			if(cartList.productName && cartList.productPrice){
				cartList.products.push({product: cartList.productName, price: cartList.productPrice})
				cartList.productName = '';
				cartList.productPrice = '';	
			} else {
				$scope.showMessage("Заполните все поля");
			}
			
		};

		$scope.showMessage = function(message){
			$scope.errorMessage = message;
			$scope.showErrorMessage = true;
		};

		$scope.totalAmount = function(){
			var totalAmount = 0;
			angular.forEach(cartList.products, function(product){
				totalAmount += +product.price;
			});
			return totalAmount;
		};

		$scope.totalDiscountAmount = function(){
			var totalDiscountAmount = 0;
			angular.forEach(cartList.products, function(product){
				totalDiscountAmount += +product.discount;
			});
			if(totalDiscountAmount){
				return totalDiscountAmount;	
			}
		};

		$scope.largestPrice = function(){
			var helperArray = [];
			var theHighestPrice;

			for(var i = 0; i < cartList.products.length; i++){
				helperArray.push(cartList.products[i].price);
			}

			theHighestPrice = Math.max.apply(Math, helperArray);

			return theHighestPrice;
		};

		cartList.addDiscount = function(){
			var totalDiscount = cartList.discount;

			var totalAmount = $scope.totalAmount();
			var discount, discountRemainder = 0;

			var largestPrice = $scope.largestPrice();

			$scope.showMessage("Скидка " + totalDiscount + " рублей применена");
			
			angular.forEach(cartList.products, function(product, i){
				
				discount = Math.round((product.price / totalAmount) * totalDiscount);
				discountRemainder += discount;
				
				product.discount = product.price - discount;
				
				totalDiscount = totalDiscount - discount;
				if(product.price == largestPrice){
					product.discount = product.discount - (cartList.discount - discountRemainder);
				}
				
				return product.discount;
				
			});
			cartList.discount = '';
			
		};
	});