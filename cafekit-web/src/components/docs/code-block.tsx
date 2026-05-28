'use client';

import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CodeBlock({ children, className, ...props }: ComponentPropsWithoutRef<'pre'>) {
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
    <div className="not-prose group relative my-6">
      <pre
        {...props}
        ref={preRef}
        className={cn(
          className,
          "docs-code-block overflow-x-auto rounded-xl border border-[#006242]/20 bg-[#101820] p-4 font-mono text-[13px] leading-7 text-[#EAF4EF] shadow-[0_24px_80px_-58px_rgba(16,24,32,0.8)]",
        )}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 rounded-md bg-[#17231F]/85 p-2 text-[#A7C5EE] opacity-0 transition-all hover:bg-[#1D3028] hover:text-[#F6FAF7] group-hover:opacity-100"
        aria-label="Copy code"
      >
        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
