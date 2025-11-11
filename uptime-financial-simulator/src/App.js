import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [targetUptime, setTargetUptime] = useState(99.99);
  const [baseInfrastructure, setBaseInfrastructure] = useState(100000);
  const [comparisonUptime, setComparisonUptime] = useState(99.9);

  const calculateCosts = (uptime, baseInfra) => {
    const redundancyMultiplier = uptime >= 99.99 ? (uptime >= 99.999 ? 4 : 3) : (uptime >= 99.9 ? 2 : 1.5);
    const networkMultiplier = uptime >= 99.99 ? (uptime >= 99.999 ? 3 : 2.5) : (uptime >= 99.9 ? 2 : 1.5);
    const monitoringCost = uptime >= 99.99 ? 50000 : (uptime >= 99.9 ? 30000 : 15000);
    const staffMultiplier = uptime >= 99.99 ? (uptime >= 99.999 ? 3 : 2.5) : (uptime >= 99.9 ? 2 : 1.5);
    const drMultiplier = uptime >= 99.99 ? (uptime >= 99.999 ? 2.5 : 2) : (uptime >= 99.9 ? 1.5 : 1);
    
    const serverCosts = baseInfra * redundancyMultiplier;
    const networkCosts = 50000 * networkMultiplier;
    const staffCosts = 200000 * staffMultiplier;
    const drCosts = 80000 * drMultiplier;
    const maintenanceCosts = (serverCosts + networkCosts) * 0.15;
    
    return {
      servers: Math.round(serverCosts),
      network: Math.round(networkCosts),
      monitoring: monitoringCost,
      staff: Math.round(staffCosts),
      disasterRecovery: Math.round(drCosts),
      maintenance: Math.round(maintenanceCosts),
      total: Math.round(serverCosts + networkCosts + monitoringCost + staffCosts + drCosts + maintenanceCosts)
    };
  };

  const getStrategy = (uptime) => {
    if (uptime >= 99.999) {
      return {
        architecture: "Multi-Region Active-Active with Global Load Balancing",
        redundancy: "N+2 redundancy across 3+ geographic regions",
        monitoring: "Real-time monitoring with AI-powered anomaly detection, <1min response time",
        maintenance: "Zero-downtime deployments, blue-green strategy, automated rollbacks",
        downtime: "26 seconds per year",
        features: [
          "Geographic distribution across 3+ regions",
          "Automated failover with <30 second RTO",
          "Real-time data replication",
          "24/7/365 NOC with dedicated incident response team",
          "Chaos engineering and continuous testing",
          "Automated capacity scaling",
          "Multi-vendor redundancy for critical components"
        ]
      };
    } else if (uptime >= 99.99) {
      return {
        architecture: "Multi-Zone Active-Active with Load Balancing",
        redundancy: "N+1 redundancy across 2+ availability zones",
        monitoring: "Comprehensive monitoring with automated alerting, <5min response time",
        maintenance: "Scheduled maintenance windows with rolling updates",
        downtime: "52 minutes per year",
        features: [
          "Dual availability zone deployment",
          "Automated failover with <2 minute RTO",
          "Synchronous data replication",
          "24/7 on-call engineering team",
          "Regular disaster recovery drills",
          "Automated backup and recovery",
          "Redundant network paths"
        ]
      };
    } else if (uptime >= 99.9) {
      return {
        architecture: "Active-Passive with Hot Standby",
        redundancy: "N+1 redundancy with hot standby systems",
        monitoring: "Standard monitoring with automated alerts, <15min response time",
        maintenance: "Planned maintenance windows (off-peak hours)",
        downtime: "8.7 hours per year",
        features: [
          "Hot standby infrastructure",
          "Manual or semi-automated failover",
          "Regular backup schedule (hourly)",
          "Business hours support with on-call",
          "Monthly disaster recovery testing",
          "Redundant critical components",
          "Standard SLA with vendors"
        ]
      };
    } else {
      return {
        architecture: "Single Region with Cold Standby",
        redundancy: "Basic redundancy for critical components only",
        monitoring: "Basic monitoring with email alerts",
        maintenance: "Scheduled maintenance windows (planned downtime)",
        downtime: "3.65 days per year",
        features: [
          "Single region deployment",
          "Manual failover procedures",
          "Daily backup schedule",
          "Business hours support",
          "Quarterly disaster recovery testing",
          "Limited redundancy",
          "Standard vendor support"
        ]
      };
    }
  };

  const primaryCosts = useMemo(() => calculateCosts(targetUptime, baseInfrastructure), [targetUptime, baseInfrastructure]);
  const comparisonCosts = useMemo(() => calculateCosts(comparisonUptime, baseInfrastructure), [comparisonUptime, baseInfrastructure]);
  const primaryStrategy = useMemo(() => getStrategy(targetUptime), [targetUptime]);
  const comparisonStrategy = useMemo(() => getStrategy(comparisonUptime), [comparisonUptime]);

  const costBreakdownData = [
    { name: 'Servers', value: primaryCosts.servers, color: '#3b82f6' },
    { name: 'Network', value: primaryCosts.network, color: '#8b5cf6' },
    { name: 'Monitoring', value: primaryCosts.monitoring, color: '#10b981' },
    { name: 'Staff', value: primaryCosts.staff, color: '#f59e0b' },
    { name: 'DR/Backup', value: primaryCosts.disasterRecovery, color: '#ef4444' },
    { name: 'Maintenance', value: primaryCosts.maintenance, color: '#06b6d4' }
  ];

  const comparisonData = [
    {
      uptime: `${targetUptime}%`,
      cost: primaryCosts.total / 1000,
      servers: primaryCosts.servers / 1000,
      staff: primaryCosts.staff / 1000
    },
    {
      uptime: `${comparisonUptime}%`,
      cost: comparisonCosts.total / 1000,
      servers: comparisonCosts.servers / 1000,
      staff: comparisonCosts.staff / 1000
    }
  ];

  const uptimeOptions = [
    { value: 99, label: '99% (Basic)' },
    { value: 99.9, label: '99.9% (Standard)' },
    { value: 99.99, label: '99.99% (High Availability)' },
    { value: 99.999, label: '99.999% (Fault Tolerant)' },
    { value: 100, label: '100% (Zero Downtime)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            IT Infrastructure Financial Strategy Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Calculate costs and strategies for achieving your target uptime
          </p>
        </div>

        {/* Input Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Target Uptime: {targetUptime}%
              </label>
              <select
                value={targetUptime}
                onChange={(e) => setTargetUptime(parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
              >
                {uptimeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Base Infrastructure Budget: ${baseInfrastructure.toLocaleString()}
              </label>
              <input
                type="range"
                min="50000"
                max="500000"
                step="10000"
                value={baseInfrastructure}
                onChange={(e) => setBaseInfrastructure(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Cost Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm font-semibold opacity-90 mb-2">Total Annual Cost</div>
            <div className="text-4xl font-bold">${(primaryCosts.total / 1000).toFixed(0)}K</div>
            <div className="text-sm opacity-75 mt-2">for {targetUptime}% uptime</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm font-semibold opacity-90 mb-2">Allowed Downtime</div>
            <div className="text-4xl font-bold">{primaryStrategy.downtime}</div>
            <div className="text-sm opacity-75 mt-2">per year</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm font-semibold opacity-90 mb-2">Architecture</div>
            <div className="text-lg font-bold leading-tight">{primaryStrategy.architecture.split(' ').slice(0, 3).join(' ')}</div>
            <div className="text-sm opacity-75 mt-2">{primaryStrategy.redundancy.split(' ').slice(0, 2).join(' ')}</div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cost Breakdown</h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Costs</h2>
            <div className="space-y-4">
              {[
                { label: 'Server Infrastructure', value: primaryCosts.servers, color: 'bg-blue-500' },
                { label: 'Network & Load Balancing', value: primaryCosts.network, color: 'bg-purple-500' },
                { label: 'Monitoring & Alerting', value: primaryCosts.monitoring, color: 'bg-green-500' },
                { label: 'Staff & Operations', value: primaryCosts.staff, color: 'bg-orange-500' },
                { label: 'Disaster Recovery', value: primaryCosts.disasterRecovery, color: 'bg-red-500' },
                { label: 'Maintenance & Support', value: primaryCosts.maintenance, color: 'bg-cyan-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-bold">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recommended Strategy for {targetUptime}% Uptime</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Architecture Pattern</h3>
              <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                {primaryStrategy.architecture}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Redundancy Level</h3>
              <p className="text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                {primaryStrategy.redundancy}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Monitoring Strategy</h3>
              <p className="text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                {primaryStrategy.monitoring}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Maintenance Approach</h3>
              <p className="text-gray-700 dark:text-gray-300 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                {primaryStrategy.maintenance}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features & Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {primaryStrategy.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compare Uptime Levels</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Compare with: {comparisonUptime}%
            </label>
            <select
              value={comparisonUptime}
              onChange={(e) => setComparisonUptime(parseFloat(e.target.value))}
              className="w-full md:w-1/2 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
            >
              {uptimeOptions.filter(opt => opt.value !== targetUptime).map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="uptime" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" label={{ value: 'Cost ($K)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `$${value.toFixed(0)}K`} />
                  <Legend />
                  <Bar dataKey="cost" fill="#3b82f6" name="Total Cost" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="uptime" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" label={{ value: 'Cost ($K)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `$${value.toFixed(0)}K`} />
                  <Legend />
                  <Bar dataKey="servers" fill="#8b5cf6" name="Server Costs" />
                  <Bar dataKey="staff" fill="#f59e0b" name="Staff Costs" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{targetUptime}% Uptime</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                  <span className="font-bold text-gray-900 dark:text-white">${primaryCosts.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Downtime:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{primaryStrategy.downtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Architecture:</span>
                  <span className="font-bold text-gray-900 dark:text-white text-right">{primaryStrategy.architecture.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{comparisonUptime}% Uptime</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                  <span className="font-bold text-gray-900 dark:text-white">${comparisonCosts.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Downtime:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{comparisonStrategy.downtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Architecture:</span>
                  <span className="font-bold text-gray-900 dark:text-white text-right">{comparisonStrategy.architecture.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Cost Difference Analysis</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Moving from {comparisonUptime}% to {targetUptime}% uptime requires an additional investment of{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                ${Math.abs(primaryCosts.total - comparisonCosts.total).toLocaleString()}
              </span>{' '}
              annually ({((Math.abs(primaryCosts.total - comparisonCosts.total) / comparisonCosts.total) * 100).toFixed(1)}% increase).
              This reduces allowed downtime from {comparisonStrategy.downtime} to {primaryStrategy.downtime}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            * Costs are estimates based on industry standards and may vary based on specific requirements, vendor pricing, and geographic location.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
