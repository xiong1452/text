import {
    isLike,
    renderSong,
    renderImg,
    renderRotate,
    renderClass
} from './render';
import * as miuse from './player';
import {
    moveTime,
    renderTime
} from './progress';
let lis = document.getElementsByTagName('li');
let songlist = document.getElementsByClassName('list')[0];
let songListClose = document.getElementsByClassName('close')[0];
let songListdl = document.querySelectorAll('.list dl')[0];
let imitate = new TouchEvent('touchend');
let len = 0;
let playKey = true;
let lastIndex = 0;
miuse.finish(finishControl);

setTimeout(() => {
    isLike() ? lis[0].className = 'likeactive' : '';
    miuse.load(undefined, len);
}, 100)

function renderAll(source, len) {
    renderSong(source, len);
    renderImg(source, len);
    isLike(source, len) ? lis[0].className = 'likeactive' : lis[0].className = '';
    miuse.load(source, len);
    renderRotate(0);
    renderClass(len + 1);
    renderTime(source, len);
    muiseControl();
}

lis[3].addEventListener('touchend', e => {
    len++;
    playKey = true;
    lastIndex = len;
    renderAll(undefined, len % 4)
}, false)
lis[1].addEventListener('touchend', e => {
    --len < 0 ? len = 3 : '';
    playKey = true;
    lastIndex = len;
    renderAll(undefined, len)
}, false)
lis[2].addEventListener('touchend', muiseControl, false);
lis[4].addEventListener('touchend', e => {
    songlist.style.transition = '.3s ease-in-out';
    songlist.style.transform = 'translate(0px)'
}, false);
songListClose.addEventListener('touchend', closeDom, false);
songListdl.addEventListener('touchend', function (e) {
    let dom = e.target
    let index = +dom.dataset.index;
    if (dom.nodeName === 'DT' || lastIndex == index) {
        return;
    }
    lastIndex = index;
    len = index;
    playKey = true;
    renderAll(undefined, index);
    closeDom();
}, false)


function closeDom() {
    songlist.style.transform = 'translateY(400px)'
}

function muiseControl(e) {
    if (playKey) {
        miuse.paly();
        lis[2].className = 'muisePlayer';
        renderRotate(true);
        moveTime(true);
    } else {
        miuse.pause();
        lis[2].className = '';
        renderRotate(false);
        moveTime(false);
    }
    playKey = !playKey;
}

function finishControl() {
    lis[3].dispatchEvent(imitate);
}