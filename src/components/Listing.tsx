import React from 'react';
import './main.css'

interface CardItem {
  listing_id: number;
  url?: string;
  MainImage?: {
    url_570xN: string;
  };
  title?: string;
  currency_code?: string; 
  price?: string;
  quantity?: number;
  state: string;
}

const formatPrice = (price: string, currencyCode: string): string => {
  const numericPrice = parseFloat(price);

  if (isNaN(numericPrice)) {
    return price;
  }

  switch (currencyCode.toUpperCase()) {
    case 'USD':
      return `$${numericPrice.toFixed(2)}`;
    case 'EUR':
      return `€${numericPrice.toFixed(2)}`;
    default:
      return `${numericPrice.toFixed(2)} ${currencyCode}`;
  }
};

const getLevelClass = (quantity: number): string => {
  if (quantity <= 10) {
    return 'level-low';
  } else if (quantity <= 20) {
    return 'level-medium';
  } else {
    return 'level-high';
  }
};

const cutTitle = (title: string): string => {
  return (title).length > 50 ? `${(title).slice(0, 50)}…` : title;
};

const Item: React.FC<CardItem> = ({
  listing_id,
  url,
  MainImage,
  title,
  currency_code,
  price,
  quantity,
  state,
}) => {

  const shortTitle = cutTitle(title || '');

  const safePrice = price || '0';
  const safeCurrencyCode= currency_code || '';
  const safeQuantity = quantity || 0;

  return (
    <>
      {state !== 'active' ? (
        <></>
      ) : (
          <div className="item" key={listing_id}>
            <div className="item-image">
              <a href={url} rel="noopener noreferrer">
                {MainImage && MainImage.url_570xN ? (
                  <img src={MainImage.url_570xN} alt={title} />
                ) : (
                  <></>
                )}
              </a>
            </div>
            <div className="item-details">
              <p className="item-title">{shortTitle}</p>
              <p className="item-price">{formatPrice(safePrice, safeCurrencyCode)}</p>
              <p className={`item-quantity ${getLevelClass(safeQuantity)}`}>{safeQuantity} left</p>
            </div>
          </div>
      )}
    </>
  );
};



interface ListingProps {
  items: CardItem[];
}

const Listing: React.FC<ListingProps> = ({ items }) => {
  return (
    <div className="item-list">
      {items.map((item) => {
        console.log(item)
        return <Item key={item.listing_id} {...item} />
      })}
    </div>
  );
};

export default Listing;