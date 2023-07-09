import resource
# from flask import Flask, render_template
# from api.resource import User, api
# from models import *
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from security import user_datastore
from flask_security.utils import hash_password

from flask import Flask, render_template,request, jsonify 
from models import db,User as users_model, Deck as deck_model, Card as card_model

from api.resource import *


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



app = Flask(__name__)


app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = "thisissecret"
app.config['SECURITY_PASSWORD_SALT'] = 'salt'
app.config['WTF_CSRF_ENABLED'] = False
app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER'] = "Authentication-Token"
app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'





db.init_app(app)
api.init_app(app)
sec = Security(app, user_datastore)
# sec.init_app(app, deck_datastore)
# sec.init_app(app, card_datastore)




# @app.before_first_request
# def create_db():
#     db.create_all()
#     if not user_datastore.find_user(email="narendra@gmail.com"):
#         user_datastore.create_user(f_name="narendra",l_name="jou", email="narendra@gmail.com", password=hash_password("1234"))
#         user_datastore.create_user(f_name = "endra",l_name="joud", email="endra@gmail.com", password=hash_password("1234"))
#         db.session.commit()

#     # if not user_datastore.find_role('admin'):
#     #     user_datastore.create_role(
#     #         name='Admin', description='Admin Related Role')

#         db.session.commit()
#     else:
#         pass

# @app.before_first_request



@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response









# @app.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     # Query your database for username and password
#     user = users_model.query.filter_by(email=email, password=hash_password(password)).first()
#     if user is None:
#         # the user was not found on the database
#         return jsonify({"msg": "Bad username or password"}), 401
    
#     # create a new token with the user id inside
#     access_token = create_access_token(identity=user.id)
#     return jsonify({ "token": access_token, "user_id": user.id })



# @app.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     # Access the identity of the current user with get_jwt_identity
#     current_user_id = get_jwt_identity()
    
#     # return jsonify(logged_in_as=current_user), 200
    
#     user = users_model.query.get(current_user_id)
#     return jsonify({"id": user.id, "f_name": user.f_name }), 200







@app.route('/')
def home():
    return render_template('index.html')




with app.app_context():
    if __name__ == "__main__":
        
        app.run(port="8080", debug=True)
    
# def test_connection(self):
#     with app.app_context():