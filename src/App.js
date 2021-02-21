import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Container} from 'semantic-ui-react'
import  {Provider, createStore} from 'react-redux'
import FindDive from './FindDive'
import store from './store.js'
function App() {

  return (
    <Provider store={store}>
    <>
    <Container fluid>
      <FindDive/>
    </Container>
    </>
    </Provider>
  );
}

export default App;
