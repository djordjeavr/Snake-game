var Snake = /** @class */ (function () {
    function Snake() {
        this.fields = 30;
        this.GAME = document.getElementById('game');
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.snake = [
            { y: 5, x: 7 },
            { y: 5, x: 6 },
            { y: 5, x: 5 }
        ];
        this.food = { x: 12, y: 8 };
    }
    Snake.prototype.renderScreen = function () {
        this.GAME.innerHTML = '';
        for (var y = 0; y < this.fields; y++) {
            for (var x = 0; x < this.fields; x++) {
                var div = document.createElement('div');
                div.className = 'field';
                if (this.isSnakeOnScreen(y, x)) {
                    div.classList.add('snake');
                }
                if (this.isSnakeHead(y, x)) {
                    div.classList.add('snake-head');
                }
                if (this.isFoodOnScreen(y, x)) {
                    div.classList.add('food');
                }
                this.GAME.appendChild(div);
            }
        }
    };
    Snake.prototype.isSnakeOnScreen = function (y, x) {
        for (var i = 0; i < this.snake.length; i++) {
            if (this.snake[i].x == x && this.snake[i].y == y) {
                return true;
            }
        }
    };
    Snake.prototype.isFoodOnScreen = function (y, x) {
        if (this.food.x == x && this.food.y == y) {
            return true;
        }
    };
    Snake.prototype.isSnakeHead = function (y, x) {
        var head = this.getSnakeHead();
        if (head.x == x && head.y == y) {
            return true;
        }
    };
    Snake.prototype.getSnakeHead = function () {
        return this.snake[0];
    };
    Snake.prototype.handleSnakeDirection = function (event) {
        switch (event.keyCode) {
            case 37:
                console.log('Move Left');
                if (this.dx !== 1)
                    this.moveSnake('Left');
                break;
            case 38:
                console.log('Move Up');
                if (this.dy !== 1)
                    this.moveSnake('Up');
                break;
            case 39:
                console.log('Move Right');
                if (this.dx !== -1)
                    this.moveSnake('Right');
                break;
            case 40:
                console.log('Move Down');
                if (this.dy !== -1)
                    this.moveSnake('Down');
                break;
        }
    };
    Snake.prototype.moveSnake = function (direction) {
        switch (direction) {
            case 'Left':
                this.dx = -1;
                this.dy = 0;
                break;
            case 'Right':
                this.dx = 1;
                this.dy = 0;
                break;
            case 'Up':
                this.dx = 0;
                this.dy = -1;
                break;
            case 'Down':
                this.dx = 0;
                this.dy = 1;
                break;
        }
    };
    Snake.prototype.goSnake = function () {
        if (this.dx == 0 && this.dy == 0) {
            return;
        }
        var head = this.getSnakeHead();
        var newX = head.x + this.dx;
        var newY = head.y + this.dy;
        newX = newX % this.fields;
        if (newX < 0) {
            newX = this.fields;
        }
        newY = newY % this.fields;
        if (newY < 0) {
            newY = this.fields;
        }
        this.snake.unshift({ x: newX, y: newY });
        this.snake.pop();
    };
    Snake.prototype.playGame = function () {
        var _this = this;
        this.goSnake();
        var head = this.getSnakeHead();
        var interval = 400;
        if (this.snake.length - 3 > 5) {
            interval = 300;
        }
        if (this.snake.length - 3 > 8) {
            interval = 200;
        }
        if (this.snake.length - 3 > 11) {
            interval = 100;
        }
        if (head.x == this.food.x && head.y == this.food.y) {
            this.eatFood();
            this.readScore();
            this.food = { x: Math.floor(Math.random() * this.fields), y: Math.floor(Math.random() * this.fields) };
        }
        this.gameOver();
        this.renderScreen();
        setTimeout(function () {
            _this.playGame();
        }, interval);
    };
    Snake.prototype.gameOver = function () {
        var head = this.getSnakeHead();
        for (var i = 1; i < this.snake.length; i++) {
            if (head.x == this.snake[i].x && head.y == this.snake[i].y) {
                this.snake = [
                    { y: 5, x: 7 },
                    { y: 5, x: 6 },
                    { y: 5, x: 5 }
                ];
                this.score = 0;
                this.dx = 0;
                this.dy = 0;
                return alert('Game Over');
            }
        }
    };
    Snake.prototype.eatFood = function () {
        var head = this.getSnakeHead();
        var newX = head.x + this.dx;
        var newY = head.y + this.dy;
        this.snake.unshift({ x: newX, y: newY });
    };
    Snake.prototype.readScore = function () {
        this.score++;
        var score = document.getElementById('score');
        score.innerHTML = "Score: " + this.score;
    };
    return Snake;
}());
