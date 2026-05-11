"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const WORDS = ["MAKING", "IDEAS", "COME TO", "LIFE"];
const WORD_COLORS = ["#FFFFFF", "#F43434", "#FFFFFF", "#FFFFFF"];
const CHAR_SPEED = 80;
const WORD_PAUSE = 180;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typed, setTyped] = useState([0, 0, 0, 0]);
  const [imgVisible, setImgVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let wordIndex = 0;
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (wordIndex >= WORDS.length) {
        setTimeout(() => setImgVisible(true), 200);
        return;
      }

      const word = WORDS[wordIndex];

      if (charIndex <= word.length) {
        setTyped((prev) => {
          const next = [...prev];
          next[wordIndex] = charIndex;
          return next;
        });
        charIndex++;
        timeout = setTimeout(typeNext, CHAR_SPEED);
      } else {
        wordIndex++;
        charIndex = 0;
        timeout = setTimeout(typeNext, WORD_PAUSE);
      }
    };

    timeout = setTimeout(typeNext, 400);
    return () => clearTimeout(timeout);
  }, [mounted]);

  const getDisplay = (wordIdx: number) => {
    const word = WORDS[wordIdx];
    const count = typed[wordIdx];
    const visible = word.slice(0, count);
    const hidden = word.slice(count);
    return { visible, hidden };
  };
  
