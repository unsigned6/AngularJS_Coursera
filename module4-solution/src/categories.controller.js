(function() {
  'use strict';

  angular.module('Data')
  .controller('CategoriesComponentController', CategoriesComponentController);

  CategoriesComponentController.$inject = ['items'];
  function CategoriesComponentController(items) {
  	var catCtrl = this;
  	this.items = items;
  };

})();
