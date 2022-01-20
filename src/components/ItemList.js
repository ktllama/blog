import React from 'react';
import { LineItem } from './LineItem';

export const ItemList = ({ items , handleCheck, handleDelete }) => {
  return (
    <ul>
        {items.map((item) => (
            <LineItem 
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
        ))}
    </ul>
    
  );
};
