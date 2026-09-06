import { inject, pageview } from "@vercel/analytics";

export type VirtualPage = {
  route: string;
  path: string;
};

/** Enable automatic page-view collection for each standalone Vite entry. */
export function initAnalytics(): void {
  inject({ mode: import.meta.env.DEV ? "development" : "production" });
}

/**
 * Hobby plans do not support custom events. A deliberately namespaced manual
 * page view keeps interaction milestones visible without mixing them up with
 * real application routes.
 */
export function recordVirtualPage(page: VirtualPage): void {
  pageview(page);
}
