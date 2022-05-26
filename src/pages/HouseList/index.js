import React from 'react'
import { Flex, Toast } from 'antd-mobile'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import { useNavigate } from 'react-router-dom'
// 导入搜索导航栏组件
import SearchHeader from '../../components/SearchHeader'
import Filter from './components/Filter'
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'
import { getCurrentCity } from '../../utils'
// 导入吸顶组件
import Sticky from '../../components/Sticky'
import { API } from '../../utils/api'
// 导入样式
import styles from './index.module.css'
// 获取当前定位城市信息
// 原因：在组件外部的代码只会在项目加载时执行一次（刷新页面）。在切换路由时，不会重新执行
// 组件内部的 componentDidMount 会在组件展示时执行，进入页面一次，执行一次
// const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))

class HouseList extends React.Component {
  state = {
    // 列表数据
    list: [],
    // 总条数
    count: 0,
    // 数据是否加载中
    isLoading: false,
  }
  // 初始化实例属性
  filters = {}
  // 初始化默认值
  label = ''
  value = ''
  // 接收 Filter 组件中的筛选条件数据
  onFilter = (filters) => {
    // 返回页面顶部
    window.scrollTo(0, 0)
    this.filters = filters
    // 调用获取房屋数据的方法
    this.searchHouseList()
  }
  // 获取房屋列表数据
  async searchHouseList() {
    this.setState(() => {
      return {
        isLoading: true,
      }
    })
    // 开启 loading
    Toast.loading('加载中...', 0, null, false)
    const res = await API.get('/houses', {
      params: { cityId: this.value, ...this.filters, start: 1, end: 20 },
    })
    const { list, count } = res.data.body
    // 关闭 loading
    Toast.hide()
    // 提示房源数量
    // 解决了没有房源数据时，也弹窗提示的 bug
    if (count !== 0) {
      Toast.info(`共找到 ${count} 套房源`, 2, null, false)
    }
    this.setState(() => {
      return {
        list,
        count,
        // 数据加载完成
        isLoading: false,
      }
    })
  }
  // 渲染房屋列表项
  renderHouseList = ({ key, index, style }) => {
    const { navigate } = this.props
    // 根据索引号来获取当前这一行的房屋数据
    const { list } = this.state
    const house = list[index]
    // 判断 house 是否存在
    // 如果不存在，就渲染 loading 元素占位
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading} />
        </div>
      )
    }
    return (
      <HouseItem
        key={key}
        style={style}
        src={'http://localhost:8080' + house.houseImg}
        title={house.title}
        desc={house.desc}
        tags={house.tags}
        price={house.price}
        onClick={() => navigate(`/detail/${house.houseCode}`)}
      />
    )
  }
  // 判断列表中的每一行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }
  // 用来获取更多房屋列表数据
  // 注意：该方法的返回值是一个 Promise 对象，这个对象应该在数据加载完成时，来调用 resolve 让 Promise 对象的状态变为已完成
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise((resolve) => {
      API.get('/houses', {
        params: {
          cityId: this.value,
          ...this.filters,
          start: startIndex,
          end: stopIndex,
        },
      }).then((res) => {
        this.setState(() => {
          return {
            list: [...this.state.list, ...res.data.body.list],
          }
        })
        // 数据加载完成时，调用 resolve 即可
        resolve()
      })
    })
  }
  // 渲染列表数据
  renderList() {
    const { count, isLoading } = this.state
    // 关键点：在数据加载完成后，再进行 count 判断
    // 解决方式：如果数据加载中，则不展示 NoHouse 组件，而，当数据加载完成后，再展示 NoHouse 组件
    if (count === 0 && !isLoading) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
    }
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    width={width} // 视口的宽度
                    height={height} // 视口的高度
                    autoHeight // 设置高度为 WindowScroller 最终渲染的列表高度
                    rowCount={count} // 列表项的行数
                    rowHeight={120} // 每一行的高度
                    rowRenderer={this.renderHouseList} // 渲染列表项中的每一行
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
  }
  render() {
    const { navigate } = this.props
    return (
      <div>
        {/* 顶部搜索框 */}
        <Flex className={styles.header}>
          <i
            className="iconfont icon-back"
            onClick={() => {
              navigate(-1)
            }}
          />
          <SearchHeader cityName={this.label} className={styles.searchHeader} />
        </Flex>
        {/* 条件筛选栏 */}
        <Sticky height={40}>
          <Filter onFilter={this.onFilter} />
        </Sticky>
        {/* 房屋列表 */}
        <div className={styles.HouseItems}>{this.renderList()}</div>
      </div>
    )
  }
  async componentDidMount() {
    this.searchHouseList()
    const { label, value } = await getCurrentCity()
    this.label = label
    this.value = value
  }
}

export default function History(props) {
  const navigate = useNavigate()
  return <HouseList {...props} navigate={navigate} />
}
