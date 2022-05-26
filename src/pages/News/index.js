import React from 'react'
import { Flex, WingBlank } from 'antd-mobile'
import axios from 'axios'
import './index.css'
// 导入封装好的 NavHeader 组件
import NavHeader from '../../components/NavHeader'

export default class News extends React.Component {
  state = {
    // 最新资讯
    news: [],
  }
  // 获取最新资讯
  async getNews() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await axios.get('http://localhost:8080/home/news', {
      params: { area: value },
    })
    this.setState(() => {
      return {
        news: res.data.body,
      }
    })
  }
  // 渲染最新资讯
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`http://localhost:8080${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  render() {
    return (
      <div className="New">
        {/* 最新资讯 */}
        <div className="news">
          {/* 顶部导航栏组件 */}
          <NavHeader>资讯</NavHeader>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getNews()
  }
}
