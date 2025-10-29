#!/usr/bin/env python3
"""Script to reset admin password"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def reset_password():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Get admin user
    admin = await db.users.find_one({"email": "yannick@radiogroep.be"})
    
    if not admin:
        print("❌ Admin user not found")
        return
    
    print(f"✅ Found admin: {admin['username']} ({admin['email']})")
    
    # Ask for new password
    new_password = input("Enter new password for admin: ")
    
    if not new_password:
        print("❌ Password cannot be empty")
        return
    
    # Hash password
    password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Update password
    result = await db.users.update_one(
        {"email": "yannick@radiogroep.be"},
        {"$set": {"password_hash": password_hash}}
    )
    
    if result.modified_count > 0:
        print(f"✅ Password updated successfully for {admin['email']}")
        print(f"   You can now login with:")
        print(f"   Email: {admin['email']}")
        print(f"   Password: {new_password}")
    else:
        print("❌ Failed to update password")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_password())
