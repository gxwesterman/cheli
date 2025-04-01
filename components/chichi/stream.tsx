"use client"

import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from 'react-markdown';

function FadeIn({
  content,
}: {
  content: string;
}) {
  const [opacity, setOpacity] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / 500, 1);
      setOpacity(progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <span
      style={{ opacity }}
      data-animation-complete={isComplete ? "true" : "false"}
    >
      {content}
    </span>
  );
}

interface StreamProps {
  content: string
}

export function Stream({
  content,
}: StreamProps) {
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const stringResult = useMemo(() => {
    return output.map(node => {
      if (React.isValidElement(node)) {
        const props = node.props as { content: string };
        return String(props.content || '');
      }
      return String(node || '');
    }).join('');
  }, [output]);

  useEffect(() => {
    if (currentIndex >= content.length) return;
    const timer = setTimeout(() => {
      if (currentIndex < content.length) {
        const bufferLength = 1;
        let buffer = '';
        let i = 0;
        for (i; (i + currentIndex) < content.length && i < bufferLength; i++) {
          buffer += content[currentIndex + i];
        }
        setOutput([...output, <FadeIn key={Date.now()} content={buffer} />]);
        setCurrentIndex(currentIndex + i);
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [currentIndex, content]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const animatedElements = document.querySelectorAll(
        '[data-animation-complete="true"]'
      );
      animatedElements.forEach((element) => {
        element.outerHTML = element.innerHTML;
      });
    }, 100);

    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <>
      <ReactMarkdown>{stringResult}</ReactMarkdown>
    </>
  )
}