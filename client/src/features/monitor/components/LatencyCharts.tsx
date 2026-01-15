"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AppDispatch, RootState } from "@/redux/store";
import { chartMonitorStats } from "@/redux/monitorSlice/asyncActions";
import { format } from "date-fns";
import { useMemo } from "react";
import { LatencyChartProps } from "@/features/monitor/types";

export const LatencyCharts = ({ monitorId }: LatencyChartProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { chartData, loading } = useSelector(
    (state: RootState) => state.monitor,
  );

  useEffect(() => {
    if (monitorId) {
      dispatch(chartMonitorStats(monitorId));
    }
  }, [dispatch, monitorId]);

  // Formatējam datus grafikam
  const formattedData = useMemo(() => {
    return chartData.map((point) => ({
      ...point,

      displayTime: format(new Date(point.timestamp), "HH:mm"),

      latency: Math.round(point.latency * 100) / 100,
    }));
  }, [chartData]);

  if (loading && chartData.length === 0) {
    return (
      <div className="h-[350px] w-full bg-white/[0.03] rounded-3xl border border-white/5 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#38CA6B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-white font-bold text-lg">Response Latency</h3>
          <p className="text-white/40 text-xs">Last 24 hours performance</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-[#38CA6B] uppercase tracking-widest block mb-1">
            Current Avg
          </span>
          <span className="text-2xl font-mono font-bold text-white">
            {formattedData.length > 0
              ? formattedData[formattedData.length - 1].latency
              : 0}
            ms
          </span>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38CA6B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38CA6B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="displayTime"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              minTickGap={30}
            />
            <YAxis hide={true} domain={[0, "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#14202D",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#38CA6B" }}
              labelStyle={{
                color: "rgba(255,255,255,0.5)",
                marginBottom: "4px",
              }}
            />
            <Area
              type="monotone"
              dataKey="latency"
              stroke="#38CA6B"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#latencyGradient)"
              dot={formattedData.length < 10}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
