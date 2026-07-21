import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { getTool, getToolsByCategory, CATEGORIES } from '../tools/registry';
import { useToolbox } from '../contexts/ToolboxContext';
import { cn } from '../lib/utils';

const ToolPage = () => {
  const { toolId } = useParams();
  const tool = getTool(toolId);
  const { isFavorite, toggleFavorite, addRecent } = useToolbox();

  useEffect(() => {
    if (tool) {
      addRecent(tool.id);
      document.title = `${tool.name} — Tool127`;
    }
    return () => { document.title = 'Tool127 — Developer Toolbox'; };
  }, [tool, addRecent]);

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center" data-testid="tool-not-found">
        <h1 className="text-2xl font-semibold">Tool not found</h1>
        <p className="text-muted-foreground">The tool “{toolId}” doesn’t exist.</p>
        <Link to="/tools" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted">Back to toolbox</Link>
      </div>
    );
  }

  const Component = tool.component;
  const fav = isFavorite(tool.id);
  const category = CATEGORIES.find((c) => c.id === tool.category);
  const related = getToolsByCategory(tool.category).filter((t) => t.id !== tool.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6" data-testid="tool-page">
      <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground" data-testid="tool-back">
        <ArrowLeft className="h-4 w-4" /> All tools
      </Link>

      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border border-border bg-muted/40 p-2.5">
            <tool.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{category?.name}</div>
            <h1 className="text-2xl font-semibold tracking-tight">{tool.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(tool.id)}
          data-testid="tool-favorite"
          aria-label="Toggle favorite"
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-sm hover:bg-muted"
        >
          <Star className={cn('h-4 w-4', fav && 'fill-yellow-500 text-yellow-500')} />
          <span className="hidden sm:inline">{fav ? 'Favorited' : 'Favorite'}</span>
        </button>
      </div>

      <div data-testid={`tool-body-${tool.id}`}>
        <Component />
      </div>

      {related.length > 0 && (
        <div className="border-t border-border pt-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">More in {category?.name}</div>
          <div className="flex flex-wrap gap-2">
            {related.map((t) => (
              <Link key={t.id} to={`/tools/${t.id}`} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground" data-testid={`related-${t.id}`}>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolPage;
