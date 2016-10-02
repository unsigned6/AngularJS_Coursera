(function functionName() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
  .directive('foundItems', FoundItemsDirective)

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        message: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'narrow',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var narrow = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.searchTerm = "";

    narrow.found = [];

    narrow.searchMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
      narrow.message = "";
      promise.then(function (response) {
        narrow.found = response;
        if(narrow.searchTerm === "" || narrow.found.length === 0){
          narrow.message = "Nothing found";
        }
      })
      .catch(function (error) {
        console.log("Something wrong!");
      })
    };

    narrow.removeItem = function (itemIndex) {
      narrow.found.splice(itemIndex, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "menu_items.json")
      }).then(function success(response) {
        searchTerm = searchTerm.toLowerCase();
        var foundItems = [];
        var menu_items = response.data.menu_items;
        for(var item in menu_items) {
          if (searchTerm === "") {
            break;
          } else if (menu_items[item].description.indexOf(searchTerm) !== -1) {
            foundItems.push(menu_items[item]);
          }
        }
        return foundItems;
      }, function error(response) {
        console.log('Something wrong.');
      });
    };
  }
})()
