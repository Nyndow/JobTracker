from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    origins = [
        "http://localhost:5173",   # Vite dev
        "http://127.0.0.1:5173",
        "http://localhost:3000",   # CRA dev
        "http://127.0.0.1:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,        # or ["*"] for all
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
