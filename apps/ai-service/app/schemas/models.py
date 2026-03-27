from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ExerciseGradingRequest(BaseModel):
    question: str
    standard_answer: str
    user_answer: str
    user_level: Optional[str] = None

class PronunciationRequest(BaseModel):
    target_text: str
    audio_url: Optional[str] = None
    mock_audio_id: Optional[str] = None

class TutorReplyRequest(BaseModel):
    scenario: str
    message: str
    state: Dict[str, Any] = {}

class TutorReportRequest(BaseModel):
    session_id: str
    transcript: List[Dict[str, str]]

class ExpertForumReplyRequest(BaseModel):
    post_content: str
    tags: List[str]
