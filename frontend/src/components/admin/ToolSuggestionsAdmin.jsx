import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Check, X, Eye, Trash2 } from 'lucide-react';

const ToolSuggestionsAdmin = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [stats, setStats] = useState({
    total_suggestions: 0,
    new: 0,
    reviewed: 0,
    implemented: 0,
    rejected: 0
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchSuggestions();
    fetchStats();
  }, [page, filterStatus]);

  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/admin/tool-suggestions?page=${page}&limit=20`;
      if (filterStatus) {
        url += `&status=${filterStatus}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/tool-suggestions/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStatus = async (suggestionId, newStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/tool-suggestions/${suggestionId}/status`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (response.ok) {
        fetchSuggestions();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteSuggestion = async (suggestionId) => {
    if (!window.confirm('Weet je zeker dat je deze suggestie wilt verwijderen?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/tool-suggestions/${suggestionId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        fetchSuggestions();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting suggestion:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'reviewed': return 'bg-yellow-500';
      case 'implemented': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nieuw';
      case 'reviewed': return 'Bekeken';
      case 'implemented': return 'Geïmplementeerd';
      case 'rejected': return 'Afgewezen';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#9aa0a6]">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#202124] to-[#292a2d] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-8 h-8 text-[#8ab4f8]" />
            <h1 className="text-3xl font-bold text-[#e8eaed]">Tool Suggesties</h1>
          </div>
          <p className="text-[#9aa0a6]">Bekijk en beheer tool suggesties van gebruikers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#303134] p-6 rounded-lg border border-[#5f6368]">
            <div className="text-2xl font-bold text-[#e8eaed]">{stats.total_suggestions}</div>
            <div className="text-sm text-[#9aa0a6]">Totaal</div>
          </div>
          <div className="bg-[#303134] p-6 rounded-lg border border-[#5f6368] cursor-pointer hover:bg-[#3c4043]" onClick={() => setFilterStatus(filterStatus === 'new' ? '' : 'new')}>
            <div className="text-2xl font-bold text-blue-400">{stats.new}</div>
            <div className="text-sm text-[#9aa0a6]">Nieuw</div>
          </div>
          <div className="bg-[#303134] p-6 rounded-lg border border-[#5f6368] cursor-pointer hover:bg-[#3c4043]" onClick={() => setFilterStatus(filterStatus === 'reviewed' ? '' : 'reviewed')}>
            <div className="text-2xl font-bold text-yellow-400">{stats.reviewed}</div>
            <div className="text-sm text-[#9aa0a6]">Bekeken</div>
          </div>
          <div className="bg-[#303134] p-6 rounded-lg border border-[#5f6368] cursor-pointer hover:bg-[#3c4043]" onClick={() => setFilterStatus(filterStatus === 'implemented' ? '' : 'implemented')}>
            <div className="text-2xl font-bold text-green-400">{stats.implemented}</div>
            <div className="text-sm text-[#9aa0a6]">Geïmplementeerd</div>
          </div>
          <div className="bg-[#303134] p-6 rounded-lg border border-[#5f6368] cursor-pointer hover:bg-[#3c4043]" onClick={() => setFilterStatus(filterStatus === 'rejected' ? '' : 'rejected')}>
            <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
            <div className="text-sm text-[#9aa0a6]">Afgewezen</div>
          </div>
        </div>

        {/* Filter Info */}
        {filterStatus && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#9aa0a6]">Filter:</span>
            <span className="px-3 py-1 bg-[#8ab4f8] text-[#202124] rounded-full text-sm font-medium">
              {getStatusText(filterStatus)}
            </span>
            <button onClick={() => setFilterStatus('')} className="text-[#8ab4f8] hover:text-[#aac8f9] text-sm">
              Wis filter
            </button>
          </div>
        )}

        {/* Suggestions List */}
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="bg-[#303134] p-12 rounded-lg border border-[#5f6368] text-center">
              <Lightbulb className="w-16 h-16 text-[#5f6368] mx-auto mb-4" />
              <p className="text-[#9aa0a6]">Geen suggesties gevonden</p>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-[#303134] p-6 rounded-lg border border-[#5f6368]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#e8eaed]">{suggestion.tool_name}</h3>
                      <span className={`px-3 py-1 ${getStatusColor(suggestion.status)} text-white rounded-full text-xs font-medium`}>
                        {getStatusText(suggestion.status)}
                      </span>
                    </div>
                    <p className="text-[#9aa0a6] mb-3">{suggestion.description}</p>
                    {suggestion.use_case && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-[#8ab4f8]">Use Case:</span>
                        <p className="text-sm text-[#9aa0a6] mt-1">{suggestion.use_case}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4 text-xs text-[#5f6368]">
                      {suggestion.operating_system && (
                        <span>OS: {suggestion.operating_system}</span>
                      )}
                      {suggestion.browser_name && (
                        <span>Browser: {suggestion.browser_name} {suggestion.browser_version}</span>
                      )}
                      {suggestion.ip_address && (
                        <span>IP: {suggestion.ip_address}</span>
                      )}
                      <span>{new Date(suggestion.timestamp).toLocaleString('nl-NL')}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {suggestion.status === 'new' && (
                    <>
                      <button
                        onClick={() => updateStatus(suggestion.id, 'reviewed')}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Markeer als Bekeken
                      </button>
                      <button
                        onClick={() => updateStatus(suggestion.id, 'implemented')}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Geïmplementeerd
                      </button>
                      <button
                        onClick={() => updateStatus(suggestion.id, 'rejected')}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Afwijzen
                      </button>
                    </>
                  )}
                  {suggestion.status === 'reviewed' && (
                    <>
                      <button
                        onClick={() => updateStatus(suggestion.id, 'implemented')}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Geïmplementeerd
                      </button>
                      <button
                        onClick={() => updateStatus(suggestion.id, 'rejected')}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Afwijzen
                      </button>
                    </>
                  )}
                  {(suggestion.status === 'implemented' || suggestion.status === 'rejected') && (
                    <button
                      onClick={() => updateStatus(suggestion.id, 'new')}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Zet terug naar Nieuw
                    </button>
                  )}
                  <button
                    onClick={() => deleteSuggestion(suggestion.id)}
                    className="px-4 py-2 bg-[#5f6368] hover:bg-[#3c4043] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    Verwijder
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] text-[#e8eaed] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Vorige
            </button>
            <span className="text-[#9aa0a6]">
              Pagina {page} van {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] text-[#e8eaed] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Volgende
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolSuggestionsAdmin;
