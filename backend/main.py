import os
import signal
from typing import Union

import uvicorn
from fastapi import FastAPI, Response

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/search/{query}")
def search(query: int):
    # TODO: Add Vector DB Search query
    return {"query": query}


@app.get("/shutdown")
def shutdown():
    os.kill(os.getpid(), signal.SIGTERM)
    return Response(status_code=200, content="Server shutting down...")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=49002, log_level="info")
