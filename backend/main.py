from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# from fastapi.middleware.cors import CORSMiddleware
from controller.sign_up_controller import router as sign_up_router
from controller.sign_in_controller import router as sign_in_router
from controller.house_listing_controller import router as house_listing_router

app = FastAPI()

origins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://localhost:3000",
  "https://127.0.0.1:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,  # List of allowed origins
  allow_credentials=True,
  allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
  allow_headers=["*"],  # Allow all headers
)

app.include_router(sign_up_router, prefix="/auth", tags=["auth"])
app.include_router(sign_in_router, prefix="/auth", tags=["auth"])
app.include_router(house_listing_router, prefix="/houses", tags=["houses"])


@app.get("/")
async def root():
  return {"Hello": "Welcome to the Tenant Management System API"}


if __name__ == "__main__":
  import uvicorn

  uvicorn.run(app, host="0.0.0.0", port=8000)
