import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, Search, Terminal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { SidebarContent } from '../components/toolbox/Sidebar';
import { CommandPalette } from '../components/toolbox/CommandPalette';
import { ThemeToggle } from '../components/toolbox/ThemeToggle';

const ToolboxLayout = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="toolbox-root min-h-screen bg-background text-foreground" data-testid="toolbox-root">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted lg:hidden" data-testid="mobile-menu-btn" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto p-0">
              <div className="flex h-16 items-center gap-2 border-b border-border px-5">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold tracking-tight">Tool127</span>
              </div>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link to="/tools" className="flex items-center gap-2" data-testid="toolbox-logo">
            <Terminal className="h-5 w-5 text-primary" strokeWidth={2} />
            <span className="text-lg font-semibold tracking-tight">Tool127</span>
          </Link>
        </div>

        <button
          onClick={() => setPaletteOpen(true)}
          data-testid="search-trigger"
          className="group flex w-full max-w-sm items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search tools…</span>
          <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">⌘K</kbd>
        </button>

        <div className="flex items-center gap-2">
          <a href="/" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline" data-testid="back-to-site">127.be</a>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border lg:block" data-testid="desktop-sidebar">
          <SidebarContent />
        </aside>
        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 py-6 md:px-8">
          <Outlet />
        </main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
};

export default ToolboxLayout;
