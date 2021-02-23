import React, { lazy, Suspense } from 'react'
import Header from './common/header'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from './page/home/index'
// import Detail from './page/detail/index'
import Login from './page/login/index'
import Write from './page/write/index'
const Detail = lazy(() => import('./page/detail/index'))

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Route path='/' exact component={Home} />
            <Suspense fallback={<div>loading</div>}>
              <Route path='/detail/:id' exact component={Detail} />
            </Suspense>
            <Route path='/login' exact component={Login} />
            <Route path='/Write' exact component={Write} />
          </BrowserRouter>
        </Provider>
      </>
    )
  }
}

export default App
