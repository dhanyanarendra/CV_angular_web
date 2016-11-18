'use strict';

/**
 * @ngdoc function
 * @name cityVitalityAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cityVitalityAngularApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('MainCtrl', function ($scope, needsService,localStorageService, $location,$rootScope) {

  $scope.count = 0;
  $scope.follow_count = 0;
  var token = localStorageService.get('auth-token');


  $scope.contributorComment = function (tile) {
    if (token){
      localStorageService.set('describe_id', tile.id);
      $location.path('contributor_describe').search("comment");
    } else {
      localStorageService.set('describe_id', tile.id);
      angular.element("#myModal_Signin").modal("show");
    }
  }

  $scope.pledgequantity = function(pledge, needitem){

    var params = {
      task_id: needitem.task_id,
      need_id: needitem.id,
      pledge: {
        quantity: needitem.new_quantity,
        pledged: pledge
      }
    }
    needsService.pledgeNeed(params).then(function(response) {
      if (needitem.pledge.length == 0) {
        needitem.pledge[0] = {
          pledged: pledge,
          quantity: needitem.new_quantity

        }
        needitem.new_quantity = response.data.new_quantity;
        needitem.total = response.data.quantity_count;
        needitem.activerow = false;
      } else {

        needitem.pledge[0].pledged = pledge;
        needitem.total = response.data.quantity_count;
        needitem.activerow = false;
        needitem.pledge[0].quantity = response.data.data.quantity;
        window.location.reload();
      }
    });

  }

  $scope.getQuantity = function (needitem) {
    if (needitem.pledge.length) {
      return needitem.pledge[0].quantity;
    } else {
      return 0;
    }

  }

  $scope.pledgeQuanty = function(needitem) {
    if (needitem.total) {
      return needitem.total;
    } else {
      return 0;
    }
  }

  $scope.reload = function(){
    window.location.reload();
  }
});
