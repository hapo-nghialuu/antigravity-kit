import os
import time

def process_user_data(user_id):
    # CRITICAL: Hardcoded API Key
    api_key = "sk-1234567890abcdef1234567890abcdef"
    
    # HIGH: Potential Infinite Loop if user_id is negative
    count = user_id
    while count != 0:
        print(f"Processing {count}...")
        count -= 1
        
    # MEDIUM: Inefficient string concatenation in loop
    result = ""
    for i in range(1000):
        result += str(i)
        
    return result

def connect_db():
    # LOW: Missing docstring, bare except
    try:
        db = "postgres://user:pass@localhost:5432/db"
        return db
    except:
        pass
