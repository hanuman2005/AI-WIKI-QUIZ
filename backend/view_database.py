import sqlite3
import json
from datetime import datetime
from tabulate import tabulate

conn = sqlite3.connect('quiz_history.db')
cursor = conn.cursor()

print("\n" + "="*100)
print(" "*35 + "QUIZ DATABASE VIEWER")
print("="*100 + "\n")

# Get summary data
cursor.execute("""
    SELECT 
        id,
        title,
        substr(url, 1, 50) || '...' as url_short,
        date_generated,
        LENGTH(scraped_content) as content_chars,
        LENGTH(full_quiz_data) as quiz_chars
    FROM quizzes
    ORDER BY id DESC
""")

quizzes = cursor.fetchall()
headers = ["ID", "Title", "URL (shortened)", "Date Generated", "Content Size", "Quiz Size"]

print("QUIZ RECORDS:")
print(tabulate(quizzes, headers=headers, tablefmt="grid"))
print(f"\nTotal Quizzes in Database: {len(quizzes)}\n")

# Show detailed view of latest quiz
cursor.execute("SELECT * FROM quizzes ORDER BY id DESC LIMIT 1")
latest = cursor.fetchone()

if latest:
    print("="*100)
    print("LATEST QUIZ DETAILS:")
    print("="*100)
    print(f"ID:              {latest[0]}")
    print(f"URL:             {latest[1]}")
    print(f"Title:           {latest[2]}")
    print(f"Date Generated:  {latest[3]}")
    print(f"Content Length:  {len(latest[4])} characters")
    
    # Parse quiz data
    try:
        quiz_data = json.loads(latest[5])
        print(f"\nQUIZ CONTENT:")
        print(f"  - Summary:     {quiz_data.get('summary', 'N/A')[:80]}...")
        print(f"  - Questions:   {len(quiz_data.get('quiz', []))}")
        print(f"  - Sections:    {len(quiz_data.get('sections', []))}")
        print(f"  - Entities:    People: {len(quiz_data.get('key_entities', {}).get('people', []))}, "
              f"Orgs: {len(quiz_data.get('key_entities', {}).get('organizations', []))}, "
              f"Locations: {len(quiz_data.get('key_entities', {}).get('locations', []))}")
        print(f"  - Related:     {len(quiz_data.get('related_topics', []))} topics")
    except:
        print("  - Quiz Data:   [Error parsing JSON]")

# Show table schema
print("\n" + "="*100)
print("DATABASE SCHEMA:")
print("="*100)
cursor.execute("PRAGMA table_info(quizzes)")
schema = cursor.fetchall()
schema_headers = ["Column", "Type", "Not Null", "Default", "Primary Key"]
schema_data = [[col[1], col[2], "Yes" if col[3] else "No", col[4] if col[4] else "-", "Yes" if col[5] else "No"] for col in schema]
print(tabulate(schema_data, headers=schema_headers, tablefmt="grid"))

conn.close()

print("\n" + "="*100)
print("Database file: quiz_history.db")
print("Location: backend/quiz_history.db")
print("="*100 + "\n")