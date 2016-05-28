app.factory('gamePlay',function(){
	

	var srv= {};
	// to keep track of user details
	srv.users = {};

	///money
	
	srv.money_list = 
	{1:false, 
	2:false, 
	5:false, 
	10:false, 
	25:false, 
	50:false, 
	75:false, 
	100:false, 
	200:false, 
	300:false, 
	400:false, 
	500:false, 
	750:false, 
	1000:false, 
	5000:false, 
	10000:false,
	25000:false, 
	50000:false, 
	75000:false, 
	100000:false, 
	200000:false, 
	300000:false, 
	400000:false, 
	500000:false, 
	750000:false, 
    1000000:false} ;

    srv.selectedIndexRight = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	srv.selectedIndexLeft = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	srv.fetchSelectedIndexLeft = function(){
		return srv.selectedIndexLeft;
	}
	srv.fetchSelectedIndexRight = function(){
		return srv.selectedIndexRight;
	}

	// [1, 2, 5, 10, 25, 50, 75, 100, 200, 300, 400 , 500, 750, 1000, 5000, 10000,
	// 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000 ];

	srv.fetchMoney = function(){
		return angular.copy(Object.keys(srv.money_list));
	}

	//rounds
	srv.rounds = [{round:1,turn:6},
	{round:2,turn:5},
	{round:3,turn:4},
	{round:4,turn:3},
	{round:5,turn:2},
	{round:6,turn:1},
	{round:7,turn:1},
	{round:8,turn:1},
	{round:9,turn:1}];
	srv.currentRound = 0;
	srv.turnsLeftInCurrentRound = 0;
	srv.boxes = [{id:1,"selected":false},
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

	srv.finalWinnings = 0;
	//set winnings
	srv.setWinnings = function(amount){
		srv.finalWinnings = amount;
	}

	srv.getWinnings = function(){
		return srv.finalWinnings;
	}
	//banker's offer
	srv.bankersOffer = function(){
		var balance = 3418418 - srv.totalPot;
		console.log("balance " + srv.totalpot);
		return Math.floor(Math.round(balance*(srv.currentRound+1)/100));
	}

	srv.fetchMoneyBoxIndex = function(box){
		var value = srv.fetchBoxValue(box);
		var keys = Object.keys(srv.money_list);
		var m = keys.length;
		while(m){
			keys[m] = parseInt(keys[m]);
			m--;
		}
		var index = keys.indexOf(value);

		if(index>=13)
			srv.selectedIndexRight[index-13]=index-13;
		else
			srv.selectedIndexLeft[index]=index;
		return index;
	}

	//control rounds
	srv.startNextRound = function(){
		//increase current round value
		console.log('startNextRound');
		srv.currentRound++;
		srv.turnsLeftInCurrentRound = srv.rounds[srv.currentRound-1].turn;
	}
	srv.fetchTurnsLeft = function(){
		return srv.turnsLeftInCurrentRound;
	}

	//fetch valid boxes
	srv.fetchValidboxes = function(){
		var valid= [];
		angular.forEach(srv.boxes,function(box){
			if(!box.selected)
				valid.push(box.id);
		})
		return valid;
	}

	srv.totalPot = 0;
	srv.moneyRandom = [];

	//player's box
	init = function(){
		srv.playerBox = null;
		srv.validGame = false;
	};

	//Set valid Game as true
	srv.startNewGame = function(){
		srv.validGame = true;
	}

	//return valid Game value
	srv.isValidGame = function(){
		if(!srv.validGame)
			window.location.href = "#/";
	}

	//new box choosen
	srv.newBoxChosen = function(box){
		srv.totalPot += parseInt(srv.moneyRandom[box-1]);
		console.log("totalpot"+typeof srv.totalPot);
		// srv.money_list[]
		srv.boxes[box-1].selected = true;
		srv.turnsLeftInCurrentRound--;
	}

	//fetch box value
	srv.fetchBoxValue = function(box){
		return srv.moneyRandom[box-1];
	}

	//add Player name
	srv.addPlayer = function(playerName){
		srv.users.name = playerName;
		console.log(srv);
	}

	//set Player Initial Box 
	srv.setPlayerBox = function(box){
		srv.playerBox = box;
		srv.boxes[box-1].selected = true;
	}

	//shuffle money
	srv.shuffleMoney = function(){
		srv.moneyRandom = srv.shuffleArray(angular.copy(Object.keys(srv.money_list)));
	}
	//Fisher–Yates Shuffle
	srv.shuffleArray = function(array){
		var m = array.length, t, i;
	console.log("length = "+m);
		while(m){
			array[m] = parseInt(array[m]);
			m--;
		}
		m=array.length;
		//do not remove this
		m--;
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
	return srv;
});