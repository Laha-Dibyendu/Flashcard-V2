import email
import json
from flask import current_app as app
# from turtle import title
from flask_login import login_required
from flask_restful import Api, Resource, abort, fields, marshal
from flask_security import Security, auth_required, current_user
from models import db, User as user_model, Deck as deck_model, Card as card_model


from flask import Flask, render_template, request, jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_security.utils import *
# from models import *
from flask_restful import Api, Resource, abort, marshal_with
from parser import *
from fields import *
# from app import app


api = Api()
# app = Flask(__name__)

# @app.route("/token", methods=["GET","POST"])

class Decks(Resource):

    @marshal_with(deck_resource_fields)
    def post(self,user_id=None,tt=None):
        # if not id:
            args = req_deck_args.parse_args()
            course_check = deck_model.query.filter_by(
                title=args["title"],user_id=current_user.id).first()
            if course_check:
                abort(409, message="Deck already exist...")
            course = deck_model(title=args['title'],
                            user_id=current_user.id)
            db.session.add(course)
            db.session.commit()
            return course, 201

    
    @marshal_with(deck_resource_fields)
    def get(self,user_id=None,tt=None  ):
        """[summary]

        Args:
            course_id (int): course id

        Returns:
            json serializable Course object with give course id.
        """
        # if title:
        # args = req_deck_args.parse_args()
        result = deck_model.query.filter_by(user_id=user_id).all()
        if result:
            print(result)
            Deckt={}
            # for i in range(len(result)):
            #     Deckt[i]=result[i]
            return result
            # return render_template('decksh.html',data=result) ,200
        else:
            # course = deck_model(title=title,
            #                 user_id=args[current_user.id])
            # db.session.add(course)
            # db.session.commit()
            # return course, 201
            abort(404, message="Course id does not exist...")
        # else:
        #     results = Course.query.all()
        #     return results

    def put(self, user_id,tt=None):
        """[summary]

        Args:
            course_id (int): Course Id

        Returns:
            Update the Course object according the request data. and returns empty string
        """
        
        args = req_deck_args.parse_args()
        results = deck_model.query.filter_by(title=tt,user_id=current_user.id)

        if results.first():
            abort(404, message="Course id does not exist...")

        # course code for the id
        # current_course_code = results.all().title


        # if the current course code is not same as the corse code with request check whether it matches with some other course code if yes abort the program
        # if args['title'] not in current_course_code:
        # course_check = deck_model.query.filter_by(
        #     title=args['title'],user_id=current_user.id).first()
        #     if course_check:
        #         abort(409, message="Deck name already exist...")
        print(args)
        results.update(args['title'])
        db.session.commit()
        print("nice")
        return '', 200
        # else:
        #     abort(400, message="course_id required...")

    def delete(self,user_id=None):

        if id:
            args = req_deck_args.parse_args()
            results = deck_model.query.filter_by(title=args["title"],user_id=user_id).first()
            if results:
                db.session.delete(results)
                db.session.commit()
            else:
                abort(404, message="Course id does not exist...")
            return '', 200
        else:
            abort(400, message="course_id required...")


class Users(Resource):

    @marshal_with(user_resource_fields)
    def post(self, id=None):
        if id:
            abort(400, messagge='student id not required')
        else:
            args = req_user_args.parse_args()
            student_check = user_model.query.filter_by(
                email=args['email']).first()
            if student_check:
                abort(409, message="Student email exist...")
            student = user_model(
                     email=args['email'], f_name=args['f_name'], l_name=args['l_name'], password=hash_password(args['password']))
            db.session.add(student)
            db.session.commit()
            return student, 201

  
    # @marshal_with(user_resource_fields)
    # @auth_required('auth_token')
    def get(self,id=None):#, id1=None
        # print(id1)
        # print(current_user.id)
        # if id==current_user.id:

            # args = req_user_args.parse_args()
            results = user_model.query.filter_by(id=id).first()
            b=deck_model.query.filter_by(user_id=id).all()
            print(b)
            # print(results)
            if results :
                return {"f_name":results.f_name,"l_name":results.l_name,"email":results.email,"password":results.password,"title":b[0].title}
            else:
                abort(404, message="Student id does not exist...")

            # c={"f_name":results.f_name,"l_name":results.l_name,"email":results.email,"password":results.password}
            # return marshal(user_model.query.filter_by(id=id),user_resource_fields)

            # print(current_user)
            # return marshal_with( user_resource_fields)
        # else:
        #     abort(400, message='You are not authorized to get the resource')




        # args = req_user_args.parse_args()
        # if id:
        #     results = user_model.query.filter_by(id=id).first()
        #     if results:
        #         return results, 200
        #     else:
        #         abort(404, message="Student id does not exist...")
        # else:
        #     results = user_model.query.filter_by(email=args['email'])
        #     return results, 200

    # @marshal_with(user_resource_fields)
    # def put(self, id=None):
    #     if id:
    #         args = req_user_args.parse_args()
    #         result = user_model.query.filter_by(id=id)

    #         # student's recorded roll number
    #         student_rn = result.first().roll_number

    #         # if student is not in the database abort the program with 404
    #         if not result.first():
    #             abort(404, message="Student does not exist...")

    #         # requsted roll number is not prerecorded roll number
    #         if args['roll_number'] != student_rn:
    #             student_check = Student.query.filter_by(
    #                 roll_number=args['roll_number']).first()
    #             # if roll number already exist
    #             if student_check:
    #                 abort(409, message="Student already exist...")

    #         result.update(args)
    #         db.session.commit()
    #         return result, 200
    #     else:
    #         abort(404, message="student id required")

    def delete(self, id=None):
        if id:
            results = user_model.query.filter_by(id=id).first()
            if results:
                db.session.delete(results)
                db.session.commit()
            else:
                abort(404, message="user id does not exist...")
            return "Student deleted", 200
        else:
            abort(404, message="student id required")


class Cards(Resource):
    @marshal_with(card_resource_fields)
    def get(self, deck_id):
        # if course_id:
        #     abort(400, message="course_id not required")
        if deck_id:
            results = card_model.query.filter_by(deck_id=deck_id).all()
            if results:
                return results, 200
            else:
                abort(404, message="Enrollment does not exist...")
        else:
            abort(400, message="Student Id required")

    @marshal_with(card_resource_fields)
    def post(self, deck_id):
        # if course_id:
        #     abort(404, message="Course id from url is not required")
        if deck_id:
            enroll_data = req_card_args.parse_args()
            # course_id = enroll_data['course_id']
            # enroll_check = Enrollments.query.filter((Enrollments.student_id == student_id) & (
            #     Enrollments.course_id == course_id)).first()
            # if enroll_check:
            #     abort(409, message="Enrollment already exist...")

            student = deck_model.query.get(deck_id)
            if student:
                enrollment = card_model(deck_id=deck_id,front=enroll_data['front'],back=enroll_data['back'])
                # student.enroll_student.append(enrollment)
                db.session.add(enrollment)
                db.session.commit()
                return enrollment, 201
        else:
            abort(404, message="student_id required")

    def delete(self, deck_id, card_id):
        if deck_id and card_id:
            enroll = card_model.query.filter((card_model.deck_id == deck_id) & (
                card_model.card_id == card_id)).first()
            if enroll:
                db.session.delete(enroll)
                db.session.commit()
                return "Enrollment deleted", 200
            else:
                abort(404, message="Enrollment does not exist...")
        else:
            abort(400, message="student_id and course_id required")


api.add_resource(Decks, "/api/courses/<int:user_id>/<string:tt>", "/api/courses/<int:user_id>")
api.add_resource(Users, "/api/student/<int:id>", "/api/student")
api.add_resource(Cards, "/api/student/<int:user_id>/course",
                 "/api/student/<int:user_id>/course/<int:deck_id>")


































































    #     @marshal_with(user_resourse_fields)
    #     def POST(self):
    #         print("hi podt")
    #         if id:
    #             abort(400, messagge='user id not required')
    #         else:
    #             args = req_user_args.parse_args()
    #             user_check = users_model.query.filter_by(
    #                 email=args['email']).first()
    #             if user_check:
    #                 if user_check.password==hash_password(args['password']):
    #                     print("Hurraaaaaaaaaaa")
    #                     return User.get(self)
    #                 abort(409, message="User already exist...")
    #             user = users_model(
    #                 email=args['email'], f_name=args['f_name'], l_name=args['l_name'], password=hash_password(args['password']))
    #             db.session.add(user)
    #             db.session.commit()

    #             # email = request.json.get("email", None)
    #             # password = request.json.get("password", None)
    #             # Query your database for username and password
    #             user = users_model.query.filter_by(email=args['email']).first()
    #             access_token = create_access_token(identity=user.id)
    #             print(access_token)
    #             return jsonify({"token": access_token}), 201
    #             # return user, 201

    #     @jwt_required()
    #     def get(self):
    #         print("hi grt")
    #         current_user_id = get_jwt_identity()

    #         user = users_model.query.get(current_user.id)
    #            # return jsonify({"id": user.id, "f_name": user.f_name }), 200
    #         print(user)
    #         if user:
    #                 return jsonify({"f_name": user.f_name,"email": user.email})# marshal(user, user_resourse_fields), 200
    #         else:
    #                 abort(404, message="User email does not exist...")

    # # class User(Resource):
    # #     @auth_required('token')
    # #     def get(self, id=None):

    # #         if id==current_user.id:
    # #             return marshal(current_user, user_resourse_fields)
    # #         else:
    # #             abort(400, message='You are not authorized to get the resource')

    #  # api.add_resource(User,'/api/dashboard/1','/api/User')
    # api.add_resource(User,"/api/user","/api/user")
    # # api.add_resource(User, "/api/user/protected", "/api/user/<int:id>")
