import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock, ExternalLink, ChevronRight } from 'lucide-react';

const ADZUNA_APP_ID = '6ff04141';
const ADZUNA_APP_KEY = '9a226ed338b9caa981f3b36bf1d879ea';

const COUNTRIES = [
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
];

export default function JobPortal() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('sg');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchJobs = async (page = 1, search = '', country = 'sg') => {
    setLoading(true);
    try {
      const query = search || 'developer';
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=${encodeURIComponent(query)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setJobs(data.results || []);
      setTotalResults(data.count || 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(currentPage, searchTerm, selectedCountry);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    fetchJobs(1, searchTerm, selectedCountry);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
    fetchJobs(1, searchTerm, country);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${Math.round(min).toLocaleString()} - $${Math.round(max).toLocaleString()}`;
    if (min) return `From $${Math.round(min).toLocaleString()}`;
    return `Up to $${Math.round(max).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted today';
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
    return `Posted ${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ASEAN Job Portal
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              {totalResults.toLocaleString()} jobs available
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                placeholder="Search jobs (e.g., developer, designer, manager)"
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
            >
              Search
            </button>
          </div>

          {/* Country Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCountry === country.code
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{country.flag}</span>
                {country.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AdSense Placeholder - Top */}
        <div className="mb-8 p-4 bg-gray-900 border border-gray-800 rounded-lg text-center text-gray-500">
          <div className="text-sm">Advertisement</div>
          <div className="h-24 flex items-center justify-center">
            [Google AdSense - 728x90 Leaderboard]
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {jobs.length === 0 ? (
              <div className="text-center py-20">
                <Briefcase className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">No jobs found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job, index) => (
                  <article
                    key={job.id || index}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                          {job.title}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.company.display_name}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location.display_name}</span>
                          </div>
                          
                          {(job.salary_min || job.salary_max) && (
                            <div className="flex items-center gap-1 text-green-400">
                              <DollarSign className="w-4 h-4" />
                              <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(job.created)}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 line-clamp-3 mb-4">
                          {job.description.replace(/<[^>]*>/g, '').substring(0, 250)}...
                        </p>

                        {job.category && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium border border-blue-800">
                              {job.category.label}
                            </span>
                            {job.contract_time && (
                              <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs font-medium border border-purple-800">
                                {job.contract_time}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <a
                        href={job.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/50 whitespace-nowrap self-start sm:self-center"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* AdSense Placeholder - Bottom */}
            <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-lg text-center text-gray-500">
              <div className="text-sm">Advertisement</div>
              <div className="h-24 flex items-center justify-center">
                [Google AdSense - 728x90 Leaderboard]
              </div>
            </div>

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => {
                    const newPage = currentPage - 1;
                    setCurrentPage(newPage);
                    fetchJobs(newPage, searchTerm, selectedCountry);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-lg font-medium transition-all duration-200"
                >
                  Previous
                </button>
                
                <span className="text-gray-400">
                  Page {currentPage}
                </span>
                
                <button
                  onClick={() => {
                    const newPage = currentPage + 1;
                    setCurrentPage(newPage);
                    fetchJobs(newPage, searchTerm, selectedCountry);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={jobs.length < 20}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">© 2024 ASEAN Job Portal. All rights reserved.</p>
            <p className="text-sm">Powered by Adzuna API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
