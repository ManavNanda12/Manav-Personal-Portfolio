import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Developer",
  ".NET Core Expert",
  "Angular Developer",
  "Cloud & AWS Builder",
  "API Architect",
];

export function useTyping() {
  const [text, setText] = useState("");

  useEffect(() => {
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const word = roles[ri];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timeoutId = setTimeout(type, 1800);
          return;
        }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          timeoutId = setTimeout(type, 400);
          return;
        }
      }
      timeoutId = setTimeout(type, deleting ? 55 : 90);
    };

    timeoutId = setTimeout(type, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return text;
}
