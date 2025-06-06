/**
 * Theme configuration types
 */

export interface Theme {
  colors: {
    /** Primary brand color */
    primary: string;
    /** Main background color */
    background: string;
    /** Surface/card background color */
    surface: string;
    /** Primary text color */
    text: string;
    /** Secondary/muted text color */
    textSecondary: string;
    /** Border color for dividers and separators */
    border: string;
    /** Accent color for highlights and CTAs */
    accent: string;
    /** Error and warning color */
    error: string;
  };
} 