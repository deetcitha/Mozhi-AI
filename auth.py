from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from database import users_collection

# ---------------- PASSWORD ----------------
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# ---------------- JWT CONFIG ----------------
SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# ---------------- PASSWORD FUNCTIONS ----------------
def hash_password(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# ---------------- USER REGISTER ----------------
def create_user(username, password):

    existing_user = users_collection.find_one(
        {"username": username}
    )

    if existing_user:
        return False

    users_collection.insert_one({
        "username": username,
        "password": hash_password(password)
    })

    return True


# ---------------- LOGIN AUTH ----------------
def authenticate_user(username, password):

    user = users_collection.find_one(
        {"username": username}
    )

    if not user:
        return False

    if not verify_password(
        password,
        user["password"]
    ):
        return False

    return user


# ---------------- CREATE JWT TOKEN ----------------
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt


# ---------------- VERIFY JWT TOKEN ----------------
def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # 🔥 FIXED
        username = payload.get("sub")

        if username is None:
            return None

        return username

    except JWTError:
        return None