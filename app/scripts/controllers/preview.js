'use strict';

angular.module('cityVitalityAngularApp')
.controller('previewCtrl', ['describeService', 'localStorageService', '$rootScope', '$location', '$scope',function (describeService, localStorageService,$rootScope,$location, $scope) {

 var vm = this;

 vm.describe_id = localStorageService.get('describe_id');

 var params = {
  id: vm.describe_id
}

describeService.getProjectById(params).then(function(response) {
  vm.project_name = response.data.data.title;
  vm.background = response.data.data.background;
  vm.impact = response.data.data.impact;
  vm.risk = response.data.data.risks;
  vm.need = response.data.data.need;
  vm.short_description = response.data.data.short_description;
  vm.others = response.data.data.others;
  vm.category = response.data.data.category;
  vm.image= response.data.data.file.url;
  vm.goals = response.data.data.goals
});


vm.updateProjectDetails =function (){ 
  describeService.getProjectById(params).then(function(response) {
    $rootScope.projects = response.data.data;
  });
  $location.path('/describe_edit/id')
    $rootScope.getProject();
}
}]);
