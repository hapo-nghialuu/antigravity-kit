import type * as React from "react";

import { cn } from "@/lib/utils";

function RequiredAsterisk({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("ml-0.5 text-red-500", className)}
      aria-hidden="true"
      data-slot="required-asterisk"
      {...props}
    >
      *
    </span>
  );
}

export { RequiredAsterisk };
