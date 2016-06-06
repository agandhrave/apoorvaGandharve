app.controller('homeController', function($scope, $location, gamePlay) {
    $scope.play = function() {
        //start a New Game
        gamePlay.startNewGame($scope.name);
        $location.path('/game/landing');
    }
});

app.controller('landingController', function($scope, $animate, $location, $timeout, gamePlay) {
    var init = function() {
        gamePlay.isValidGame();
        $scope.playerName = gamePlay.getPlayerName();
        $scope.boxes = gamePlay.fetchValidBoxes();
        $scope.bottomMessage = "Select A Case";
        $scope.showMsg = true;
    }
    $scope.box_chose = function(box) {
        $scope.showMsg = false;
        $scope.bottomMessage = "Case Selected. Starting Game...";
        gamePlay.setPlayerBox(box);
        $scope.playerBox = box;
        $timeout(function() {
            $location.path('/game/rounds');
        }, 2000);
    }
    init();
});

app.controller('roundController', function($scope, $location, $animate, $timeout, gamePlay) {
    var init = function() {
        gamePlay.isValidGame();
        $scope.custom = true;
        $scope.playerBox = gamePlay.getPlayerBox();
        $scope.playerName = gamePlay.getPlayerName();
        $scope.round = gamePlay.startNextRound();
        populate_values();
        $scope.turnsLeft = gamePlay.fetchTurnsLeft();
    }

    $scope.show_board = function() {
        $scope.custom = $scope.custom === true ? false : true;
    }

    function populate_values() {
        $scope.money_list_left = angular.copy(gamePlay.money_list).splice(0, 13);
        $scope.money_list_right = angular.copy(gamePlay.money_list).splice(13, 13);
        $scope.boxes = gamePlay.fetchValidBoxes();
        $scope.turnsLeft--;
        if (angular.equals($scope.turnsLeft,0)) {

            $location.path('/game/bankersOffer');
        }
    }
    $scope.box_chose = function(box) {
        $scope.caseOp = true;
        $scope.box_opened = box;
        var boxValue = gamePlay.fetchBoxValue(box);
        $timeout(function() {
            $scope.case_opened = true;
            $scope.box_opened = boxValue;

        }, 1000);
        $timeout(function() {
            $scope.case_opened = false;
            $scope.caseOp = false;
            populate_values();
        }, 2000);
        gamePlay.newBoxChosen(box);
    }
    init();
});

app.controller('bankerController', function($scope, $location, $timeout, gamePlay) {
    var init = function() {
        gamePlay.isValidGame();
        $scope.offer = gamePlay.bankersOffer();
    }
    $scope.deal = function() {
        gamePlay.setWinnings($scope.offer);
        $location.path('/game/winnings');
    }
    $scope.nodeal = function() {
        if (angular.equals(gamePlay.currentRound,9)) {
            swap_question();
        } else {
            $location.path('/game/rounds');
        }
    }

    function swap_question() {
        $scope.swapBox = gamePlay.fetchValidBoxes()[0];
        $scope.playerBox = gamePlay.getPlayerBox();
        $scope.swapQuestion = true;
    }
    $scope.swap_question_answer = function(finalBox,lostBox) {
        gamePlay.setWinnings(gamePlay.fetchBoxValue(finalBox));
        gamePlay.setLosses(gamePlay.fetchBoxValue(lostBox));
        $location.path('/game/winnings');
    }
    init();
});

app.controller('winController', function($scope, gamePlay) {
    var init = function() {
        gamePlay.isValidGame();
        $scope.playerName = gamePlay.getPlayerName();
        $scope.winnings = gamePlay.getWinnings();
        $scope.losses = gamePlay.getLosses();
    }
    init();
});
