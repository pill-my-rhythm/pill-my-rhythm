from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Supplements(db.Model):
    __tablename__ = 'tb_supplement'
    
    pk_supplement_id = db.Column(db.Integer, primary_key=True)
    update_date = db.Column(db.Integer)
    shape = db.Column(db.String(30))
    name = db.Column(db.String(50))
    caution = db.Column(db.String(255))
    company = db.Column(db.String(50))
    function = db.Column(db.String(255))
    how_to_eat = db.Column(db.String(50))
    raw = db.Column(db.String(255))
    img_link = db.Column(db.String(100))
    link = db.Column(db.String(100))  