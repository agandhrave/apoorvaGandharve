app.controller('homeController', function($scope, $location, gamePlay) {
    $scope.play = function() {
        //start a New Game
        gamePlay.startNewGame($scope.player);
        $location.path('/game/landing');
    }
});

app.controller('landingController', function($scope, $location, $timeout, gamePlay) {
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
        }, 3500);
    }
    init();
});

app.controller('roundController', function($scope, $location, $animate, $timeout, gamePlay) {
    var init = function() {
        gamePlay.isValidGame();
        $scope.custom = true;
        console.log($animate);
        $scope.selectedIndexRight = gamePlay.fetchSelectedIndexRight();
        $scope.selectedIndexLeft = gamePlay.fetchSelectedIndexLeft();
        $scope.playerBox = gamePlay.getPlayerBox();
        $scope.playerName = gamePlay.getPlayerName();
        gamePlay.startNextRound();
        $scope.round = gamePlay.getCurrentRound();
        populate_values();
        $scope.money_list_left = gamePlay.fetchMoney().splice(0, 13);
        $scope.money_list_right = gamePlay.fetchMoney().splice(13, 13);
        $scope.turnsLeft = gamePlay.fetchTurnsLeft();
    }

    $scope.show_board = function() {
        $scope.custom = $scope.custom === true ? false : true;
    }

    function populate_values() {
        $scope.boxes = gamePlay.fetchValidBoxes();
        $scope.turnsLeft--;
        if (($scope.turnsLeft) === 0) {

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
            var selectedIndex = gamePlay.fetchMoneyBoxIndex(box);
            if (selectedIndex >= 13)
                $scope.selectedIndexRight[selectedIndex - 13] = selectedIndex - 13;
            else
                $scope.selectedIndexLeft[selectedIndex] = selectedIndex;
        }, 2000);
        gamePlay.newBoxChosen(box);
    }
    init();
});

app.controller('bankerController', function($scope, $location, $timeout, gamePlay) {
    var init = function() {
        gamePlay.isValidGame();
        $scope.totalPot = gamePlay.totalPot;
        $scope.offer = gamePlay.bankersOffer();
    }
    $scope.deal = function() {
        gamePlay.setWinnings($scope.offer);
        console.log("console" + $scope.offer);
        $location.path('/game/winnings');
    }
    $scope.nodeal = function() {
        if (gamePlay.currentRound === 9) {
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
    $scope.swap_question_answer = function(e) {
        var finalBox = e;
        gamePlay.setWinnings(gamePlay.fetchBoxValue(finalBox));
        $location.path('/game/winnings');
    }
    init();
});
app.controller('winController', function($scope, gamePlay) {
    var init = function() {
        // gamePlay.isValidGame();
        $scope.playerName = gamePlay.getPlayerName();
        $scope.winnings = gamePlay.getWinnings();
    }
    init();
});

app.directive('enableAnimating', function($animate) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch('bottomMessage', function(newVal, oldVal) {
                console.log("watcher called");
                if (newVal != oldVal) {
                    //start the animation!
                    console.log('counter changed', element);
                    // $animate.setClass(element,'caseselected');
                    $animate.removeClass(element, 'caseselected', function() {
                        $animate.addClass(element, 'caseselected')
                    });
                    // $animate.addClass(element,'pulsate',function() {$animate.removeClass(element, 'pulsate')});
                }
            })
        }
    }
});

app.animation('.caseselected', function() {
    return {
        removeClass: function(element, className, done) {
            console.log('in');
        },
        addClass: function(element, className, done) {
            console.log('in');
        },
        setClass: function(element, className, done) {

        }
    }
});
