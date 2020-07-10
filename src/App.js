/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import './App.css';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
function App() {
  const [e, setEntity] = useState({entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'});
  return (
    <div className="App">
      {/* check callback from Select component */}
      <SearchBar onUserInputChange={(e) => (e === null || e === undefined) ? setEntity({entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'}) : setEntity(e)}/>
      <ItemList entity={e}/>
    </div>
  );
}

export default App;
