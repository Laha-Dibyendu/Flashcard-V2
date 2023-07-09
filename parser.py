from flask_restful import reqparse

# parser for user request
req_user_args = reqparse.RequestParser(bundle_errors=True)
req_user_args.add_argument(
    "f_name", type=str,
    help="First Name is required and shoud be a string", required=True)
req_user_args.add_argument(
    "l_name", type=str,
    help="Last name is required and shoud be a string", required=True)
req_user_args.add_argument(
    "email", type=str,
    help="email is required and shoud be a string", required=True)
req_user_args.add_argument(
    "password", type=str)



# parser for course request
req_deck_args = reqparse.RequestParser(bundle_errors=True)
req_deck_args.add_argument(
    "title", type=str,
    help="Deck title is required and shoud be a string",
    required=True)
# req_deck_args.add_argument(
#     "course_code", type=str,
#     help="course Code is required and shoud be a string",
#     required=True)
# req_deck_args.add_argument("course_description", type=str)

# parsers for enrolllment request
req_card_args = reqparse.RequestParser(bundle_errors=True)
req_card_args.add_argument(
    'front', type=str,
    required=True)
req_card_args.add_argument(
    'back', type=str,
    required=True)