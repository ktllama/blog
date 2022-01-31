import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { useState, useEffect } from 'react';
import { AddItem } from './components/AddItem';
import { SearchItem } from './components/SearchItem';
import './App.css';

function App() {
  const API_URL = 'http://localhost:3500/items';
  //this url will be a constant and will not change
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{

    const fetchItems = async () => {
      try { //this is READ part of crud
        const response = await fetch(API_URL);
        //waiting for response with data from api
        if(!response.ok) throw Error('Did not recieve expected data');
        //if response is not ok (not 200) you have a 400- you need to thow err
        const listItems = await response.json();
        //turning response into json
        setItems(listItems);
        //we then set these items returned from the database to the list items
        setFetchError(null);
        //will set to null if we had a success (state of fetch error)
      } catch (err) {
        setFetchError(err.message);
        //set the fetch error equal to the thrown error message above
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
    //simulating a wait like you would have to for a real api
  }, []);
  //only want to run and load data at load time
  //can send messaged back to rest api to keep database insync with state

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem ];
    setItems(listItems);

  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('');
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
    />
   <main>
   {isLoading && <p>Loading Items...</p>}
   {fetchError && <p style={{ color: 'red'}}>{`Error:${fetchError}`}</p>}
      {!fetchError && !isLoading && <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        /> }
   </main>
    <Footer length={items.length}/>
    </div>
  );
}

export default App;
