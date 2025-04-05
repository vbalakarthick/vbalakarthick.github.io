import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  startDelay?: number;
  backDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  className?: string;
}

export function TypedText({
  strings,
  typeSpeed = 100,
  backSpeed = 50,
  startDelay = 300,
  backDelay = 1500,
  loop = true,
  showCursor = true,
  className = "",
}: TypedTextProps) {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        startDelay,
        backDelay,
        loop,
        showCursor,
        cursorChar: "|",
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, [strings, typeSpeed, backSpeed, startDelay, backDelay, loop, showCursor]);

  return <span ref={el} className={className} />;
}
