/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import './App.css';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
function App() {
  const [id, setEntityId] = useState(6255);
  return (
    <div className="App">
      {/* check callback from Select component */}
      <SearchBar onUserInputChange={(e) => (e === null) ? setEntityId(id) : setEntityId(e.entity_id)}/>
      <ItemList entity_id={id}/>
    </div>
  );
}

export default App;
