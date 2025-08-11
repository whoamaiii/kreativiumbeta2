import React from 'react';
import { EChartContainer } from '@/components/charts/EChartContainer';
import { buildCorrelationHeatmapOption } from '@/components/charts/ChartKit';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { CorrelationMatrix } from '@/lib/enhancedPatternAnalysis';
import { EChartsOption } from 'echarts';

interface CorrelationHeatmapProps {
  correlationMatrix: CorrelationMatrix | null;
  onRetry: () => void;
  onShowAllTime: () => void;
}

export const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({
  correlationMatrix,
  onRetry,
  onShowAllTime,
}) => {
  if (!correlationMatrix) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Insufficient data for correlation analysis</p>
          <p className="text-sm">At least 10 tracking entries needed</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              aria-label="Retry correlation analysis"
              title="Retry correlation analysis"
              onClick={onRetry}
            >
              Retry
            </Button>
            <Button
              size="sm"
              variant="ghost"
              aria-label="Show all time range"
              title="Show all time range"
              onClick={onShowAllTime}
            >
              Show all time
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const option: EChartsOption = buildCorrelationHeatmapOption(correlationMatrix);
  return <EChartContainer option={option} height={420} />;
};
