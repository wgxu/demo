import emitter from '@/utils/eventmanager.js'
import './index.scss'
import store from '@/stores/index'
import { setToken } from '@/stores/token'
import { useState } from 'react'

function Nav () {
  const [hadLogin, setHadLogin] = useState(!!store.getState().token.value)
  const changeRoute = (path) => {
    emitter.emit('routeChange', path)
  }

  const signIn = () => {
    // 可以在登录调接口的回调处理
    store.dispatch(setToken('token'))
    setHadLogin(true)
  }

  const signOut = () => {
    store.dispatch(setToken(''))
    setHadLogin(false)
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <div className="nav-item">QuanMol Redefine</div>
      </div>
      <div className="nav-right" onClick={ () => { !hadLogin ? signIn() : signOut() } }>
        { hadLogin ? '已登录' : '未登录' }
      </div>
    </div>
  )
}

export default Nav
