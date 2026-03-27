from app.api.routes import router
from fastapi import FastAPI

app = FastAPI(title='BeeChinese AI Service', version='0.1.0')
app.include_router(router)

@app.get('/health')
def health():
    return {'success': True, 'message': 'ok'}
