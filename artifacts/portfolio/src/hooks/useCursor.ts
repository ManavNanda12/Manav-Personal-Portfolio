import { useEffect, useRef } from "react";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.18;
      ry.current += (my.current - ry.current) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.left = mx.current + "px";
        dotRef.current.style.top = my.current + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top = ry.current + "px";
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(1.6)";
        ringRef.current.style.borderColor = "rgba(124,58,237,0.6)";
      }
      if (dotRef.current) dotRef.current.style.background = "#7c3aed";
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        ringRef.current.style.borderColor = "rgba(6,182,212,0.5)";
      }
      if (dotRef.current) dotRef.current.style.background = "#06b6d4";
    };

    const targets = document.querySelectorAll("a,button,.skill-card,.project-card,.service-card,.company-content,.cert-card");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { dotRef, ringRef };
}
