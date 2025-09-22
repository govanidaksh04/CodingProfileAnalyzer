# CodingProfileAnalyzer 🔍💡

**CodingProfileAnalyzer** is a full-stack developer profiling tool that fetches data from GitHub and LeetCode profiles and analyzes it using LLMs to generate an AI-based score, strengths, weaknesses, and personalized improvement suggestions. Ideal for developers, students, and recruiters.

## 🚀 Live Demo
https://coding-profile-analyzer.vercel.app/

## ✨ Features

### 🔹 GitHub Integration
- Fetches public repository stats, stars, forks, followers
- Visualizes top programming languages (pie chart)
- Shows GitHub stats in responsive cards

### 🔹 LeetCode Integration
- Retrieves problems solved by difficulty level
- Visualizes topic-wise problem-solving stats (bar chart)
- Tracks active days, max streak, and contest performance

### 🤖 AI-Powered Insights
- LLM (Gemini/GPT-4) analyzes profile data
- Returns:
  - Two Strengths
  - Two Weaknesses
  - Score (out of 100)
  - Two Improvement Tips

### 📈 Visual Dashboard
- Pie chart for GitHub languages
- Bar charts for LeetCode topics
- Summary cards for all stats
- Score + improvement tips UI section

## 🔧 Tech Stack

| Layer       | Tech Used                         |
|-------------|-----------------------------------|
| Frontend    | React, recharts                   |
| Backend     | FastAPI                           |
| AI Analysis | Gemini API (or OpenAI GPT-4)      |
| Data APIs   | GitHub REST API, LeetCode GraphQL |

## 🔄 How It Works

1. User enters GitHub and LeetCode usernames
2. Backend fetches & aggregates data from:
   - GitHub API
   - LeetCode GraphQL
3. Backend sends structured data to Gemini LLM
4. LLM returns a score + insights
5. Frontend displays:
   - GitHub charts + metrics
   - LeetCode visual breakdown
   - AI-generated profile report

## 🛠️ Installation

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create a .env file
```bash
GITHUB_API_BASE=https://api.github.com
OPENAI_API_KEY=your_key_here  # or GEMINI_API_KEY
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 🔮 Future Scope
  👥 Profile comparison (e.g., Dev A vs Dev B)
  
  🏆 Global leaderboard based on AI score

  📤 Export profile summary as a PDF

  🧠 Add real-time AI chat with personalized career advice

## 📄 License
This project is licensed under the [MIT License](./LICENSE).

👤 Author
Daksh Govani

GitHub: @govanidaksh04
