import React from 'react';
import './Analysis.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Users, Star, GitFork, FolderGit2 } from "lucide-react";
import CountUp from "react-countup";

const Analysis = ({ data }) => {
  const colors = ['#4E79A7', '#F28E2B', '#59A14F', '#B07AA1'];

  const pieData = Object.entries(data.github_data.top_languages).map(([key, value]) => ({
    language: key,
    repos: value
  }));

  const items = [
    { label: "Public Repos", value: data.github_data.public_repos, icon: <FolderGit2 /> },
    { label: "Followers", value: data.github_data.followers, icon: <Users /> },
    { label: "Total Stars", value: data.github_data.total_stars, icon: <Star /> },
    { label: "Total Forks", value: data.github_data.total_forks, icon: <GitFork /> },
  ];

  return (
    <div className="analysis-card">
      <div className="analysis-header">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub Logo" />
        <span>GitHub Stats</span>
      </div>

      <div className="analysis-main">
        {/* Left: Pie */}
        <div className="pie-wrap">
          <PieChart width={240} height={240}>
            <Pie data={pieData} dataKey="repos" nameKey="language" outerRadius={90}>
              {pieData.map((entry, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Right: 2x2 grid */}
        <div className="stats-grid">
          {items.map((item, idx) => (
            <div className="stat-card" key={idx}>
              <div>
                <p className="stat-label">{item.label}</p>
                <p className="stat-value">
                  <CountUp end={item.value} duration={1.5} separator="," />
                </p>
              </div>
              <div className="stat-icon">{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis;