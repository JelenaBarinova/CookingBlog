(function (app) {

  'use strict';

  var recipesData = function ($resource) {
    return {

      getRecipe: function (id) {
        return $resource("././data/recipes/" + id + ".json")
          .get();
      },

      getRecipes: function () {
        return $resource("././data/recipes/all_recipes.json")
          .query();
      }
    };
  };

  app.factory("recipesData", ["$resource", recipesData]);

}(angular.module("cookingBlog")));