from fastapi import APIRouter, HTTPException
from serviceLayer.github_fetcher import fetch_github_profile 
from serviceLayer.ai_summary import generate_ai_summary  # adjust import
from serviceLayer.leetcode_fetcher import fetch_leetcode_profile
from pydantic import BaseModel

router = APIRouter()

class UserProfile(BaseModel):
    github: str
    leetcode: str

@router.post("/analyze")
def analyze_coding_profile(profile: UserProfile):
    # 1. Fetch GitHub and LeetCode data
    try:
        gh_data = fetch_github_profile(profile.github)
        lc_data = fetch_leetcode_profile(profile.leetcode)
    except HTTPException as e:
        return {
            "status_code" : 404,
            "content" : {
                "success": False,
                "data": None,
                "error": {
                    "type": "User Not Found",
                    "message": "Invalid Profile Id"
                }
            }
        }

    # 2. Generate AI summary
    ai_data = generate_ai_summary(gh_data, lc_data)

    return {
        "success": True,
        "data": {
            "github_data": gh_data,
            "leetcode_data": lc_data,
            "ai_summary": ai_data
        },
        "error": None
    }

