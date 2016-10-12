(function () {
'use strict';

angular.module('Data')
.component('itemsList', {
  templateUrl: 'src/itemsList.template.html',
  bindings: {
    items: '<'
  }});

})();