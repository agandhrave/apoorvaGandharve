app.controller('homeController',function($scope, $location, gamePlay){
	$scope.play = function(){
		console.log('play click');
		gamePlay.startNewGame();
		gamePlay.addPlayer($scope.player);
		$location.path('/game/landing');
	}
});

app.controller('landingController',function($scope, $location, $timeout, gamePlay){
	var init = function(){
		// gamePlay.isValidGame();
		gamePlay.shuffleMoney();
		$scope.playerName = gamePlay.users.name;
		$scope.boxes = gamePlay.fetchValidboxes();
	}
	$scope.box_chose = function(box){
		var ele = $('#select_a_case').clone();
		$(ele).text('Case Selected. Starting Game...');
		$('#selected').empty();
		$('#selected').append(ele);
		gamePlay.setPlayerBox(box);
		$scope.playerBox = box;
		$scope.playerCase = true;
		$timeout(function(){
			$location.path('/game/rounds');
		},3500);
		
	}
	init();
});

app.controller('roundController',function($scope, $location, $timeout, gamePlay){	
	var init = function(){
		// gamePlay.isValidGame();
		// $scope.custom = true;
		$scope.selectedIndexRight = gamePlay.fetchSelectedIndexRight();
		$scope.selectedIndexLeft = gamePlay.fetchSelectedIndexLeft();
		$scope.playerBox = gamePlay.playerBox;
		$scope.playerCase = true;
		$scope.playerName = gamePlay.users.name;
		gamePlay.startNextRound();
		$scope.round = gamePlay.currentRound;
		populate_values();
		console.log('init');
		$scope.money_list_left = gamePlay.fetchMoney().splice(0,13);
		$scope.money_list_right = gamePlay.fetchMoney().splice(13,13);
	}

	$scope.show_board = function(){
		$scope.custom=$scope.custom===false?true:false;
	}
	function populate_values(){
		$scope.boxes = gamePlay.fetchValidboxes();
		var turnsLeft = gamePlay.fetchTurnsLeft();
		if(turnsLeft!==0)
		{
			$scope.turnsLeft = turnsLeft;
		}
		else
		{

			$location.path('/game/bankersOffer');
		}
	}
	$scope.box_chose = function(box){
		$scope.caseOp = true;
		$scope.box_opened = box;
		var boxValue = gamePlay.fetchBoxValue(box);
		$timeout(function(){
			$scope.case_opened = true;
			$scope.box_opened = boxValue;
			
		},1000);
		$timeout(function(){
			$scope.case_opened = false;
			$scope.caseOp = false;
			populate_values();
			var selectedIndex = gamePlay.fetchMoneyBoxIndex(box);
			if(selectedIndex>=13)
				$scope.selectedIndexRight[selectedIndex-13]=selectedIndex-13;
			else
				$scope.selectedIndexLeft[selectedIndex]=selectedIndex;
		},2000);
		// alert('You choose box no. '+ box+' with value '+ boxValue);
		
		console.log($scope.selectedIndexLeft+$scope.selectedIndexRight);
		gamePlay.newBoxChosen(box);
		// $scope.caseOp = false;
		
	}
	init();
});

app.controller('bankerController',function($scope, $location, $timeout, gamePlay){
	var init = function(){
		// gamePlay.isValidGame();
		$scope.totalPot = gamePlay.totalPot;
		$scope.offer = gamePlay.bankersOffer();
		
	}
	$scope.deal = function(){
		gamePlay.setWinnings($scope.offer);
			$location.path('/game/winnings')
		}
	$scope.nodeal = function(){
			if(gamePlay.currentRound === 9)
			{
				swap_question();
			}
			else{
				$location.path('/game/rounds');
			}
	}
	function swap_question(){
		$scope.swapBox= gamePlay.fetchValidboxes()[0];
		$scope.playerBox = gamePlay.playerBox;
		$scope.swapQuestion = true;
		// if(confirm('Would you like to Swap your box no. '+ gamePlay.playerBox +
		// 	' with Box No. '+ box))
		// {
		// 	gamePlay.setWinnings(gamePlay.fetchBoxValue(box));
		// 	// alert('The Other Box had :' + gamePlay.fetchBoxValue(gamePlay.playerBox));
		// 	// alert('You win :' + gamePlay.fetchBoxValue(box));
		// }
		// else
		// {
		// 	gamePlay.setWinnings(gamePlay.fetchBoxValue(gamePlay.playerBox));
		// 	// alert('The Other Box had :' + gamePlay.fetchBoxValue(box));
		// 	// alert('you Win :' + gamePlay.fetchBoxValue(gamePlay.playerBox));
		// }

	}
	$scope.swap_question_answer = function(e){
		var finalBox = e;
		gamePlay.setWinnings(gamePlay.fetchBoxValue(finalBox));
		$location.path('/game/winnings');
	}
	init();
});
app.controller('winController',function($scope, gamePlay){
	var init = function(){
		// gamePlay.isValidGame();
		$scope.playerName = gamePlay.users.name;
		$scope.winnings = gamePlay.getWinnings();
	}
	init();
})