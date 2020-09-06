var ultxt = '<ul id="board_ul">'

function init() {
    load_img();
    document.onkeydown = kpress;
    def_board();
    show_board();
}

function kpress() {
    key = window.event.keyCode;
    try {
        setlist[key]();
    }
    catch (e) { log(e); }
}

function press_leftarrow() {
    move_left();
}

function press_rightarrow() {
    move_right();

}
/*
function press_downarrow() {
    fall_drop();
}
*/

function load_img() {
    imgarr = ['img/b1.png', 'img/b2.png', 'img/b3.png', 'img/b4.png']
    let n = imgarr.length;
    for (let i = 0; i < n; i++) {
        let img = new Image();
        img.src = imgarr[i];
    }
}