/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import {SnackbarProvider} from 'notistack';
import './App.css';
import ResponsiveDrawer from './SideBar';
import ItemPlot from './ItemPlot';
import SearchBar from './SearchBar';
import StatePlot from './StatePlot';
function App() {
  const [showItemPlot, setShowItemPlot] = useState(true);
  const [e, setEntity] = useState({placeholder: 1, region: 'eu', entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'});
  // callback that allows drawer to set region
  const setRegion =(newRegion)=> {
    setEntity({...e, region: newRegion});
  };

  // callback to set entity properties
  const setNewEntity =(entity) => {
    if (entity === null || entity === undefined) {
      setEntity({placeholder: 1, region: 'eu', entity_id: '6109', item_id: 'sr47_gorgona02_shop', title_en: 'Medusa Truvelo CMS 20x42mm'});
    } else {
      setEntity({...e, ...entity});
    }
  };


  const renderSideBar = () => {
    return (
      <div className="main-side-bar">
        <ResponsiveDrawer setRegionToParent={setRegion}/>
      </div>
    );
  };

  const renderItemPlot = () => {
    return (
      <div className="main">
        <div className="main-search-bar">
          {/* check callback from Select component */}
          <SearchBar
            entity={e}
            onUserInputChange={(e) => {
              setNewEntity(e);
            }}/>
        </div>

        <div className="main-plotly-graph">
          <ItemPlot entity={e}/>
        </div>
      </div>
    );
  };

  const renderStatePlot = () => {
    return (
      <div className="state-plotly-graph">
        <StatePlot region = 'eu' />
      </div>
    );
  };

  return (
    <SnackbarProvider maxSnack={2} dense autoHideDuration={2000} transitionDuration={{enter: 100, exit: 100}}>
      <div className="App">
        {renderSideBar()}
        {showItemPlot ?
        renderItemPlot() :
        renderStatePlot()}
      </div>
    </SnackbarProvider>
  );
}

export default App;
