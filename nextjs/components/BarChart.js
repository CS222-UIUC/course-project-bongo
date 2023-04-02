import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarChart({ data, labels }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
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
  }, [chartRef, data, labels]);

  return <canvas ref={chartRef}></canvas>;
}

export default BarChart;
