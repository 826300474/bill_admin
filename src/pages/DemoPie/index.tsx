import React, { useContext, memo } from 'react';
import { Pie } from '@ant-design/charts';
import { GlobalContext } from '../index'
import { tagsData } from '../Add/Tag';
import moment from 'moment';

const DemoPie = () => {
  
  const { data, value } = useContext(GlobalContext);

  const obj = data.filter(el => el.type === 'pay').filter(el => moment(el.time).format('YYYY-MM') === moment(value).format('YYYY-MM')).reduce((total, { tag, price }) => {
    if (total[tag]) {
      total[tag] = total[tag] + price;
    } else {
      total[tag] = price;
    }
    return total;
  }, {})

  const bbb = Object.entries(obj).map(([type, value]) => ({
    value,
    type: tagsData[type]
  })).sort((a, b) => b.value - a.value);

  const config = {
    data: bbb,
    height: 200,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'right-top',
      itemValue: {
        formatter: (text, item) => {
          const { value } = bbb.find((d) => d.type === item.name);
          return value;
        }
      },
    },
  };
  return <Pie {...config} />;
};
export default memo(DemoPie);
