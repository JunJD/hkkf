import React from 'react'

// 导入 Spring 组件
import { Spring } from 'react-spring/renderprops'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// 导入自定义的 axios
import { API } from '../../../../utils/api'

import styles from './index.module.css'

// 标题状态
// true 表示高亮；false 表示不高亮
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
}

// FilterPicker 和 FilterMore 组件的选中值
const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: [],
}

export default class Filter extends React.Component {
  state = {
    titleSelectedStatus,
    // 控制 FilterPicker 或 FilterMore 组件的展示或隐藏
    openType: '',
    // 所有筛选条件数据
    filtersDate: {},
    // 筛选条件的选中值
    selectedValues,
  }
  // 封装获取所有筛选条件的方法
  async getFiltersData() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await API.get('/houses/condition', {
      params: { id: value },
    })
    this.setState(() => {
      return {
        filtersDate: res.data.body,
      }
    })
  }
  // 点击标题菜单实现高亮
  // 注意：this 指向的问题
  onTitleClick = (type) => {
    // 给 body 添加样式
    this.htmlBody.className = 'body-fixed'
    const { titleSelectedStatus, selectedValues } = this.state
    // 创建新的标题选中对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    // 遍历标题选中对象
    // Object.keys() => ['area','mode','price','more']
    Object.keys(titleSelectedStatus).forEach((key) => {
      // key 表示数组中的每一项，此处，就是每个标题的 type 值
      if (key === type) {
        newTitleSelectedStatus[type] = true
        return
      }
      // 其他标题
      const selectedVal = selectedValues[key]
      if (key === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'more' && selectedVal.length !== 0) {
        // 更多选择项 FilterMore 组件
        newTitleSelectedStatus[key] = true
      } else {
        newTitleSelectedStatus[key] = false
      }
    })
    this.setState(() => {
      return {
        titleSelectedStatus: newTitleSelectedStatus,
        // 展示对话框
        openType: type,
      }
    })
    // this.setState((prevState) => {
    //   return {
    //     titleSelectedStatus: {
    //       // 获取当前对象中所有属性的值
    //       ...prevState.titleSelectedStatus,
    //       [type]: true,
    //     },
    //     // 展示对话框
    //     openType: type,
    //   }
    // })
  }
  // 取消（隐藏对话框）
  // 因为 onCancel 方法中，没有 type 参数，所以，就需要在调用 onCancel 方式时，来传递 type 参数
  onCancel = (type) => {
    this.htmlBody.className = ''
    // 菜单高亮逻辑处理
    const { titleSelectedStatus, selectedValues } = this.state
    // 创建新的标题选中对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    const selectedVal = selectedValues[type]
    if (type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }
    this.setState(() => {
      return {
        // 隐藏对话框
        openType: '',
        // 更新菜单高亮状态数据
        titleSelectedStatus: newTitleSelectedStatus,
      }
    })
  }
  // 确定（隐藏对话框）
  onSave = (type, value) => {
    this.htmlBody.className = ''
    // 菜单高亮逻辑处理
    const { titleSelectedStatus } = this.state
    // 创建新的标题选中对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    const selectedVal = value
    if (type === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }
    const newSelectedValues = {
      ...this.state.selectedValues,
      // 只更新当前 type 对应的选中值
      [type]: value,
    }
    const { area, mode, price, more } = newSelectedValues
    // 筛选条件数据
    const filters = {}
    // 区域
    const areaKey = area[0]
    let areaValue = 'null'
    if (area.length === 3) {
      areaValue = area[2] !== 'null' ? area[2] : area[1]
    }
    filters[areaKey] = areaValue
    // 方式和租金
    filters.mode = mode[0]
    filters.price = price[0]
    // 更多筛选条件 more
    filters.more = more.join(',')
    // 调用父组件中的方法，来将筛选数据传递给父组件
    this.props.onFilter(filters)
    this.setState(() => {
      return {
        // 隐藏对话框
        openType: '',
        // 更新菜单高亮状态数据
        titleSelectedStatus: newTitleSelectedStatus,
        selectedValues: newSelectedValues,
      }
    })
  }
  // 渲染 FilterPicker 组件的方法
  renderFilterPicker() {
    const {
      openType,
      filtersDate: { area, subway, rentType, price },
      selectedValues,
    } = this.state
    if (openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }
    // 根据 openType 来拿到当前筛选条件数据
    let data = []
    let cols = 3
    let defaultValue = selectedValues[openType]
    switch (openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break
      case 'mode':
        data = rentType
        cols = 1
        break
      case 'price':
        data = price
        cols = 1
        break
      default:
        break
    }
    return (
      <FilterPicker
        key={openType}
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        cols={cols}
        type={openType}
        defaultValue={defaultValue}
      />
    )
  }
  renderFilterMore() {
    const {
      openType,
      selectedValues,
      filtersDate: { roomType, oriented, floor, characteristic },
    } = this.state
    if (openType !== 'more') {
      return null
    }
    const data = { roomType, oriented, floor, characteristic }
    const defaultValue = selectedValues.more
    return (
      <FilterMore
        data={data}
        type={openType}
        onSave={this.onSave}
        defaultValue={defaultValue}
        onCancel={this.onCancel}
      />
    )
  }
  // 渲染遮罩层 div
  renderMask() {
    const { openType } = this.state
    // if (openType === 'more' || openType === '') {
    //   return null
    // }
    const isHide = openType === 'more' || openType === ''
    return (
      <Spring to={{ opacity: isHide ? 0 : 1 }}>
        {/* props => { opacity: 0 } 是从 0 到 1 的中间值 */}
        {(props) => {
          // 说明遮罩层已经完成动画效果，隐藏了
          if (props.opacity === 0) {
            return null
          }
          return (
            <div
              style={props}
              className={styles.mask}
              onClick={() => this.onCancel(openType)}
            />
          )
        }}
      </Spring>
    )
  }
  render() {
    const { titleSelectedStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.renderMask()}
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
  componentDidMount() {
    // 获取到 body
    this.htmlBody = document.body
    this.getFiltersData()
  }
}
