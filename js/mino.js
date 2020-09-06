/*
미노 순서
1 : i
2 : j
3 : l
4 : o
5 : s
6 : t
7 : z
*/

var bag = [1, 2, 3, 4, 5, 6, 7];
var bagcnt = 0;
var mino_locx = []
var mino_locy = []
function make_preset() {
    for (let i = 1; i < 8; i++) {
        mino_locx[i] = new Array();
        mino_locy[i] = new Array();
        for (let j = 0; j < 4; j++) {

            mino_locx[i][j] = new Array();
            mino_locy[i][j] = new Array();
        }
    }

    //[i미노][0~270도][4개블록]
    mino_locx[1][0][0] = -1; mino_locy[1][0][0] = 0; mino_locx[1][0][1] = 0; mino_locy[1][0][1] = 0; mino_locx[1][0][2] = 1; mino_locy[1][0][2] = 0; mino_locx[1][0][3] = 2; mino_locy[1][0][3] = 0;
    mino_locx[1][1][0] = 1; mino_locy[1][1][0] = 1; mino_locx[1][1][1] = 1; mino_locy[1][1][1] = 0; mino_locx[1][1][2] = 1; mino_locy[1][1][2] = -1; mino_locx[1][1][3] = 1; mino_locy[1][1][3] = -2;
    mino_locx[1][2][0] = -1; mino_locy[1][2][0] = -1; mino_locx[1][2][1] = 0; mino_locy[1][2][1] = -1; mino_locx[1][2][2] = 1; mino_locy[1][2][2] = -1; mino_locx[1][2][3] = 2; mino_locy[1][2][3] = -1;
    mino_locx[1][3][0] = 0; mino_locy[1][3][0] = 1; mino_locx[1][3][1] = 0; mino_locy[1][3][1] = 0; mino_locx[1][3][2] = 0; mino_locy[1][3][2] = -1; mino_locx[1][3][3] = 0; mino_locy[1][3][3] = -2;
    //[j미노][0~270도][4개블록]
    mino_locx[2][0][0] = 0; mino_locy[2][0][0] = 0; mino_locx[2][0][1] = -1; mino_locy[2][0][1] = 0; mino_locx[2][0][2] = -1; mino_locy[2][0][2] = 1; mino_locx[2][0][3] = 1; mino_locy[2][0][3] = 0;
    mino_locx[2][1][0] = 0; mino_locy[2][1][0] = 0; mino_locx[2][1][1] = 0; mino_locy[2][1][1] = -1; mino_locx[2][1][2] = 0; mino_locy[2][1][2] = 1; mino_locx[2][1][3] = 1; mino_locy[2][1][3] = 1;
    mino_locx[2][2][0] = 0; mino_locy[2][2][0] = 0; mino_locx[2][2][1] = -1; mino_locy[2][2][1] = 0; mino_locx[2][2][2] = 1; mino_locy[2][2][2] = 0; mino_locx[2][2][3] = 1; mino_locy[2][2][3] = -1;
    mino_locx[2][3][0] = 0; mino_locy[2][3][0] = 0; mino_locx[2][3][1] = 0; mino_locy[2][3][1] = -1; mino_locx[2][3][2] = 0; mino_locy[2][3][2] = 1; mino_locx[2][3][3] = -1; mino_locy[2][3][3] = -1;
    //[l미노][0~270도][4개블록]
    mino_locx[3][0][0] = 0; mino_locy[3][0][0] = 0; mino_locx[3][0][1] = -1; mino_locy[3][0][1] = 0; mino_locx[3][0][2] = 1; mino_locy[3][0][2] = 0; mino_locx[3][0][3] = 1; mino_locy[3][0][3] = 1;
    mino_locx[3][1][0] = 0; mino_locy[3][1][0] = 0; mino_locx[3][1][1] = 0; mino_locy[3][1][1] = -1; mino_locx[3][1][2] = 0; mino_locy[3][1][2] = 1; mino_locx[3][1][3] = 1; mino_locy[3][1][3] = -1;
    mino_locx[3][2][0] = 0; mino_locy[3][2][0] = 0; mino_locx[3][2][1] = -1; mino_locy[3][2][1] = 0; mino_locx[3][2][2] = 1; mino_locy[3][2][2] = 0; mino_locx[3][2][3] = -1; mino_locy[3][2][3] = -1;
    mino_locx[3][3][0] = 0; mino_locy[3][3][0] = 0; mino_locx[3][3][1] = 0; mino_locy[3][3][1] = 1; mino_locx[3][3][2] = 0; mino_locy[3][3][2] = -1; mino_locx[3][3][3] = -1; mino_locy[3][3][3] = 1;
    //[o미노][0~270도][4개블록]
    mino_locx[4][0][0] = 0; mino_locy[4][0][0] = 0; mino_locx[4][0][1] = 1; mino_locy[4][0][1] = 0; mino_locx[4][0][2] = 0; mino_locy[4][0][2] = 1; mino_locx[4][0][3] = 1; mino_locy[4][0][3] = 1;
    mino_locx[4][1][0] = 0; mino_locy[4][1][0] = 0; mino_locx[4][1][1] = 1; mino_locy[4][1][1] = 0; mino_locx[4][1][2] = 0; mino_locy[4][1][2] = 1; mino_locx[4][1][3] = 1; mino_locy[4][1][3] = 1;
    mino_locx[4][2][0] = 0; mino_locy[4][2][0] = 0; mino_locx[4][2][1] = 1; mino_locy[4][2][1] = 0; mino_locx[4][2][2] = 0; mino_locy[4][2][2] = 1; mino_locx[4][2][3] = 1; mino_locy[4][2][3] = 1;
    mino_locx[4][3][0] = 0; mino_locy[4][3][0] = 0; mino_locx[4][3][1] = 1; mino_locy[4][3][1] = 0; mino_locx[4][3][2] = 0; mino_locy[4][3][2] = 1; mino_locx[4][3][3] = 1; mino_locy[4][3][3] = 1;
    //[s미노][0~270도][4개블록]
    mino_locx[5][0][0] = 0; mino_locy[5][0][0] = 0; mino_locx[5][0][1] = 0; mino_locy[5][0][1] = 1; mino_locx[5][0][2] = -1; mino_locy[5][0][2] = 0; mino_locx[5][0][3] = 1; mino_locy[5][0][3] = 1;
    mino_locx[5][1][0] = 0; mino_locy[5][1][0] = 0; mino_locx[5][1][1] = 0; mino_locy[5][1][1] = 1; mino_locx[5][1][2] = 1; mino_locy[5][1][2] = 0; mino_locx[5][1][3] = 1; mino_locy[5][1][3] = -1;
    mino_locx[5][2][0] = 0; mino_locy[5][2][0] = 0; mino_locx[5][2][1] = 0; mino_locy[5][2][1] = -1; mino_locx[5][2][2] = 1; mino_locy[5][2][2] = 0; mino_locx[5][2][3] = -1; mino_locy[5][2][3] = -1;
    mino_locx[5][3][0] = 0; mino_locy[5][3][0] = 0; mino_locx[5][3][1] = 0; mino_locy[5][3][1] = -1; mino_locx[5][3][2] = -1; mino_locy[5][3][2] = 0; mino_locx[5][3][3] = -1; mino_locy[5][3][3] = 1;
    //[t미노][0~270도][4개블록]
    mino_locx[6][0][0] = 0; mino_locy[6][0][0] = 0; mino_locx[6][0][1] = -1; mino_locy[6][0][1] = 0; mino_locx[6][0][2] = 0; mino_locy[6][0][2] = 1; mino_locx[6][0][3] = 1; mino_locy[6][0][3] = 0;
    mino_locx[6][1][0] = 0; mino_locy[6][1][0] = 0; mino_locx[6][1][1] = 0; mino_locy[6][1][1] = -1; mino_locx[6][1][2] = 0; mino_locy[6][1][2] = 1; mino_locx[6][1][3] = 1; mino_locy[6][1][3] = 0;
    mino_locx[6][2][0] = 0; mino_locy[6][2][0] = 0; mino_locx[6][2][1] = -1; mino_locy[6][2][1] = 0; mino_locx[6][2][2] = 0; mino_locy[6][2][2] = -1; mino_locx[6][2][3] = 1; mino_locy[6][2][3] = 0;
    mino_locx[6][3][0] = 0; mino_locy[6][3][0] = 0; mino_locx[6][3][1] = -1; mino_locy[6][3][1] = 0; mino_locx[6][3][2] = 0; mino_locy[6][3][2] = 1; mino_locx[6][3][3] = 0; mino_locy[6][3][3] = -1;
    //[z미노][0~270도][4개블록]
    mino_locx[7][0][0] = 0; mino_locy[7][0][0] = 0; mino_locx[7][0][1] = 0; mino_locy[7][0][1] = 1; mino_locx[7][0][2] = 1; mino_locy[7][0][2] = 0; mino_locx[7][0][3] = -1; mino_locy[7][0][3] = 1;
    mino_locx[7][1][0] = 0; mino_locy[7][1][0] = 0; mino_locx[7][1][1] = 0; mino_locy[7][1][1] = -1; mino_locx[7][1][2] = 1; mino_locy[7][1][2] = 0; mino_locx[7][1][3] = 1; mino_locy[7][1][3] = 1;
    mino_locx[7][2][0] = 0; mino_locy[7][2][0] = 0; mino_locx[7][2][1] = 0; mino_locy[7][2][1] = -1; mino_locx[7][2][2] = -1; mino_locy[7][2][2] = 0; mino_locx[7][2][3] = 1; mino_locy[7][2][3] = -1;
    mino_locx[7][3][0] = 0; mino_locy[7][3][0] = 0; mino_locx[7][3][1] = 0; mino_locy[7][3][1] = 1; mino_locx[7][3][2] = -1; mino_locy[7][3][2] = 0; mino_locx[7][3][3] = -1; mino_locy[7][3][3] = -1;
}
function shuffle_bag() {
    let tmp;
    let random;
    for (let i = 7; i > 1; i--) {
        random = get_rint(6);
        tmp = bag[random];
        bag[random] = bag[i - 1];
        bag[i - 1] = tmp;
    }
}

function nextmino() {
    if (bagcnt != 6) return bag[bagcnt++];
    else {
        let tmp = bag[6]
        bagcnt = 0;
        shuffle_bag();
        return tmp;
    }
}

function show_fallmino() {
    clear_fallboard();
    for (let i = 0; i < 4; i++) {
        fall_board[drop_x + mino_locx[cur_mino][rot_stat][i]][drop_y + mino_locy[cur_mino][rot_stat][i]] = cur_mino;
    }
    show_fallboard();
}

function stick() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 21; y++) {
            if (fall_board[x][y]) {
                board[x][y] = fall_board[x][y];
            }
        }
    }
    clear_fallboard();
    show_board();
    make_drop();
}