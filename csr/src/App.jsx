import React from 'react';
import store from './store';

const useStore = (selector = (state) => state) => {
  const [state, setState] = React.useState(selector(store.getState())); // the selector is returning only the selected value and then it gets set as the initialValue for the useState
  
  // before this state would be the whole object ({value1, value2}) but now it's specific courtesy of selector^^
  console.log('localState', state)

  // subscribe to store the first time by sending setState as param to store.subscribe
  // so now the setState of above is put into our listeners set and whenever the store does a setState the setState over here also runs making the local state to be in sync with our global store
  // why using selector? because before we were getting the whole state back and setting state in setState so if only value1 changed we are also making it look like value2 also changed (old method) so it forced a re render
  // the prev implementation
  // React.useEffect(() => store.subscibe(setState), []) 
  // here again selector is returning the specific value which is then set to state by setState
  React.useEffect(() => store.subscibe((state) => setState(selector(state))), [])

  return state;
}

const IncrementValue = ({item}) => {
  return <button onClick={() => {
    const state = store.getState();
    store.setState({
      ...state,
      [item]: state[item] + 1,
    })
  }}>Increment {item}</button>
}

const DisplayValue = ({item}) => {
  // we are using useStore's state since thats the latest sync
  // return <div>
  //   {item} : {useStore()[item]}
  // </div>
  // this is bad because when one value in state is updated all the other values are also updated so we need to implement a selector
  return <div>
    {item} : {useStore((state) => state[item])}
  </div>
}

function App() {
  return <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: 600,
    gap: "1rem"
  }}>
    <IncrementValue item="value1" />
    <DisplayValue item="value1" />
    <IncrementValue item="value2" />
    <DisplayValue item="value2" />
  </div>
}

export default App
