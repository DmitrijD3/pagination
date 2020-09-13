import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import CardList from './CardList';
import Pagination from './Pagination';
import Loader from './Loader';
import axios from 'axios';

import '../sass/app.scss';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [sortType, setSortType] = useState('');

  const sortParams = {
    pageSizes: [24, 48, 72],
    sortTypes: ['asc', 'desc']
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get('/product_list.json');
      setItems(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const selectedItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const pageSizeChange = (val) => {
    setPageSize(val);
    setCurrentPage(1);
  };

  const pageSortChange = (type) => {
    setSortType(type);
    let sorted;
    if(type === 'asc'){
      sorted = [...items].sort((a, b) => parseFloat(a.actual_price) - parseFloat(b.actual_price));
    } else {
      sorted = [...items].sort((a, b) => parseFloat(parseFloat(b.actual_price) - a.actual_price));
    }
    setItems(sorted);
    setCurrentPage(1);
  };

  return (
    <div className='container'>
      {loading ? <Loader /> :
        <>
          <header>
            <Filter
              text="Sort by price:"
              handleChange={pageSortChange}
              optionsArr={sortParams.sortTypes}
              defaultVal={sortType}
             />
            <Filter
              text="Items per page:"
              handleChange={pageSizeChange}
              optionsArr={sortParams.pageSizes}
              defaultVal={pageSize}
            />
          </header>
          <CardList items={selectedItems} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={pageSize}
            totalItems={items.length}
            paginate={paginate}
          />
        </>
      }
    </div>
  );
};

export default App;
