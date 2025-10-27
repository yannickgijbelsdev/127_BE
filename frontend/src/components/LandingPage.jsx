import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Monitor } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Available tools/pages
  const tools = [
    {
      id: 'dpd',
      name: 'Dead Pixel Detector',
      description: 'Test uw scherm op dode pixels met verschillende kleuren',
      keywords: ['pixel', 'dead', 'detector', 'scherm', 'test', 'dode'],
      path: '/dpd',
      icon: Monitor,
    },
  ];

  // Filter tools based on search query
  const filteredTools = tools.filter(tool => {
    if (!searchQuery.trim()) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_053c424a-d7ee-4a13-a916-f7596c34862b/artifacts/qy7ga8qf_2025_Logo_127.png" 
              alt="127 Logo" 
              className="w-16 h-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900">127.be Tools</h1>
          </div>
          <p className="text-center text-gray-600">Handige tools voor al uw technische behoeften</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Zoek naar tools... (bijv. 'pixel', 'scherm')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery.trim() && (
          <div className="space-y-4">
            {filteredTools.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {filteredTools.length} {filteredTools.length === 1 ? 'resultaat' : 'resultaten'} gevonden
                </p>
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.id} to={tool.path}>
                      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-500 cursor-pointer group">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-gray-600">{tool.description}</p>
                            <div className="mt-3">
                              <span className="text-sm text-blue-600 font-medium group-hover:underline">
                                Open tool →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </>
            ) : (
              <Card className="p-8 text-center border-2 border-dashed">
                <p className="text-gray-500">Geen tools gevonden voor "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-2">Probeer andere zoektermen zoals "pixel", "scherm" of "test"</p>
              </Card>
            )}
          </div>
        )}

        {/* Welcome Message when no search */}
        {!searchQuery.trim() && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welkom bij 127.be Tools</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Begin met typen in de zoekbalk hierboven om onze beschikbare tools te ontdekken
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm font-medium text-blue-900 mb-2">💡 Tip: Probeer te zoeken naar:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => setSearchQuery('pixel')}
                    className="px-3 py-1 bg-white rounded-full text-sm text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    pixel
                  </button>
                  <button 
                    onClick={() => setSearchQuery('scherm')}
                    className="px-3 py-1 bg-white rounded-full text-sm text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    scherm
                  </button>
                  <button 
                    onClick={() => setSearchQuery('test')}
                    className="px-3 py-1 bg-white rounded-full text-sm text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-4">
        <p className="text-center text-sm text-gray-500">© 2025 127.be - Alle rechten voorbehouden</p>
      </div>
    </div>
  );
};

export default LandingPage;