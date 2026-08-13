# raat ke baad

A cinematic, single-page music experience inspired by 2000s Bollywood after dark.

## Run locally

Open `index.html` directly, or serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

The player is an atmosphere-first interaction prototype; the Spotify and YouTube links open legitimate streaming searches for the featured song.

## Add five songs

The five local MP3s currently in `audio/` are wired into the player:

- `Beete Lamhe Lyrical Video Song   The Train  K.K.  Mithoon  Emraan Hashmi, Geeta Basra.mp3`
- `Jo Bhi Kasmein Khai Thi Humne - Raaz  Bipasha Basu & Dino Morea  Alka Yagnik & Udit Narayan.mp3`
- `Jo Tere Sang - Blood Money  Kunal Khemu, Amrita Puri  Mustafa Zahid  Jeet Gannguli  4K.mp3`
- `Soniyo  - Raaz 2  Kangana Ranaut, Emraan H  Shreya Ghoshal,  Sonu Nigam  Kumaar  4K.mp3`
- `Woh Lamhe Woh Baatein (Lyrics Video) Atif Aslam  Emraan Hashmi  Zeher (2005)  WorldFamousLyrics.mp3`

The player supports play/pause, previous/next, auto-advance, progress seeking, duration display, and rotating-disk playback state.
