import React from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
// 导入 props 校验的包
import PropTypes from 'prop-types'
// 导入样式
import './index.css'

// 添加 className 和 rightContent（导航栏右侧内容）属性
function NavHeader({ children, onLeftClick, className, rightContent }) {
  const navigate = useNavigate()
  // 默认点击行为
  const defaultHandle = () => navigate(-1)
  return (
    <NavBar
      className={['navBar', className || ''].join(' ')}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={onLeftClick || defaultHandle}
      rightContent={rightContent}
    >
      {children}
    </NavBar>
  )
}

// 添加 props 校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  className: PropTypes.string,
  rightContent: PropTypes.array,
}

export default NavHeader
