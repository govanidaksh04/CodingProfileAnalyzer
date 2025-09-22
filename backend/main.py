from fastapi import FastAPI
from routes.userProfile import router as userProfileRouter
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "https://coding-profile-analyzer.vercel.app"
]

app = FastAPI(title="CodingProfileAnalyzer Insight Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Only allow specific origins
    allow_credentials=True,
    allow_methods=["*"],            # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allow all headers
)

app.include_router(userProfileRouter)

@app.get("/health")
def health():
    return {"status":"ok"}