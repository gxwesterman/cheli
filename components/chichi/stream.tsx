"use client"

import React, { JSX, useEffect, useMemo, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';

function FadeIn({
  content,
}: {
  content: string | React.ReactNode;
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

function ParseMarkdown({
  content,
  currentIndex,
}: {
  content: string,
  currentIndex: number,
}) {
  const token = content[currentIndex];
  
  // Handle headings
  if (token === '#') {
    // Count consecutive # characters
    let headingLevel = 1;
    while (content[currentIndex + headingLevel] === '#') {
      headingLevel++;
    }
    
    // Skip space after #
    const textStart = currentIndex + headingLevel + 1;
    
    // Find end of heading (next newline or end of content)
    let textEnd = content.indexOf('\n', textStart);
    if (textEnd === -1) textEnd = content.length;
    
    // Create appropriate heading element
    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
    return <HeadingTag>
      <FadeIn content={content.substring(textStart, textEnd)} />
    </HeadingTag>;
  }

  // Handle newlines
  if (token === '\n') {
    return <br />;
  }

  // Default case: render single character
  return <FadeIn content={token} />;
}

// function insertNode ({

// })

interface StreamProps {
  content: string
}

export function Stream({
  content,
}: StreamProps) {
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

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
      const token = content[currentIndex];
      let parsedToken = <FadeIn content={token} />;
      if (token === '#') {
        let headingLevel = 1;
        while (content[currentIndex + headingLevel] === '#') {
          headingLevel++;
        }
        const textStart = currentIndex + headingLevel + 1;
        let textEnd = content.indexOf('\n', textStart);
        if (textEnd === -1) textEnd = content.length;
        const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
        setOutput([...output, <HeadingTag><FadeIn content={content.slice(textStart, textEnd)} /></HeadingTag>]);
        setCurrentIndex(textEnd);

      }
    
      else if (token === '\n') {
        parsedToken = <br />;
        setOutput([...output, parsedToken]);
        setCurrentIndex(currentIndex + 1);
      } else {
        setOutput([...output, parsedToken]);
        setCurrentIndex(currentIndex + 1);
      }
      //if (currentIndex < content.length) {
        //const bufferLength = 1;
        //let buffer = '';
        //let i = 0;
        //for (i; (i + currentIndex) < content.length && i < bufferLength; i++) {
          //const buffer = content[currentIndex];
        //}
      //}
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
    <div className="prose dark:prose-invert">
      {output}
    </div>
  )
}