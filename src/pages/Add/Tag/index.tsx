import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

export const tagsData = {
	breakfast:'早餐',
	lunch:'午餐',
	dinner:'晚餐',
	traffic:'交通',
	teaWithMilk:'奶茶',
	other:'其他',
	nightSnack:'夜宵',
	wages:'工资',
	vegetables:'买菜',
	merryGoods:'婚礼',
	snacks:'零食',
	articlesForDailyUse:'生活用品',
	telephoneCharges:'话费',
	fruits:'水果',
	parents:'父母',
	pets:'宠物',
	diet:'饮食',
	clothing:'衣物'
}


const HotTags = ({ value, onChange }) => {
	return (
		<>
			{ Object.entries(tagsData).map(([key,label]) => (
				<CheckableTag
					key={key}
					checked={key === value}
					onChange={checked => onChange(key)}
				>
					{label}
				</CheckableTag>
			))}
		</>
	);
}

export default HotTags;