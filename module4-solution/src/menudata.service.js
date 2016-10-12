(function () {
'use strict';

angular.module('Data')
.service('MenuDataService',MenuDataServiceController);

MenuDataServiceController.$inject = ['$http'];
function MenuDataServiceController($http) {
	var service = this;
    console.log("Hey0");

    service.getAllCategories = function () {
        console.log("Hey1");
        var promise = $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/categories.json")
        });

        return promise.then(function(result) {
            return result.data;
        });
    };

    service.getItemsForCategory = function(categoryShortName) {
        console.log("Hey3");
        var promise = $http({
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json', 
            params: {
                category: categoryShortName
            }
        });

        return promise.then(function(result) {
            console.log("Hey4");
            console.log(result.data);
            return result.data;
        });
	};
}

})();
