import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const answers = ["C", "D", "E", "F", "G", "A", "B"];

export default function Answers({ goNext }: { goNext: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <div
      className={cn(
        "flex gap-1.5 absolute bottom-0"
      )}
    >
      {answers.map((answer, index) => (
        <Button
          value={answer}
          className={cn(
            "text-primary hover:bg-primary/20 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-background dark:hover:text-foreground transition-all duration-200 font-bold hover:cursor-pointer"
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
  )
}