import requests
import os
from fastapi import HTTPException
from serviceLayer.response import error_response, success_response

GITHUB_API_BASE = os.getenv("GITHUB_API_BASE", "https://api.github.com")

def fetch_github_profile(username: str):
    # Fetch basic profile
    try:
        user_url = f"{GITHUB_API_BASE}/users/{username}"
        repos_url = f"{GITHUB_API_BASE}/users/{username}/repos?per_page=100"

        user_res = requests.get(user_url, timeout=5)
        repos_res = requests.get(repos_url, timeout=5)
        
        if user_res.status_code == 404:
            return error_response(404, "User Not Found", "GitHub user not found")
        
        if user_res.status_code == 403:
            return error_response(403, "Forbidden", "GitHub API rate limit exceeded. Try again later.")

        if user_res.status_code != 200:
            return error_response(500, "Internal Server Error", f"GitHub API error: {user_res.status_code}")

        user_data = user_res.json()
        repos_data = repos_res.json() if repos_res.status_code == 200 else []

        if not repos_data:
            return error_response(404, "Repositories Not Found", "No repositories found for this user.")
        
        total_stars = 0
        total_forks = 0
        language_count = {}

        for repo in repos_data:
            total_stars += repo.get("stargazers_count", 0)
            total_forks += repo.get("forks_count", 0)
            lang = repo.get("language")
            if lang:
                language_count[lang] = language_count.get(lang, 0) + 1

        # Prepare response
        profile_data = {
            "username": username,
            "public_repos": user_data.get("public_repos", 0),
            "followers": user_data.get("followers", 0),
            "total_stars": total_stars,
            "total_forks": total_forks,
            "top_languages": language_count
        }

        return profile_data
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid User")

