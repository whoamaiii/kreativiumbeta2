import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Target,
  Zap,
  Eye,
  Clock,
  Brain,
  Activity,
} from 'lucide-react';
import { CorrelationMatrix } from '@/lib/enhancedPatternAnalysis';

interface DashboardLayoutProps {
  renderTrendsChart: () => React.ReactNode;
  renderCorrelationHeatmap: () => React.ReactNode;
  renderPatternAnalysis: () => React.ReactNode;
  render3dVisualization: () => React.ReactNode;
  renderTimeline: () => React.ReactNode;
  filteredData: {
    emotions: { intensity: number; emotion: string }[];
    sensoryInputs: { response?: string }[];
  };
  correlationMatrix: CorrelationMatrix | null;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  renderTrendsChart,
  renderCorrelationHeatmap,
  renderPatternAnalysis,
  render3dVisualization,
  renderTimeline,
  filteredData,
  correlationMatrix,
}) => {
  return (
    <Tabs defaultValue="trends" className="w-full">
      <TabsList className="grid w-full grid-cols-5" aria-label="Visualization tabs">
        <TabsTrigger value="trends" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Trends
        </TabsTrigger>
        <TabsTrigger value="correlations" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Correlations
        </TabsTrigger>
        <TabsTrigger value="patterns" className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Patterns
        </TabsTrigger>
        <TabsTrigger value="3d" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          3D View
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Timeline
        </TabsTrigger>
      </TabsList>

      <TabsContent value="trends" className="space-y-6">
        {renderTrendsChart()}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Emotion Intensity</p>
                  <p className="text-2xl font-bold">
                    {filteredData.emotions.length > 0
                      ? (filteredData.emotions.reduce((sum, e) => sum + e.intensity, 0) / filteredData.emotions.length).toFixed(1)
                      : '0'
                    }
                  </p>
                </div>
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Positive Emotion Rate</p>
                  <p className="text-2xl font-bold">
                    {filteredData.emotions.length > 0
                      ? Math.round((filteredData.emotions.filter(e =>
                          ['happy', 'calm', 'focused', 'excited', 'proud'].includes(e.emotion.toLowerCase())
                        ).length / filteredData.emotions.length) * 100)
                      : 0
                    }%
                  </p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sensory Seeking Rate</p>
                  <p className="text-2xl font-bold">
                    {filteredData.sensoryInputs.length > 0
                      ? Math.round((filteredData.sensoryInputs.filter(s =>
                          s.response?.toLowerCase().includes('seeking')
                        ).length / filteredData.sensoryInputs.length) * 100)
                      : 0
                    }%
                  </p>
                </div>
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="correlations" className="space-y-6">
        {renderCorrelationHeatmap()}
        {correlationMatrix && correlationMatrix.significantPairs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Significant Correlations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {correlationMatrix.significantPairs.slice(0, 5).map((pair, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">
                        {pair.factor1.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ↔{' '}
                        {pair.factor2.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pair.correlation > 0 ? 'Positive' : 'Negative'} correlation (r = {pair.correlation.toFixed(3)})
                      </p>
                    </div>
                    <Badge variant={pair.significance === 'high' ? 'default' : 'outline'}>
                      {pair.significance}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="patterns" className="space-y-6">
        {renderPatternAnalysis()}
      </TabsContent>

      <TabsContent value="3d">
        {render3dVisualization()}
      </TabsContent>

      <TabsContent value="timeline">
        {renderTimeline()}
      </TabsContent>
    </Tabs>
  );
};
