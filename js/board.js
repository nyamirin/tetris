var board = [];
var board_check = [];
var fall_board = [];
var t_board = [];

function def_board() {
    for (let x = 0; x < 10; x++) {
        board[x] = new Array();
        fall_board[x] = {};
        t_board[x] = {};
        board_check[x] = {};
        for (let y = 0; y < 21; y++) {
            board[x][y] = 0;
            fall_board[x][y] = 0;
            t_board[x][y] = 0;
            board_check[x][y] = 0;
        }
    }
}

function clear_board() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 21; y++) {
            board[x][y] = 0;
        }
    }
}

function clear_fallboard() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 21; y++) {
            fall_board[x][y] = 0;
        }
    }
}

function clear_tboard() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 21; y++) {
            t_board[x][y] = 0;
        }
    }
}

function clear_check() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 21; y++) {
            board_check[x][y] = 0;
        }
    }
}

function show_board() {
    //10*(12+1)
    let ultxt = '<ul id="board_ul">';
    for (let y = 20; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            ultxt += "<li>";
            ultxt += '<img src="img/b' + board[x][y] + '.png">';
            //ultxt += y + ',' + x;
            ultxt += "</li>";
        }
    }
    ultxt += "</ul>";
    $("board_div").innerHTML = ultxt;
    show_hold();
}

function show_fallboard() {
    let ultxt = '<ul id="fboard_ul">';
    for (let y = 20; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            ultxt += "<li>";
            ultxt += '<img src="img/b' + fall_board[x][y] + '.png">';
            //ultxt += y + ',' + x;
            ultxt += "</li>";
        }
    }
    ultxt += "</ul>";
    $("fboard_div").innerHTML = ultxt;
}

function show_tboard() {
    let ultxt = '<ul id="tboard_ul">';
    for (let y = 20; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            ultxt += "<li>";
            ultxt += '<img src="img/t' + t_board[x][y] + '.png">';
            //ultxt += y + ',' + x;
            ultxt += "</li>";
        }
    }
    ultxt += "</ul>";
    $("tboard_div").innerHTML = ultxt;

}

function print_board() {
    let ultxt = ''
    for (let y = 20; y >= 0; y--) {
        for (let x = 0; x < 10; x++) {
            ultxt += board[x][y];
        }
        ultxt += '\n';
    }
    log(ultxt);
}

function lineclear() {
    for (let y = 20; y >= 0; y--) {
        let cnt = 0;
        for (let x = 0; x < 10; x++) {
            if (board[x][y]) cnt++;
        }
        if (cnt == 10) {
            for (let l = y; l < 20; l++) {
                for (let k = 0; k < 10; k++) {
                    board[k][l] = board[k][l + 1];
                }
            }
            show_board();
            show_next();
        }
        else cnt = 0;
    }
}

function show_hold() {
    let ultxt;
    ultxt = '<img src="img/h' + hold_mino + '.png">';
    $("hold_div").innerHTML = ultxt;

}