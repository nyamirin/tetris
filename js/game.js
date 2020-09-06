var drop_color1;
var drop_color2;
var drop_x;
var drop_y;
var rot_stat = 0;
var delay = 1000;
var timer;
var bycnt = 1;
var falling = 0;

function start_game() {
    show_board();
    make_drop();
    sleep(delay);
    falling = 1;
    fall_drop();
}

function make_drop() {
    if (board[2][11]) log("game over");
    else {
        drop_color1 = get_rint(6) + 1;
        drop_color2 = get_rint(6) + 1;
        drop_x = 4;
        drop_y = 19;
        rot_stat = 0;
        show_drop();
    }
}

function show_drop() {
    board[drop_x][drop_y] = drop_color1;
    switch (rot_stat) {
        case 0:
            board[drop_x][drop_y + 1] = drop_color2;
            break;
        case 1:
            board[drop_x + 1][drop_y] = drop_color2;
            break;
        case 2:
            board[drop_x][drop_y - 1] = drop_color2;
            break;
        case 3:
            board[drop_x - 1][drop_y] = drop_color2;
            break;
    }
    show_board();
}

function blocked() {
    //log('blocked');
    make_drop();
    fall_drop();
}

function can_fall() {
    //shared
    if (drop_y == 0) {
        //bottom
        return 0;
    }
    switch (rot_stat) {
        //0°
        case 0:
            if (board[drop_x][drop_y - 1]) return 0;
            else return 1;
        //90°
        case 1:
            if (board[drop_x + 1][drop_y - 1]) return 0;
            if (board[drop_x][drop_y - 1]) return 0;
            else return 1;
        //180°
        case 2:
            if (drop_y == 1) return 0;
            else if (board[drop_x][drop_y - 2]) return 0;
            else return 1;
        //270°
        case 3:
            if (board[drop_x - 1][drop_y - 1]) return 0;
            if (board[drop_x][drop_y - 1]) return 0;
            else return 1;
    }
}

function fall_drop() {
    falling = 1;
    timer = setTimeout(() => {
        if (can_fall()) {
            move_down();
            fall_drop();
        } else {
            falling = 0;
            clearTimeout(timer);
            scan_drby();
        }
    }, delay);
}

function move_down() {
    board[drop_x][drop_y] = 0;
    switch (rot_stat) {
        case 0:
            board[drop_x][drop_y + 1] = 0;
            break;
        case 1:
            board[drop_x + 1][drop_y] = 0;
            break;
        case 2:
            break;
        case 3:
            board[drop_x - 1][drop_y] = 0;
            break;
    }
    drop_y--;
    show_drop();
}

function press_downarrow() {
    if (can_fall()) {
        falling = 0;
        clearTimeout(timer);
        if (can_fall()) {
            move_down();
            fall_drop();
        } else {
            scan_drby();
        }
    }
}

function press_uparrow() {
    falling = 0;
    clearTimeout(timer);
    while (can_fall()) {
        move_down();
    }
    scan_drby();
}

function can_left() {
    if (drop_x == 0) return 0;
    switch (rot_stat) {
        case 0:
            if (board[drop_x - 1][drop_y]) return 0;
            else return 1;
        case 1:
            if (board[drop_x - 1][drop_y]) return 0;
            else return 1;
        case 2:
            if (board[drop_x - 1][drop_y - 1]) return 0;
            else return 1;
        case 3:
            if (drop_x == 1) return 0;
            if (board[drop_x - 2][drop_y]) return 0;
            else return 1;
    }
}

function move_left() {
    if (!falling) return;
    if (can_left()) {
        board[drop_x][drop_y] = 0;
        switch (rot_stat) {
            case 0:
                board[drop_x][drop_y + 1] = 0;
                drop_x--;
                show_drop();
                break;
            case 1:
                board[drop_x + 1][drop_y] = 0;
                drop_x--;
                show_drop();
                break;
            case 2:
                board[drop_x][drop_y - 1] = 0;
                drop_x--;
                show_drop();
                break;
            case 3:
                board[drop_x - 1][drop_y] = 0;
                drop_x--;
                show_drop();
                break;
        }
    }
    //else log('bl');
}

function can_right() {
    if (drop_x == 5) return 0;
    switch (rot_stat) {
        case 0:
            if (board[drop_x + 1][drop_y]) return 0;
            else return 1;
        case 1:
            if (drop_x == 4) return 0;
            if (board[drop_x + 2][drop_y]) return 0;
            else return 1;
        case 2:
            if (board[drop_x + 1][drop_y - 1]) return 0;
            else return 1;
        case 3:
            if (board[drop_x + 1][drop_y]) return 0;
            else return 1;
    }
}

function move_right() {
    if (!falling) return;
    if (can_right()) {
        board[drop_x][drop_y] = 0;
        switch (rot_stat) {
            case 0:
                board[drop_x][drop_y + 1] = 0;
                drop_x++;
                show_drop();
                break;
            case 1:
                board[drop_x + 1][drop_y] = 0;
                drop_x++;
                show_drop();
                break;
            case 2:
                board[drop_x][drop_y - 1] = 0;
                drop_x++;
                show_drop();
                break;
            case 3:
                board[drop_x - 1][drop_y] = 0;
                drop_x++;
                show_drop();
                break;
        }
    }
    //else log('bl');
}

function can_cw() {
    switch (rot_stat) {
        case 0:
            if (drop_x == 5) return 0;
            if (board[drop_x + 1][drop_y]) return 0;
            else return 1;
        case 1:
            if (drop_y == 0) return 0;
            if (board[drop_x][drop_y - 1]) return 0;
            else return 1;
        case 2:
            if (drop_x == 0) return 0;
            if (board[drop_x - 1][drop_y]) return 0;
            else return 1;
        case 3:
            return 1;
    }
}

function rotate_cw() {
    if (can_cw()) {
        switch (rot_stat) {
            case 0:
                rot_stat = 1;
                board[drop_x][drop_y + 1] = 0;
                board[drop_x + 1][drop_y] = drop_color2;
                break;
            case 1:
                rot_stat = 2;
                board[drop_x + 1][drop_y] = 0;
                board[drop_x][drop_y - 1] = drop_color2;
                break;
            case 2:
                rot_stat = 3;
                board[drop_x][drop_y - 1] = 0;
                board[drop_x - 1][drop_y] = drop_color2;
                break;
            case 3:
                rot_stat = 0;
                board[drop_x - 1][drop_y] = 0;
                board[drop_x][drop_y + 1] = drop_color2;
                break;
        }
        //log(rot_stat);
        show_drop();
    } else log("cannot rotate");
}

function can_ccw() {
    switch (rot_stat) {
        case 0:
            if (drop_x == 0) return 0;
            if (board[drop_x - 1][drop_y]) return 0;
            else return 1;
        case 1:
            return 1;
        case 2:
            if (drop_x == 5) return 0;
            if (board[drop_x + 1][drop_y]) return 0;
            else return 1;
        case 3:
            if (drop_y == 0) return 0;
            if (board[drop_x][drop_y - 1]) return 0;
            else return 1;
    }
}

function rotate_ccw() {
    if (can_ccw()) {
        switch (rot_stat) {
            case 0:
                rot_stat = 3;
                board[drop_x][drop_y + 1] = 0;
                board[drop_x - 1][drop_y] = drop_color2;
                break;
            case 1:
                rot_stat = 0;
                board[drop_x + 1][drop_y] = 0;
                board[drop_x][drop_y + 1] = drop_color2;
                break;
            case 2:
                rot_stat = 1;
                board[drop_x][drop_y - 1] = 0;
                board[drop_x + 1][drop_y] = drop_color2;
                break;
            case 3:
                rot_stat = 2;
                board[drop_x - 1][drop_y] = 0;
                board[drop_x][drop_y - 1] = drop_color2;
                break;
        }
        show_drop();
    } else log("cannot rotate");
}

function ex_grav() {
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 6; x++) {
            if (can_grav(x, y)) {
                return 1
            }
        }
    }
    return 0;
}

function can_grav(x, y) {
    if (y < 1) return 0;
    if (board[x][y] && !board[x][y - 1]) return 1;
    else return 0;
}

var gravedx = [];
var gravedy = [];
var graved = 0;

function grav(x, y) {
    board[x][y - 1] = board[x][y];
    board[x][y] = 0;
    if (can_grav(x, y - 1)) grav(x, y - 1);
    else {
        gravedx[gravedx.length] = x;
        gravedy[gravedy.length] = y - 1;
    }
}

function scan_grav() {
    graved = 0;
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 6; x++) {
            if (can_grav(x, y)) {
                grav(x, y);
                graved = 1;
            }
        }
    }
    if (graved) {
        scan_grav();
    }
    show_board();
}

function bbuyo(x, y, nd) {
    if (board_check[x][y]) return;
    if (!board[x][y]) {
        board_check[x][y] = -1;
        return;
    }

    board_check[x][y] = -2;
    if (x != 5) {
        if (!board_check[x + 1][y]) {
            if (board[x][y] == board[x + 1][y]) {
                bycnt++;
                bbuyo(x + 1, y, 0);
            } else board_check[x + 1][y] = -1;
        }
    }
    if (x) {
        if (!board_check[x - 1][y]) {
            if (board[x][y] == board[x - 1][y]) {
                bycnt++;
                bbuyo(x - 1, y, 0);
            } else board_check[x - 1][y] = -1;
        }
    }
    if (y != 12) {
        if (!board_check[x][y + 1]) {
            if (board[x][y] == board[x][y + 1]) {
                bycnt++;
                bbuyo(x, y + 1, 0);
            } else board_check[x][y + 1] = -1;
        }
    }
    if (y) {
        if (!board_check[x][y - 1]) {
            if (board[x][y] == board[x][y - 1]) {
                bycnt++;
                bbuyo(x, y - 1, 0);
            } else board_check[x][y - 1] = -1;
        }
    }
    board_check[x][y] = bycnt;
    $('ts').innerText += (x + ',' + y + ' : ');
    $('ts').innerText += bycnt + '\n';
    if (nd) {
        bycnt = 1;
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 13; y++) {
                if (board_check[x][y] == -1) {
                    board_check[x][y] = 0;
                }
            }
        }
    }
}

var byed = 0;

function scan_by() {
    byed = 0;
    log('');
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 13; y++) {
            if (!board[x][y]) board_check[x][y] = -3;
        }
    }

    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 13; y++) {
            if (!board_check[x][y]) bbuyo(x, y, 1);
        }
    }
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 13; y++) {
            if (board_check[x][y] > 3) {
                board[x][y] = 0;
                byed = 1;
            }
        }
    }
    clear_check();
    show_board();
}

var delay2 = 2000;

function scan_drby() {
    scan_grav();
    show_board();
    if (graved) {
        setTimeout(function () {
            scan_by();
            show_drop();
            if (byed) {
                setTimeout(scan_drby, delay2);
            }
            else {
                make_drop();
                fall_drop();
                show_drop();
            }
        }, delay2);
    }
    else {
        scan_by();
        show_drop();
        if (byed) {
            setTimeout(scan_drby, delay2);
        }
        else {
            make_drop();
            fall_drop();
            show_drop();
        }
    }
    show_board();
}