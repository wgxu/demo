import React from 'react'
import { HashRouter as Router, Routes, Route,  Navigate } from "react-router-dom"

import HandleNavigate from '@/components/event'

import First from '../views/first'

import Layout from '../layout/index'
import Nav from '../layout/nav'

import store from '@/stores/index'

function RouterList () {
  return (
    <Layout>
      <Nav />
      <Routes>
        <Route strict exact path='' element={ <First /> }></Route>
        <Route strict exact path='/first' element={ <First /> }></Route>
      </Routes>
    </Layout>
  )
}
class Routers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: store.getState().token,
      isLoading: true
    }
    this.unsubscribe= null
  }

  componentDidMount () {
    this.setState({
      isLoading: false
    })

    this.unsubscribe = store.subscribe(() => {
      if (this.state.token?.value !== store.getState()?.token?.value) {
        this.setState({
          token: store.getState().token
        })
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    if (this.state.isLoading) {
      return <></>
    } else {
      return (
        <Router>
          <HandleNavigate />
          <Routes>
            {/* 通用路由 */}
              <Route path='/*' element={ <RouterList /> } ></Route>
            {/* 权限路由 */}
            {/* 404 */}
            <Route  path="*" element={<Navigate to='/' />}></Route>
          </Routes>
        </Router>
      )
    }

  }
}

export default Routers
