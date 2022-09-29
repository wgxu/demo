import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import emitter from '@/utils/eventmanager.js'

function  HandleNavigate() {
  const navigate = useNavigate()
  // 函数组件，因React的刻意为之，开发模式下在dev 时render-phase会执行两次,开发环境跟生产环境表现不一致，脑回路清奇~
  useEffect(_ => {
    if (!emitter?._events?.['routeChange']) {
      emitter.on('routeChange', (msg) => {
        if (typeof msg === 'string') {
          navigate(msg)
        } else if (typeof msg === 'object') {
          navigate(msg.path, { state: { ...(msg.data || {}) } } )
        }
        
      })
    }
  })
  return(
    <></>
  )
}

export default HandleNavigate