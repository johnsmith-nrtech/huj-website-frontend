// "use client";

// import { useEffect, useRef, useState } from "react";

// type RevealProps = {
//   children: React.ReactNode;
//   className?: string;
//   /** delay in ms, useful to stagger neighbouring blocks */
//   delay?: number;
// };

// /** Fades + slides its children in the first time they scroll into view. */
// export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     // Respect users who prefer less motion
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//       setVisible(true);
//       return;
//     }

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       style={{ transitionDelay: `${delay}ms` }}
//       className={`transition-all duration-700 ease-out ${
//         visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in ms, useful to stagger neighbouring blocks */
  delay?: number;
  /**
   * Skip the animation and show the content immediately.
   * Use it for the very first heading / image on a page if PageSpeed Insights
   * reports a slow "Largest Contentful Paint".
   */
  instant?: boolean;
};

/* One shared observer for every <Reveal> on the page (lighter than one per block) */
let sharedObserver: IntersectionObserver | null = null;
const onEnter = new WeakMap<Element, () => void>();

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          onEnter.get(entry.target)?.();
          onEnter.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
  }
  return sharedObserver;
}

/** Fades + slides its children in the first time they scroll into view. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  instant = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant) return;
    const el = ref.current;
    if (!el) return;

    // Show everything straight away for people who prefer less motion,
    // or in the rare browser without IntersectionObserver
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    onEnter.set(el, () => setVisible(true));
    getObserver().observe(el);

    return () => {
      onEnter.delete(el);
      sharedObserver?.unobserve(el);
    };
  }, [instant]);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: visible && delay ? `${delay}ms` : undefined }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 will-change-transform"
      } ${className}`}
    >
      {children}
    </div>
  );
}