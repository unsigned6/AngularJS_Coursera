(function() {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController' ,ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buy = this;

    buy.name = "";
    buy.quantity = "";

    buy.items = ShoppingListCheckOffService.getToBuy();

    buy.buyItem = function (name, quantity, itemIndex) {
      ShoppingListCheckOffService.buyItem(name, quantity, itemIndex);
    }
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.itemName = "";
    bought.itemQuantity = "";

    bought.items = ShoppingListCheckOffService.getBought();
  };

  function ShoppingListCheckOffService() {
    var service = this;

    var to_buy = [{ name: "cookies", quantity: 10 }, { name: "milk", quantity: 1 }, { name: "meat", quantity: 15 }, { name: "cheese", quantity: 5 }, { name: "bread", quantity: 2 }];
    var bought = [];

    service.buyItem = function (itemName, quantity, itemIndex) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      bought.push(item);
      to_buy.splice(itemIndex, 1);
    };

    service.getToBuy = function () {
      return to_buy;
    };

    service.getBought = function () {
      return bought;
    };
  }

})();
