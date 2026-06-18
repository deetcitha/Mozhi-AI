from fastapi import FastAPI, UploadFile, File, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import easyocr
import os
import shutil
from datetime import datetime
from bson import ObjectId

from database import ocr_collection
from auth import create_user, authenticate_user, create_access_token, verify_token

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- OCR ----------------
reader = easyocr.Reader(['en'], gpu=False)

CORRECTION_DICTIONARY = {
    "vanakkam": "வணக்கம்",
    "nanbargale": "நண்பர்களே",
    "nandri": "நன்றி",
    "tamil": "தமிழ்",
    "amma": "அம்மா",
    "appa": "அப்பா",
    "naan": "நான்",
    "nee": "நீ",
    "avan": "அவன்",
    "aval": "அவள்",
    "ungal": "உங்கள்",
    "kalloori": "கல்லூரி",
    "selgiren": "செல்கிறேன்",
    "indru": "இன்று",
    "kalai": "காலை",
    "maalai": "மாலை",
    "iravu": "இரவு",
    "nalam": "நலம்",
    "eppadi": "எப்படி",
     "annan": "அண்ணன்",
    "akka": "அக்கா",
    "thambi": "தம்பி",
    "thangai": "தங்கை",
    "kudumbam": "குடும்பம்",
    "palli": "பள்ளி",
    "aasiriyar": "ஆசிரியர்",
    "maanavan": "மாணவன்",
    "maanavi": "மாணவி",
    "padippu": "படிப்பு",
    "pareetchai": "தேர்வு",
     "engal": "எங்கள்",
    "namadu": "நமது",
    "ivar": "இவர்",
    "ivarhal": "இவர்கள்",
    "avar": "அவர்",
    "avarhal": "அவர்கள்",
    "netru": "நேற்று",
    "naalai": "நாளை",
    "ippodhu": "இப்போது",
    "eppozhudhum": "எப்பொழுதும்",
    "chennai": "சென்னை",
    "madurai": "மதுரை",
    "kovai": "கோவை",
    "trichy": "திருச்சி",
     "tamizh": "தமிழ்",
    "thamizh": "தமிழ்",
    "vanakam": "வணக்கம்",
    "nanri": "நன்றி",
    "kalluri": "கல்லூரி",
    "thannir": "தண்ணீர்",
    "sapadu": "சாப்பாடு",
    "padikiren": "படிக்கிறேன்",
    "varukiren": "வருகிறேன்",
    "pogiren": "போகிறேன்",
    "mukkiyam": "முக்கியம்",
    "udhavi": "உதவி"
}


def transliterate_tanglish(text):
    words = text.lower().split()
    return " ".join([CORRECTION_DICTIONARY.get(w, w) for w in words])

# ---------------- REGISTER ----------------
class RegisterRequest(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(data: RegisterRequest):
    return create_user(data.username, data.password)

# ---------------- LOGIN ----------------
class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(user: LoginRequest):

    db_user = authenticate_user(user.username, user.password)

    if not db_user:
        return {"message": "Invalid credentials"}

    token = create_access_token({"sub": user.username})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# ---------------- OCR IMAGE ----------------
@app.post("/ocr")
async def perform_ocr(
    file: UploadFile = File(...),
    authorization: str = Header(None)
):

    if not authorization:
        return {"message": "Missing token"}

    try:
        token = authorization.split(" ")[1]
    except:
        return {"message": "Invalid token"}

    user = verify_token(token)

    if not user:
        return {"message": "Invalid token"}

    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = reader.readtext(temp_path, detail=0)

    tanglish_text = " ".join(result).replace("\n", " ").strip()
    tanglish_text = " ".join(tanglish_text.split())

    tamil_text = transliterate_tanglish(tanglish_text)

    ocr_collection.insert_one({
        "username": user,
        "tanglish": tanglish_text,
        "tamil": tamil_text,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    os.remove(temp_path)

    return {
        "tanglish": tanglish_text,
        "tamil": tamil_text
    }

# ---------------- VOICE OCR ----------------
@app.post("/ocr-text")
def ocr_text(data: dict, authorization: str = Header(None)):

    if not authorization:
        return {"message": "Missing token"}

    try:
        token = authorization.split(" ")[1]
    except:
        return {"message": "Invalid token"}

    user = verify_token(token)

    if not user:
        return {"message": "Invalid token"}

    text = data["text"]

    tanglish_text = text.lower()
    tamil_text = transliterate_tanglish(tanglish_text)

    ocr_collection.insert_one({
        "username": user,
        "tanglish": tanglish_text,
        "tamil": tamil_text,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    return {
        "tanglish": tanglish_text,
        "tamil": tamil_text
    }

# ---------------- HISTORY ----------------
@app.get("/history")
def get_history(authorization: str = Header(None)):

    if not authorization:
        return {"message": "Missing token"}

    try:
        token = authorization.split(" ")[1]
    except:
        return {"message": "Invalid token"}

    user = verify_token(token)

    if not user:
        return {"message": "Invalid token"}

    data = list(ocr_collection.find(
        {"username": user},
        {"_id": 1, "tanglish": 1, "tamil": 1, "created_at": 1}
    ))

    for item in data:
        item["_id"] = str(item["_id"])

    return {"history": data}

# ---------------- DELETE SINGLE ----------------
@app.delete("/history/delete")
def delete_one(id: str, authorization: str = Header(None)):

    if not authorization:
        return {"message": "Missing token"}

    try:
        token = authorization.split(" ")[1]
    except:
        return {"message": "Invalid token"}

    user = verify_token(token)

    if not user:
        return {"message": "Invalid token"}

    ocr_collection.delete_one({
        "_id": ObjectId(id),
        "username": user
    })

    return {"message": "Deleted"}

# ---------------- CLEAR ALL ----------------
@app.delete("/history/clear")
def clear_history(authorization: str = Header(None)):

    if not authorization:
        return {"message": "Missing token"}

    try:
        token = authorization.split(" ")[1]
    except:
        return {"message": "Invalid token"}

    user = verify_token(token)

    if not user:
        return {"message": "Invalid token"}

    ocr_collection.delete_many({"username": user})

    return {"message": "All cleared"}