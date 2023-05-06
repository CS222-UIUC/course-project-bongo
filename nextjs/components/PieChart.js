import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function PieChart({ data, labels }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const colors = [
    '#90AFC5', // Light Blue
    '#336B87', // Dark Blue
    '#A43820', // Red
    '#AA863A', // Orange
    '#DFE166', // Yellow
    '#BFD598', // Green
    '#9E9D89', // Gray
    '#8C1A6A', // Purple
    '#6D8DB5', // Sky Blue
    '#6E3667', // Magenta
  ];

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors,
              borderColor: ["black"],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [chartRef, data, labels]);

  return <canvas ref={chartRef}></canvas>;
}

export default PieChart;
