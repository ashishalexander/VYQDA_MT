const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, searchTerm }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // If there are no results from search, don't show pagination
    if (totalItems === 0 && searchTerm) {
      return null;
    }
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      
      // Always show first page
      pageNumbers.push(
        <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(1)}>
            1
          </button>
        </li>
      );
      
      // If there are many pages, add ellipsis
      if (totalPages > 7) {
        // Add ellipsis after first page if current page is far from start
        if (currentPage > 3) {
          pageNumbers.push(
            <li key="ellipsis1" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
        
        // Show pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(i)}>
                {i}
              </button>
            </li>
          );
        }
        
        // Add ellipsis before last page if current page is far from end
        if (currentPage < totalPages - 2) {
          pageNumbers.push(
            <li key="ellipsis2" className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          );
        }
        
        // Always show last page
        if (totalPages > 1) {
          pageNumbers.push(
            <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </button>
            </li>
          );
        }
      } else {
        // If there are few pages, show all of them
        for (let i = 2; i <= totalPages; i++) {
          pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(i)}>
                {i}
              </button>
            </li>
          );
        }
      }
      
      return pageNumbers;
    };
  
    return (
      <nav aria-label="User pagination" className="my-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          
          {renderPageNumbers()}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
        <div className="text-center text-muted">
          <small>
            Showing page {currentPage} of {totalPages} ({totalItems} total users)
          </small>
        </div>
      </nav>
    );
  };
  
  export default Pagination;