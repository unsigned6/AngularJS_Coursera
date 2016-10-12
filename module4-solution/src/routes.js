(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/categories.template.html',
    controller: 'CategoriesComponentController as categoriesCtrl',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{categoryId}',
    templateUrl: 'src/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]
    }
  });

};

})();