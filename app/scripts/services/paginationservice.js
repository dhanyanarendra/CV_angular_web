'use strict';

angular.module('cityVitalityAngularApp').factory('Paginationservice', [
  function() {
    var obj;
    return obj = {
      page: 1,
      data: {},
      nextPage: function() {
        return this.page += 1;
      },
      prevPage: function() {
        return this.page -= 1;
      },
      totalPages: function() {
        var res;
        res = 0;
        if (this.data && this.data.total) {
          res = this.data.total / this.data.per_page;
        }
        return res;
      }
    };
  }
]);
