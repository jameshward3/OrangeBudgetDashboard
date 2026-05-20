import React, { useState } from 'react';
import { BarChart, Bar, ComposedChart, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, AlertTriangle, Building2, CheckCircle, ChevronDown, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

export default function OrangeBudgetDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedDelta, setExpandedDelta] = useState(null);

  // 2025 vs 2026 Comparison Data
  const budgetComparison = [
    {
      category: 'Total Appropriations',
      2025: 92330788,
      2026: 94580788,
      delta: 2250000,
      percentChange: 2.44,
      trend: 'up'
    },
    {
      category: 'Operations - Within CAP',
      2025: 66272899,
      2026: 64526480,
      delta: -1746419,
      percentChange: -2.63,
      trend: 'down'
    },
    {
      category: 'Operations - Excluded CAP',
      2025: 5876516,
      2026: 11202060,
      delta: 5325544,
      percentChange: 90.58,
      trend: 'up'
    },
    {
      category: 'Capital Improvements',
      2025: 1500000,
      2026: 1600000,
      delta: 100000,
      percentChange: 6.67,
      trend: 'up'
    },
    {
      category: 'Debt Service',
      2025: 4797620,
      2026: 4306684,
      delta: -490936,
      percentChange: -10.23,
      trend: 'down'
    }
  ];

  // Department Comparison 2025 vs 2026
  const departmentComparison = [
    { name: 'Police', 2025: 17917872, 2026: 17246707, change: -671165, percent: -3.75 },
    { name: 'Fire', 2025: 9085400, 2026: 10043081, change: 957681, percent: 10.54 },
    { name: 'Public Works', 2025: 7912622, 2026: 7759162, change: -153460, percent: -1.94 },
    { name: 'Insurance', 2025: 22572000, 2026: 23857280, change: 1285280, percent: 5.69 },
    { name: 'Finance', 2025: 2505000, 2026: 2400000, change: -105000, percent: -4.19 },
    { name: 'Library', 2025: 985343, 2026: 1117869, change: 132526, percent: 13.45 },
  ];

  // Revenue Comparison
  const revenueComparison = [
    { source: 'Surplus', 2025: 4000000, 2026: 4008400, change: 8400, percent: 0.21 },
    { source: 'Local Revenues', 2025: 2722147, 2026: 2651500, change: -70647, percent: -2.59 },
    { source: 'State Aid', 2025: 8472638, 2026: 8472638, change: 0, percent: 0 },
    { source: 'UCC Fees', 2025: 940000, 2026: 1100000, change: 160000, percent: 17.02 },
    { source: 'PILOTs', 2025: 2664627, 2026: 2788300, change: 123673, percent: 4.64 },
    { source: 'Grants/Special', 2025: 150000, 2026: 6946352, change: 6796352, percent: 4531 },
  ];

  // Key Variances
  const keyVariances = [
    {
      item: 'Workers Compensation Insurance',
      2025: 1000000,
      2026: 1500000,
      change: 500000,
      percent: 50.0,
      severity: 'high',
      note: 'SIGNIFICANT INCREASE - Requires investigation'
    },
    {
      item: 'Court Fines',
      2025: 1201676,
      2026: 938800,
      change: -262876,
      percent: -21.86,
      severity: 'medium',
      note: 'Lower anticipated fines'
    },
    {
      item: 'Fire Department',
      2025: 9085400,
      2026: 10043081,
      change: 957681,
      percent: 10.54,
      severity: 'medium',
      note: 'Salary/benefits increases'
    },
    {
      item: 'Permit Fees',
      2025: 439257,
      2026: 553000,
      change: 113743,
      percent: 25.89,
      severity: 'low',
      note: 'Increased development activity'
    },
    {
      item: 'Snow Removal Budget',
      2025: 205000,
      2026: 320000,
      change: 115000,
      percent: 56.10,
      severity: 'medium',
      note: 'Winter weather preparedness'
    },
    {
      item: 'Grant Revenues (NEW)',
      2025: 150000,
      2026: 6946352,
      change: 6796352,
      percent: 4531,
      severity: 'positive',
      note: 'Major grant acquisition success'
    },
  ];

  // 2026 Budget Summary
  const budgetSummary = {
    totalAppropriations: 94580788,
    generalMunicipal: 78434652,
    taxesToRaise: 70104881,
    surplusAnticipated: 4008400,
    miscellaneousRevenues: 19400638,
  };

  const getPercentChange = (prior, current) => {
    if (prior === 0) return current === 0 ? 0 : 100;
    return ((current - prior) / prior) * 100;
  };

  const getPilotStatus = (prior, current) => {
    const percent = getPercentChange(prior, current);
    if (current === 0 && prior > 0) return 'Discontinued';
    if (percent > 1) return 'Growing';
    if (percent < -2) return 'Declining';
    return 'Stable';
  };

  const getPilotSeverity = (prior, current) => {
    const percent = getPercentChange(prior, current);
    if (current === 0 && prior > 0) return 'critical';
    if (percent <= -50) return 'critical';
    if (percent <= -25) return 'high';
    if (percent <= -10) return 'medium';
    return 'none';
  };

  const createPilotProperty = ({ name, amount2025, amount2026, type }) => ({
    name,
    type,
    2025: amount2025,
    2026: amount2026,
    change: amount2026 - amount2025,
    percent: getPercentChange(amount2025, amount2026),
    status: getPilotStatus(amount2025, amount2026),
    severity: getPilotSeverity(amount2025, amount2026),
  });

  // PILOT Program Data (2025 vs 2026)
  const pilotProperties = [
    { name: 'Washington Dodd', amount2025: 493727, amount2026: 443700, type: 'Senior Housing' },
    { name: 'Oakwood Towers', amount2025: 274225, amount2026: 243300, type: 'Senior Housing' },
    { name: 'Our Lady of Mt. Carmel', amount2025: 204354, amount2026: 178300, type: 'Senior Housing' },
    { name: 'Condos @ 52 Lincoln Ave', amount2025: 153010, amount2026: 138500, type: 'Mixed-Use' },
    { name: 'Washington Dodd Settlement', amount2025: 815000, amount2026: 0, type: 'One-Time Settlement' },
    { name: 'L & M Development Partners', amount2025: 143668, amount2026: 66600, type: 'Commercial' },
    { name: 'Station Partners - Tony Galento', amount2025: 250249, amount2026: 21200, type: 'Mixed-Use' },
    { name: 'Salem Towers', amount2025: 175000, amount2026: 175000, type: 'Senior Housing' },
    { name: 'Transport of NJ', amount2025: 107019, amount2026: 107000, type: 'Commercial' },
    { name: 'Orange Park Apartments', amount2025: 237177, amount2026: 200000, type: 'Residential' },
    { name: 'S. Essex Urban Renewal', amount2025: 99838, amount2026: 90100, type: 'Urban Renewal' },
    { name: 'Walter G Phase I', amount2025: 58661, amount2026: 62700, type: 'Mixed-Use' },
    { name: 'Walter G Phase II', amount2025: 38687, amount2026: 35900, type: 'Mixed-Use' },
    { name: 'Walter G Phase III', amount2025: 34623, amount2026: 33600, type: 'Mixed-Use' },
    { name: 'Grand Central Senior Housing', amount2025: 38496, amount2026: 38400, type: 'Senior Housing' },
    { name: 'Living Fountain', amount2025: 73102, amount2026: 65700, type: 'Mixed-Use' },
    { name: 'Harvard Printing Development', amount2025: 41871, amount2026: 58200, type: 'Commercial' },
    { name: '606 Freeman Street', amount2025: 115864, amount2026: 127500, type: 'Commercial' },
    { name: 'Essex & Crane', amount2025: 59915, amount2026: 69300, type: 'Commercial' },
    { name: 'Peek Reock I', amount2025: 33582, amount2026: 33000, type: 'Commercial' },
    { name: 'New Community Corp', amount2025: 71910, amount2026: 52500, type: 'Anchor Institution' },
    { name: '205 Mt. Vernon', amount2025: 44529, amount2026: 28900, type: 'Residential' },
    { name: 'Condos @ 475 S. Jefferson', amount2025: 77519, amount2026: 84500, type: 'Commercial' },
    { name: 'The Berkley, South Center', amount2025: 27772, amount2026: 35500, type: 'Anchor Institution' },
    { name: '307 Washington Street', amount2025: 76956, amount2026: 0, type: 'Phase-Out' },
    { name: 'Peek Reock II', amount2025: 75737, amount2026: 0, type: 'Phase-Out' },
    { name: 'Peek Reock III', amount2025: 21008, amount2026: 0, type: 'Phase-Out' },
    { name: 'D&A Urban Renewal II - LIA', amount2025: 39062, amount2026: 0, type: 'Phase-Out' },
  ].map(createPilotProperty);

  // PILOT Summary from the analysis source documents.
  const pilotSummary = {
    totalPILOT2025: 2664627,
    totalPILOT2026: 2788300,
    activePILOTs: 27,
    significantDeclines: 13,
    stableProperties: 4,
    growingProperties: 6,
    discontinuedProperties: 4,
  };
  const capitalProjects = [
    {
      id: 1,
      name: 'Road Improvements',
      category: 'Infrastructure',
      total: 5000000,
      budget2026: 250000,
      description: 'Multi-year street resurfacing and infrastructure upgrades across city',
      status: 'Active',
      yearsRemaining: 6,
    },
    {
      id: 2,
      name: 'Water/Sewer System Improvements',
      category: 'Utilities',
      total: 6900000,
      budget2026: 5400000,
      description: 'Comprehensive water and sewer infrastructure modernization',
      status: 'Priority',
      yearsRemaining: 6,
    },
    {
      id: 3,
      name: 'DPW Projects - OPD/Courts',
      category: 'Municipal Facilities',
      total: 2667000,
      budget2026: 133350,
      description: 'Police Department and Courts building improvements',
      status: 'Active',
      yearsRemaining: 1,
    },
    {
      id: 4,
      name: 'Fire Department Radios',
      category: 'Equipment',
      total: 300000,
      budget2026: 15000,
      description: 'Communications equipment upgrade for fire operations',
      status: 'Active',
      yearsRemaining: 1,
    },
    {
      id: 5,
      name: 'DPW Projects - City Hall',
      category: 'Municipal Facilities',
      total: 410000,
      budget2026: 20500,
      description: 'City Hall facility upgrades and maintenance',
      status: 'Planning',
      yearsRemaining: 1,
    },
  ];

  // 6-Year Capital Budget Projection
  const sixYearProjection = [
    { year: '2026', general: 4327000, waterSewer: 5400000, total: 9727000 },
    { year: '2027', general: 1000000, waterSewer: 300000, total: 1300000 },
    { year: '2028', general: 1000000, waterSewer: 300000, total: 1300000 },
    { year: '2029', general: 1000000, waterSewer: 300000, total: 1300000 },
    { year: '2030', general: 1000000, waterSewer: 300000, total: 1300000 },
    { year: '2031', general: 1000000, waterSewer: 300000, total: 1300000 },
  ];

  // Department Spending
  const departmentSpending = [
    { name: 'Police', amount: 17967872, percentage: 22.8 },
    { name: 'Fire', amount: 10038481, percentage: 12.8 },
    { name: 'Insurance', amount: 23857280, percentage: 30.4 },
    { name: 'Public Works', amount: 8202122, percentage: 10.4 },
    { name: 'Administration', amount: 5834562, percentage: 7.4 },
    { name: 'Other Services', amount: 6484935, percentage: 8.2 },
  ];

  // Revenue Sources
  const revenueSources = [
    { name: 'Property Tax', value: 70104881, color: '#003d7a' },
    { name: 'State Aid', value: 8472638, color: '#005fa3' },
    { name: 'Miscellaneous', value: 11968449, color: '#ff8c00' },
    { name: 'Surplus', value: 4008400, color: '#ffa500' },
    { name: 'Grants/Other', value: 26400, color: '#ffb84d' },
  ];

  // Change Orders
  const changeOrders = [
    {
      id: 1,
      project: 'NJDOT 2020 Roadway Improvements',
      contractor: 'Cifelli & Son General Construction',
      original: 518882.39,
      increase: 112731.92,
      percentage: 21.7,
      scope: 'Additional concrete sidewalk, milling, paving on North Day, Hillyer, Hickory Streets. Additional traffic directors.',
    },
    {
      id: 2,
      project: 'Public Works Garage Roof Removal & Replacement',
      contractor: 'Weatherproof Technologies, Inc.',
      original: 370747.83,
      increase: 75781.45,
      percentage: 20.4,
      scope: 'HVAC, ladder installation, new door, NJ Transit training. Metal deck replacement, 18,000 BTU split unit.',
    },
    {
      id: 3,
      project: '2022 Safe Streets to Transit',
      contractor: 'Portofino Builders, LLC',
      original: 229535.0,
      increase: 113319.6,
      percentage: 49.4,
      scope: 'Additional conduit, hand hole for PSE&G, drainage modification, intersection paving, curb installation, tree removal/replacement.',
    },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const COLORS = ['#003d7a', '#005fa3', '#0078c4', '#ff8c00', '#ffa500'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">City of Orange</h1>
              <p className="text-slate-300 text-lg">Municipal Budget Dashboard 2026</p>
            </div>
            <div className="text-right">
              <p className="text-slate-300 text-sm mb-1">Essex County, New Jersey</p>
              <p className="text-orange-400 font-semibold">Fiscal Year: 2026</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full w-32"></div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'delta', label: '2025 vs 2026 Delta' },
              { id: 'pilot', label: 'PILOT Program' },
              { id: 'capital', label: 'Capital Projects' },
              { id: 'spending', label: 'Spending Analysis' },
              { id: 'forecast', label: '6-Year Forecast' },
              { id: 'changes', label: 'Change Orders' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                    Total Appropriations
                  </h3>
                  <DollarSign className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {formatCurrency(budgetSummary.totalAppropriations)}
                </p>
                <p className="text-xs text-slate-500 mb-3">2026 Municipal Budget</p>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs font-semibold text-orange-600">YoY Change from 2025:</p>
                  <p className="text-sm font-bold text-slate-900">+{formatCurrency(2250000)} (+2.44%)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                    Tax Levy
                  </h3>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {formatCurrency(budgetSummary.taxesToRaise)}
                </p>
                <p className="text-xs text-slate-500 mb-3">Amount to be raised by property tax</p>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs font-semibold text-orange-600">YoY Change from 2025:</p>
                  <p className="text-sm font-bold text-slate-900">+{formatCurrency(3214630)} (+4.81%)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                    Miscellaneous Revenue
                  </h3>
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {formatCurrency(budgetSummary.miscellaneousRevenues)}
                </p>
                <p className="text-xs text-slate-500 mb-3">Licenses, fees, state aid, grants</p>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs font-semibold text-green-600">YoY Change from 2025:</p>
                  <p className="text-sm font-bold text-slate-900">+{formatCurrency(7350467)} (+37.88%)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">
                    Surplus Balance
                  </h3>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  {formatCurrency(budgetSummary.surplusAnticipated)}
                </p>
                <p className="text-xs text-slate-500 mb-3">Anticipated surplus for 2026</p>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-600">YoY Change from 2025:</p>
                  <p className="text-sm font-bold text-slate-900">+{formatCurrency(8400)} (+0.21%)</p>
                </div>
              </div>
            </div>

            {/* Revenue Breakdown and Department Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Sources */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Revenue Sources</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 space-y-2">
                  {revenueSources.map((source) => (
                    <div key={source.name} className="flex justify-between text-sm">
                      <span className="text-slate-700">{source.name}</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(source.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Spending Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Top Department Allocations</h2>
                <div className="space-y-4">
                  {departmentSpending.map((dept, idx) => (
                    <div key={dept.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">{dept.name}</span>
                        <span className="text-sm font-bold text-slate-900">{formatCurrency(dept.amount)}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-orange-500 h-2 rounded-full"
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{dept.percentage}% of municipal spending</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DELTA ANALYSIS TAB */}
        {activeTab === 'delta' && (
          <div className="space-y-8">
            {/* Summary Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Budget Category Comparison</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={budgetComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="2025" fill="#0078c4" opacity={0.7} />
                    <Bar dataKey="2026" fill="#ff8c00" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Year-over-Year Changes</h2>
                <div className="space-y-3">
                  {budgetComparison.map((item) => (
                    <div key={item.category} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-900 text-sm">{item.category}</span>
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-blue-600" />
                          )}
                          <span className={`font-bold text-sm ${item.trend === 'up' ? 'text-orange-600' : 'text-blue-600'}`}>
                            {item.percentChange > 0 ? '+' : ''}{item.percentChange.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">
                        {item.trend === 'up' ? '↑' : '↓'} {formatCurrency(Math.abs(item.delta))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Changes */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Department Budget Changes</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="2025" fill="#0078c4" opacity={0.7} />
                  <Bar yAxisId="left" dataKey="2026" fill="#ff8c00" />
                  <Line yAxisId="right" type="monotone" dataKey="percent" stroke="#dc2626" strokeWidth={2} name="% Change" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentComparison.map((dept) => (
                  <div key={dept.name} className={`p-4 rounded-lg border-2 ${dept.percent > 0 ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-bold ${dept.percent > 0 ? 'text-orange-900' : 'text-blue-900'}`}>{dept.name}</h4>
                      <span className={`text-sm font-bold px-2 py-1 rounded ${dept.percent > 0 ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'}`}>
                        {dept.percent > 0 ? '+' : ''}{dept.percent.toFixed(1)}%
                      </span>
                    </div>
                    <p className={`text-xs mb-2 ${dept.percent > 0 ? 'text-orange-700' : 'text-blue-700'}`}>
                      {dept.percent > 0 ? '↑' : '↓'} {formatCurrency(Math.abs(dept.change))}
                    </p>
                    <p className="text-xs text-slate-600">
                      2025: {formatCurrency(dept['2025'])} → 2026: {formatCurrency(dept['2026'])}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Changes */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Revenue Source Changes</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="2025" fill="#0078c4" opacity={0.7} />
                  <Bar dataKey="2026" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-8 space-y-3">
                {revenueComparison.map((revenue) => (
                  <div key={revenue.source} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-slate-900">{revenue.source}</h4>
                      <span className={`font-bold ${revenue.change > 0 ? 'text-green-600' : revenue.change < 0 ? 'text-red-600' : 'text-slate-600'}`}>
                        {revenue.change > 0 ? '+' : ''}{revenue.change.toLocaleString()} ({revenue.percent > 0 ? '+' : ''}{revenue.percent.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>2025: {formatCurrency(revenue['2025'])}</span>
                      <span>2026: {formatCurrency(revenue['2026'])}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Variances */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Key Variances & Alerts</h2>
              
              {keyVariances.map((variance, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 ${
                    variance.severity === 'high'
                      ? 'border-red-500 bg-red-50'
                      : variance.severity === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : variance.severity === 'positive'
                      ? 'border-green-500 bg-green-50'
                      : 'border-blue-500 bg-blue-50'
                  } p-6 rounded-r-lg`}
                >
                  <button
                    onClick={() => setExpandedDelta(expandedDelta === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{variance.item}</h3>
                        {variance.severity === 'high' && (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                        {variance.severity === 'positive' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className={`text-sm font-semibold ${
                        variance.severity === 'high'
                          ? 'text-red-800'
                          : variance.severity === 'positive'
                          ? 'text-green-800'
                          : 'text-slate-700'
                      }`}>
                        {variance.percent > 0 ? '+' : ''}{variance.percent.toFixed(1)}% change
                        {' • '}
                        {variance.percent > 0 ? '+' : ''}{formatCurrency(variance.change)}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedDelta === idx ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedDelta === idx && (
                    <div className="mt-4 pt-4 border-t border-slate-300">
                      <p className="text-sm mb-3">{variance.note}</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-600 mb-1">2025 Amount</p>
                          <p className="font-bold text-slate-900">{formatCurrency(variance['2025'])}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">2026 Amount</p>
                          <p className="font-bold text-slate-900">{formatCurrency(variance['2026'])}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">Change Amount</p>
                          <p className={`font-bold ${variance.percent > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                            {variance.percent > 0 ? '+' : ''}{formatCurrency(variance.change)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">2025→2026 Analysis Summary</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <strong>Overall Budget Growth:</strong> 2.44% (+$2.25M) - Moderate, measured growth within fiscal constraints
                </p>
                <p>
                  <strong>Core Operations:</strong> -2.63% within CAP shows fiscal discipline and cost control efforts
                </p>
                <p>
                  <strong>Excluded Operations:</strong> +90.58% driven entirely by $6.8M in NEW state/federal grants (not local tax impact)
                </p>
                <p>
                  <strong>Debt Service:</strong> -10.23% indicates bonds maturing and improved long-term financial position
                </p>
                <p>
                  <strong>Major Concerns:</strong> Workers' compensation insurance increase of 50% requires investigation into rate changes vs. claims experience
                </p>
                <p>
                  <strong>Positive Developments:</strong> Successful grant acquisition ($6.8M new), permit revenue growth (+25.89% indicating development activity), and controlled tax increases
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PILOT PROGRAM TAB */}
        {activeTab === 'pilot' && (
          <div className="space-y-8">
            {/* PILOT Summary Alert */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-yellow-900 mb-3">PILOT Program Overview</h2>
              <p className="text-yellow-800 mb-4">
                Payment-in-Lieu-of-Taxes (PILOT) agreements are negotiated payments from property owners in place of traditional property taxes. These agreements incentivize redevelopment while providing stable, diversified revenue.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded">
                  <p className="text-xs text-yellow-600 mb-1">Total PILOT Revenue</p>
                  <p className="font-bold text-lg text-yellow-900">{formatCurrency(pilotSummary.totalPILOT2026)}</p>
                  <p className="text-xs text-yellow-700 mt-1">+{formatCurrency(pilotSummary.totalPILOT2026 - pilotSummary.totalPILOT2025)} from 2025</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-xs text-yellow-600 mb-1">Active Agreements</p>
                  <p className="font-bold text-lg text-yellow-900">{pilotSummary.activePILOTs}</p>
                  <p className="text-xs text-yellow-700 mt-1">Properties with PILOTs</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-xs text-yellow-600 mb-1">% of City Revenue</p>
                  <p className="font-bold text-lg text-yellow-900">9.0%</p>
                  <p className="text-xs text-yellow-700 mt-1">Down from 11.3% (2025)</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-xs text-yellow-600 mb-1">YoY Change</p>
                  <p className="font-bold text-lg text-yellow-900">+4.64%</p>
                  <p className="text-xs text-yellow-700 mt-1">{formatCurrency(pilotSummary.totalPILOT2026 - pilotSummary.totalPILOT2025)}</p>
                </div>
              </div>
            </div>

            {/* PILOT Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">PILOT Portfolio Status</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-900">Growing Properties</span>
                      <span className="text-xl font-bold text-green-700">{pilotSummary.growingProperties}</span>
                    </div>
                    <p className="text-sm text-green-800 mt-2">Properties with positive year-over-year growth</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-900">Stable Properties</span>
                      <span className="text-xl font-bold text-blue-700">{pilotSummary.stableProperties}</span>
                    </div>
                    <p className="text-sm text-blue-800 mt-2">Essentially flat year-over-year</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-orange-900">Declining Properties</span>
                      <span className="text-xl font-bold text-orange-700">{pilotSummary.significantDeclines}</span>
                    </div>
                    <p className="text-sm text-orange-800 mt-2">Properties showing revenue reduction</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-red-900">Discontinued</span>
                      <span className="text-xl font-bold text-red-700">{pilotSummary.discontinuedProperties}</span>
                    </div>
                    <p className="text-sm text-red-800 mt-2">No longer contributing revenue</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Top 5 PILOT Properties</h3>
                <div className="space-y-3">
                  {[...pilotProperties]
                    .filter(p => p['2026'] > 0)
                    .sort((a, b) => b['2026'] - a['2026'])
                    .slice(0, 5)
                    .map((pilot) => (
                      <div key={pilot.name} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{pilot.name}</p>
                            <p className="text-xs text-slate-600">{pilot.type}</p>
                          </div>
                          <span className={`text-sm font-bold px-2 py-1 rounded ${
                            pilot.percent > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {pilot.percent > 0 ? '+' : ''}{pilot.percent.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">{formatCurrency(pilot['2026'])}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* PILOT Detailed Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">PILOT Properties: 2025 vs 2026 Detailed Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 border-b-2 border-slate-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">Property Name</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-900">2025 Amount</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-900">2026 Amount</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-900">Change</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">% Change</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pilotProperties.map((pilot, idx) => (
                      <tr key={idx} className={`border-b border-slate-200 ${
                        pilot.severity === 'critical' ? 'bg-red-50' :
                        pilot.severity === 'high' ? 'bg-orange-50' :
                        pilot.percent > 0 ? 'bg-green-50' :
                        pilot.percent === 0 ? 'bg-blue-50' : 'bg-yellow-50'
                      }`}>
                        <td className="px-4 py-3 font-medium text-slate-900">{pilot.name}</td>
                        <td className="px-4 py-3 text-right text-slate-700">{formatCurrency(pilot['2025'])}</td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(pilot['2026'])}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${
                          pilot.change > 0 ? 'text-green-700' : pilot.change < 0 ? 'text-red-700' : 'text-slate-700'
                        }`}>
                          {pilot.change > 0 ? '+' : ''}{formatCurrency(pilot.change)}
                        </td>
                        <td className={`px-4 py-3 text-center font-bold ${
                          pilot.percent > 0 ? 'text-green-700' : pilot.percent < 0 ? 'text-red-700' : 'text-slate-700'
                        }`}>
                          {pilot.percent > 0 ? '+' : ''}{pilot.percent.toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            pilot.status === 'Growing' ? 'bg-green-200 text-green-800' :
                            pilot.status === 'Stable' ? 'bg-blue-200 text-blue-800' :
                            pilot.status === 'Declining' ? 'bg-orange-200 text-orange-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {pilot.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-red-900 mb-4">🚨 Critical Concerns</h4>
                <ul className="space-y-3 text-sm text-red-800">
                  <li>• <strong>Station Partners (Tony Galento):</strong> -91.53% decline (-$229K)</li>
                  <li>• <strong>L & M Development:</strong> -53.65% decline (-$77K)</li>
                  <li>• <strong>Portfolio Aging:</strong> 56% of properties declining</li>
                  <li>• <strong>Large Project Failures:</strong> Combined $306K loss from 2 projects</li>
                  <li>• <strong>Phase-Out Risk:</strong> 4 properties discontinued, no clear replacement</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-green-900 mb-4">✅ Positive Developments</h4>
                <ul className="space-y-3 text-sm text-green-800">
                  <li>• <strong>Total Growth:</strong> +$123.7K (+4.64%) year-over-year</li>
                  <li>• <strong>Diversification:</strong> 27 active properties across types</li>
                  <li>• <strong>New Projects Growing:</strong> Harvard Printing +39%, The Berkley +27.8%</li>
                  <li>• <strong>Stable Base:</strong> 4 properties flat/stable</li>
                  <li>• <strong>Recurring Revenue:</strong> Predictable income stream independent of taxes</li>
                </ul>
              </div>
            </div>

            {/* Financial Impact Analysis */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Financial Impact Assessment</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-slate-300">
                  <p className="text-xs text-slate-600 mb-2">PILOT Revenue as % of Total</p>
                  <p className="text-2xl font-bold text-slate-900">9.0%</p>
                  <p className="text-xs text-red-600 mt-2">↓ from 11.3% (2025)</p>
                  <p className="text-xs text-slate-600 mt-1">Declining as % due to higher grant growth</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-300">
                  <p className="text-xs text-slate-600 mb-2">Sustained Annual Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(2788300)}</p>
                  <p className="text-xs text-green-600 mt-2">↑ {formatCurrency(123673)} from 2025</p>
                  <p className="text-xs text-slate-600 mt-1">Recurring, stable income</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-300">
                  <p className="text-xs text-slate-600 mb-2">2027 Forecast Risk</p>
                  <p className="text-2xl font-bold text-orange-600">-10-15%</p>
                  <p className="text-xs text-red-600 mt-2">⚠️ Potential $280-418K decline</p>
                  <p className="text-xs text-slate-600 mt-1">Without new PILOT agreements</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-4">📋 Strategic Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-900 mb-3">Immediate Actions (0-6 months)</h5>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>✓ Investigate Tony Galento Plaza -91% decline</li>
                    <li>✓ Assess L & M Development -53% decline</li>
                    <li>✓ Identify discontinuation timeline for remaining 3 properties</li>
                    <li>✓ Establish quarterly PILOT monitoring system</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-900 mb-3">Medium-Term Strategy (6-24 months)</h5>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>✓ Recruit 2-3 new PILOT agreements</li>
                    <li>✓ Renegotiate declining mature properties</li>
                    <li>✓ Target brownfield/underutilized properties</li>
                    <li>✓ Link PILOT strategy to economic development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CAPITAL PROJECTS TAB */}
        {activeTab === 'capital' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 text-sm">6-Year Capital Plan</h3>
                <p className="text-blue-800 text-sm mt-1">
                  Total 6-year capital expenditure: {formatCurrency(16227000)} across 11 projects
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {capitalProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() =>
                      setExpandedProject(expandedProject === project.id ? null : project.id)
                    }
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            project.status === 'Priority'
                              ? 'bg-red-100 text-red-700'
                              : project.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 text-xs uppercase tracking-wide mb-1">Total Cost</p>
                          <p className="font-bold text-slate-900">{formatCurrency(project.total)}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-xs uppercase tracking-wide mb-1">2026 Budget</p>
                          <p className="font-bold text-slate-900">{formatCurrency(project.budget2026)}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-xs uppercase tracking-wide mb-1">Category</p>
                          <p className="font-bold text-slate-900">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedProject === project.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedProject === project.id && (
                    <div className="bg-slate-50 border-t border-slate-200 p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Project Description</h4>
                        <p className="text-slate-700 text-sm">{project.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Timeline</h4>
                        <p className="text-slate-700 text-sm">
                          Multi-year project spanning {project.yearsRemaining} years (2026-{2026 + project.yearsRemaining - 1})
                        </p>
                      </div>
                      <div className="bg-white rounded p-4 border border-slate-200">
                        <p className="text-xs uppercase tracking-wide text-slate-600 mb-2">Budget Distribution</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">2026 Allocation</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatCurrency(project.budget2026)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(project.budget2026 / project.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {((project.budget2026 / project.total) * 100).toFixed(1)}% of total project cost
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPENDING ANALYSIS TAB */}
        {activeTab === 'spending' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Municipal Department Spending</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentSpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="amount" fill="#0078c4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Spending by Department</h3>
                <div className="space-y-4">
                  {departmentSpending.map((dept) => (
                    <div key={dept.name} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-900">{dept.name}</span>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{formatCurrency(dept.amount)}</p>
                        <p className="text-xs text-slate-500">{dept.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-semibold text-orange-900 mb-1">Largest Allocation</p>
                    <p className="text-sm text-orange-800">Insurance: {formatCurrency(23857280)} (30.4%)</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Public Safety Combined</p>
                    <p className="text-sm text-blue-800">
                      Police + Fire: {formatCurrency(17967872 + 10038481)} (35.2%)
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 mb-1">Infrastructure & Services</p>
                    <p className="text-sm text-green-800">
                      Public Works + Admin: {formatCurrency(8202122 + 5834562)} (17.8%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6-YEAR FORECAST TAB */}
        {activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">6-Year Capital Budget Forecast (2026-2031)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sixYearProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="general"
                    stroke="#003d7a"
                    strokeWidth={2}
                    name="General Capital"
                    dot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="waterSewer"
                    stroke="#ff8c00"
                    strokeWidth={2}
                    name="Water/Sewer Capital"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Yearly Capital Allocation</h3>
                <div className="space-y-3">
                  {sixYearProjection.map((year) => (
                    <div key={year.year} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900">{year.year}</span>
                        <span className="font-bold text-slate-900">{formatCurrency(year.total)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 text-xs mb-1">General</p>
                          <p className="font-semibold text-slate-900">{formatCurrency(year.general)}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-xs mb-1">Water/Sewer</p>
                          <p className="font-semibold text-slate-900">{formatCurrency(year.waterSewer)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">6-Year Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs uppercase tracking-wide text-slate-600 mb-1">Total 6-Year Investment</p>
                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(16227000)}</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-2">General Capital</p>
                    <p className="text-sm text-blue-800">{formatCurrency(9327000)} (57.4%)</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-semibold text-orange-900 mb-2">Water/Sewer Capital</p>
                    <p className="text-sm text-orange-800">{formatCurrency(6900000)} (42.6%)</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 mb-2">Peak Investment Year</p>
                    <p className="text-sm text-green-800">2026: {formatCurrency(9727000)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHANGE ORDERS TAB */}
        {activeTab === 'changes' && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 text-sm">Change Order Tracking</h3>
                <p className="text-red-800 text-sm mt-1">
                  3 change orders approved in 2025 exceeding 20% threshold (all reported to NJDEP)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {changeOrders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{order.project}</h3>
                      <p className="text-sm text-slate-600 mb-3">Contractor: {order.contractor}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-xs uppercase tracking-wide text-slate-600 mb-1">Original Contract</p>
                        <p className="font-bold text-slate-900">{formatCurrency(order.original)}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-xs uppercase tracking-wide text-orange-600 mb-1">Change Order Amount</p>
                        <p className="font-bold text-orange-900">{formatCurrency(order.increase)}</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs uppercase tracking-wide text-red-600 mb-1">Increase %</p>
                        <p className="font-bold text-red-900">{order.percentage}%</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-xs uppercase tracking-wide text-green-600 mb-1">New Total</p>
                        <p className="font-bold text-green-900">
                          {formatCurrency(order.original + order.increase)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-slate-900 text-sm mb-2">Change Order Scope</h4>
                      <p className="text-sm text-slate-700">{order.scope}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <p>City of Orange</p>
              <p>29 North Day Street</p>
              <p>Orange, NJ 07050</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Key Contacts</h4>
              <p>Chief Financial Officer: Nile Clements</p>
              <p>Municipal Clerk: Trisha Scipio</p>
              <p>Phone: (973) 266-7000</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Data Source</h4>
              <p>2025 and 2026 Introduced Budgets</p>
              <p>PILOT Program Analysis</p>
              <p>Updated: May 19, 2026</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8">
            <p className="text-center">
              Municipal Budget Dashboard • City of Orange, Essex County, NJ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
