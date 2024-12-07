from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from advizeapp_backend.utils.auth import SECRET_KEY, ALGORITHM
from sqlalchemy.orm import Session
from advizeapp_backend.database import get_db
from advizeapp_backend.models import User
from fastapi.security import OAuth2PasswordBearer

# URL που χρησιμοποιεί το endpoint login
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login/")

def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    """
    Επαληθεύει και επιστρέφει τον τρέχοντα χρήστη από το token.
    """
    try:
        # Αποκωδικοποίηση του JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")  # To "sub" θεωρούμε ότι περιέχει το email
        if not email:
            raise HTTPException(
                status_code=401, 
                detail="Invalid token: Missing 'sub' claim"
            )
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Αναζήτηση του χρήστη στη βάση δεδομένων
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=401, 
            detail="User associated with this token not found"
        )
    return user

def get_current_active_user(
    current_user: User = Depends(get_current_user)
):
    """
    Ελέγχει αν ο χρήστης είναι ενεργός.
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=403, 
            detail="Inactive user"
        )
    return current_user
