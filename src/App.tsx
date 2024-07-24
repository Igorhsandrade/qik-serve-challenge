import { BrowserRouter } from 'react-router-dom';
import Layout from './containers/layout';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchRestaurant } from './slices/restaurantSlice';
import { fetchMenu } from './slices/menuSlice';

function App() {
  store.dispatch(fetchRestaurant());
  store.dispatch(fetchMenu());

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
