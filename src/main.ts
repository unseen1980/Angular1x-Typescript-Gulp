/// <reference path="../typings/angularjs/angular.d.ts" />

var tscAngApp = angular.module('tscAng', []);

tscAngApp.controller('tscAngController', function tscAngController($scope) {
  $scope.msg="Hello from Ctrl";
});