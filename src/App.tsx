import { Pause, Play, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PortfolioOverlay, type SongSnippet } from './components/PortfolioOverlay';
import {
  RoomScene,
  blenderCalibratedMusicHotspotPosition,
  blenderCalibratedTrophyHotspotPosition,
  blenderCalibratedVinylPosition,
} from './components/RoomScene';
import { portfolioSections, sectionById, type PortfolioSection } from './data/portfolioSections';

const autoplaySong: SongSnippet = {
  title: 'Sunrise',
  artist: 'Sofia',
  src: '/music-snippets/track1_sunrise.wav',
  note: 'Now playing',
};

const songSnippetManifestUrl = '/music-snippets/snippets.json';
const roomModelUrl = import.meta.env.VITE_ROOM_MODEL_URL || '/models/sofiaroom.glb';
const vinylPosition: [number, number, number] = blenderCalibratedVinylPosition;
const musicHotspotPosition: [number, number, number] = blenderCalibratedMusicHotspotPosition;
const trophyHotspotPosition: [number, number, number] = blenderCalibratedTrophyHotspotPosition;
const mouseClickSoundSrc = '/sounds/PcMouseClick_S08TE.975.wav';

function formatPlaybackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';

  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<PortfolioSection | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [currentSong, setCurrentSong] = useState<SongSnippet | null>(autoplaySong);
  const [playlistSongs, setPlaylistSongs] = useState<SongSnippet[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [nightMode, setNightMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayAttemptedRef = useRef(false);
  const usesBlenderRoom = Boolean(roomModelUrl);
  const visibleSections = usesBlenderRoom
    ? [sectionById.experience, sectionById.personal, sectionById.achievements, sectionById.research, sectionById.funfacts]
    : portfolioSections;

  const playSong = (song: SongSnippet) => {
    const audio = audioRef.current;

    setCurrentSong(song);

    if (!audio) {
      return;
    }

    if (audio.getAttribute('src') !== song.src) {
      audio.src = song.src;
      audio.currentTime = 0;
      setPlaybackTime(0);
    }

    audio.play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false));
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
    setIsMusicPlaying(false);
  };

  const updatePlaybackState = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setPlaybackTime(audio.currentTime);
    setTrackDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  };

  const seekMusic = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Math.min(Math.max(time, 0), trackDuration || 0);
    audio.currentTime = nextTime;
    setPlaybackTime(nextTime);
  };

  const playNextSong = () => {
    if (playlistSongs.length === 0) return;

    const currentIndex = playlistSongs.findIndex((song) => song.src === currentSong?.src);
    const nextSong = playlistSongs[currentIndex >= 0 ? (currentIndex + 1) % playlistSongs.length : 0];
    playSong(nextSong);
  };

  const playMouseClick = () => {
    const clickAudio = clickAudioRef.current;
    if (!clickAudio) return;

    clickAudio.currentTime = 0;
    clickAudio.volume = 1;
    clickAudio.play().catch(() => undefined);
  };

  useEffect(() => {
    if (autoplayAttemptedRef.current) {
      return;
    }

    autoplayAttemptedRef.current = true;
    playSong(autoplaySong);
  }, []);

  useEffect(() => {
    let isActive = true;

    fetch(songSnippetManifestUrl)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: unknown) => {
        if (!isActive || !Array.isArray(data)) {
          return;
        }

        setPlaylistSongs(
          data.filter((item): item is SongSnippet => (
            Boolean(item)
            && typeof item === 'object'
            && typeof (item as SongSnippet).title === 'string'
            && typeof (item as SongSnippet).src === 'string'
          )),
        );
      })
      .catch(() => {
        if (isActive) {
          setPlaylistSongs([]);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main
      className={`white-mouse-cursor room-gradient relative h-full w-full overflow-hidden ${nightMode ? 'night-mode' : ''}`}

    >
      <RoomScene
        activeSection={activeSection}
        isMusicPlaying={isMusicPlaying}
        nightMode={nightMode}
        onReady={() => setSceneReady(true)}
        onSelect={(section) => {
          playMouseClick();
          setActiveSection(section);
        }}
        onInteractableClick={playMouseClick}
        musicHotspotPosition={musicHotspotPosition}
        trophyHotspotPosition={trophyHotspotPosition}
        vinylPosition={vinylPosition}
      />
      {usesBlenderRoom && !sceneReady ? (
        <div className="room-loading-screen">
          <div className="room-loading-panel">
            <div className="room-loading-label">
              Loading
              <span className="loading-dot">.</span>
              <span className="loading-dot">.</span>
              <span className="loading-dot">.</span>
            </div>
          </div>
        </div>
      ) : null}
      <PortfolioOverlay
        activeSection={activeSection}
        currentSongSrc={currentSong?.src ?? null}
        isMusicPlaying={isMusicPlaying}
        sections={visibleSections}
        onPauseMusic={pauseMusic}
        onPlaySong={playSong}
        onSelect={setActiveSection}
        onClose={() => setActiveSection(null)}
      />
      {currentSong && !activeSection ? (
        <div className={`portfolio-music-player pointer-events-auto fixed bottom-[4.75rem] left-3 right-auto z-50 w-[min(20.5rem,calc(100vw-1.5rem))] px-0 py-0 sm:bottom-5 sm:left-auto sm:right-5 ${nightMode ? 'text-white' : 'text-ink'}`}>
          <div className={`mb-1 text-[0.68rem] font-medium leading-tight ${nightMode ? 'text-white/90' : 'text-ink/80'}`}>
            {currentSong.title} • Sofia
          </div>
          <div className="flex h-11 items-center gap-2 rounded-lg bg-white/90 px-2 py-2 shadow-lg shadow-ink/10 dark:bg-[#1f2a40]/90">
            <button
              type="button"
              className={`grid h-8 w-8 shrink-0 place-items-center rounded transition ${nightMode ? 'text-ink/90 hover:text-ink' : 'text-ink/70 hover:text-ink'}`}
              onClick={isMusicPlaying ? pauseMusic : () => playSong(currentSong)}
              aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
              title={isMusicPlaying ? 'Pause' : 'Play'}
            >
              {isMusicPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className={`grid h-8 w-8 shrink-0 place-items-center rounded transition disabled:opacity-35 ${nightMode ? 'text-ink/90 hover:text-ink' : 'text-ink/70 hover:text-ink'}`}
              onClick={playNextSong}
              disabled={playlistSongs.length === 0}
              aria-label="Play next song"
              title="Next"
            >
              <SkipForward className="h-4 w-4" />
            </button>
            <input
              type="range"
              className="music-progress block min-w-0 flex-1"
              min={0}
              max={trackDuration || 0}
              step={0.01}
              value={Math.min(playbackTime, trackDuration || 0)}
              onChange={(event) => seekMusic(Number(event.currentTarget.value))}
              aria-label="Seek music"
              title={currentSong.title}
              style={{
                background: nightMode
                  ? `linear-gradient(to right, rgba(179, 179, 179, 0.9) 0%, rgba(179, 179, 179, 0.9) ${trackDuration ? (playbackTime / trackDuration) * 100 : 0}%, rgba(120, 120, 120, 0.26) ${trackDuration ? (playbackTime / trackDuration) * 100 : 0}%, rgba(120, 120, 120, 0.26) 100%)`
                  : `linear-gradient(to right, rgba(79, 49, 68, 0.66) 0%, rgba(79, 49, 68, 0.66) ${trackDuration ? (playbackTime / trackDuration) * 100 : 0}%, rgba(79, 49, 68, 0.12) ${trackDuration ? (playbackTime / trackDuration) * 100 : 0}%, rgba(79, 49, 68, 0.12) 100%)`,
              }}
            />
            <span className={`w-16 shrink-0 text-right text-[0.66rem] font-semibold tabular-nums ${nightMode ? 'text-black' : 'text-ink/54'}`}>
              {formatPlaybackTime(playbackTime)} / {formatPlaybackTime(trackDuration)}
            </span>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className={`light-switch-button pointer-events-auto fixed right-3 top-3 z-50 ${nightMode ? 'is-night' : ''} sm:right-5 sm:top-5`}
        onClick={() => setNightMode((isNight) => !isNight)}
        aria-label={nightMode ? 'Turn off night mode' : 'Turn on night mode'}
        title={nightMode ? 'Turn lights on' : 'Turn lights off'}
      >
        <span className="light-switch-plate">
          <span className="light-switch-toggle" />
        </span>
      </button>
      <audio
        ref={audioRef}
        preload="auto"
        src={autoplaySong.src}
        loop={currentSong?.src === autoplaySong.src}
        onLoadedMetadata={updatePlaybackState}
        onDurationChange={updatePlaybackState}
        onTimeUpdate={updatePlaybackState}
        onEnded={() => {
          setIsMusicPlaying(false);
          updatePlaybackState();
        }}
      />
      <audio ref={clickAudioRef} preload="auto" src={mouseClickSoundSrc} />
    </main>
  );
}
