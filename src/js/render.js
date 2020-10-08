import {
    blurImg
} from './gaussBlur'

let songImg = document.querySelectorAll('.songImg img')[0];
let songTitle = document.getElementsByClassName('songTitle')[0];
let songer = document.getElementsByClassName('songer')[0];
let songAlbum = document.getElementsByClassName('songAlbum')[0];
let songList = document.querySelectorAll('.list dl')[0];
export let sourceAll;
let lastDom = 1;
let sourceLength;
let timer = null;
let rotateDeg = 0;

async function ajax() {
    let result = await fetch("/src/mock/data.json");
    return await result.json();
}

ajax().then(result => {
    console.log(result);
    sourceAll = result;
    sourceLength = result.length;
    renderImg(result);
    renderSong(result, 0);
    renderList();
})

export function renderImg(source = sourceAll, index = 0) {
    songImg.src = source[index % sourceLength].image;
    songImg.onload = e => {
        blurImg(songImg, document.body);
    }
}

export function renderSong(source = sourceAll, index = 0) {
    let obj = source[index % sourceLength];
    songTitle.innerHTML = obj.name;
    songer.innerHTML = obj.singer;
    songAlbum.innerHTML = obj.album;
}

export function isLike(source = sourceAll, index = 0) {
    return source[index % sourceLength].isLike
}

export function renderRotate(deg) {
    let dom = songImg.style;
    if(typeof deg === 'number'){
        rotateDeg = 0;
        clearInterval(timer);
        return 0;
    }
    if (deg) {
        timer = setInterval(() => {
            rotateDeg += 0.2
            dom.transform = `rotate(${rotateDeg}deg)`;
        }, 1000 / 60)
    } else {
        clearInterval(timer);
    }
}

function renderList(source = sourceAll) {
    let dt = document.createElement('dt');
    dt.innerText = '播放列表'
    songList.appendChild(dt);
    source.forEach( (ele, index) => {
        let dd = document.createElement('dd');
        dd.innerHTML = ele.name;
        dd.dataset.index = index;
        songList.appendChild(dd);
    })
    songList.children[1].className = 'listActive';
}

export function renderClass(index = 1) {
    let dom = songList.children; 
    dom[lastDom].className = '';
    lastDom = index;
    dom[index].className = 'listActive';
}