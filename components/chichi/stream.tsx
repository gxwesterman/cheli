"use client"

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Token, Tokens, TokensList, marked, walkTokens } from 'marked';
import { MemoizedMarkdown } from '@/components/memoized-markdown';
import { TextAnimate } from '@/components/text-animate';

function FadeIn({
  content,
  index
}: {
  content: string;
  index: number;
}) {

  const [opacity, setOpacity] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const start = performance.now() + index * 50;
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
    <>
      <span
        style={{ opacity }}
        data-animation-complete={isComplete ? "true" : "false"}
      >
        {content}
      </span>
    </>
  );
}

function FadeContent({
  content,
}: {
  content: string
}) {
  const characters = content.split('');
  return characters.map((character, index) => <FadeIn content={character} index={index} />)
}

interface HelpProps {
  content: Token,
}

function Help({
  content,
} : HelpProps ) {

  switch (content.type) {
    case 'root':
      const rootTokens: React.ReactNode[] = content.tokens?.map((token) => <Help content={token} />) || [];
      return (
        <>
          {rootTokens}
        </>
      );
    case 'paragraph':
      const ptokens = content.tokens?.map((token) => <Help content={token} />) || [];
      return (
        <p key={`p-${Date.now() * Math.random()}`}>
          {ptokens}
        </p>
      );
    case 'heading':
      const htokens = content.tokens?.map((token) => <Help content={token} />) || [];
      const HeadingTag = `h${content.depth}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag key={`h1-${Date.now() * Math.random()}`}>
          {htokens}
        </HeadingTag>
      );
    case 'blockquote':
      const bqtokens = content.tokens?.map((token) => <Help content={token} />) || [];
      return (
        <blockquote key={`blockquote-${Date.now() * Math.random()}`}>
          {bqtokens}
        </blockquote>
      );
    default:
      return <FadeContent content={content.raw} />;
  }
}

interface StreamProps {
  content: string
}

export function Stream({
  content,
}: StreamProps) {
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [textOutput, setTextOutput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [tokens, setTokens] = useState<TokensList>();
  const [chicken, setChicken] = useState<React.ReactNode[]>([]);

  // useEffect(() => {
  //   if (currentIndex >= content.length) return;
  //   if (pause) return;
  //   const timer = setTimeout(() => {
  //     const token = content[currentIndex];
  //     const animatedToken = <FadeIn key={`${Date.now()}`} content={token} />;
  //     setOutput([...output, animatedToken]);
  //     setTextOutput(textOutput + token);
  //     setCurrentIndex(currentIndex + 1);
  //   }, 1);
  //   return () => clearTimeout(timer);
  // }, [currentIndex, content, pause]);

  useEffect(() => {
    const tokens = marked.lexer(content);
    const rootToken: Token = { type: 'root', raw: 'ur mom', tokens: tokens };
    //help(rootToken, chicken, setChicken);
    setChicken([<Help content={rootToken} />]);
  }, []);

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

  const parsedTextOutput = useMemo(() => {
    // Lexer converts the markdown into tokens
    const tokens = marked.lexer(textOutput);
    const parsed = <ReactMarkdown>{textOutput}</ReactMarkdown>
    //console.log(parsed);
    return parsed; // Return parsed markdown for rendering in your component
  }, [textOutput]);

  return (
    <div className="prose dark:prose-invert">
      {output}
      {chicken}
      {/* <ReactMarkdown>{textOutput}</ReactMarkdown> */}
      {/* <ReactMarkdown>{textOutput}</ReactMarkdown> */}
      {/* <MemoizedMarkdown id={`${Date.now()}`} content={textOutput} /> */}
      {/* <div dangerouslySetInnerHTML={{__html: parsedTextOutput}} /> */}
    </div>
  )
}