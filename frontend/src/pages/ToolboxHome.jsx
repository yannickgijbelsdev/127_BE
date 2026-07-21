import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Search } from 'lucide-react';
import { CATEGORIES, TOOLS, getTool } from '../tools/registry';
import { useToolbox } from '../contexts/ToolboxContext';
import { cn } from '../lib/utils';

const ToolCard = ({ tool }) => {
  const Icon = tool.icon;
  const { isFavorite, toggleFavorite } = useToolbox();
  const fav = isFavorite(tool.id);
  return (
    <div className="group relative">
      <Link
        to={`/tools/${tool.id}`}
        data-testid={`tool-card-${tool.id}`}
        className="flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition-all duration-150 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
        <div className="text-sm font-medium leading-tight text-white">{tool.name}</div>
        <p className="text-xs leading-relaxed text-white/55">{tool.description}</p>
      </Link>
      <button
        onClick={() => toggleFavorite(tool.id)}
        data-testid={`favorite-${tool.id}`}
        aria-label="Toggle favorite"
        className="absolute right-3 top-3 text-white/50 opacity-0 transition-opacity duration-150 hover:text-yellow-400 group-hover:opacity-100"
      >
        <Star className={cn('h-4 w-4', fav && 'fill-yellow-400 text-yellow-400 opacity-100')} />
      </button>
    </div>
  );
};

const ToolboxHome = () => {
  const { favorites, recents } = useToolbox();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return null;
    const s = q.toLowerCase();
    return TOOLS.filter((t) => t.name.toLowerCase().includes(s) || t.description.toLowerCase().includes(s) || t.keywords.some((k) => k.includes(s)));
  }, [q]);

  const favTools = favorites.map(getTool).filter(Boolean);
  const recentTools = recents.map(getTool).filter(Boolean);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Developer toolbox</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
          {TOOLS.length} fast, privacy-first utilities that run entirely in your browser. Nothing you type ever leaves your device.
        </p>
      </div>

      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          data-testid="home-search"
          placeholder="Search all tools…"
          className="w-full rounded-full border border-white/15 bg-white/10 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur transition-colors duration-150 focus:border-white/40 focus:bg-white/15"
        />
      </div>

      {filtered ? (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">{filtered.length} result(s)</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => <ToolCard key={t.id} tool={t} />)}
          </div>
        </section>
      ) : (
        <>
          {favTools.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/50"><Star className="h-3 w-3" /> Favorites</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favTools.map((t) => <ToolCard key={t.id} tool={t} />)}
              </div>
            </section>
          )}
          {recentTools.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/50"><Clock className="h-3 w-3" /> Recent</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recentTools.map((t) => <ToolCard key={t.id} tool={t} />)}
              </div>
            </section>
          )}
          {CATEGORIES.map((cat) => (
            <section key={cat.id} data-testid={`category-section-${cat.id}`}>
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                <cat.icon className="h-3.5 w-3.5" /> {cat.name}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TOOLS.filter((t) => t.category === cat.id).map((t) => <ToolCard key={t.id} tool={t} />)}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default ToolboxHome;
