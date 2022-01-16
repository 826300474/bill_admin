import React, { useContext, memo } from 'react';
import { Calendar, Statistic } from 'antd';
import moment from 'moment';
import { GlobalContext } from '../index'

export default memo(() => {

	const { data, value, setValue, setSelectedValue } = useContext(GlobalContext);

	return <Calendar
		dateCellRender={(value) => {
			const list = data.filter(el => moment(el.time).format('YYYY-MM-DD') === moment(value).format('YYYY-MM-DD'));
			if (list.length) {
				const payList = list.filter(el => el.type === 'pay');
				const incomeList = list.filter(el => el.type === 'income');

				const payTotal = payList.reduce((total, current) => total + current.price, 0);
				const incomeListTotal = incomeList.reduce((total, current) => total + current.price, 0)

				return <div>
					<div>支出：{payTotal.toFixed(2)}元/{payList.length}笔</div>
					<div>收入：{incomeListTotal.toFixed(2)}元/{incomeList.length}笔</div>
				</div>
			}
			return null
		}}
		value={value}
		onSelect={(value) => {
			setValue(value);
			setSelectedValue(value);
		}}
		onPanelChange={(value) => {
			setValue(value);
		}}
	/>
});