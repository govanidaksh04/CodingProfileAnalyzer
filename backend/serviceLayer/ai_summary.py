import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re
load_dotenv()

def clean_ai_json(ai_text: str):
    # Remove markdown code fences ```json ... ```
    cleaned = re.sub(r"```json|```", "", ai_text).strip()
    
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # If parsing fails, return raw text
        return {"raw_response": ai_text}

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Choose a Gemini model
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

def generate_ai_summary(gh_data: dict, lc_data: dict):
    gh_username = gh_data["username"]
    gh_repos = gh_data["public_repos"]
    gh_stars = gh_data["total_stars"]
    gh_forks = gh_data["total_forks"]
    gh_languages = ", ".join([f"{k} ({v} repos)" for k, v in gh_data["top_languages"].items()])

    lc_username = lc_data["username"]
    lc_solved_and_submissions = lc_data["profile"]["submitStatsGlobal"]["acSubmissionNum"]
    lc_active_days = lc_data["activity"]["activeDays"]
    lc_max_streak = lc_data["activity"]["maxStreak"]
    lc_contest_rating = lc_data["contest"]["rating"]
    lc_contest_count = lc_data["contest"]["attendedContests"]

    prompt = f"""
    You are an experienced software engineering recruiter and AI analyst evaluating the technical profile of a fresher aspiring for an SDE (Software Development Engineer) role.

    The candidate has provided their GitHub and LeetCode profiles for evaluation. Analyze both and generate a fair and constructive assessment.

    --------------------
    GITHUB PROFILE:
    - Username: {gh_username}
    - Public repositories: {gh_repos}
    - Total stars: {gh_stars}
    - Total forks: {gh_forks}
    - Top languages (with repo count): {gh_languages}

    LEETCODE PROFILE:
    - Username: {lc_username}
    - Easy problems solved: {lc_solved_and_submissions[1]["count"]}
    - Medium problems solved : {lc_solved_and_submissions[2]["count"]}
    - Hard problems solved : {lc_solved_and_submissions[3]["count"]}
    - Active days : {lc_active_days}
    - Max Streak : {lc_max_streak}
    - Contest rating: {lc_contest_rating}
    - Contests attended: {lc_contest_count}
    --------------------

    🎯 TASK:
    Based on both profiles, evaluate the candidate's current standing as a fresher for an SDE role and respond ONLY with a well-structured JSON in the following format:

    {{
        "score": "Give a number out of 100 evaluating the overall SDE-readiness based on GitHub and LeetCode data.",
        "strengths": [
            "Highlight two specific strengths across GitHub and LeetCode"
        ],
        "weaknesses": [
            "Mention two key weaknesses or areas for improvement"
        ],
        "improvement_tips": [
            "Give at least 2 actionable tips to improve the GitHub and/or LeetCode profile"
        ]
    }}
    DO NOT add extra commentary outside the JSON. Respond ONLY with valid JSON.
    """

    # Call Gemini
    response = gemini_model.generate_content(prompt)


    ai_text = response.text  # Gemini returns plain text
    parsed_json = clean_ai_json(ai_text)

    return parsed_json
