import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRedydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRedydrate()
  )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
// .purge() to clear likedJobs in AsyncStorage
export default store;
