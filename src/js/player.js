import { sourceAll } from './render';

let audio = new Audio();
export let status = 'pause';

export function load(source = sourceAll, index = 0) {
    console.log(source[index % 4].audioSrc)
    audio.src = source[index % 4].audioSrc;
    audio.load();
}

export function paly() {
    audio.play()
    status = 'play';
}

export function pause() {
    audio.pause();
    status = 'pause';
}

export function finish(fn) {
    audio.onended = fn;
}

export function palyTo(time) {
    audio.currentTime = time;
}

export function palyTime() {
    return audio.currentTime;
}

export function playTimeAll () {
    return audio.duration;
}