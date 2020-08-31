/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import './App.css';
import ResponsiveDrawer from './SideBar';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
function App() {
  const [e, setEntity] = useState({entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'});
  return (
    <div className="App">
      <div className="main-side-bar">
        <ResponsiveDrawer />
      </div>
      {/* check callback from Select component */}
      <div className="main">
        <div className="main-search-bar">
          <SearchBar onUserInputChange={(e) => (e === null || e === undefined) ? setEntity({entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'}) : setEntity(e)}/>
        </div>

        <div className="main-plotly-graph">
          <ItemList entity={e} />
        </div></div>
    </div>
  );
}

export default App;
