'use strict'
var tipApp = angular.module('MyTipApp', ['ngMaterial', 'ngResource']);
var md = window.markdownit();

//首先建立数据对象
tipApp.factory('Articles',['$resource', function($resource) {
  return $resource('/article/:id',
                   {areId: '@id'},
                   {
                     update:{method:'PUT'}
                   });
}]);

//建立一个过滤器
tipApp.filter('toMarkDown', function() {
  var toMarkDown = function(content) {
    return md.render(content);
  }
  return toMarkDown;
});


tipApp.controller('EditArticleController', ['$scope', '$mdDialog', 'Articles', '$sce', EditArticle]);

function EditArticle($scope, $mdDialog, Articles, $sce) {
  $scope.userList = ['@daben', '@tian', '@zhangmei', '@bold', '@jsonBeta'];
  $scope.currentUser = '@daben';

  if (article) {
    $scope.currentUser = article.author;
    $scope.title = article.title;
    $scope.content = article.content;
    $scope.artId = article.art_id;
  }

  function showDialog($event) {

    $scope.markContent = $sce.trustAsHtml(md.render($scope.content));

    var parentEl = angular.element(document.body);
    $mdDialog.show({
      scope: $scope,
      templateUrl:'article.html',
      controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
      }],
      preserveScope: true
    });
  };
  $scope.showDialog = showDialog;
  var showSuc = function(res) {
    $mdDialog.hide();
    var code = parseInt(res.code);
    if (code === 200) {
      $scope.areId = res.areId;
      var alert = $mdDialog.alert({
        title: '恭喜您',
        content: '插入成功!',
        ok: 'I Got It!'
      });
      $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
        location.href = 'http://tip.mi.com/article/'+res.areId;
      });

    }
  }
  function save() {
    var are = new Articles();
    are.author = $scope.currentUser;
    are.title = $scope.title;
    are.content = $scope.content;
    are.markContent = md.render($scope.content);
    if ($scope.artId) {
      Articles.update({ id:$scope.artId }, are, function(res) {
        showSuc(res);
      });
    } else {
      are.$save(function(res) {
        showSuc(res);
      });
    }

  }
  $scope.save = save;
}


