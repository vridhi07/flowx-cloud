import React, { useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  ReferenceLine,
  Legend,
} from "recharts";

const renderLabel = (prop, dataKey, barSize) => {
  const { x, y, width, height, value } = prop;
  
  return (
    <>
    {value != 0 ?
      
      <text
        x={x + width - (dataKey == 'uv' ? -40 :10)}
        y={y + height - (barSize >= 40 ? 12 : 5)}
        fill={ dataKey == 'uv' ?"#000" : '#FFF'}
        textAnchor="end"
      >
      {dataKey == 'uv' && barSize >= 40 ? '^' : ''}  {value} {dataKey == 'uv' ? '' : '%'}
      </text> : null
    }
    </>
  );
};

function BarGraph({ data, height, barSize }) {
  const [lableValue , setLableValue] = useState({})
   return (
    <>
      <ResponsiveContainer width={"100%"} height={height} debounce={50}>
        <BarChart
          data={data}
          layout="vertical"
          barGap={-50}
          margin={{
            top: 5,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <XAxis
            axisLine={true}
            type="number"
            dataKey="name"
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <YAxis dataKey="name" type="category" xAxisId={1} axisLine={true} />
          <YAxis
            dataKey="name"
            type="category"
            xAxisId={0}
            axisLine={true}
            hide
            reversed
          />
          <Bar
            dataKey="pv"
            minPointSize={0}
            barSize={ barSize}
            fill={"#0687D9"}
            stackId={0}
            radius={[0, 5, 5, 0]}
          >
            <ReferenceLine stroke="gray" label="name" />
            <Tooltip />
            <Legend />
             <LabelList
              dataKey='uv'
              fill="#000"
              content={(props) => renderLabel(props, "uv",barSize)}
            />
            <LabelList
              dataKey='pv'
              fill="#FFF"
              content={(props) => renderLabel(props, "pv",barSize)}
            />   
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index == 0 ? "#2ca02c" : "#1f77b4"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
export default BarGraph;


