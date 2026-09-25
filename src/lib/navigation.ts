export const PATHS = {
  home: '/',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
  nutzungsbedingungen: '/nutzungsbedingungen',
  expert: '/experts',
  support: '/support',
  'ueber-uns': '/ueber-uns',
  blog: '/blog',
  blogpost: '/blog',
} as const;

export type AppPage = keyof typeof PATHS;

const PATH_TO_PAGE: Record<string, AppPage> = {
  '/': 'home',
  '/impressum': 'impressum',
  '/datenschutz': 'datenschutz',
  '/nutzungsbedingungen': 'nutzungsbedingungen',
  '/agb': 'nutzungsbedingungen',
  '/experts': 'expert',
  '/expert': 'expert',
  '/support': 'support',
  '/ueber-uns': 'ueber-uns',
  '/blog': 'blog',
};

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function getPageFromPath(pathname: string): AppPage {
  return PATH_TO_PAGE[normalizePath(pathname)] ?? 'home';
}

export function pageToPath(page: string): string {
  return PATHS[page as AppPage] ?? '/';
}

export function navigateTo(path: string): void {
  if (window.location.pathname + window.location.hash === path) {
    return;
  }
  window.location.assign(path);
}
