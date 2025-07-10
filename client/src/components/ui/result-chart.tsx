import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface ResultChartProps {
  data: any;
  type: 'bar' | 'radar' | 'doughnut';
  title?: string;
  className?: string;
}

export function ResultChart({ data, type, title, className }: ResultChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: !!title,
            text: title,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: type !== 'bar',
            position: 'bottom'
          }
        },
        scales: type === 'bar' ? {
          y: {
            beginAtZero: true,
            max: 100
          }
        } : type === 'radar' ? {
          r: {
            beginAtZero: true,
            max: 100
          }
        } : undefined
      }
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, title]);

  return (
    <div className={className}>
      <canvas ref={chartRef} width="400" height="200" />
    </div>
  );
}
