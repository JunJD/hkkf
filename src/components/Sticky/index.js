import React, { Component, createRef } from 'react'

import PropTypes from 'prop-types'

import styles from './index.module.css'

// dom.getBoundingClientRect() 获取元素的大小及其相对于视口的位置。

class Sticky extends Component {
  // 创建 ref 对象
  placeholder = createRef()
  content = createRef()
  // scroll 事件的处理程序
  handleScroll = () => {
    const { height } = this.props
    // 获取 DOM 对象
    const placeholderEl = this.placeholder.current
    const contentEl = this.content.current
    const { top } = placeholderEl.getBoundingClientRect()
    if (top < 0) {
      // 吸顶
      contentEl.classList.add(styles.fixed)
      placeholderEl.style.height = height + 'px'
    } else {
      // 取消吸顶
      contentEl.classList.remove(styles.fixed)
      placeholderEl.style.height = '0px'
    }
  }
  render() {
    return (
      <div>
        {/* 占位元素 */}
        <div ref={this.placeholder} />
        {/* 内容元素 */}
        <div ref={this.content}>{this.props.children}</div>
      </div>
    )
  }
  // 监听 scroll 事件
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
Sticky.propTypes = {
  height: PropTypes.number.isRequired,
}

export default Sticky
