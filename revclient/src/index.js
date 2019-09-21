import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from './redux/reducers/index.js';
import App from './views/App.jsx';
// import App from "./router/App.jsx";

import './styles/base.scss';

const client = new ApolloClient({
	uri: 'https://revitalize-production.herokuapp.com/',
});

const store = createStore(
	rootReducer,
	// composeWithDevTools(applyMiddleware(thunk, logger)));
	applyMiddleware(thunk, logger),
	// applyMiddleware(thunk)
);

const elRoot = document.getElementById('root');

ReactDOM.render(
	// <App />,
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>,
	elRoot,
);
