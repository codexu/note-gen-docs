"use client"

import { createContext } from "react"

// Menus stay inside the replica's scaled coordinate system and theme.
export const ModelSettingsPortal = createContext<HTMLElement | null>(null)
