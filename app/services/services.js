app.factory('gamePlay',function($http, $q){
	

	var Game= {};
	// to keep track of Plyaer details
	Game.player = {};

	///money
	Game.money = [];
	Game.moneyList = [];
	Game.rounds = [];
	Game.currentRound = 0;
	Game.turnsLeftInCurrentRound = 0;
	Game.boxes = [];

	Game.finalWinnings = 0;
	Game.finalPossibleLoss = null;
	Game.totalPot = 0;
	//to keep track of shuffled money
	Game.moneyRandom = [];
	
	//json call
	var promise = $http.get('app/data.json');
	var get = function(){
		var deferred = $q.defer();
		promise.then(function(response){
			deferred.resolve({
				money_list:response.data.money,
				rounds:response.data.rounds,
				boxes:response.data.boxes
			});
		});
		return deferred.promise;
	}
	//Initialization
	init = function(){
		Game.player.playerBox = null;
		Game.validGame = false;
		get().then(function(data){
			Game.boxes = data.boxes;
			Game.money_list = data.money_list;
			Game.rounds = data.rounds;
			Game.moneyList = Game.getMoneyList();
		})
		
	};

	//Money
	Game.getMoneyList = function(){
		var money = [];
		angular.forEach(Game.money_list,function(i,v){
			money.push(i.money);
		});
		return money;
	}

	//Set valid Game as true
	Game.startNewGame = function(playerName){
		Game.validGame = true;
		//add player name
		Game.player.name = playerName;
		//Shuffle The Money
		shuffleMoney();
	}

	//get Player Name
	Game.getPlayerName = function(){
		return Game.player.name;
	}

	//fetch valid boxes
	Game.fetchValidBoxes = function(){
		var valid= [];
		angular.forEach(Game.boxes,function(box){
			if(!box.selected)
				valid.push(box.id);
		})
		return valid;
	}

	//set Player Initial Box 
	Game.setPlayerBox = function(box){
		Game.player.playerBox = box;
		Game.boxes[box-1].selected = true;
	}

	//return Player Box
	Game.getPlayerBox = function(){
		return Game.player.playerBox;
	}
	//control rounds
	Game.startNextRound = function(){
		//increase current round value
		Game.currentRound++;
		Game.turnsLeftInCurrentRound = Game.rounds[Game.currentRound-1].turn;
		// Return Current Value
		return Game.currentRound;
	}

	//return Turns Left in Current Round
	Game.fetchTurnsLeft = function(){
		return Game.turnsLeftInCurrentRound;
	}

	//set winnings
	Game.setWinnings = function(amount){
		Game.finalWinnings = amount;
	}

	Game.getWinnings = function(){
		return Game.finalWinnings;
	}

	//set losses
	Game.setLosses = function(amount){
		Game.finalPossibleLoss = amount;
	}

	//get losses
	Game.getLosses = function(amount){
		return Game.finalPossibleLoss;
	}

	//banker's offer
	Game.bankersOffer = function(){
		var balance = 3418418 - Game.totalPot;
		return Math.floor(Math.round(balance*(Game.currentRound+1)/100));
	}

	Game.fetchMoneyBoxIndex = function(box){
		var value = Game.fetchBoxValue(box);
		var index = Game.moneyList.indexOf(value);
		return index;
	}

	//return valid Game value
	Game.isValidGame = function(){
		if(!Game.validGame)
			window.location.href = "#/";
	}

	//new box choosen
	Game.newBoxChosen = function(box){
		Game.totalPot += Game.moneyRandom[box-1];
		// Game.money_list[]
		Game.money_list[Game.fetchMoneyBoxIndex(box)].selected = true;
		Game.boxes[box-1].selected = true;
		Game.turnsLeftInCurrentRound--;
	}

	//fetch box value
	Game.fetchBoxValue = function(box){
		return Game.moneyRandom[box-1];
	}

	//shuffle money
	var shuffleMoney = function(){
		Game.moneyRandom = Game.shuffleArray(angular.copy(Game.moneyList));
	}
	//Fisher–Yates Shuffle
	Game.shuffleArray = function(array){
		var m = array.length, t, i;
  		// While there remain elements to shuffle…
  		while (m) {
    	// Pick a remaining element…
    	i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
  		}
  		return array;
	}
	init();
	return Game;
});
