from pymongo import MongoClient

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017")

# Database
db = client["tamiloli_ai"]

# Collections
users_collection = db["users"]
ocr_collection = db["ocr_history"]
favorites_collection = db["favorites"]
puzzle_collection = db["puzzle_scores"]

print("✅ MongoDB Connected Successfully!")