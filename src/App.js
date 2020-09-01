/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import './App.css';
import ResponsiveDrawer from './SideBar';
import ItemList from './ItemList';
import SearchBar from './SearchBar';
function App() {
  const default_entity = {region: 'eu', entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'};
  const [e, setEntity] = useState(default_entity);
  // const [e, setEntity] = useState({entity_id: '4590', item_id: 'ar29_black03skin_shop', title_en: 'AK Alpha Onyx Skin'});

  const callBack =(newRegion)=> {
    setEntity({...e, region: newRegion});
  };

  return (
    <div className="App">
      <div className="main-side-bar">
        <ResponsiveDrawer parentCallBack={callBack}/>
      </div>
      {/* check callback from Select component */}
      <div className="main">
        <div className="main-search-bar">
          <SearchBar entity={e} onUserInputChange={(e) => (e === null || e === undefined) ? setEntity(default_entity) : setEntity(e)}/>
        </div>

        <div className="main-plotly-graph">
          <ItemList entity={e} />
        </div></div>
    </div>
  );
}

export default App;
