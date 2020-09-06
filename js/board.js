var board = [];
var board_check = [];

function def_board() {
    for (var x = 0; x < 10; x++) {
        board[x] = {};
        board_check[x] = {};
        for (var y = 0; y < 20; y++) {
            board[x][y] = 0;
            board_check[x][y] = 0;
        }
    }
}

function clear_board() {
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 20; y++) {
            board[x][y] = 0;
        }
    }
}

function clear_check() {
    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 20; y++) {
            board_check[x][y] = 0;
        }
    }
}

function show_board() {
    //10*(12+1)
    ultxt = '<ul id="board_ul">';
    for (var y = 19; y >= 0; y--) {
        for (var x = 0; x < 10; x++) {
            ultxt += "<li>";
            ultxt += '<img src="img/b' + board[x][y] + '.png">';
            //ultxt += y + ',' + x;
            ultxt += "</li>";
        }
    }
    ultxt += "</ul>";
    $("board_div").innerHTML = ultxt;
}
