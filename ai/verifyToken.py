import jwt
from functools import wraps
from flask import request, Response, g

import os 
from dotenv import load_dotenv
load_dotenv()


def verifyToken(f):      
    @wraps(f)                   
    def decorated_function(*args, **kwargs):
        header_token = request.headers.get('authorization')

        if header_token is not None:  
            accessToken = header_token.split(" ")[1]
            try:
                payload = jwt.decode(accessToken, os.environ.get('JWT_SECRET_KEY'), 'HS256') 
            except jwt.InvalidTokenError:
                payload = None     

            if payload is None: return Response(status=401)  

            userId = payload['userId']  
            g.userId = userId
        else:
            g.userId = None

        return f(*args, **kwargs)
    return decorated_function