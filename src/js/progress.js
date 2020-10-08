import {
    sourceAll
} from './render';
import {
    palyTime,
    playTimeAll,
    palyTo,
    status
} from './player'

setTimeout(() => {
    renderTime();
}, 200)

let totalTime = document.getElementsByClassName('totalTime')[0];
let timer = null;
let curtime = document.getElementsByClassName('curtime')[0];
let forward = document.getElementsByClassName('forwardProgress')[0];
let circle = document.getElementsByClassName('cricle')[0];
let drag = document.getElementsByClassName('drag')[0];
let parentWidth = circle.offsetParent.offsetWidth;
let dragLeft = drag.offsetLeft
let requestTime = null;
let percent = 0;
let timeOut = null;

export function renderTime(source = sourceAll, index = 0) {
    totalTime.innerHTML = time60(source[index].duration);
}

function time60(timeAll) {
    let minute = Math.floor(timeAll / 60);
    let second = timeAll % 60;
    minute < 10 ? minute = '0' + minute : '';
    second < 10 ? second = '0' + second : '';
    return minute + ':' + second
}

export function moveTime(status, fn = function () {}) {
    if (status) {
        clearTimeout(timeOut);
        if (timer) {
            return;
        }
        timer = setInterval(() => {
            curtime.innerHTML = time60(Math.ceil(palyTime()));
            if (palyTime() === playTimeAll()) {
                clearInterval(timer)
                timer = null;
                fn();
            }
        }, 1000)
        moveProgress();
    } else {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            clearInterval(timer);
            cancelAnimationFrame(requestTime);
            timer = null;
        }, 500)
    }
}

function moveProgress() {
    let percentage = palyTime() / playTimeAll();
    forward.style.width = `${percentage * 100}%`;
    circle.style.transform = `translateX(${percentage * parentWidth}px)`;
    requestTime = requestAnimationFrame(moveProgress);
}

circle.style.transform = `translateX(0px)`;
circle.addEventListener('touchstart', function (e) {
    if(status == 'pause'){
        return ;
    }
    let dom = this.style
    let disX = e.changedTouches[0].pageX;
    let startLeft = parseInt(dom.transform.split('(')[1])

    circle.addEventListener('touchmove', e => {
        let nowTime = playTimeAll() * percent;
        let moveX = e.changedTouches[0].pageX - disX;
        let len = startLeft + moveX;
        if (len < 0) {
            len = 0;
        } else if (len > this.offsetParent.offsetWidth) {
            len = parentWidth
        }
        dom.transform = `translateX(${len}px)`;
        percent = len / parentWidth;
        curtime.innerHTML = time60(Math.ceil(nowTime));
        forward.style.width = `${percent * 100}%`;
        cancelAnimationFrame(requestTime)
        palyTo(nowTime);
    }, false)

    circle.addEventListener('touchend', e => {
        moveProgress();
    })

}, false)

drag.addEventListener('touchend', function (e) {
    if (e.target.classList.contains('cricle')) {
        return;
    }
    let disX = e.changedTouches[0].pageX - dragLeft;
    percent = disX / parentWidth
    forward.style.width = `${percent * 100}%`;
    circle.style.transform = `translateX(${disX}px)`;
    palyTo(playTimeAll() * percent);
}, false)