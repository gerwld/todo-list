import React from 'react'
import ReactDOM from 'react-dom/client'
import Init from './Init'
import './index.css'
import store from './redux/redux-store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Init />
    </Provider>
  </React.StrictMode>
)