import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16v16H4z" fill="hsl(var(--primary))" stroke="none" />
      <path d="M8 8l8 8" stroke="hsl(var(--primary-foreground))" />
      <path d="M16 8l-8 8" stroke="hsl(var(--primary-foreground))" />
      <path d="M12 2v2" stroke="hsl(var(--accent))" />
      <path d="M12 20v2" stroke="hsl(var(--accent))" />
      <path d="M22 12h-2" stroke="hsl(var(--accent))" />
      <path d="M4 12H2" stroke="hsl(var(--accent))" />
    </svg>
  );
}
