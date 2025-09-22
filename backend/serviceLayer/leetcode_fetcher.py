import requests
import json
from datetime import datetime, timedelta
from fastapi import HTTPException

# ------------------------- Helper Functions -------------------------

def get_graphql_data(query: str, variables: dict):
    url = "https://leetcode.com/graphql"
    headers = {
        "Content-Type": "application/json",
        "Referer": f"https://leetcode.com",
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.post(url, json={"query": query, "variables": variables}, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {}

# ------------------------- Part 1: Basic Profile -------------------------

def fetch_basic_profile(username: str):
    query = """
    query getUserProfile($username: String!) {
        matchedUser(username: $username) {
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
        }
    }
    """
    data = get_graphql_data(query, {"username": username})
    user = data.get("data", {}).get("matchedUser", None)
    if not user:
        return None
    return user

# ------------------------- Part 2: Topic-Wise Count -------------------------

def fetch_topic_tags(username: str):
    query = """
    query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
            tagProblemCounts {
                advanced {
                    tagName
                    problemsSolved
                }
                intermediate {
                    tagName
                    problemsSolved
                }
                fundamental {
                    tagName
                    problemsSolved
                }
            }
        }
    }
    """
    data = get_graphql_data(query, {"username": username})
    tag_counts = data["data"]["matchedUser"]["tagProblemCounts"]
    return tag_counts

# ------------------------- Part 3: Activity Calendar -------------------------

def fetch_submission_calendar(username: str):
    query = """
    query userCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
    """
    data = get_graphql_data(query, {"username": username})
    calendar_info = data["data"]["matchedUser"]["userCalendar"]
    submission_calendar = json.loads(calendar_info["submissionCalendar"])
    
    active_days = set(datetime.fromtimestamp(int(ts)).date() for ts in submission_calendar)
    
    active_days = {day for day in active_days if day.year == 2025}

    active_days_list = list(active_days)

    active_days_list.sort()

    max_streak = current_streak = 1
    for i in range(1, len(active_days_list)):
        if active_days_list[i] == active_days_list[i - 1] + timedelta(days=1):
            current_streak += 1
        else:
            max_streak = max(max_streak, current_streak)
            current_streak = 1
    max_streak = max(max_streak, current_streak)
    
    return {
        "activeDays" : len(active_days),
        "maxStreak" : max_streak
    }

# ------------------------- Part 4: Contest Details -------------------------
def fetch_contest_data(username: str):
    query = """
    query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
        }
    }
    """
    data = get_graphql_data(query, {"username": username})
    if not data:
        return None

    user_data = data["data"]
    if not user_data:
        return None

    ranking = user_data.get("userContestRanking", {})
    
    contest_data = {
        "rating": ranking.get("rating"),
        "globalRanking": ranking.get("globalRanking"),
        "topPercentage": ranking.get("topPercentage"),
        "attendedContests": ranking.get("attendedContestsCount")
    }

    return contest_data

def fetch_leetcode_profile(username : str):
    profile = fetch_basic_profile(username)
    if profile is None:
        raise HTTPException(status_code = 404, detail = "Invalid LeetCode user id")

    topics = fetch_topic_tags(username) or {}
    activity = fetch_submission_calendar(username) or {}
    contest_details = fetch_contest_data(username) or {}

    return {
        "username": username,
        "profile": profile,
        "topics": topics,
        "activity": activity,
        "contest": contest_details
    }