import './index.css'

import ReactDOM from 'react-dom/client'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

import Router from '~router/Router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router />
)

if (import.meta.env.PROD) {
  LogRocket.init('')
  setupLogRocketReact(LogRocket)
}
