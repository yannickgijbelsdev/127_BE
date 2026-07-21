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
        className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-transform duration-150 hover:-translate-y-0.5 hover:border-primary/40"
      >
        <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
        <div className="text-sm font-medium leading-tight">{tool.name}</div>
        <p className="text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
      </Link>
      <button
        onClick={() => toggleFavorite(tool.id)}
        data-testid={`favorite-${tool.id}`}
        aria-label="Toggle favorite"
        className="absolute right-3 top-3 text-muted-foreground opacity-0 transition-opacity duration-150 hover:text-yellow-500 group-hover:opacity-100"
      >
        <Star className={cn('h-4 w-4', fav && 'fill-yellow-500 text-yellow-500 opacity-100')} />
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
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Developer toolbox</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {TOOLS.length} fast, privacy-first utilities that run entirely in your browser. Nothing you type ever leaves your device.
        </p>
      </div>

      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          data-testid="home-search"
          placeholder="Search all tools…"
          className="w-full rounded-lg border border-border bg-muted/40 py-2.5 pl-10 pr-3 text-sm outline-none transition-colors duration-150 focus:border-ring focus:ring-1 focus:ring-ring"
        />
      </div>

      {filtered ? (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{filtered.length} result(s)</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => <ToolCard key={t.id} tool={t} />)}
          </div>
        </section>
      ) : (
        <>
          {favTools.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"><Star className="h-3 w-3" /> Favorites</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favTools.map((t) => <ToolCard key={t.id} tool={t} />)}
              </div>
            </section>
          )}
          {recentTools.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"><Clock className="h-3 w-3" /> Recent</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recentTools.map((t) => <ToolCard key={t.id} tool={t} />)}
              </div>
            </section>
          )}
          {CATEGORIES.map((cat) => (
            <section key={cat.id} data-testid={`category-section-${cat.id}`}>
              <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
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
