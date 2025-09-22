import React from "react";
import "./Analysis.css";
import {
  PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList
} from "recharts";
import { Users, Star, GitFork, FolderGit2, Award, Trophy, Brain, Globe, Percent } from "lucide-react";
import CountUp from "react-countup";

const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p><strong>Topic:</strong> {data.tagName}</p>
        <p><strong>Problems Solved:</strong> {data.problemsSolved}</p>
      </div>
    );
  }
  return null;
};

const Analysis = ({ data }) => {
  const githubColors = ["#4E79A7", "#F28E2B", "#59A14F", "#B07AA1"];
  const leetColors = { Easy: "#4CAF50", Medium: "#FFC107", Hard: "#F44336" };

  // GitHub top languages
  const pieData = Object.entries(data.github_data.top_languages).map(([key, value]) => ({
    language: key,
    repos: value
  }));

  // LeetCode difficulty pie
  const leetPie = data.leetcode_data.profile.submitStatsGlobal.acSubmissionNum
    .filter(d => d.difficulty !== "All")
    .map(d => ({ name: d.difficulty, value: d.count }));

  // Topic-wise bars
  const beginner = data.leetcode_data.topics.fundamental;
  const intermediate = data.leetcode_data.topics.intermediate;
  const advanced = data.leetcode_data.topics.advanced;

  // GitHub stats
  const githubStats = [
    { label: "Public Repos", value: data.github_data.public_repos, icon: <FolderGit2 /> },
    { label: "Followers", value: data.github_data.followers, icon: <Users /> },
    { label: "Total Stars", value: data.github_data.total_stars, icon: <Star /> },
    { label: "Total Forks", value: data.github_data.total_forks, icon: <GitFork /> },
  ];

  // Contest
  const contestStats = [
    { label: "Contest Rating", value: Math.round(data.leetcode_data.contest.rating), icon: <Award /> },
    { label: "Contests Attended", value: data.leetcode_data.contest.attendedContests, icon: <Trophy /> },
    { label: "Global Ranking", value: data.leetcode_data.contest.globalRanking, icon: <Globe />},
    { label: "Top Percentage", value: data.leetcode_data.contest.topPercentage, icon: <Percent />},
  ];

  // AI Stats
  const aiStats = [
    { label: "AI Score", value: data.ai_summary.score, icon: <Brain /> },
  ];

  return (
    <>
      <div className="analysis-card">
        {/* GitHub Section */}
        <div className="analysis-header">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub Logo" />
          <span>GitHub Stats</span>
        </div>
        <div className="analysis-main">
          <div className="pie-wrap">
            <PieChart width={240} height={240}>
              <Pie data={pieData} dataKey="repos" nameKey="language" outerRadius={90}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={githubColors[i % githubColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className="stats-grid">
            {githubStats.map((item, idx) => (
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

      <div className="analysis-card">
        {/* LeetCode Section */}
        <div className="analysis-header">
          <img src="https://leetcode.com/static/images/LeetCode_logo.png" alt="LeetCode Logo" width="20" />
          <span>LeetCode Stats</span>
        </div>
        <div className="analysis-main">
          <div className="pie-wrap">
            <PieChart width={240} height={240}>
              <Pie
                data={leetPie}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                // label={({ name }) => name}
                // labelLine={false}
              >
                {leetPie.map((entry, i) => (
                  <Cell key={i} fill={leetColors[entry.name]} />
                ))}
                <LabelList dataKey="name" position="inside" style={{ fill: "white", fontWeight: "600" }} />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="stats-grid">
            {contestStats.map((item, idx) => (
              <div className="stat-card" key={idx}>
                <div>
                  <p className="stat-label">{item.label}</p>
                  <p className="stat-value"><CountUp end={item.value} duration={1.5} decimals={2}/></p>
                </div>
                <div className="stat-icon">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Topic-wise Bar Charts */}
        <div className="analysis-header"><span>Topic-wise Progress</span></div>
        <div className="bar-charts">
          <h4>Beginner</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={beginner}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tagName" hide />
              <YAxis />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="problemsSolved" fill="#F28E2B" />
            </BarChart>
          </ResponsiveContainer>

          <h4>Intermediate</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={intermediate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tagName" hide/>
              <YAxis />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="problemsSolved" fill="#4E79A7" />
            </BarChart>
          </ResponsiveContainer>

          <h4>Advanced</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={advanced}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tagName" hide/>
              <YAxis />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="problemsSolved" fill="#59A14F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="analysis-card">
        {/* AI Insights */}
        <div className="analysis-header"><span>AI Insights</span></div>
        <div className="stats-grid">
          {aiStats.map((item, idx) => (
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
        <div className="text-cards">
          <div className="summary-card">
            <h4>Strengths</h4>
            <ul>{data.ai_summary.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div className="summary-card">
            <h4>Weaknesses</h4>
            <ul>{data.ai_summary.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
          </div>
          <div className="summary-card">
            <h4>Improvement Tips</h4>
            <ul>{data.ai_summary.improvement_tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;