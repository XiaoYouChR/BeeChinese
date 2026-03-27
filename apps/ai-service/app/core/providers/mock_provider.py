from typing import List, Dict, Any

class MockProvider:
    def grade_exercise(self, question: str, standard_answer: str, user_answer: str, user_level: str | None) -> Dict[str, Any]:
        return {
            'score': 85,
            'grammar_feedback': 'Grammar is clear with minor tense inconsistency.',
            'vocabulary_feedback': 'Good basic vocabulary. Add polite variants.',
            'naturalness_feedback': 'Mostly natural, but sentence order can improve.',
            'rewrite_suggestion': f'可以这样说：{standard_answer}',
            'encouragement': 'Great work! Keep practicing daily.'
        }

    def tutor_reply(self, scenario: str, message: str, state: Dict[str, Any]) -> Dict[str, Any]:
        return {
            'reply': f'[{scenario}] 助教回复：我理解你的意思。你可以说：\"{message}\" 的更礼貌版本。',
            'next_prompt': '请再尝试用一句更完整的话表达。',
            'state': {**state, 'turns': state.get('turns', 0) + 1}
        }

    def tutor_report(self, session_id: str, transcript: List[Dict[str, str]]) -> Dict[str, Any]:
        return {
            'session_id': session_id,
            'overall_score': 87,
            'strengths': ['沟通意图清晰', '关键词使用正确'],
            'weaknesses': ['语序偶尔不自然', '礼貌表达可加强'],
            'next_steps': ['复习场景句型', '跟读 5 分钟']
        }
