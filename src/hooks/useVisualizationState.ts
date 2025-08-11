import { useState } from 'react';
import { FilterCriteria } from '@/components/AdvancedFilterPanel';

export type ChartType = 'line' | 'area' | 'scatter' | 'composed';
export type TimeRange = '7d' | '30d' | '90d' | 'all';
export type LayoutMode = 'grid' | 'focus' | 'comparison' | 'dashboard';
export type VisualizationType = 'trends' | 'correlations' | 'patterns' | '3d' | 'timeline';

export interface HighlightState {
  type: 'emotion' | 'sensory' | 'tracking' | 'anomaly' | null;
  id: string | null;
  relatedIds: string[];
}

export const useVisualizationState = (availableEmotions: string[]) => {
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('line');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('30d');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(availableEmotions);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('dashboard');
  const [focusedVisualization, setFocusedVisualization] = useState<VisualizationType | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedVisualizations, setSelectedVisualizations] = useState<VisualizationType[]>(['trends', 'patterns']);
  const [highlightState, setHighlightState] = useState<HighlightState>({ type: null, id: null, relatedIds: [] });
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    dateRange: { start: null, end: null },
    emotions: { types: [], intensityRange: [0, 10], includeTriggers: [], excludeTriggers: [] },
    sensory: { types: [], responses: [], intensityRange: [0, 10] },
    environmental: {
      locations: [],
      activities: [],
      conditions: { noiseLevel: [0, 10], temperature: [15, 30], lighting: [] },
      weather: [],
      timeOfDay: []
    },
    patterns: { anomaliesOnly: false, minConfidence: 0, patternTypes: [] },
    realtime: false
  });

  return {
    selectedChartType,
    setSelectedChartType,
    selectedTimeRange,
    setSelectedTimeRange,
    selectedEmotions,
    setSelectedEmotions,
    layoutMode,
    setLayoutMode,
    focusedVisualization,
    setFocusedVisualization,
    isFullscreen,
    setIsFullscreen,
    isPictureInPicture,
    setIsPictureInPicture,
    showFilterPanel,
    setShowFilterPanel,
    selectedVisualizations,
    setSelectedVisualizations,
    highlightState,
    setHighlightState,
    filterCriteria,
    setFilterCriteria,
  };
};
