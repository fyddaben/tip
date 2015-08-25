
var tipApp = angular.module('MyTipApp', ['ngMaterial', 'ngResource']);

tipApp.controller('ArticleController', ['$scope',  '$sce', ArticleDetail]);

var md = window.markdownit();
function ArticleDetail($scope, $sce) {
  $scope.edit = function(id) {
    location.href='http://tip.mi.com/article/edit/' + id;
  }
};
