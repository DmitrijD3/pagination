import React from 'react';

const Pagination = ({currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems /itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPagination = (currentPage) => {
    return(
      pageNumbers.reduce((total, val, index) => {
        if(currentPage === 1){
          if(index < 3){
            total.push(val);
          }
        } else if(currentPage === pageNumbers.length){
          if(index+4 > pageNumbers.length){
            total.push(val);
          }
        } else {
          if(index === currentPage-2 || index === currentPage || index === currentPage-1){
              total.push(val);
          }
        }
        return total;
      }, []).map(number => (
        <li key={number} className='pagination__item'>
          <a onClick={() => paginate(number)} href={`#${number}`} className={`pagination__link ${number === currentPage ? 'pagination__link--active' : ''}`}>
            {number}
          </a>
        </li>
      ))
    );
  };

  return (
    <nav>
      <ul className='pagination'>
        <li className='pagination__item'>
          <a onClick={() => paginate(1)} href={`#1`} className='pagination__link pagination__link--first'></a>
        </li>

        {renderPagination(currentPage)}

        <li className='pagination__item'>
          <a onClick={() => paginate(pageNumbers.length)} href={`#${pageNumbers.length}`} className='pagination__link pagination__link--last'></a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
