const player = document.querySelector('.player');
const audio = document.querySelector('#audio');
const playButton = document.querySelector('[data-action="play"]');
const status = document.querySelector('.player-status');
const playIcon = document.querySelector('.play-icon');
const title = document.querySelector('[data-track-title]');
const artist = document.querySelector('[data-track-artist]');
const meta = document.querySelector('[data-track-meta]');
const currentTime = document.querySelector('[data-current-time]');
const duration = document.querySelector('[data-duration]');
const progress = document.querySelector('[data-progress]');

// Local playlist using the five MP3s in /audio.
const tracks = [
  { title: 'Beetein Lamhe', artist: 'KK · The Train', meta: 'from the train · 2007', file: 'audio/Beete Lamhe Lyrical Video Song   The Train  K.K.  Mithoon  Emraan Hashmi, Geeta Basra.mp3' },
  { title: 'Jo Bhi Kasmein', artist: 'Alka Yagnik & Udit Narayan · Raaz', meta: 'old promises · 2002', file: 'audio/Jo Bhi Kasmein Khai Thi Humne - Raaz  Bipasha Basu & Dino Morea  Alka Yagnik & Udit Narayan.mp3' },
  { title: 'Jo Tere Sang', artist: 'Mustafa Zahid · Blood Money', meta: 'somewhere between us · 2012', file: 'audio/Jo Tere Sang - Blood Money  Kunal Khemu, Amrita Puri  Mustafa Zahid  Jeet Gannguli  4K.mp3' },
  { title: 'Soniyo', artist: 'Shreya Ghoshal & Sonu Nigam · Raaz 2', meta: 'rain on the glass · 2009', file: 'audio/Soniyo  - Raaz 2  Kangana Ranaut, Emraan H  Shreya Ghoshal,  Sonu Nigam  Kumaar  4K.mp3' },
  { title: 'Woh Lamhe Woh Baatein', artist: 'Atif Aslam · Zeher', meta: 'last song on side b · 2005', file: 'audio/Woh Lamhe Woh Baatein (Lyrics Video) Atif Aslam  Emraan Hashmi  Zeher (2005)  WorldFamousLyrics.mp3' }
];

let trackIndex = 0;
const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '00:00';
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

function loadTrack(index, autoplay = false) {
  trackIndex = (index + tracks.length) % tracks.length;
  const track = tracks[trackIndex];
  title.textContent = track.title;
  artist.innerHTML = `${track.artist.split(' · ')[0]} <span class="separator">·</span> ${track.artist.split(' · ')[1] || ''}`;
  meta.textContent = track.meta;
  audio.src = encodeURI(track.file);
  audio.load();
  currentTime.textContent = '00:00';
  duration.textContent = '00:00';
  progress.querySelector('span').style.width = '0%';
  if (autoplay) audio.play().catch(() => setStatus(`add ${track.file} to start this memory`));
}

function setStatus(message) { status.textContent = ''; }

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => setStatus(`now playing · ${tracks[trackIndex].title.toLowerCase()}`)).catch(() => setStatus(`add ${tracks[trackIndex].file} to start this memory`));
  } else {
    audio.pause();
  }
});

document.querySelector('[data-action="prev"]').addEventListener('click', () => loadTrack(trackIndex - 1, !audio.paused));
document.querySelector('[data-action="next"]').addEventListener('click', () => loadTrack(trackIndex + 1, !audio.paused));

audio.addEventListener('play', () => {
  player.classList.add('is-playing');
  playIcon.textContent = 'Ⅱ';
  playButton.setAttribute('aria-label', `Pause ${tracks[trackIndex].title}`);
});
audio.addEventListener('pause', () => {
  player.classList.remove('is-playing');
  playIcon.textContent = '▶';
  playButton.setAttribute('aria-label', `Play ${tracks[trackIndex].title}`);
});
audio.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(audio.duration); });
audio.addEventListener('timeupdate', () => {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.querySelector('span').style.width = `${audio.duration ? (audio.currentTime / audio.duration) * 100 : 0}%`;
});
audio.addEventListener('ended', () => loadTrack(trackIndex + 1, true));
progress.addEventListener('click', (event) => {
  if (!audio.duration) return;
  const bounds = progress.getBoundingClientRect();
  audio.currentTime = ((event.clientX - bounds.left) / bounds.width) * audio.duration;
});

loadTrack(0);
