/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import './App.css';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
function App() {
  const [e, setEntity] = useState({entity_id: '6255', item_id: 'hmg03_gorgona02_shop', name: 'gorgona stuff'});
  return (
    <div className="App">
      {/* check callback from Select component */}
      <SearchBar onUserInputChange={(e) => (e === null) ? setEntity(e) : setEntity(e)}/>
      <ItemList entity={e}/>
    </div>
  );
}

export default App;
