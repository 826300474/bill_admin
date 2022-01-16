import { Col, Layout, Row, Card, Button, Modal, ConfigProvider, Space, Typography } from 'antd';
import Calendar from './Calendar';
import Add from './Add'
import moment, { Moment } from 'moment';
import React, { useState, Context } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import { useRequest } from 'ahooks';
import { getRecord } from '../Api';
import Table from './Table';
import DemoPie from './DemoPie';
import DemoLine from './DemoLine';
import Test from './Test';


const { Header, Content } = Layout;

export const GlobalContext: Context<{
  data: any[],
  value: Moment,
  selectedValue: Moment,
  setValue: (val: Moment) => void,
  setSelectedValue: (val: Moment) => void,
}> = React.createContext({});

export default function IndexPage() {

  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getRecordReq = useRequest(getRecord);

  const data = getRecordReq?.data?.data ?? [];


  const getTitle = () => {
    const list = data.filter(el => moment(el.time).format('YYYY-MM') === moment(value).format('YYYY-MM'));
    const payList = list.filter(el => el.type === 'pay');
    const incomeList = list.filter(el => el.type === 'income');

    const payTotal = payList.reduce((total, current) => total + current.price, 0);
    const incomeListTotal = incomeList.reduce((total, current) => total + current.price, 0)

    return <div>
      <div>支出：{payTotal.toFixed(2)}元/{payList.length}笔</div>
      <div>收入：{incomeListTotal.toFixed(2)}元/{incomeList.length}笔</div>
    </div>
  }

  return <GlobalContext.Provider
    value={{
      data,
      value,
      selectedValue,
      setValue,
      setSelectedValue,
    }}
  >
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Header>
          <Typography.Text style={{ color: '#fff', fontSize: 20 }} strong>家庭账单</Typography.Text>
        </Header>
        <Content style={{ padding: 20 }}>
          <Typography.Title level={3}>努力挣钱~</Typography.Title>
          <Row gutter={20}>
            <Col span={18}>
              <Card title={getTitle()} extra={<Button type="primary" onClick={() => setIsModalVisible(true)}>添加账单</Button>}>
                <Calendar />
              </Card>
              <Card style={{ marginTop: 20 }} title="支出对比">
                <DemoLine />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="账单列表">
                <Table />
              </Card>
              <Card style={{ marginTop: 20 }} title="支出分类">
                <DemoPie />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
      <Modal
        width={800}
        title="添加账单"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Add onCancel={() => {
          getRecordReq.run();
          setIsModalVisible(false)
        }} />
      </Modal>
    </ConfigProvider>

  </GlobalContext.Provider>;
}
