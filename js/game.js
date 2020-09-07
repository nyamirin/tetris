var drop_color1;
var drop_color2;
var drop_x;
var drop_y;
var rot_stat = 0;
var delay = 1000;
var timer;
var bycnt = 1;
var falling = 0;
var cur_mino = 0;

/*낙하 상태
처리중 0
낙하중 1
*/

function start_game() {
    bag_init();
    make_drop();
    sleep(delay);
    falling = 1;
    //fall_drop();
}

function make_drop() {
    if (board[4][19]) log("game over");
    else {
        falling = 1;
        cur_mino = nextmino();
        drop_x = 4;
        drop_y = 19;
        rot_stat = 0;
        show_fallmino();
        timer = setTimeout(move_down, delay);
    }
}

function rotate_cw() {
    if (can_cw()) {
        rot_stat = (rot_stat + 1) % 4;
        show_fallmino();
    }
    else {
        let cur;
        if (!cur_mino) cur = 1;
        else cur = 0;
        let dx = drop_x; let dy = drop_y;
        for (let i = 0; i < 4; i++) {
            drop_x += xpre_cw[cur][rot_stat][i];
            drop_y += ypre_cw[cur][rot_stat][i];
            if (can_cw()) {
                rot_stat = (rot_stat + 1) % 4;
                show_fallmino();
                return;
            }
            else {
                drop_x = dx; drop_y = dy;
            }
        }
    }
}

function rotate_ccw() {
    if (can_ccw()) {
        if (rot_stat == 0) rot_stat = 3;
        else rot_stat--;
        show_fallmino();
    }
    else {
        let cur;
        if (!cur_mino) cur = 1;
        else cur = 0;
        let dx = drop_x; let dy = drop_y;
        for (let i = 0; i < 4; i++) {
            drop_x += xpre_ccw[cur][rot_stat][i];
            drop_y += ypre_ccw[cur][rot_stat][i];
            if (can_ccw()) {
                if (rot_stat == 0) rot_stat = 3;
                else rot_stat--;
                show_fallmino();
                return;
            }
            else {
                drop_x = dx; drop_y = dy;
            }
        }
    }
}

function move_left() {
    if (can_left()) {
        drop_x--;
        show_fallmino();
    }
}

function move_right() {
    if (can_right()) {
        drop_x++;
        show_fallmino();
    }
}

function move_down() {
    if (can_down()) {
        drop_y--;
        show_fallmino();
        timer = setTimeout(() => {
            if (can_down()) {
                falling = 1;
                move_down();
            }
            else {
                falling = 0;
                stick();
            }
        }, delay);
    }
    else {
        falling = 0;
        stick();
    }
}

function downarrow() {
    if (can_down()) {
        clearTimeout(timer);
        move_down();
    }
}

function hard_drop() {
    clearTimeout(timer);
    while (can_down()) {
        drop_y--;
        show_fallmino();
    }
    stick();
}

function can_down() {
    if (!falling) return 0;
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
        let cx = drop_x + mino_locx[cur_mino][rot_stat][i];
        let cy = drop_y + mino_locy[cur_mino][rot_stat][i] - 1;
        if (-1 < cy) cnt += board[cx][cy];
        else return 0;
    }
    if (!cnt) return 1;
    else return 0;
}

function can_ccw() {
    let cnt = 0;
    let crt;
    if (rot_stat == 0) crt = 3;
    else crt = rot_stat - 1;
    for (let i = 0; i < 4; i++) {
        let cx = drop_x + mino_locx[cur_mino][crt][i];
        let cy = drop_y + mino_locy[cur_mino][crt][i];
        if (-1 < cx && cx < 10 && -1 < cy) cnt += board[cx][cy];
        else return 0;
    }
    if (!cnt) return 1;
    else return 0;

}

function can_cw() {
    let cnt = 0;

    for (let i = 0; i < 4; i++) {
        let cx = drop_x + mino_locx[cur_mino][(rot_stat + 1) % 4][i];
        let cy = drop_y + mino_locy[cur_mino][(rot_stat + 1) % 4][i];
        if (-1 < cx && cx < 10 && -1 < cy) cnt += board[cx][cy];
        else return 0;
    }
    if (!cnt) return 1;
    else return 0;
}

function can_left() {
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
        let cx = drop_x + mino_locx[cur_mino][rot_stat][i] - 1;
        let cy = drop_y + mino_locy[cur_mino][rot_stat][i];
        if (-1 < cx) cnt += board[cx][cy];
        else return 0;
    }
    if (!cnt) return 1;
    else return 0;
}

function can_right() {
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
        let cx = drop_x + mino_locx[cur_mino][rot_stat][i] + 1;
        let cy = drop_y + mino_locy[cur_mino][rot_stat][i];
        if (cx < 10) cnt += board[cx][cy];
        else return 0;
    }
    if (!cnt) return 1;
    else return 0;
}
