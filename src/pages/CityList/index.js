import React from 'react'
import { useNavigate } from 'react-router-dom'
// 导入 axios
import axios from 'axios'
// 导入 NavBar 组件
import { Toast } from 'antd-mobile'
// 导入 List 组件
import { AutoSizer, List } from 'react-virtualized'
// 导入样式
import './index.css'
// 导入 utils 中获取当前定位城市的方法
import { getCurrentCity } from '../../utils'
// 导入 NavHeader 组件
import NavHeader from '../../components/NavHeader'
// 导入 CSSModules 的样式文件
// import styles from './index.module.css'
// console.log(styles)

// 数据格式化的方法
// list:[{},{}]
const formatCityData = (list) => {
  let cityList = {}
  let cityIndex = []
  // 1. 遍历 list 数组
  list.forEach((item) => {
    // 2. 获取每一个城市的首字母
    const first = item.short.substr(0, 1)
    // 3. 判断 cityList 中是否有该分类
    if (cityList[first]) {
      // 4. 如果有,直接往该分类中 push 数据
      // cityList[first] => [{},{}]
      cityList[first].push(item)
    } else {
      // 5. 如果没有,就先创建一个数组,然后,把当前城市信息添加到数组中
      cityList[first] = [item]
    }
  })
  // 获取索引数据
  cityIndex = Object.keys(cityList).sort()
  return {
    cityList,
    cityIndex,
  }
}

// 列表数据的数据源
// const list = Array(100).fill('react')

// 渲染每一行数据的渲染函数
// 函数的返回值就表示最终渲染在页面中的内容
// function rowRenderer({
//   key, // Unique key within array of rows
//   index, // 索引号
//   isScrolling, // 当前项是否在滚动中
//   isVisible, // 当前项在 List 中式可见的
//   style, // 注意:重点属性,一定要给每一个行数据添加该样式!作用:指定每一行的位置
// }) {
//   return (
//     <div key={key} style={style}>
//       {list[index]}
//     </div>
//   )
// }

// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

class CityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityList: {},
      cityIndex: [],
      // 指定右侧字母索引列表高亮的索引号
      activeIndex: 0,
    }
    // 创建 ref 对象
    this.cityListComponent = React.createRef()
  }
  // 获取城市列表数据的方法
  async getCityList() {
    const res = await axios.get('http://localhost:8080/area/city', {
      params: { level: 1 },
    })
    const { cityList, cityIndex } = formatCityData(res.data.body)
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    // 将数据添加到 cityList 中
    cityList['hot'] = hotRes.data.body
    // 将索引添加到 cityIndex 中
    cityIndex.unshift('hot')
    // 获取当前定位城市
    const curCity = await getCurrentCity()
    // 1. 将当前定位城市数据添加到 cityList 中
    cityList['#'] = [curCity]
    // 2. 将当前定位城市的索引添加到 cityIndex 中
    cityIndex.unshift('#')
    this.setState(() => {
      return {
        cityList,
        cityIndex,
      }
    })
  }
  changeCity = ({ label, value }) => {
    const { navigate } = this.props
    if (HOUSE_CITY.indexOf(label) !== -1) {
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      navigate(-1)
    } else {
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
  }
  // 渲染每一行的方法
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否在滚动中
    isVisible, // 当前项在 List 中式可见的
    style, // 注意:重点属性,一定要给每一个行数据添加该样式!作用:指定每一行的位置
  }) => {
    // 获取每一行的字母索引
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    // 获取指定字母索引下的城市列表数据
    // cityList[letter]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map((item) => (
          <div
            className="name"
            key={item.value}
            onClick={() => {
              this.changeCity(item)
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  // 创建动态计算每一行高度的方法
  getRowHeight = ({ index }) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    const { cityIndex, cityList } = this.state
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }
  // 封装渲染右侧索引列表的方法
  renderCityIndex = () => {
    // 获取到 cityIndex，并遍历其，实现渲染
    return this.state.cityIndex.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          this.cityListComponent.current.scrollToRow(index)
        }}
      >
        <span className={this.state.activeIndex === index ? 'index-active' : ''}>
          {item === 'hot' ? '热' : item.toUpperCase()}
        </span>
      </li>
    ))
  }
  // 用于获取 List 组件中渲染行的信息
  onRowsRendered = ({ startIndex }) => {
    if (startIndex !== this.state.activeIndex) {
      this.setState(() => {
        return {
          activeIndex: startIndex,
        }
      })
    }
  }
  render() {
    return (
      <div className="citylist">
        {/* 顶部导航栏 */}
        <NavHeader>城市选择</NavHeader>
        {/* 城市列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              ref={this.cityListComponent}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
  componentDidMount() {
    this.getCityList()
    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    // 注意：调用这个方法的时候，需要保证 List 组件中已经有了数据！如果 List 组件中的数据为空，就会导致调用方法报错！
    // 解决：只要保证这个方法是在 获取数据之后 调用即可
    // 只需要给 获取数据的方法 加上 await 即可
    // 但是现在好像不需要 measureAllRows 方法，也可以实现精确跳转
    // this.cityListComponent.current.measureAllRows()
  }
}

export default function History(props) {
  const navigate = useNavigate()
  return <CityList {...props} navigate={navigate} />
}
