import './Pagination.css'
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Determine the range of page numbers to show (max 5 pages at a time)
  const pageLimit = 5;
  let startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  let endPage = Math.min(startPage + pageLimit - 1, totalPages);

  // Generate the list of page numbers to display
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Handle page change
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  // Handle next page group (e.g., 1-5 -> 6-10)
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };

  // Handle previous page group (e.g., 6-10 -> 1-5)
  const handlePrevGroup = () => {
    if (startPage > 1) {
      onPageChange(startPage - 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevGroup} disabled={startPage === 1}>
        &lt;&lt; Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => {handlePageChange(page)}}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}

      <button onClick={handleNextGroup} disabled={endPage === totalPages}>
        Next &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
