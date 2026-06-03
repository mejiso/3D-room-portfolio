import {
  BookOpen,
  BriefcaseBusiness,
  CircleHelp,
  Code2,
  Disc3,
  FlaskConical,
  Info,
  Music2,
  Pause,
  Play,
  Trophy,
  X,
} from 'lucide-react';
import type { ComponentType, CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { PortfolioDropdown, PortfolioSection, SectionId } from '../data/portfolioSections';

type PortfolioOverlayProps = {
  activeSection: PortfolioSection | null;
  currentSongSrc: string | null;
  isMusicPlaying: boolean;
  sections: PortfolioSection[];
  onPauseMusic: () => void;
  onPlaySong: (song: SongSnippet) => void;
  onSelect: (section: PortfolioSection) => void;
  onToggleVinylPlacement: () => void;
  onClose: () => void;
  vinylPlacementMode: boolean;
};

const iconMap: Record<SectionId, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  experience: BriefcaseBusiness,
  research: FlaskConical,
  projects: Code2,
  education: BookOpen,
  personal: Music2,
  achievements: Trophy,
  funfacts: CircleHelp,
};

export type SongSnippet = {
  title: string;
  artist?: string;
  src: string;
  note?: string;
};

export function PortfolioOverlay({
  activeSection,
  currentSongSrc,
  isMusicPlaying,
  sections,
  onPauseMusic,
  onPlaySong,
  onSelect,
  onToggleVinylPlacement,
  onClose,
  vinylPlacementMode,
}: PortfolioOverlayProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoPanelRef = useRef<HTMLDivElement | null>(null);
  const infoButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isInfoOpen) return;
      const target = event.target as Node;
      if (
        infoPanelRef.current
        && !infoPanelRef.current.contains(target)
        && infoButtonRef.current
        && !infoButtonRef.current.contains(target)
      ) {
        setIsInfoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isInfoOpen]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-3 text-ink sm:p-5">
      <header className="pointer-events-auto flex items-start justify-between gap-3">
        <div />
        <div />
      </header>

      <div className="pointer-events-auto flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <nav className="grid grid-cols-3 gap-2 sm:grid-cols-7">
          {sections.map((section, index) => {
            const Icon = iconMap[section.id];
            const isActive = activeSection?.id === section.id;
            return (
              <button
                type="button"
                key={section.id}
                onClick={() => onSelect(section)}
                title={section.title}
                aria-label={section.title}
                className={`grid h-11 w-11 place-items-center rounded-md transition ${isActive ? 'bg-white text-ink ring-2 ring-ink/55' : 'bg-white/80 text-ink hover:bg-white'
                  }`}
              >
                <Icon className="floating-icon h-5 w-5 text-ink" style={{ animationDelay: `${index * 0.16}s` }} />
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          ref={infoButtonRef}
          onClick={() => setIsInfoOpen((value) => !value)}
          aria-label="Toggle portfolio instructions"
          className="pointer-events-auto absolute left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-modal transition hover:bg-white"
        >
          <Info className="h-5 w-5" />
        </button>
        {isInfoOpen ? (
          <div
            ref={infoPanelRef}
            className="pointer-events-auto absolute left-4 top-20 z-40 w-[min(27rem,calc(100%-1.5rem))] rounded-2xl bg-white/80 p-4 shadow-modal backdrop-blur-md border border-white/70 text-ink"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  Portfolio Guide
                </p>
                <h3 className="mt-1 text-lg font-black text-ink">How to use this portfolio</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                aria-label="Close info panel"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/75 text-ink transition hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-6 text-ink/85">
              <p>
                Welcome to my interactive 3D personal portfolio! This portfolio was designed using Blender for the 3D room assets and built with React, TypeScript, Three.js / React Three Fiber, HTML, and CSS.
              </p>
              <p>
                To explore the portfolio, click on the floating icons around the room. Each icon moves the camera closer to that area and opens a section with more information about my background, experience, projects, and interests.
              </p>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  Icon Key
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/82">
                  <li>
                    <span className="font-semibold">Laptop / Computer icon</span> — Work Experience
                  </li>
                  <li>
                    <span className="font-semibold">Book icon</span> — Research
                  </li>
                  <li>
                    <span className="font-semibold">Music note icon</span> — Music Experience
                  </li>
                  <li>
                    <span className="font-semibold">Question mark icon</span> — Fun Facts
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  Contact
                </p>
                <div className="mt-3 space-y-2 text-sm leading-6 text-ink/82">
                  <a
                    href="https://www.linkedin.com/in/mejiso/"
                    color='#f5baf5'
                    target="_blank"
                    rel="noreferrer"
                    className="block font-semibold text-ink underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/mejiso"
                    color='#f5baf5'
                    target="_blank"
                    rel="noreferrer"
                    className="block font-semibold text-ink underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeSection ? (
          <>
            <section className="glass-panel h-[78vh] w-full overflow-auto rounded-lg !bg-white/35 p-5 shadow-modal backdrop-blur-md md:w-[27rem]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: activeSection.color }}>
                    {activeSection.kicker}
                  </p>
                  <h2 className="mt-1 text-2xl font-black leading-tight">{activeSection.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close section"
                  title="Close"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/75 text-ink transition hover:bg-white"
                >
                  <X className="floating-icon h-4 w-4 text-ink" />
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/78">{activeSection.summary}</p>
              {activeSection.id === 'funfacts' ? (
                <>
                  <ClubsDropdown color={activeSection.color} />
                  <SectionHeader
                    color={activeSection.color}
                    label="Fun Facts"
                    title=""
                  />
                  <BubbleNotes color={activeSection.color} notes={activeSection.bullets} />
                </>
              ) : activeSection.dropdowns && activeSection.dropdowns.length > 0 ? (
                <DropdownList
                  color={activeSection.color}
                  items={activeSection.dropdowns}
                />
              ) : (
                <ul className="mt-4 space-y-3 text-sm leading-6 text-ink/82">
                  {activeSection.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: activeSection.color }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeSection.songSnippetManifest ? (
                <SongSnippetPanel
                  color={activeSection.color}
                  currentSongSrc={currentSongSrc}
                  isMusicPlaying={isMusicPlaying}
                  manifestUrl={activeSection.songSnippetManifest}
                  onPauseMusic={onPauseMusic}
                  onPlaySong={onPlaySong}
                />
              ) : null}
              {activeSection.projectHighlights && activeSection.projectHighlights.length > 0 ? (
                <div className="mt-5">
                  <h3 className="text-sm font-black text-ink">Projects</h3>
                  <DropdownList
                    color={activeSection.color}
                    items={activeSection.projectHighlights}
                  />
                </div>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {activeSection.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink/72">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
      {vinylPlacementMode ? (
        <div className="pointer-events-auto absolute left-3 top-16 rounded-lg border border-white/60 bg-white/80 px-3 py-2 text-sm font-bold text-ink shadow-modal backdrop-blur-md sm:left-5 sm:top-20">
          Click the floor to place the record.
        </div>
      ) : null}
    </div>
  );
}

function BubbleNotes({ color, notes }: { color: string; notes: string[] }) {
  return (
    <div className="mt-4 grid gap-2">
      {notes.map((note) => (
        <div
          key={note}
          className="rounded-lg border bg-white/55 p-3 text-sm font-semibold leading-6 text-ink/82 shadow-sm"
          style={{ borderColor: `${color}33` }}
        >
          {note}
        </div>
      ))}
    </div>
  );
}

function ClubsDropdown({ color }: { color: string }) {
  const clubs = [
    {
      title: 'alpha Kappa Delta Phi',
      subtitle: 'Asian Cultural Sorority',
      date: 'Membership',
      description: 'Asian Sorority focused on cultural, academic, and philanthropic events.',
      bullets: ['Positions Held: Social Chair, Academic Chair'],
      tech: [],
    },
    {
      title: 'Society of Asian Scientists & Engineers (SASE) General Member',
      subtitle: '',
      date: 'Membership',
      description: '',
      bullets: [],
      tech: [],
    },
    {
      title: 'Girls Who Code (GWC) General Member',
      subtitle: '',
      date: 'Membership',
      description: '',
      bullets: [],
      tech: [],
    },
  ];

  const detailedClubs = clubs.filter((c) => Boolean(c.description) || (c.bullets && c.bullets.length > 0));
  const simpleClubs = clubs.filter((c) => !Boolean(c.description) && !(c.bullets && c.bullets.length > 0));

  return (
    <div className="mt-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color }}>
        Clubs
      </p>
      <h3 className="mt-1 text-lg font-black text-ink"></h3>

      <div className="mt-3">
        {detailedClubs.length > 0 ? <DropdownList color={color} items={detailedClubs} /> : null}

        {simpleClubs.length > 0 ? (
          <div className="mt-3 space-y-2">
            {simpleClubs.map((club) => (
              <div key={club.title} className="rounded-lg bg-white/55 p-3 shadow-sm">
                <div>
                  <p className="text-sm font-black text-ink">{club.title}</p>
                  {club.subtitle ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">
                      {club.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SectionHeader({
  color,
  label,
  title,
}: {
  color: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color }}>
        {label}
      </p>
      <h3 className="mt-1 text-lg font-black text-ink">{title}</h3>
    </div>
  );
}

function DropdownList({
  color,
  items,
}: {
  color: string;
  items: PortfolioDropdown[];
}) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <details
          key={`${item.title}-${item.subtitle}`}
          className="rounded-lg bg-white/55 p-3 text-sm text-ink/82 shadow-sm"
        >
          <summary className="cursor-pointer list-none">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold text-ink/60">
                  {item.subtitle} • {item.date}
                  {item.location ? ` • ${item.location}` : ''}
                </p>
              </div>
              <span className="rounded-full bg-white/75 px-2 py-1 text-xs font-black text-ink/60">
                +
              </span>
            </div>
          </summary>

          <div className="mt-3 border-t border-ink/10 pt-3">
            <p className="text-sm leading-6 text-ink/78">{item.description}</p>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/82">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: color }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {item.links && item.links.length > 0 ? (
              <div className="mt-3 space-y-2 text-sm">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block font-semibold text-ink underline transition hover:text-ink/90"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}

            <div className="mt-3 flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-ink/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function SongSnippetPanel({
  color,
  currentSongSrc,
  isMusicPlaying,
  manifestUrl,
  onPauseMusic,
  onPlaySong,
}: {
  color: string;
  currentSongSrc: string | null;
  isMusicPlaying: boolean;
  manifestUrl: string;
  onPauseMusic: () => void;
  onPlaySong: (song: SongSnippet) => void;
}) {
  const [songs, setSongs] = useState<SongSnippet[]>([]);

  useEffect(() => {
    let isActive = true;

    fetch(manifestUrl)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: unknown) => {
        if (!isActive || !Array.isArray(data)) {
          return;
        }

        setSongs(
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
          setSongs([]);
        }
      });

    return () => {
      isActive = false;
    };
  }, [manifestUrl]);

  return (
    <div className="mt-4 rounded-lg bg-white/55 p-3 text-sm text-ink/82 shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-white"
          style={{ background: color }}
        >
          <Disc3 className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-black text-ink">Preview of Some Songs I've Produced + Sang</h3>
          <p className="text-xs font-semibold text-ink/60">Original music</p>
        </div>
      </div>

      {songs.length > 0 ? (
        <div className="mt-3 space-y-3">
          {songs.map((song) => (
            <article key={`${song.title}-${song.src}`} className="rounded-md bg-white/70 p-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-white transition hover:brightness-95"
                  style={{ background: color }}
                  onClick={() => {
                    if (currentSongSrc === song.src && isMusicPlaying) {
                      onPauseMusic();
                      return;
                    }

                    onPlaySong(song);
                  }}
                  aria-label={`${currentSongSrc === song.src && isMusicPlaying ? 'Pause' : 'Play'} ${song.title}`}
                  title={currentSongSrc === song.src && isMusicPlaying ? 'Pause' : 'Play'}
                >
                  {currentSongSrc === song.src && isMusicPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
                <div className="min-w-0">
                  <h4 className="truncate font-black leading-tight text-ink">{song.title}</h4>
                  {song.artist || song.note ? (
                    <p className="mt-1 truncate text-xs font-semibold text-ink/60">
                      {[song.artist, song.note].filter(Boolean).join(' • ')}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-md bg-white/70 px-3 py-2 text-sm font-semibold text-ink/62">
          Songs coming soon.
        </p>
      )}
    </div>
  );
}
