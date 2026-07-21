import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TOOLS } from '../tools/registry';

const SITE = 'https://127.be';
const BRAND = '127 — Your online IT Library';
const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex, nofollow';

const STATIC = {
  '/': {
    title: `${BRAND} | Free browser IT & developer tools`,
    description:
      'Free, 100% browser-based IT & developer tools: dead pixel detector, printer tester, webcam & microphone test, secure password generator, and a 30+ tool developer toolbox. No install, nothing uploaded.',
  },
  '/dpd': {
    title: 'Dead Pixel Detector — free online screen test | 127',
    description:
      'Test your screen for dead or stuck pixels in fullscreen with solid color patterns. Free, browser-based and privacy-friendly.',
  },
  '/printer': {
    title: 'Printer Tester — free print quality test page | 127',
    description:
      'Print calibration pages with text, color bars, lines and alignment grids to check your printer quality. Free and browser-based.',
  },
  '/wea': {
    title: 'Webcam & Microphone Test — free online camera test | 127',
    description:
      'Test your webcam and microphone, preview video and record locally. Nothing is uploaded — everything stays on your device.',
  },
  '/password': {
    title: 'Password Generator — free strong password maker | 127',
    description:
      'Generate strong, secure random passwords and check password strength. Fully client-side — passwords never leave your browser.',
  },
  '/tools': {
    title: 'Developer Toolbox — 30+ free online dev tools | 127',
    description:
      'A 30+ tool developer toolbox: JSON formatter & validator, JWT decoder, hash and UUID generators, Base64 encoder, plus text, network and design utilities. All client-side.',
  },
};

function setMeta(key, content, attr = 'name') {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    let cfg;
    let index = true;

    if (pathname.startsWith('/localhost') || pathname.startsWith('/autosoft')) {
      cfg = { title: `Admin | ${BRAND}`, description: '' };
      index = false;
    } else if (STATIC[pathname]) {
      cfg = STATIC[pathname];
    } else if (pathname.startsWith('/tools/')) {
      const id = pathname.replace('/tools/', '').replace(/\/$/, '');
      const tool = TOOLS.find((t) => t.id === id);
      cfg = tool
        ? {
            title: `${tool.name} — free online tool | 127`,
            description: `${tool.description} Free, browser-based and privacy-friendly — part of the 127 developer toolbox.`,
          }
        : STATIC['/tools'];
    } else {
      cfg = STATIC['/'];
    }

    const canonical = `${SITE}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;

    document.title = cfg.title;
    setMeta('description', cfg.description);
    setMeta('robots', index ? INDEX_ROBOTS : NOINDEX_ROBOTS);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

    setMeta('og:title', cfg.title, 'property');
    setMeta('og:description', cfg.description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('twitter:title', cfg.title);
    setMeta('twitter:description', cfg.description);
  }, [pathname]);

  return null;
}
