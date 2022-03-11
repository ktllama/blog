import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { useState, useEffect } from 'react';
import { AddItem } from './components/AddItem';
import { SearchItem } from './components/SearchItem';
import './App.css';
import apiRequest from './components/apiRequest';

function App() {
  const API_URL = 'https://my-json-server.typicode.com/ktllama/checklistdata/db';
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

  const addItem = async (item) => {
    //add item to state
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [ ...items, myNewItem ];
    setItems(listItems);

    //POST item to api
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNewItem)
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result); // if there is an error message- because its not null, the error message in function above will be set to the error message of the post request

  }

  const handleCheck = async (id) => {
    //UPDATE item in state
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    //UPDATE/PATCH item in api- patch- need to first define item we will update (myItem) then use update options to update checked state
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked}) //setting one item- not array [0] and its checked status
    };
    const reqUrl = `${API_URL}/${id}` //acessing a specific item to update with patch w this url+id
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async  (id) => {
    //DELETE item in state
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    //DELETE item in api
    const deleteOptions = { method: 'DELETE'};
    const reqUrl = `${API_URL}/${id}` //acessing a specific item to update with patch w this url+id
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
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
