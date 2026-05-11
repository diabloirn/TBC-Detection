import io
import os
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 


MODEL_PATH = "model/efficientnet_tb.h5"
model = tf.keras.models.load_model(MODEL_PATH)


def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    return np.expand_dims(img, axis=0)

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    patient_name: str = Form(""),
    notes: str = Form("")
):
    image_bytes = await file.read()
    img = preprocess_image(image_bytes)
    pred = model.predict(img)[0][0]
    label = "Tuberculosis" if pred > 0.5 else "Normal"
    confidence = float(pred) if pred > 0.5 else 1 - float(pred)

    os.makedirs("uploads", exist_ok=True)
    filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
    filepath = os.path.join("uploads", filename)
    with open(filepath, "wb") as f:
        f.write(image_bytes)

    return {
        "label": label,
        "confidence": confidence,
        "filename": filename
    }


@app.get("/uploads/{filename}")
def get_uploaded_image(filename: str):
    import os
    from fastapi.responses import FileResponse
    file_path = os.path.join("uploads", filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        return {"error": "File tidak ditemukan"}