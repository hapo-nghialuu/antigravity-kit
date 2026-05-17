'use client';

import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
    const preRef = useRef<HTMLPreElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (preRef.current) {
            const text = preRef.current.innerText;
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

  return (
    <div className="relative group my-6">
        <pre
          ref={preRef}
          className="p-4 rounded-lg bg-[#0d1117] dark:bg-[#0d1117] overflow-x-auto border border-border font-mono text-sm leading-relaxed"
          {...props}
        >
          {children}
        </pre>
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-md bg-zinc-800/50 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-700 hover:text-zinc-200"
            aria-label="Copy code"
        >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
    </div>
  );
}
