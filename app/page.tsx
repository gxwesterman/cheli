"use client"

import { MagicCard } from '@/components/chichi/magic-card';
import { Stream } from '@/components/chichi/stream';
import { Button } from '@/components/ui/button';
import { Lorem } from '@/lib/lorem';
import { useEffect, useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index >= Lorem.length) return;
    const interval = setInterval(() => {
      setInput(Lorem.substring(0, index));
      setIndex(index + 100);
    }, 1);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row flex-wrap gap-[32px] row-start-2 items-center sm:items-start">
        <div className="overflow-hidden rounded-3xl">
          <MagicCard gradientColor={"#262626"}>
              <div className="h-60 w-60 flex items-center justify-center rounded-xl">
                <MagicCard gradientColor={"#262626"}>
                  <div className="h-54 w-54 flex items-center justify-center shadow-[0px_0px_15px_var(--border)] rounded-xl">
                    Shmeap
                  </div>
                </MagicCard>
              </div>
          </MagicCard>
        </div>
        {/* <div className="group relative h-150 w-150 border border-border rounded-3xl p-4 overflow-auto rounded-xl">
          {<Stream content={Lorem} />}
        </div> */}
      </main>
    </div>
  );
}
