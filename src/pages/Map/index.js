import React from 'react'
import { Link } from 'react-router-dom'
import { Toast } from 'antd-mobile'
// 导入封装好的 NavHeader 组件
import NavHeader from '../../components/NavHeader'
// 导入 BASE_URL
// import { BASE_URL } from '../../utils/url'
import { API } from '../../utils/api'
// 导入 axios
// import axios from 'axios'
// 导入样式
import './index.css'
import styles from './index.module.css'
import HouseItem from '../../components/HouseItem'

// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center',
}

class Map extends React.Component {
  state = {
    // 小区下的房源列表
    housesList: [],
    // 表示是否展示房源列表
    isShowList: false,
  }
  // 初始化地图
  initMap() {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    // 初始化地图实例
    // 注意:在 react 脚手架中全局对象需要使用 window 来访问.否则,会造成 ESLint 校验错误
    const map = new window.BMap.Map('container')
    // 作用：能够在其他方法中通过 this 来获取到地图对象
    this.map = map
    // 设置中心点坐标
    // const point = new window.BMap.Point(116.404, 39.915)
    // 创建地址解析器实例
    const myGeo = new window.BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async (point) => {
        if (point) {
          // 初始化地图
          map.centerAndZoom(point, 11)
          // 添加常用控件
          map.addControl(new window.BMap.NavigationControl())
          map.addControl(new window.BMap.ScaleControl())
          // map.addOverlay(new window.BMap.Marker(point))
          // 调用 renderOverlays 方法
          this.renderOverlays(value)
          // 渲染所有区覆盖物
          // const res = await axios.get('http://localhost:8080/area/map', {
          //   params: { id: value },
          // })
          // res.data.body.forEach((item) => {
          //   // 为每一条数据创建覆盖物
          //   const {
          //     coord: { longitude, latitude },
          //     label: areaName,
          //     count,
          //     value,
          //   } = item
          //   创建地图坐标
          //   const areaPoint = new window.BMap.Point(longitude, latitude)
          //   // 创建覆盖物
          //   // 说明：设置 setContent 后，第一个参数中设置的文本内容就失效了，因此，直接清空即可
          //   const label = new window.BMap.Label('', {
          //     position: areaPoint,
          //     offset: new window.BMap.Size(-35, -35),
          //   })
          //   // 给 label 对象添加一个唯一标识
          //   label.id = value
          //   // 设置房源覆盖物内容
          //   label.setContent(`
          //     <div class="${styles.bubble}">
          //       <p class="${styles.name}">${areaName}</p>
          //       <p>${count}套</p>
          //     </div>
          //   `)
          //   // 设置样式
          //   label.setStyle(labelStyle)
          //   // 添加单击事件
          //   label.addEventListener('click', () => {
          //     // 放大地图,以当前点击的覆盖物为中心放大地图
          //     // 第一个参数:坐标对象
          //     // 第二个参数:放大级别
          //     map.centerAndZoom(areaPoint, 13)
          //     // 解决清除覆盖物时,百度地图 API 的 JS 文件自身报错的问题
          //     setTimeout(() => {
          //       // 清除当前覆盖物信息
          //       map.clearOverlays()
          //     }, 0)
          //   })
          //   // 添加覆盖物到地图中
          //   map.addOverlay(label)
          // })
        }
      },
      label
    )
    // 给地图绑定点击事件,在地图移动时隐藏房源列表
    map.addEventListener('movestart', () => {
      if (this.state.isShowList) {
        this.setState(() => {
          return {
            isShowList: false,
          }
        })
      }
    })
  }
  // 渲染覆盖物入口
  async renderOverlays(id) {
    try {
      // 开启loading
      Toast.loading('加载中...', 0, null, false)
      const res = await API.get('/area/map', {
        params: { id },
      })
      // 关闭 loading
      Toast.hide()
      // 调用 getTypeAndZoom 方法来获取级别和类型
      const { nextZoom, type } = this.getTypeAndZoom()
      const data = res.data.body
      data.forEach((item) => {
        // 创建覆盖物
        this.createOverlays(item, nextZoom, type)
      })
    } catch (e) {
      // 关闭 loading
      Toast.hide()
    }
  }
  // 计算要绘制的覆盖物类型和下一个缩放级别
  getTypeAndZoom() {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = this.map.getZoom()
    let nextZoom, type
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13
      // circle 表示绘制圆形覆盖物（区、镇）
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = 'rect'
    }
    return {
      nextZoom,
      type,
    }
  }
  // 创建覆盖物
  createOverlays(data, zoom, type) {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value,
    } = data
    //   创建地图坐标
    const areaPoint = new window.BMap.Point(longitude, latitude)
    if (type === 'circle') {
      // 区或镇
      this.createCircle(areaPoint, areaName, count, value, zoom)
    } else {
      // 小区
      this.createRect(areaPoint, areaName, count, value)
    }
  }
  // 创建区、镇覆盖物
  createCircle(point, name, count, id, zoom) {
    const label = new window.BMap.Label('', {
      position: point,
      offset: new window.BMap.Size(-35, -35),
    })
    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
    `)
    // 设置样式
    label.setStyle(labelStyle)
    // 添加单击事件
    label.addEventListener('click', () => {
      // 调用 renderOverlays 方法，获取该区域下的房源数据
      this.renderOverlays(id)
      // 放大地图,以当前点击的覆盖物为中心放大地图
      // 第一个参数:坐标对象
      // 第二个参数:放大级别
      this.map.centerAndZoom(point, zoom)
      // 解决清除覆盖物时,百度地图 API 的 JS 文件自身报错的问题
      setTimeout(() => {
        // 清除当前覆盖物信息
        this.map.clearOverlays()
      }, 0)
    })
    // 添加覆盖物到地图中
    this.map.addOverlay(label)
  }
  // 创建小区覆盖物
  createRect(point, name, count, id) {
    const label = new window.BMap.Label('', {
      position: point,
      offset: new window.BMap.Size(-50, -28),
    })
    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"/>
      </div>
    `)
    // 设置样式
    label.setStyle(labelStyle)
    // 添加单击事件
    label.addEventListener('click', (e) => {
      this.getHousesList(id)
      // 调用地图 panBy() 方法,移动地图到中间位置
      // 公式:
      // 垂直位移:(window.innerHeight - 330) / 2 - target.clientY
      // 垂直位移:window.innerWidth / 2 - target.clientX
      const X = window.innerWidth / 2 - e.changedTouches[0].clientX
      const Y = (window.innerHeight - 330) / 2 - e.changedTouches[0].clientY
      this.map.panBy(X, Y)
    })
    // 添加覆盖物到地图中
    this.map.addOverlay(label)
  }
  // 获取小区房源数据
  async getHousesList(id) {
    try {
      // 开启loading
      Toast.loading('加载中...', 0, null, false)
      const res = await API.get('/houses', {
        params: { cityId: id },
      })
      // 关闭 loading
      Toast.hide()
      this.setState(() => {
        return {
          housesList: res.data.body.list,
          // 展示房源列表
          isShowList: true,
        }
      })
    } catch (e) {
      // 关闭 loading
      Toast.hide()
    }
  }
  // 封装渲染房屋列表的方法
  renderHouseList() {
    return this.state.housesList.map((item) => (
      <HouseItem
        key={item.houseCode}
        src={'http://localhost:8080' + item.houseImg}
        title={item.title}
        desc={item.desc}
        tags={item.tags}
        price={item.price}
      />
      // <div className={styles.house} key={item.houseCode}>
      //   <div className={styles.imgWrap}>
      //     <img
      //       className={styles.img}
      //       src={`http://localhost:8080${item.houseImg}`}
      //       alt=""
      //     />
      //   </div>
      //   <div className={styles.content}>
      //     <h3 className={styles.title}>{item.title}</h3>
      //     <div className={styles.desc}>{item.desc}</div>
      //     <div>
      //       {item.tags.map((tag, index) => {
      //         const tagClass = 'tag' + (index + 1)
      //         return (
      //           <span key={tag} className={[styles.tag, styles[tagClass]].join(' ')}>
      //             {tag}
      //           </span>
      //         )
      //       })}
      //     </div>
      //   </div>
      //   <div className={styles.price}>
      //     <span className={styles.priceNum}>{item.price}</span> 元/月
      //   </div>
      // </div>
    ))
  }
  render() {
    return (
      <div className="map">
        {/* 顶部导航栏组件 */}
        <NavHeader>地图找房</NavHeader>
        {/* 地图容器元素 */}
        <div id="container"></div>
        {/* 房源列表 */}
        {/* 添加 styles.show 展示房屋列表 */}
        <div
          className={[styles.houseList, this.state.isShowList ? styles.show : ''].join(
            ' '
          )}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>
          <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.renderHouseList()}
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.initMap()
  }
}

export default Map
