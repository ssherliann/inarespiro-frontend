import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/react'; 

function Cards({ item }) {
  return (
    <Link to={`/product/${item._id}`}>
      {item.photos && item.photos.length > 0 ? (
        <Image
          src={item.photos[0]} 
          alt="Product"
          loading="lazy"
          boxSize={300}
          objectFit="cover"
        />
      ) : (
        <div>No photo available</div> 
      )}
      <div>{item.title}</div>
    </Link>
  );
}

export default Cards;
