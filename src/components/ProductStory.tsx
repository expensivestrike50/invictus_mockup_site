import { Fragment, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductStory.css';

import scoutingDashboard from '@/assets/story/scouting-dashboard.png';
import talentMatchDashboard from '@/assets/story/talent-match-dashboard.png';
import transferWorkflowDashboard from '@/assets/story/transfer-workflow-dashboard.png';
import recruitmentForecastDashboard from '@/assets/story/recruitment-forecast-dashboard.png';
import playerInsightsDashboard from '@/assets/story/player-insights-dashboard-cropped.png';

interface StoryCardMeta {
  image: string;
  alt: string;
  theme: 'theme-light' | 'theme-dark';
  hero?: boolean;
}

const cardMeta: StoryCardMeta[] = [
  { image: scoutingDashboard, alt: 'Invictus scouting dashboard with player profile', theme: 'theme-light', hero: true },
  { image: talentMatchDashboard, alt: 'Invictus talent matching dashboard', theme: 'theme-light' },
  { image: transferWorkflowDashboard, alt: 'Invictus transfer workflow dashboard', theme: 'theme-dark' },
  { image: recruitmentForecastDashboard, alt: 'Invictus recruitment forecast dashboard', theme: 'theme-dark' },
  { image: playerInsightsDashboard, alt: 'Invictus detailed player intelligence dashboard', theme: 'theme-dark' },
];

const ProductStory = () => {
  const { t } = useTranslation();
  const cards = t('productStory.cards', { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    description: string;
  }[];

  const storyRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const cardEls = cardRefs.current.filter((el): el is HTMLElement => !!el);
    const dotEls = dotRefs.current.filter((el): el is HTMLButtonElement => !!el);
    const n = cardEls.length;
    if (n === 0) return;

    let raf: number | null = null;
    let wheelLocked = false;
    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const metrics = () => {
      const storyTop = window.scrollY + story.getBoundingClientRect().top;
      const scrollable = Math.max(1, story.offsetHeight - window.innerHeight);
      const step = scrollable / (n - 1);
      return { storyTop, scrollable, step };
    };

    const currentPosition = () => {
      const { storyTop, step } = metrics();
      return clamp((window.scrollY - storyTop) / step, 0, n - 1);
    };

    const goToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
      const { storyTop, step } = metrics();
      const i = clamp(index, 0, n - 1);
      window.scrollTo({ top: storyTop + i * step, behavior });
    };

    const render = () => {
      raf = null;
      const pos = currentPosition();
      const active = Math.min(n - 1, Math.floor(pos + 0.5));

      cardEls.forEach((card, i) => {
        const delta = i - pos;
        let transform: string;
        let opacity = 1;
        let filter = 'none';
        let z = i + 1;

        if (delta <= 0) {
          const behind = Math.min(Math.abs(delta), 1);
          transform = `translate3d(0, ${-behind * 8}px, 0) scale(${1 - behind * 0.018}) rotateX(0deg)`;
          opacity = 1 - Math.min(Math.abs(delta) * 0.16, 0.28);
          filter = `brightness(${1 - Math.min(Math.abs(delta) * 0.08, 0.12)})`;
        } else if (delta < 1) {
          const t2 = 1 - delta;
          const ease = 1 - Math.pow(1 - t2, 3);
          transform = `translate3d(0, ${(1 - ease) * 46}px, 0) rotateX(${(1 - ease) * -86}deg) scale(${0.985 + ease * 0.015})`;
          opacity = clamp(0.18 + ease * 0.82, 0, 1);
          z = 100 + i;
        } else {
          transform = 'translate3d(0,58px,0) rotateX(-88deg) scale(.985)';
          opacity = 0;
        }

        card.style.transform = transform;
        card.style.opacity = String(opacity);
        card.style.filter = filter;
        card.style.zIndex = String(z);
        card.style.pointerEvents = Math.abs(delta) < 0.5 ? 'auto' : 'none';
        card.setAttribute('aria-hidden', Math.abs(delta) < 0.5 ? 'false' : 'true');
      });

      dotEls.forEach((dot, i) => dot.classList.toggle('active', i === active));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const storyIsActive = () => {
      const r = story.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!storyIsActive()) return;
      if (Math.abs(e.deltaY) < 8) return;

      const current = Math.round(currentPosition());
      const direction = e.deltaY > 0 ? 1 : -1;

      if ((current <= 0 && direction < 0) || (current >= n - 1 && direction > 0)) {
        return;
      }

      e.preventDefault();
      if (wheelLocked) return;

      wheelLocked = true;
      goToIndex(current + direction);

      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => { wheelLocked = false; }, 650);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (!storyIsActive()) return;

      const forward = ['ArrowDown', 'PageDown', ' '];
      const backward = ['ArrowUp', 'PageUp'];

      if (!forward.includes(e.key) && !backward.includes(e.key)) return;

      const direction = backward.includes(e.key) ? -1 : 1;
      const current = Math.round(currentPosition());

      if ((current <= 0 && direction < 0) || (current >= n - 1 && direction > 0)) {
        return;
      }

      e.preventDefault();
      goToIndex(current + direction);
    };

    const dotClickHandlers = dotEls.map((dot, i) => {
      const handler = () => goToIndex(i);
      dot.addEventListener('click', handler);
      return { dot, handler };
    });

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    render();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      dotClickHandlers.forEach(({ dot, handler }) => dot.removeEventListener('click', handler));
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(unlockTimer);
    };
  }, [cards.length]);

  return (
    <div className="product-story">
      <section className="story" id="product-story" aria-label="Invictus product story" ref={storyRef}>
        <div className="stage">
          <div className="section-top">
            <Link className="top-cta" to="/reports">
              {t('nav.getStarted')} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="stack">
            {cardMeta.map((meta, index) => {
              const card = cards[index];
              if (!card) return null;
              const titleLines = card.title.split('\n');
              return (
                <article
                  key={index}
                  className={`story-card ${meta.hero ? 'hero-card' : ''} ${meta.theme}`}
                  data-index={index}
                  aria-hidden={index !== 0}
                  ref={(el) => { cardRefs.current[index] = el; }}
                >
                  <figure className="visual">
                    <img src={meta.image} alt={meta.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                  </figure>
                  <div className="copy-veil" />
                  <div className="overlay">
                    <div className="overlay-inner">
                      <div className="eyebrow">{card.eyebrow}</div>
                      <h2>
                        {titleLines.map((line, i) => (
                          <Fragment key={i}>
                            {i > 0 && <br />}
                            {line}
                          </Fragment>
                        ))}
                      </h2>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="progress" aria-label="Story progress">
            {cardMeta.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${index === 0 ? 'active' : ''}`}
                aria-label={cards[index] ? `Go to ${cards[index].eyebrow}` : `Go to slide ${index + 1}`}
                ref={(el) => { dotRefs.current[index] = el; }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductStory;
