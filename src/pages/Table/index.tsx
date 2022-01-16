import React, { useContext } from 'react';
import { Space, Table, Typography } from 'antd';
import { GlobalContext } from '../index'
import moment from 'moment';
import { tagsData } from '../Add/Tag';


const MyTable = () => {

	const dataSource = [
		{
			key: '1',
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号',
		},
		{
			key: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号',
		},
	];

	const columns = [
		{
			title: '类型',
			dataIndex: 'tag',
			key: 'tag',
			render: (_, { tag, time }) => <Space direction="vertical">
				<Typography.Text strong>{tagsData?.[tag] ?? '-'}</Typography.Text>
				<Typography.Text type="secondary">{moment(time).format('YYYY-MM-DD')}</Typography.Text>
			</Space>
		},
		{
			title: '备注',
			dataIndex: 'remarks',
			key: 'remarks',
		},
		{
			title: '金额',
			dataIndex: 'price',
			key: 'price',
			render: (_, { type, price }) => <Typography.Text type={type === 'pay' ? 'danger' : 'success'}>{type === 'pay' ? '-' : '+'}{price}</Typography.Text>
		},
	];

	const { data, value } = useContext(GlobalContext);

	return <Table
		rowKey={({ id }) => id}
		dataSource={data.filter(el => moment(el.time).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'))}
		columns={columns} 
		pagination={false}
	/>

};

export default MyTable;