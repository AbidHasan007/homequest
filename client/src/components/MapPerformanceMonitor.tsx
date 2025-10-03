"use client";
import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  mapLoadTime: number;
  markerUpdateTime: number;
  lastUpdate: string;
}

const MapPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    mapLoadTime: 0,
    markerUpdateTime: 0,
    lastUpdate: 'Never'
  });

  useEffect(() => {
    // Listen for performance events from the map
    const handleMapLoad = (event: CustomEvent) => {
      setMetrics(prev => ({
        ...prev,
        mapLoadTime: event.detail.loadTime,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    };

    const handleMarkerUpdate = (event: CustomEvent) => {
      setMetrics(prev => ({
        ...prev,
        markerUpdateTime: event.detail.updateTime,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    };

    window.addEventListener('mapLoad', handleMapLoad as EventListener);
    window.addEventListener('markerUpdate', handleMarkerUpdate as EventListener);

    return () => {
      window.removeEventListener('mapLoad', handleMapLoad as EventListener);
      window.removeEventListener('markerUpdate', handleMarkerUpdate as EventListener);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded-lg font-mono z-50">
      <div className="font-bold mb-1">Map Performance</div>
      <div>Map Load: {metrics.mapLoadTime.toFixed(0)}ms</div>
      <div>Marker Update: {metrics.markerUpdateTime.toFixed(0)}ms</div>
      <div>Last Update: {metrics.lastUpdate}</div>
    </div>
  );
};

export default MapPerformanceMonitor;
