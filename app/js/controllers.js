angular.module('LenasRecipes.controllers', []).
controller('RecipesController', function($scope, recipesAPIservice) {
    $scope.recipesList = [];

    recipesAPIservice.getRecipes().success(function (response) {
        $scope.recipesList = response;
   });
}). 

controller('RecipesByCategoryController', function($scope, $routeParams, recipesAPIservice) {
    $scope.category = $routeParams.category;
    $scope.recipesList = [];
  console.log('im here');
    console.log($routeParams.category);
    recipesAPIservice.getRecipesByCategory($scope.category).success(function (response) {
        console.log('im here22');
    console.log(response);  
      $scope.recipesList = response;
    });
}).

controller('RecipeController', function($scope, $routeParams, recipesAPIservice) {
    $scope.id = $routeParams.id;
    $scope.recipe = null;
    
    recipesAPIservice.getRecipeDetails($scope.id).success(function (response) {
        $scope.recipe = response;
    });
});
