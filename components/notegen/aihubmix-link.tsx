import type { ComponentProps } from "react"
import { AIHUBMIX_SHARE_URL } from "@/src/config/providers"
import { cn } from "@/lib/utils"

export function AiHubMixLink({ children = "AIHubMix", className, ...props }: Omit<ComponentProps<"a">, "href" | "target">) {
  return <a {...props} href={AIHUBMIX_SHARE_URL} target="_self" className={cn("underline-offset-4 hover:underline", className)}>{children}</a>
}
