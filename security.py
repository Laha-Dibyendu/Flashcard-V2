from flask_login import user_accessed
from flask_security import Security, SQLAlchemyUserDatastore
from models import db, User, Role,Deck,Card

user_datastore = SQLAlchemyUserDatastore(db, User, Role)

