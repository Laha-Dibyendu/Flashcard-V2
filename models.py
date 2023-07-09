from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
from sqlalchemy.sql import func
db = SQLAlchemy()

roles_users = db.Table('roles_users',
              db.Column('user_id', db.Integer(),db.ForeignKey('user.id')),
              db.Column('role_id', db.Integer(),db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    _tablename_ = 'user'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    f_name=db.Column(db.String(100),nullable=False)
    l_name=db.Column(db.String(100),nullable=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    active = db.Column(db.Boolean())
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=True)
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))


class Role(db.Model, RoleMixin):
    _tablename_ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

###--------------------------------------------------------------------------
class Deck(db.Model):
    _tablename_ = 'deck'
    id= db.Column(db.Integer, primary_key=True,autoincrement=True)
    title= db.Column(db.String(255))
    user_id=db.Column(db.Integer, db.ForeignKey("user.id"), nullable = False)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    score = db.Column(db.Integer, default=0)
    last_rev = db.Column(db.DateTime(timezone=True), default=func.now())
    dcard = db.relationship('Card', cascade='all, delete-orphan', backref='card')
    #description=db.Column(db.String(500))

class Card(db.Model):
    _tablename_ = 'card'
    card_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    front = db.Column(db.String(512), nullable = False)
    back = db.Column(db.String(512), nullable = False)
    score = db.Column(db.Integer, default = 0)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable = False)