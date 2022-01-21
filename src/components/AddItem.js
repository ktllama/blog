import React from 'react';
import { FaPlus } from 'react-icons/fa';

export const AddItem = () => {
  return (
      <form className='addForm'>
        <label htmlFor='addItem'>
            Add Item
        </label>
        <input 
            autoFocus
            id="addItem"
            type="text"
            placeholder='Add Item'
            required
        />
        <button
            type="submit"
            aria-label="Add Item"
        ><FaPlus /></button>

      </form>
  );
};
