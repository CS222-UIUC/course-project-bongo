// components/BarChart.js

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Schoolwork', 'Housework', 'Schoolwork'],
          datasets: [
            {
              label: 'Duration (seconds)',
              data,
              backgroundColor: ['Red', 'Blue', 'Yellow'],
              borderColor: ['Red', 'Blue', 'Yellow'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartRef, data]);

  return <canvas ref={chartRef}></canvas>;
}

export default BarChart;