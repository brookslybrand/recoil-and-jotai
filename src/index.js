import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import * as serviceWorker from './serviceWorker'

import './styles/index.css'

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
