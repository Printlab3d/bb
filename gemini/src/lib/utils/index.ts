// src/lib/utils/index.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Funkcja CN (używana przez shadcn/ui komponenty)
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// Funkcja createPageUrl (używana przez routing aplikacji)
export function createPageUrl(pageName: string) {
    return '/' + pageName.toLowerCase().replace(/ /g, '-');
}