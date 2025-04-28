import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";
import { useState } from "react";

const times = [15, 30, 60, 120];
const scores = [5, 10, 15, 20, 25];
type mode = "time" | "score";
type clef = "treble" | "bass";

export default function Options({
  activeClef,
  swapClef
}: {
  activeClef: clef,
  swapClef: (activeClef: clef) => void,
}) {
  const { theme, setTheme } = useTheme();
  //const [mode, setMode] = useState<mode>("time");
  // const [activeTime, setActiveTime] = useState(15);
  // const [activeScore, setActiveScore] = useState(5);

  return (
    <div className="flex items-center gap-4 absolute sm:top-10 top-5 py-3 px-4 bg-secondary rounded-lg text-sm">
      <div className={cn(activeClef === "treble" ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => swapClef("treble")}>treble</div>
      <div className={cn(activeClef === "bass" ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => swapClef("bass")}>bass</div>
      <div className="border-l-5 h-5 border-foreground/10 rounded" />
      {/* <div className={cn(mode === "time" ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => setMode("time")}>time</div>
      <div className={cn(mode === "score" ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => setMode("score")}>score</div>
      <div className="border-l-5 h-5 border-foreground/10 rounded" />
      {mode === "time" &&
        times.map((time) => (
          <div key={time} className={cn(activeTime === time ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => setActiveTime(time)}>{time}</div>
        ))
      }
      {mode === "score" &&
        scores.map((score) => (
          <div key={score} className={cn(activeScore === score ? "text-primary" : "text-foreground/50", "hover:text-foreground hover:cursor-pointer transition-color duration-200")} onClick={() => setActiveScore(score)}>{score}</div>
        ))
      }
      <div className="border-l-5 h-5 border-foreground/10 rounded" /> */}
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="h-6 w-6 hover:cursor-pointer hover:bg-transparent dark:hover:bg-transparent">
        <Moon className="absolute h-full w-full transition-all duration-200 hover:text-foreground text-foreground/50 dark:text-primary" />
      </Button>
    </div>
  )
}