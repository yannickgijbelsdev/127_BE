import React from 'react';
import { NavLink } from 'react-router-dom';
import { Star } from 'lucide-react';
import { CATEGORIES, TOOLS, getTool } from '../../tools/registry';
import { useToolbox } from '../../contexts/ToolboxContext';
import { cn } from '../../lib/utils';

const ToolLink = ({ tool, onNavigate }) => {
  const Icon = tool.icon;
  return (
    <NavLink
      to={`/tools/${tool.id}`}
      onClick={onNavigate}
      data-testid={`sidebar-${tool.id}`}
      className={({ isActive }) => cn(
        'flex items-center gap-2.5 rounded-md border-l-2 border-transparent px-3 py-1.5 text-sm text-white/60 transition-colors duration-150 hover:bg-white/10 hover:text-white',
        isActive && 'border-white bg-white/10 font-medium text-white'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      <span className="truncate">{tool.name}</span>
    </NavLink>
  );
};

export const SidebarContent = ({ onNavigate }) => {
  const { favorites } = useToolbox();
  const favTools = favorites.map(getTool).filter(Boolean);

  return (
    <nav className="space-y-5 p-3" data-testid="sidebar-nav">
      {favTools.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 px-3 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/45">
            <Star className="h-3 w-3" /> Favorites
          </div>
          <div className="space-y-0.5">
            {favTools.map((t) => <ToolLink key={t.id} tool={t} onNavigate={onNavigate} />)}
          </div>
        </div>
      )}
      {CATEGORIES.map((cat) => (
        <div key={cat.id}>
          <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/45">{cat.name}</div>
          <div className="space-y-0.5">
            {TOOLS.filter((t) => t.category === cat.id).map((t) => (
              <ToolLink key={t.id} tool={t} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};
