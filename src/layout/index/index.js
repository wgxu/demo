import React from "react"
import './index.scss'
function Layout (props) {
    console.log(props)
  return (
    <div className={ 'layout ' + (props.className ? props.className : '') }>
      <div className="layout-content">
        { props?.children }
      </div>
    </div>
  )
}

export default Layout
