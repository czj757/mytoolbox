import React, { Suspense, lazy } from 'react'
import { Layout, Typography, Space, Spin } from 'antd'
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout
const { Title } = Typography

// 懒加载组件
const Formatter = lazy(() => import('./pages/Formatter'))
const TimestampTool = lazy(() => import('./pages/TimestampTool'))
const Base64Tool = lazy(() => import('./pages/Base64Tool'))

const App: React.FC = () => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', textAlign: 'center' }}>
        <Title level={2} style={{ margin: '16px 0' }}>我的工具箱</Title>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Suspense fallback={<Spin size="large" />}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Formatter />
            <TimestampTool />
            <Base64Tool />
          </Space>
        </Suspense>
      </Content>
      <Footer style={{ textAlign: 'center' }}>我的工具箱 ©2024 Created by czj</Footer>
    </Layout>
  )
}

export default App