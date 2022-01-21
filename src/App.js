import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { AddItem } from './components/AddItem';
import { SearchItem } from './components/SearchItem';
import './App.css';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  const[newItem, setNewItem] = useState('');
  const[search, setSearch] = useState('');

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem ];
    setAndSaveItems(listItems);

  }

  const searchItem = (search) => {
    const listItems = items.filter((item) => item.item === search);
    setAndSaveItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    searchItem(search);
    setSearch('');
  }

  return (
    <div className="App">
    <Header title="Grocery List"/>
    <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
    />
    <SearchItem
      search={search}
      setSearch={setSearch}
      handleSearch={handleSearch}
    />
    <Content 
      items={items}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
    <Footer length={items.length}/>
    </div>
  );
}

export default App;
