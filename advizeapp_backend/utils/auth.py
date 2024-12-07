from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

# Κλειδί για το JWT
SECRET_KEY = "your_secret_key"  # Αλλαγή με ασφαλές, αποθηκευμένο κλειδί
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Διαχείριση κρυπτογράφησης
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Επαληθεύει αν το απλό password ταιριάζει με το hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Δημιουργεί hash για ένα password χρησιμοποιώντας bcrypt.
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Δημιουργεί ένα JWT για χρήση σε authentication.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    """
    Αποκωδικοποιεί το JWT και επιστρέφει τα δεδομένα αν είναι έγκυρο.
    """
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token if decoded_token.get("exp") >= datetime.utcnow().timestamp() else None
    except JWTError:
        return None
