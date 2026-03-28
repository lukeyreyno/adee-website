import React, {useRef, useState, useCallback, useEffect} from 'react';
import './testimonial-cards.css';

interface Testimonial {
  quote: string;
  attribution: string;
  role?: string;
  url?: string;
}

interface TestimonialCardsProps {
  testimonials: Testimonial[];
  heading?: string;
}

const SCROLL_AMOUNT = 340;

const TestimonialCards: React.FC<TestimonialCardsProps> = ({testimonials, heading}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, {passive: true});
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({left: -SCROLL_AMOUNT, behavior: 'smooth'});
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({left: SCROLL_AMOUNT, behavior: 'smooth'});
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="testimonials-section">
      {heading && <h2 className="testimonials-heading">{heading}</h2>}
      <div className="testimonials-wrapper">
        {canScrollLeft && (
          <button
            className="testimonial-arrow testimonial-arrow-left"
            onClick={scrollLeft}
            aria-label="Scroll testimonials left"
          >
            &#8249;
          </button>
        )}
        <div
          className="testimonials-scroll"
          ref={scrollRef}
          role="list"
          aria-label="Testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card" role="listitem">
              <span className="testimonial-mark" aria-hidden="true">"</span>
              <p className="testimonial-quote">{testimonial.quote}</p>
              {testimonial.url ? (
                <a
                  className="testimonial-footer"
                  href={testimonial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="testimonial-attribution">{testimonial.attribution}</p>
                  {testimonial.role && (
                    <p className="testimonial-role">{testimonial.role}</p>
                  )}
                </a>
              ) : (
                <div className="testimonial-footer">
                  <p className="testimonial-attribution">{testimonial.attribution}</p>
                  {testimonial.role && (
                    <p className="testimonial-role">{testimonial.role}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            className="testimonial-arrow testimonial-arrow-right"
            onClick={scrollRight}
            aria-label="Scroll testimonials right"
          >
            &#8250;
          </button>
        )}
      </div>
    </div>
  );
};

export {type Testimonial, TestimonialCards};
