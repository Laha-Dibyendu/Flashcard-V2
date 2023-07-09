from flask_restful import Api, Resource, abort, fields

user_resource_fields = {
    "f_name": fields.String,
    "l_name": fields.String,
    "email": fields.String,
    "password": fields.String,
}

deck_resource_fields = {
    "title": fields.String,
    "score": fields.Integer,
    "last_rev": fields.DateTime,
    "user_id": fields.Integer,
    "deck_id": fields.Integer,
}

card_resource_fields = {
    "front": fields.String,
    "backe": fields.String,
    "score": fields.Integer,
    "deck_id": fields.Integer,
    "card_id":fields.Integer,
}