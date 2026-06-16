'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function StarRating({
  rating,
  onChange,
  readOnly = false,
  size = 'md',
  label = 'Rating',
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  // KEYBOARD NAVIGATION SUPPORT (WCAG)
  const handleKeyDown = (e: React.KeyboardEvent, star: number) => {
    if (readOnly || !onChange) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(star);
    } else if (e.key === 'ArrowRight' && star < 5) {
      e.preventDefault();
      onChange(star + 1);
    } else if (e.key === 'ArrowLeft' && star > 1) {
      e.preventDefault();
      onChange(star - 1);
    }
  };

  return (
    <div
      className="flex gap-1"
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `${label}: ${rating} out of 5 stars` : label}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hovered ?? rating) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            role={readOnly ? undefined : 'radio'}
            aria-checked={readOnly ? undefined : rating === star}
            onClick={() => !readOnly && onChange?.(star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onKeyDown={(e) => handleKeyDown(e, star)}
            className={`${sizeClasses[size]} ${
              readOnly
                ? 'cursor-default'
                : 'cursor-pointer hover:scale-110 focus:outline-2 focus:outline-amber-500 focus:outline-offset-2 rounded'
            } transition-transform ${
              filled ? 'text-amber-400' : 'text-stone-600'
            }`}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}