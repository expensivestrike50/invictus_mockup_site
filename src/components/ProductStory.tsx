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
    let cooldownUntil = 0;
    let activeIndex = 0;
    const COOLDOWN = 500; // ms — treat one wheel gesture (incl. trackpad momentum) as one slide

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

    // Hard-cut to a slide, no transition — like clicking "Next" in a slide
    // deck: the target slide is either fully shown or fully hidden.
    const render = (index: number) => {
      activeIndex = clamp(Math.round(index), 0, n - 1);

      cardEls.forEach((card, i) => {
        const isActive = i === activeIndex;
        card.style.transform = 'none';
        card.style.opacity = isActive ? '1' : '0';
        card.style.filter = 'none';
        card.style.zIndex = isActive ? '2' : '1';
        card.style.pointerEvents = isActive ? 'auto' : 'none';
        card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      dotEls.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = null; render(currentPosition()); });
    };

    const storyIsActive = () => {
      const r = story.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    // Instant jump — no smooth scroll, no eased tween.
    const jumpTo = (index: number) => {
      const { storyTop, step } = metrics();
      const target = clamp(index, 0, n - 1);
      window.scrollTo(0, storyTop + target * step);
      render(target);
      cooldownUntil = performance.now() + COOLDOWN;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!storyIsActive()) return;
      if (Math.abs(e.deltaY) < 8) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      if ((activeIndex <= 0 && direction < 0) || (activeIndex >= n - 1 && direction > 0)) {
        return;
      }

      // Always swallow the event inside the story's range so trackpad
      // momentum never leaks into a native scroll.
      e.preventDefault();
      if (performance.now() < cooldownUntil) return;

      jumpTo(activeIndex + direction);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (!storyIsActive()) return;

      const forward = ['ArrowDown', 'PageDown', ' '];
      const backward = ['ArrowUp', 'PageUp'];

      if (!forward.includes(e.key) && !backward.includes(e.key)) return;

      const direction = backward.includes(e.key) ? -1 : 1;

      if ((activeIndex <= 0 && direction < 0) || (activeIndex >= n - 1 && direction > 0)) {
        return;
      }

      e.preventDefault();
      if (performance.now() < cooldownUntil) return;
      jumpTo(activeIndex + direction);
    };

    const dotClickHandlers = dotEls.map((dot, i) => {
      const handler = () => jumpTo(i);
      dot.addEventListener('click', handler);
      return { dot, handler };
    });

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    render(0);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      dotClickHandlers.forEach(({ dot, handler }) => dot.removeEventListener('click', handler));
      if (raf) cancelAnimationFrame(raf);
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
                    <img src={meta.image} alt={meta.alt} loading="eager" decoding="async" />
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
