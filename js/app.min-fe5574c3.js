!function(){"use strict";var e=angular.module("cookingBlog",["ngRoute","ngResource","socialLinks"]);e.config(["$routeProvider",function(e){e.when("/recipes",{templateUrl:"partials/recipes.html",controller:"RecipesController"}).when("/recipes/:id",{templateUrl:"partials/recipe.html",controller:"RecipeController"}).when("/recipes?category",{templateUrl:"partials/recipes.html",controller:"RecipeController"}).when("/about",{templateUrl:"partials/about.html"}).otherwise({redirectTo:"/recipes"})}]),e.run(["$rootScope","$location","$routeParams","$window",function(e,t,n,o){e.$on("$routeChangeSuccess",function(){o.ga("send","pageview",{page:t.url()})})}])}(),function(){"use strict";angular.module("cookingBlog").directive("jbFooter",function(){return{templateUrl:"././partials/jbFooter.html",restrict:"E"}})}(),function(){"use strict";angular.module("cookingBlog").directive("jbSidebar",function(){return{templateUrl:"././partials/jbSidebar.html"}})}(),function(){"use strict";angular.module("cookingBlog").filter("amount",function(){return function(e){var t=Math.floor(e),n=0<t?t+" & ":"";switch(e-t){case.25:return n+"1/4";case.3:return n+"1/3";case.5:return n+"1/2";case.6:return n+"2/3";case.75:return n+"3/4";default:return e}}})}(),function(){"use strict";angular.module("cookingBlog").factory("recipesData",["$resource",function(t){var n="././data/recipes/";return{getRecipe:function(e){return t(n+e+".json").get().$promise},getRecipes:function(){return t(n+"all_recipes.json").query().$promise}}}])}(),function(){"use strict";angular.module("cookingBlog").constant("categoriesData",[{slug:"all",name:"All"},{slug:"brunch",name:"Brunch"},{slug:"sweets",name:"Sweets"},{slug:"after-work",name:"After work"},{slug:"for-party",name:"For party"},{slug:"to-go",name:"To go"}])}(),function(){"use strict";angular.module("cookingBlog").controller("MainController",["$scope",function(e){e.$on("$viewContentLoaded",function(){$("#nav > ul").dropotron({mode:"fade",noOpenerFade:!0,hoverDelay:150,hideDelay:350,easing:"swing"})})}])}(),function(){"use strict";angular.module("cookingBlog").controller("RecipeController",["recipesData","$scope","$routeParams","$sce","$location",function(e,t,n,o,r){var i=n.id;e.getRecipe(i).then(function(e){t.recipe=e,t.ingredients=t.recipe.ingredients,t.instructions=t.recipe.instructions},function(e){t.error="Could not fetch data"}),t.displaySafeHtml=function(e){return o.trustAsHtml(e)}}])}(),function(){"use strict";angular.module("cookingBlog").controller("RecipesController",["recipesData","$scope","$routeParams",function(e,t,n){e.getRecipes().then(function(e){t.recipes=e},function(e){t.error="Could not fetch data"}),""!==n.category&&(t.byCategory="all"==n.category?"":n.category)}])}(),function(){"use strict";angular.module("cookingBlog").controller("CategoriesController",["$scope","categoriesData",function(e,t){e.categories=t}])}(),function(){var t;t={handler:"&customHandler"},angular.module("socialLinks",[]).factory("socialLinker",["$window","$location",function(a,l){return function(u){return function(t,e,n){var o,r,i,c;return o=n.customUrl||l.absUrl(),c=u(t,o),i="status=no, width="+(t.socialWidth||640)+", height="+(t.socialWidth||480)+", resizable=yes, toolbar=no, menubar=no, scrollbars=no, location=no, directories=no","A"!==e[0].nodeName||null!=n.href&&""!==n.href||e.attr("href",c),e.attr("rel","nofollow"),r=function(e){return e.preventDefault(),c=u(t,o),a.open(c,"popupwindow",i).focus()},null!=n.customHandler?e.on("click",r=function(e){return c=u(t,o),t.handler({$event:e,$url:c})}):e.on("click",r),t.$on("$destroy",function(){return e.off("click",r)})}}}]).directive("socialFacebook",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){var n;return(n=["https://facebook.com/sharer.php?"]).push("u="+encodeURIComponent(t)),n.join("")})}}]).directive("socialTwitter",["socialLinker",function(e){return{restrict:"ACEM",scope:angular.extend({status:"@status"},t),link:e(function(e,t){return e.status||(e.status="Check this out! - "+t),"https://twitter.com/intent/tweet?text="+encodeURIComponent(e.status)})}}]).directive("socialGplus",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){return"https://plus.google.com/share?url="+encodeURIComponent(t)})}}]).directive("socialPinterest",["socialLinker",function(e){return{restrict:"ACEM",scope:angular.extend({media:"@media",description:"@description"},t),link:e(function(e,t){return"http://pinterest.com/pin/create/button/?url="+encodeURIComponent(t)+"&amp;media="+encodeURIComponent(e.media)+"&amp;description="+encodeURIComponent(e.description)})}}]).directive("socialStumbleupon",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){return"https://stumbleupon.com/submit?url="+encodeURIComponent(t)})}}]).directive("socialLinkedin",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){return"https://linkedin.com/shareArticle?url="+encodeURIComponent(t)})}}]).directive("socialReddit",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){return"https://www.reddit.com/submit?url="+encodeURIComponent(t)})}}]).directive("socialVk",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){return"http://vkontakte.ru/share.php?url="+encodeURIComponent(t)})}}]).directive("socialOk",["socialLinker",function(e){return{restrict:"ACEM",scope:t,link:e(function(e,t){return"http://www.odnoklassniki.ru/dk?st.cmd=addShare&st._surl="+encodeURIComponent(t)})}}])}.call(this);