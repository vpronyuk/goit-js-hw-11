import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
  console.log(`Playing: ${event.seconds} sec`);
  const playTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', playTime);
}

const savedTime = localStorage.getItem('videoplayer-current-time');
const startTime = JSON.parse(savedTime);
console.log(`Video is starting from ${startTime} sec`);

player
  .setCurrentTime(savedTime)
  .then(function () {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
