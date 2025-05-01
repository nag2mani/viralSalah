import re
import csv
import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException, WebDriverException

# Set up the WebDriver (only log in once)
driver = webdriver.Chrome()
driver.get("https://www.linkedin.com/login")

# Log in manually or automate login
username = driver.find_element(By.ID, "username")
password = driver.find_element(By.ID, "password")

username.send_keys("")  # Put your user email
password.send_keys("")  # Put your password
password.send_keys(Keys.RETURN)

time.sleep(5)  # Wait for login to complete

def get_followers(url):
    """Retrieve the follower count from a LinkedIn profile URL."""
    try:
        if not url.startswith("http"):
            url = "https://" + url  # Add https if missing
        
        if "linkedin.com/in/" in url and not url.startswith("https://www."):
            url = url.replace("http://", "https://").replace("linkedin.com", "www.linkedin.com")

        if "Idonthave" in url or not url.strip():
            return "No Profile"

        print(f"Processing: {url}")  # Debugging statement
        driver.get(url)  # Visit the LinkedIn profile
        time.sleep(random.randint(3, 8))  # Wait for page to load

        # Locate follower count (adjust class name if needed)
        elements = driver.find_elements(By.CLASS_NAME, "kHDENTJjiZtosXRsqeFbPKsaDsNnnmzWdvk")  # Replace with actual class name
        for element in elements:
            text = element.text.strip()
            match = re.findall(r"\d+", text)  # Extract digits
            if match:
                return "".join(match)  # Join digits to form a number

    except (NoSuchElementException, TimeoutException, WebDriverException):
        print(f"Skipping invalid URL: {url}")
        return "Invalid URL"
    
    return "No Data"

def fix_follower_count(followers_count):
    if isinstance(followers_count, str) and followers_count in ["Invalid URL", "No Profile", "No Data"]:
        return followers_count
    else:
        followers_count = str(followers_count)
        return followers_count[:len(followers_count) // 2]

# Read CSV and process LinkedIn URLs
input_csv = "linkedin_profiles.csv"  # Change to your actual file path
output_csv = "output.csv"  # File where results will be stored

with open(input_csv, "r", encoding="utf-8") as infile, open(output_csv, "w", encoding="utf-8", newline="") as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    headers = next(reader)  # Read headers
    headers.append("Followers")  # Add new column for followers count
    writer.writerow(headers)

    for row in reader:
        profile_url = row[6].strip() if len(row) > 6 else ""
        followers_count = get_followers(profile_url)
        print(followers_count)
        # followers_count = fix_follower_count(followers_count)  # Remove repetition.
        row.append(followers_count)
        writer.writerow(row)
        print(f"Processed: {profile_url} -> {followers_count}")

print("Data extraction completed. Check output.csv")
driver.quit()  # Close browser at the end