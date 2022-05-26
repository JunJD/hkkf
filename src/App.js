import React, { lazy, Suspense } from 'react'
// 导入路由组件
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// 导入主页和城市选择两个组件(页面)
import Home from './pages/Home'
import Index from './pages/Index'
// import HouseList from './pages/HouseList'
// import News from './pages/News'
// import Profile from './pages/Profile'
// import CityList from './pages/CityList'
// import Map from './pages/Map'
// import Login from './pages/Login'
// import Registe from './pages/Registe'
// 房屋详情组件
// import HouseDetail from './pages/HouseDetail'
// import AuthRoute from './components/AuthRoute'
// 房源发布
// import Rent from './pages/Rent'
// import RentAdd from './pages/Rent/Add'
// import RentSearch from './pages/Rent/Search'

// 使用动态组件的方式导入组件
const HouseList = lazy(() => import('./pages/HouseList'))
const News = lazy(() => import('./pages/News'))
const Profile = lazy(() => import('./pages/Profile'))
const CityList = lazy(() => import('./pages/CityList'))
const Map = lazy(() => import('./pages/Map'))
const Login = lazy(() => import('./pages/Login'))
const Registe = lazy(() => import('./pages/Registe'))
const HouseDetail = lazy(() => import('./pages/HouseDetail'))
const Rent = lazy(() => import('./pages/Rent'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const RentSearch = lazy(() => import('./pages/Rent/Search'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="router-loading">loading...</div>}>
        <div className="App">
          {/* 配置路由 */}
          <Routes>
            {/* 默认路由匹配时，跳转到 /home 实现路由重定向到首页 */}
            <Route path="/" element={<Navigate to="/home" />} />
            {/* Home 组件是父路由的内容 */}
            <Route path="/home" element={<Home />}>
              <Route index element={<Index />} />
              <Route path="list" element={<HouseList />} />
              <Route path="news" element={<News />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/citylist" element={<CityList />} />
            <Route path="/map" element={<Map />} />
            {/* 房源详情的路由规则 */}
            <Route path="/detail/:id" element={<HouseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registe" element={<Registe />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/rent/add" element={<RentAdd />} />
            <Route path="/rent/search" element={<RentSearch />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  )
}

export default App
