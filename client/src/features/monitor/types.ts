export interface MonitorCardProps {
  monitor: any;
}

export interface StatsSidebarProps {
  monitors: any[];
}

export interface MonitorDetailsProps {
  monitor: any;
  onBack: () => void;
}

export interface LatencyChartProps {
  monitorId: number;
}

interface Heartbeat {
  ID: number;
  CreatedAt: string;
  status_code: number;
  latency: number;
}

export interface IncidentTimelineProps {
  heartbeats?: Heartbeat[];
}
