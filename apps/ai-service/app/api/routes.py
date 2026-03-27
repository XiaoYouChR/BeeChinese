from fastapi import APIRouter
from app.schemas.models import ExerciseGradingRequest, PronunciationRequest, TutorReplyRequest, TutorReportRequest, ExpertForumReplyRequest
from app.services.provider_factory import get_provider

router = APIRouter(prefix='/ai')

@router.post('/grading/exercise')
def grade_exercise(payload: ExerciseGradingRequest):
    provider = get_provider()
    return {'success': True, 'data': provider.grade_exercise(payload.question, payload.standard_answer, payload.user_answer, payload.user_level)}

@router.post('/pronunciation/evaluate')
def pronunciation_evaluate(payload: PronunciationRequest):
    return {'success': True, 'data': {
        'overall_score': 82,
        'word_errors': ['哪里: 声调偏平'],
        'tone_issues': ['第三声转第二声不明显'],
        'fluency_feedback': '停顿稍多，建议连读训练。',
        'suggestion': f'请重点跟读：{payload.target_text}'
    }}

@router.post('/tutor/reply')
def tutor_reply(payload: TutorReplyRequest):
    provider = get_provider()
    return {'success': True, 'data': provider.tutor_reply(payload.scenario, payload.message, payload.state)}

@router.post('/tutor/report')
def tutor_report(payload: TutorReportRequest):
    provider = get_provider()
    return {'success': True, 'data': provider.tutor_report(payload.session_id, payload.transcript)}

@router.post('/expert/forum-reply')
def forum_reply(payload: ExpertForumReplyRequest):
    advice = []
    for tag in payload.tags:
        if tag in ['文化隐含义', '地道表达', '跨文化语用']:
            advice.append({'tag': tag, 'advice': f'{tag}建议：优先使用语境化表达，避免逐词直译。'})
    return {'success': True, 'data': {'structured_reply': advice, 'provider': 'template-rule-mock'}}
