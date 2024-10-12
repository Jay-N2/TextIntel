import streamlit as st
from deta import Deta
from dotenv import load_dotenv
import os

load_dotenv(".env")

DETA_KEY = os.getenv("DETA_KEY")

deta = Deta(project_key=DETA_KEY)

db = deta.Base(name="TextIntel")  # db


def insert_user(username, name, password):
    return db.put({"key": username, "name": name, "password": password})


def fetch_all_users():
    res = db.fetch()
    return res.items


# insert_user("jayn", "Jay Nadkarni", "abc123")
# print(fetch_all_users())

def get_user(username):
    return db.get(username)

# print(get_user("jayn"))


def update_user(username, updates):
    return db.update(updates, username)


# update_user("jayn", updates={"name": "Jay Vinayak Nadkarni"}) #changed back to "Jay Nadkarni"

def delete_user(username):
    return db.delete(username)


# delete_user("jayn")
