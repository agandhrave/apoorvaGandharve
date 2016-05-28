var app = angular.module("DealorNoDeal",['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when("/",{
		templateUrl: "partial/home.html",
		 controller: "homeController"
		})
	.when("/game/landing",{
		templateUrl: "partial/game-landing.html", 
		controller: "landingController" 
	})
	.when("/game/rounds",{
		templateUrl: "partial/game-rounds.html",
		controller: "roundController"
	})
	.when("/game/bankersOffer",{
		templateUrl: "partial/bankersOffer.html",
		controller: "bankerController"
	})
	.when("/game/winnings",{
		templateUrl: "partial/winning.html",
		controller: "winController"
	})
	// .otherwise({
	// 	redirect:"/"
	// })
	
}]);