import { Button, Form, Input, DatePicker, InputNumber, Radio, message } from 'antd';
import React, { useContext } from 'react';
import { GlobalContext } from '../index'
import HotTags from './Tag'
import { addRecord } from '../../Api'
import { useRequest } from 'ahooks';

const Add = ({ onCancel }) => {

	const [form] = Form.useForm();
	const { value } = useContext(GlobalContext);

	const addRecordReq = useRequest(addRecord, {
		manual:true,
		onSuccess: () => {
			message.success('保存成功');
			onCancel();
		}
	});

	return <Form
		form={form}
		name="basic"
		layout="vertical"
		onFinish={(value) => {
			addRecordReq.run({
				...value,
			})
		}}
		initialValues={{
			type: 'pay',
			time: value
		}}
	>
		<Form.Item
			name="type"
			rules={[{ required: true, message: '请选择类型!' }]}
		>
			<Radio.Group buttonStyle="solid">
				<Radio.Button value="pay">支出</Radio.Button>
				<Radio.Button value="income">收入</Radio.Button>
			</Radio.Group>
		</Form.Item>
		<Form.Item
			label="金额"
			name="price"
			rules={[{ required: true, message: '请输入金额!' }]}
		>
			<InputNumber />
		</Form.Item>
		<Form.Item
			label="日期"
			name="time"
			rules={[{ required: true, message: '请选择日期!' }]}
		>
			<DatePicker />
		</Form.Item>
		<Form.Item
			label="类型"
			name="tag"
		>
			<HotTags />
		</Form.Item>
		<Form.Item
			label="备注"
			name="remarks"
		>
			<Input.TextArea />
		</Form.Item>
		<Form.Item>
			<Button type="primary" htmlType="submit">保存</Button>
		</Form.Item>
	</Form>
};

export default Add;