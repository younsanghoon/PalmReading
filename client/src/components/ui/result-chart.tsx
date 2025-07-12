import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { useLanguage } from '@/lib/i18n';

Chart.register(...registerables);

interface ResultChartProps {
  data: any;
  type?: 'bar' | 'radar' | 'doughnut';
  title?: string;
  className?: string;
}

export function ResultChart({ data, type = 'bar', title, className }: ResultChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (!chartRef.current || !data) return;

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

  // 데이터가 없는 경우 빈 div 반환
  if (!data) {
    return (
      <div className={className}>
        {language === 'ko' ? '데이터를 불러오는 중...' : 'Loading data...'}
      </div>
    );
  }

  return (
    <div className={className}>
      <canvas ref={chartRef} width="400" height="200" />
    </div>
  );
}
