import React, { useContext, memo } from 'react';
import { Line } from '@ant-design/charts';
import { GlobalContext } from '../index'
import moment from 'moment';

const DemoLine = () => {
	const { data } = useContext(GlobalContext);

	const obj = data.filter(el => el.type === 'pay').reduce((total, { time, price }) => {
		const tag = moment(time).format('YYYY-MM-DD')
		if (total[tag]) {
			total[tag] = total[tag] + price;
		} else {
			total[tag] = price;
		}
		return total;
	}, {});

	const bbb = Object.entries(obj).map(([time, value]) => ({ value, time })).slice(0, 14);

	const config = {
		data: bbb,
		padding: 'auto',
		xField: 'time',
		yField: 'value',
	};

	return <Line {...config} />;
};

export default memo(DemoLine);
