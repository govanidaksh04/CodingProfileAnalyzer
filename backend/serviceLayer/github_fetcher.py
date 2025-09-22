import requests
import os
from fastapi import HTTPException

GITHUB_API_BASE = os.getenv("GITHUB_API_BASE", "https://api.github.com")

def fetch_github_profile(username: str):
    try:
        user_url = f"{GITHUB_API_BASE}/users/{username}"
        repos_url = f"{GITHUB_API_BASE}/users/{username}/repos?per_page=100"

        user_res = requests.get(user_url, timeout=5)
        
        repos_res = requests.get(repos_url, timeout=5)
        
        if user_res.status_code == 403:
            raise HTTPException(status_code=403, detail="Github API rate limit exceeded. Try again later")

        if user_res.status_code == 404:
            raise HTTPException(status_code=404, detail="Invalid Github User Id")

        if user_res.status_code != 200:
            raise HTTPException(status_code=500, detail="Internal Server Error")

        user_data = user_res.json()

        repos_data = repos_res.json() if repos_res.status_code == 200 else []

        total_stars = 0
        total_forks = 0
        language_count = {}

        for repo in repos_data:
            total_stars += repo.get("stargazers_count", 0)
            total_forks += repo.get("forks_count", 0)
            lang = repo.get("language")
            if lang:
                language_count[lang] = language_count.get(lang, 0) + 1

        profile_data = {
            "username": username,
            "public_repos": user_data.get("public_repos", 0),
            "followers": user_data.get("followers", 0),
            "total_stars": total_stars,
            "total_forks": total_forks,
            "top_languages": language_count
        }

        return profile_data
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")

