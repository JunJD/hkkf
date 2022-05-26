import React, { Component } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { API } from '../../utils'

import NavHeader from '../../components/NavHeader'
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'

import styles from './index.module.css'

class Rent extends Component {
  state = {
    // 出租房屋列表
    list: [],
  }

  // 获取已发布房源的列表数据
  async getHouseList() {
    const res = await API.get('/user/houses')

    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        list: body,
      })
    } else {
      const { navigate, location } = this.props
      navigate('/login', { replace: true, from: location })
    }
  }

  componentDidMount() {
    this.getHouseList()
  }

  renderHouseItem() {
    const { list } = this.state
    const { navigate } = this.props

    return list.map((item) => {
      return (
        <HouseItem
          key={item.houseCode}
          onClick={() => navigate(`/detail/${item.houseCode}`)}
          src={'http://localhost:8080' + item.houseImg}
          title={item.title}
          desc={item.desc}
          tags={item.tags}
          price={item.price}
        />
      )
    })
  }

  renderRentList() {
    const { list } = this.state
    const hasHouses = list.length > 0

    if (!hasHouses) {
      return (
        <NoHouse>
          您还没有房源，
          <Link to="/rent/add" className={styles.link}>
            去发布房源
          </Link>
          吧~
        </NoHouse>
      )
    }

    return <div className={styles.houses}>{this.renderHouseItem()}</div>
  }

  render() {
    const { navigate } = this.props

    return (
      <div className={styles.root}>
        <NavHeader onLeftClick={() => navigate(-1)}>房屋管理</NavHeader>

        {this.renderRentList()}
      </div>
    )
  }
}
export default function History(props) {
  const navigate = useNavigate()
  const location = useLocation()
  return <Rent {...props} navigate={navigate} location={location} />
}
