import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setTotalPages(Math.ceil(data.length / usersPerPage));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [usersPerPage]);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timerId = setTimeout(() => {
        const results = users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
        setTotalPages(Math.ceil(results.length / usersPerPage));
        setCurrentPage(1); // Reset to first page on search
        setIsSearching(false);
      }, 300); // Debounce search for better performance
      
      return () => clearTimeout(timerId);
    } else {
      setFilteredUsers(users);
      setTotalPages(Math.ceil(users.length / usersPerPage));
      setIsSearching(false);
    }
  }, [searchTerm, users, usersPerPage]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the user list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(1)}>
          1
        </button>
      </li>
    );
    
    // Add ellipsis and nearby pages
    if (totalPages > 7) {
      if (currentPage > 3) {
        pageNumbers.push(
          <li key="ellipsis1" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(i)}>
              {i}
            </button>
          </li>
        );
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <li key="ellipsis2" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      
      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(
          <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        );
      }
    } else {
      // Show all pages if few
      for (let i = 2; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(i)}>
              {i}
            </button>
          </li>
        );
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="dashboard-container">
      {/* Enhanced Search Bar */}
      <div className="search-container mb-4">
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-primary"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search users"
          />
          {searchTerm && (
            <button 
              className="btn btn-outline-secondary border-start-0" 
              type="button"
              onClick={clearSearch}
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
        </div>
        
        {isSearching && (
          <div className="search-indicator mt-2 text-center">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
              <span className="visually-hidden">Searching...</span>
            </div>
            <span className="text-muted">Searching...</span>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {loading ? (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="alert alert-info shadow-sm" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No users found matching "{searchTerm}". Try a different search term.
          <button className="btn btn-sm btn-link text-decoration-none" onClick={clearSearch}>Clear search</button>
        </div>
      ) : (
        <>
          {/* Results Summary */}
          <div className="results-summary mb-3 text-muted">
            <small>
              Showing {currentUsers.length} of {filteredUsers.length} users
              {searchTerm && ` matching "${searchTerm}"`}
            </small>
          </div>

          {/* User Cards Grid */}
          <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
            {currentUsers.map(user => (
              <div className="col" key={user.id}>
                <div className="card h-100 shadow-sm border-0 user-card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="user-avatar bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" 
                           style={{ width: '50px', height: '50px', fontSize: '1.25rem' }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="card-title mb-0 fw-bold">{user.name}</h5>
                        <p className="text-muted mb-0">@{user.username}</p>
                      </div>
                    </div>
                    
                    <div className="card-text">
                      <p className="mb-2">
                        <i className="bi bi-envelope text-primary"></i>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                      </p>
                      <p className="mb-2">
                        <i className="bi bi-telephone text-primary"></i>
                        <a href={`tel:${user.phone}`} className="text-decoration-none">{user.phone}</a>
                      </p>
                      <p className="mb-2">
                        <i className="bi bi-building text-primary"></i>
                        {user.company.name}
                      </p>
                      <p className="mb-0">
                        <i className="bi bi-geo-alt text-primary"></i>
                        {user.address.city}, {user.address.zipcode}
                      </p>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-globe me-1"></i> Website
                    </a>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-person-vcard me-1"></i> Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="User pagination" className="my-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="bi bi-chevron-left"></i> Previous
                  </button>
                </li>
                
                {renderPageNumbers()}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
              <div className="text-center text-muted">
                <small>
                  Page {currentPage} of {totalPages} ({filteredUsers.length} total users)
                </small>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;