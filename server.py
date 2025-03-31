from fastapi import FastAPI, WebSocket
import uvicorn
import json
import random
from datetime import datetime
import asyncio

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected")

    try:
        while True:
            now = datetime.utcnow()
            formatted_date = now.strftime("%Y-%m-%d")

            stock_data = {
                "Meta Data": {
                    "1. Information": "Real-Time Prices",
                    "2. Symbol": "NDAQ",
                    "3. Last Refreshed": formatted_date,
                    "4. Time Zone": "US/Eastern"
                },
                "Time Series (Daily)": {
                    formatted_date: {
                        "1. open": round(75 + random.uniform(0, 2), 4),
                        "2. high": round(77 + random.uniform(0, 2), 4),
                        "3. low": round(74 + random.uniform(0, 2), 4),
                        "4. close": round(76 + random.uniform(0, 2), 4),
                        "5. volume": random.randint(1000000, 3000000)
                    }
                }
            }

            await websocket.send_text(json.dumps(stock_data))
            await asyncio.sleep(0.1)  # Send updates every 100ms

    except Exception as e:
        print(f"Client disconnected: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
