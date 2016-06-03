app.factory('gamePlay',function(){
	

	var Game= {};
	// to keep track of Plyaer details
	Game.player = {};

	///money
	
	Game.money_list = [1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400 , 500, 750, 1000, 5000, 10000,
	25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000 ];

    Game.selectedIndexRight = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	Game.selectedIndexLeft = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

	Game.rounds = [{round:1,turn:6},
	{round:2,turn:5},
	{round:3,turn:4},
	{round:4,turn:3},
	{round:5,turn:2},
	{round:6,turn:1},
	{round:7,turn:1},
	{round:8,turn:1},
	{round:9,turn:1}];


	Game.currentRound = 0;
	Game.turnsLeftInCurrentRound = 0;
	Game.boxes = [];

	Game.finalWinnings = 0;
	Game.totalPot = 0;
	//to keep track of shuffled money
	Game.moneyRandom = [];

	init = function(){
		Game.player.playerBox = null;
		Game.validGame = false;
		Game.boxes = [{id:1,"selected":false},
	{id:2,"selected":false},
	{id:3,"selected":false},
	{id:4,"selected":false},
	{id:5,"selected":false},
	{id:6,"selected":false},
	{id:7,"selected":false},
	{id:8,"selected":false},
	{id:9,"selected":false},
	{id:10,"selected":false},
	{id:11,"selected":false},
	{id:12,"selected":false},
	{id:13,"selected":false},
	{id:14,"selected":false},
	{id:15,"selected":false},
	{id:16,"selected":false},
	{id:17,"selected":false},
	{id:18,"selected":false},
	{id:19,"selected":false},
	{id:20,"selected":false},
	{id:21,"selected":false},
	{id:22,"selected":false},
	{id:23,"selected":false},
	{id:24,"selected":false},
	{id:25,"selected":false},
	{id:26,"selected":false}];
	};

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

	Game.fetchSelectedIndexLeft = function(){
		return Game.selectedIndexLeft;
	}
	Game.fetchSelectedIndexRight = function(){
		return Game.selectedIndexRight;
	}

	//control rounds
	Game.startNextRound = function(){
		//increase current round value
		console.log('startNextRound');
		Game.currentRound++;
		Game.turnsLeftInCurrentRound = Game.rounds[Game.currentRound-1].turn;
	}
	
	//return Current Round Value
	Game.getCurrentRound = function(){
		return Game.currentRound;
	}

	//return Turns Left in Current Round
	Game.fetchTurnsLeft = function(){
		return Game.turnsLeftInCurrentRound;
	}

	Game.fetchMoney = function(){
		return angular.copy(Game.money_list);
	}
	
	//set winnings
	Game.setWinnings = function(amount){
		Game.finalWinnings = amount;
		console.log("Service"+ Game.finalWinnings);
	}

	Game.getWinnings = function(){
		return Game.finalWinnings;
	}
	//banker's offer
	Game.bankersOffer = function(){
		var balance = 3418418 - Game.totalPot;
		console.log("balance ", Game.totalpot, balance);
		return Math.floor(Math.round(balance*(Game.currentRound+1)/100));
	}

	Game.fetchMoneyBoxIndex = function(box){
		var value = Game.fetchBoxValue(box);
		var index = Game.money_list.indexOf(value);
		if(index>=13)
			Game.selectedIndexRight[index-13]=index-13;
		else
			Game.selectedIndexLeft[index]=index;
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
		console.log("totalpot"+typeof Game.totalPot);
		// Game.money_list[]
		Game.boxes[box-1].selected = true;
		Game.turnsLeftInCurrentRound--;
	}

	//fetch box value
	Game.fetchBoxValue = function(box){
		return Game.moneyRandom[box-1];
	}

	//shuffle money
	var shuffleMoney = function(){
		Game.moneyRandom = Game.shuffleArray(angular.copy(Game.money_list));
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
