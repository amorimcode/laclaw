"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartProps = {
  data: models.Product[] | any[];
  sumField: string;
  viewBy?: string;
  detailBy?: string;
};

const groupData = (data: any[], key: string, sumField: string) => {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = { ...item, [sumField]: 0 };
    }
    acc[groupKey][sumField] += item[sumField];
    return acc;
  }, {});
};

const Chart = ({ data, sumField, viewBy, detailBy }: ChartProps) => {
  const processedData = React.useMemo(() => {
    if (viewBy && detailBy && viewBy === detailBy) {
      const groupedData = groupData(data, viewBy, sumField);
      return Object.values(groupedData);
    }
    return data;
  }, [data, viewBy, detailBy, sumField]);

  return (
    <div className="w-full h-[500px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={processedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={viewBy || "name"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={sumField}
            fill="#3cd2e6"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          {detailBy && detailBy !== viewBy && (
            <Bar
              dataKey={detailBy}
              fill="black"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
