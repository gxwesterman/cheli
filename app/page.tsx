"use client";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// const notes = [
//   "C",
//   "C#",
//   "D",
//   "E♭",
//   "E",
//   "F",
//   "F#",
//   "G",
//   "A♭",
//   "A",
//   "B♭",
//   "B"
// ];

const notes = {
  treble: ["G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D"],
  bass: ["B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F"],
};

const answers = ["C", "D", "E", "F", "G", "A", "B"];

const positions = [-90, -72, -54, -36, -18, 0, 18, 36, 54, 72, 90];

export default function Home() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [clef, setClef] = useState<"treble" | "bass" | null>("treble");

  function getNextStep(currentStep: number) {
    let newStep;
    do {
      newStep = Math.floor((Math.random() * 11) % 11);
    } while (newStep === currentStep);
    return newStep;
  }

  function goNext(e: React.MouseEvent<HTMLButtonElement>) {
    if (clef === null) return;
    if (e.currentTarget.value === notes[clef][step]) {
      setAnswer("correct");
      setScore(score + 1);
    } else {
      setScore(0);
      setAnswer("wrong");
    }
    setVisible(false);
    setStep(getNextStep(step));
  }

  function swapClef() {
    const newClef = clef === "treble" ? "bass" : "treble";
    setVisible(false);
    setClef(null);
    const timer = setTimeout(() => {
      setClef(newClef);
    }, 500);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setAnswer("");
        setVisible(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <main
      className={cn(
        answer === "correct"
          ? "bg-green-100"
          : answer === "wrong"
          ? "bg-red-100"
          : "bg-white",
        "transition-[background-color] duration-500 w-screen h-screen flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8 relative overflow-hidden w-72 h-110">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-between w-full">
          <motion.svg
            width="60"
            height="60"
            viewBox="20 0 100 200"
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence initial={true}>
              {clef === "treble" ? (
                <motion.path
                  onClick={swapClef}
                  className="hover:cursor-pointer"
                  d="M50,180
                C50,15 50,20 50,20
                C100,20 100,80 50,80
                C50,80 5,80 5,120
                C5,120 5,160 50,160
                C50,160 90,160 95,120"
                  stroke="oklch(0.809 0.105 251.813)"
                  fill="transparent"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      opacity: { duration: 0.01 },
                      pathLength: { duration: 0.75 },
                    },
                  }}
                  exit={{ pathLength: 0 }}
                  custom={1}
                  style={{ strokeWidth: 20, strokeLinecap: "round" }}
                />
              ) : clef === "bass" ? (
                <>
                  <motion.path
                    onClick={swapClef}
                    className="hover:cursor-pointer"
                    d="M20,185
                  C50,160 95,120 95,80
                  C95,80 95,40 50,40
                  C50,40 10,40 5,80"
                    stroke="oklch(0.827 0.119 306.383)"
                    fill="transparent"
                    custom={1}
                    initial={{ pathLength: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        opacity: { duration: 0.01 },
                        pathLength: { duration: 0.5 },
                      },
                    }}
                    exit={{ pathLength: 0 }}
                    style={{ strokeWidth: 20, strokeLinecap: "round" }}
                  />
                  <motion.circle
                    cx="130"
                    cy="70"
                    r="10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    fill="oklch(0.827 0.119 306.383)"
                    custom={1}
                  />
                  <motion.circle
                    cx="130"
                    cy="100"
                    r="10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    fill="oklch(0.827 0.119 306.383)"
                    custom={1}
                  />
                </>
              ) : null}
            </AnimatePresence>
          </motion.svg>
          <div
            className={cn(
              clef !== null ? "translate-x-0" : "translate-x-10",
              clef === "treble" ? "text-blue-300" : "text-purple-300",
              "transition-[transform, color] duration-500 text-3xl font-bold"
            )}
          >
            {score}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {visible ? (
            <motion.div
              className={cn(
                clef === "treble" ? "bg-blue-500" : "bg-purple-500",
                "z-10 absolute h-6 w-6 left-1/2 -translate-x-1/2 rounded-full"
              )}
              initial={{ x: 400, y: positions[step] }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{
                type: "spring",
                duration: 0.5,
                delay: (step % 5) * 0.05,
              }}
            />
          ) : null}
        </AnimatePresence>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <AnimatePresence key={`${index}`} initial={false}>
              {visible ? (
                <motion.div
                  className={cn(
                    clef === "treble" ? "bg-blue-300" : "bg-purple-300",
                    "w-full h-1 rounded-full"
                  )}
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  exit={{ x: -400 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                />
              ) : null}
            </AnimatePresence>
          ))}
        <div
          className={cn(
            clef !== null ? "translate-y-0" : "translate-y-10",
            "transition-transform duration-500 flex gap-1.5 absolute bottom-0"
          )}
        >
          {answers.map((answer, index) => (
            <Button
              value={answer}
              className={cn(
                clef === "treble"
                  ? "text-blue-300 hover:bg-blue-400/50 hover:text-blue-100"
                  : "text-purple-300 hover:bg-purple-400/50 hover:text-purple-100",
                "transition-color duration-500 font-bold hover:cursor-pointer"
              )}
              onClick={(e) => goNext(e)}
              key={index}
              size="icon"
              variant="ghost"
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
