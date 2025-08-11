import React from 'react';
import { EChartContainer } from './EChartContainer';
import { buildEmotionTrendsOption, buildAreaOption, buildScatterOption, buildComposedOption, TrendRow as ChartKitTrendRow } from './ChartKit';
import { Activity } from 'lucide-react';
import { logger } from '@/lib/logger';
import { ChartType } from '@/hooks/useVisualizationState';
import { EChartsOption } from 'echarts';

interface ChartDataPoint {
  date: string;
  timestamp: Date;
  emotionCount: number;
  avgEmotionIntensity: number;
  positiveEmotions: number;
  negativeEmotions: number;
  sensorySeekingCount: number;
  sensoryAvoidingCount: number;
  totalSensoryInputs: number;
  [key: string]: string | number | Date;
}

interface TrendsChartProps {
  chartData: ChartDataPoint[];
  selectedChartType: ChartType;
}

export const TrendsChart: React.FC<TrendsChartProps> = ({ chartData, selectedChartType }) => {
  try {
    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>No data available for selected time range</p>
            <p className="text-xs mt-1">Try expanding the time range or adjusting filters</p>
          </div>
        </div>
      );
    }

    const rows: ChartKitTrendRow[] = chartData.map(d => ({
      date: d.date,
      avgEmotionIntensity: Number(d.avgEmotionIntensity) || 0,
      positiveEmotions: Number(d.positiveEmotions) || 0,
      negativeEmotions: Number(d.negativeEmotions) || 0,
      totalSensoryInputs: Number(d.totalSensoryInputs) || 0,
    }));

    let option: EChartsOption;

    switch (selectedChartType) {
      case 'area':
        option = buildAreaOption(rows);
        break;
      case 'scatter':
        option = buildScatterOption(rows);
        break;
      case 'composed':
        option = buildComposedOption(rows);
        break;
      default: // line fallback
        const emotionThreshold = 7;
        const sensoryThreshold = 5;
        option = buildEmotionTrendsOption(rows, {
          title: 'Emotion Trends Over Time',
          showMovingAverage: true,
          movingAverageWindow: 7,
          useDualYAxis: true,
          thresholds: { emotion: emotionThreshold, sensory: sensoryThreshold },
        });
        break;
    }

    return <EChartContainer option={option} height={400} />;

  } catch (error) {
    logger.error("TrendsChart.renderChart failed", { error });
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Could not render chart</p>
          <p className="text-xs mt-1">An internal error occurred while building the chart</p>
        </div>
      </div>
    );
  }
};
