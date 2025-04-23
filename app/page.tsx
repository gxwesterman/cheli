"use client";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Treble, Bass } from "@/components/clefs";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const notes = {
  treble: ["G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D"],
  bass: ["B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F"],
};

const answers = ["C", "D", "E", "F", "G", "A", "B"];

const positions = [-90, -72, -54, -36, -18, 0, 18, 36, 54, 72, 90];

type clef = "treble" | "bass";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [activeClef, setActiveClef] = useState<clef>("treble");
  const [clef, setClef] = useState<clef | null>("treble");

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

  function swapClef(clef: clef) {
    if (activeClef === clef) return;
    setActiveClef(clef);
    setClef(null);
    const timer = setTimeout(() => {
      setClef(clef);
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
    <main className="w-screen h-screen flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className={cn(answer === "correct" ? "bg-green-700/20" : answer === "wrong" ? "bg-red-700/20" : "bg-transparent", "transition-[background-color] duration-500  absolute w-full h-full")} />
      <div className="flex flex-col items-center justify-center gap-8 relative w-full h-full">
        <div className="flex items-center gap-4 absolute sm:top-10 top-5 py-3 px-4 bg-secondary rounded-lg text-sm">
          <div className={cn(activeClef === "treble" ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => swapClef("treble")}>treble</div>
          <div className={cn(activeClef === "bass" ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => swapClef("bass")}>bass</div>
          <div className="border-l-5 h-5 border-foreground/10 rounded" />
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="h-6 w-6 hover:cursor-pointer hover:bg-transparent dark:hover:bg-transparent">
            <Moon className="absolute h-full w-full transition-all duration-200 hover:text-foreground text-foreground/50 dark:text-primary" />
          </Button>
        </div>
        <div className="my-20 w-72 h-110 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
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
                <Treble />
              ) : clef === "bass" ? (
                <Bass />
              ) : null}
            </AnimatePresence>
          </motion.svg>
          <div
            className={cn(
              "text-primary text-3xl font-bold"
            )}
          >
            {score}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {visible ? (
            <motion.div
              className={cn(
                "bg-foreground z-10 absolute h-6 w-6 left-1/2 -translate-x-1/2 rounded-full"
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
                    "bg-primary w-full h-1 rounded-full"
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
            "flex gap-1.5 absolute bottom-0"
          )}
        >
          {answers.map((answer, index) => (
            <Button
              value={answer}
              className={cn(
                "text-primary hover:bg-primary/20 dark:hover:bg-primary/20 hover:text-background dark:hover:text-foreground transition-all duration-200 font-bold hover:cursor-pointer"
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
      </div>
    </main>
  );
}
