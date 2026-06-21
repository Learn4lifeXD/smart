import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

app = FastAPI(title="Smart Dossier - AI Orchestrator", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummarizeRequest(BaseModel):
    document_text: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-orchestrator"}

@app.post("/api/v1/ai/summarize")
def summarize_dossier(request: SummarizeRequest):
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY environment variable is not set")

    try:
        # Using Gemini 2.5 Flash for fast summarization and orchestration
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key)
        
        prompt = f"Please provide a concise summary of the following property document, highlighting the main actions required:\n\n{request.document_text}"
        response = llm.invoke([HumanMessage(content=prompt)])
        
        return {"summary": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
