var ultxt = '<ul id="board_ul">'

function init() {
    make_preset();
    load_img();
    document.onkeydown = kpress;
    def_board();
    show_board();
    show_fallboard();
}

function kpress() {
    key = window.event.keyCode;
    try {
        setlist[key]();
    }
    catch (e) { log('key : ' + key + '\n' + e); }
}
function downarrow() {
    if (falling) move_down();
}


function load_img() {
    imgarr = ['img/b1.png', 'img/b2.png', 'img/b3.png', 'img/b4.png']
    let n = imgarr.length;
    for (let i = 0; i < n; i++) {
        let img = new Image();
        img.src = imgarr[i];
    }
}