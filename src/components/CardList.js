import React from 'react';

const CardList = ({ items }) => {

  return (
    <div className='cards'>
      {items.map(itm => (
        <div key={itm.id} className='cards__item'>
          <div className='cards__imgHolder'>
            <img className='cards__img' src={itm.filename} alt={`${itm.brand_name} - ${itm.product_name}`} title='' />
          </div>
          <div className='cards__brand'>{itm.brand_name}</div>
          <div className='cards__name'>{itm.product_name}</div>
          <div className='cards__price'>
            {parseFloat(itm.actual_price).toFixed(2)}
            {parseFloat(itm.actual_price).toFixed(2) !== parseFloat(itm.base_price).toFixed(2) ? <span className='cards__offer'>{parseFloat(itm.base_price).toFixed(2)}</span> : '' }
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
