from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/scrape', methods=['GET'])
def scrape():
    # Example: scrape GitHub Jobs (replace with your logic)
    url = request.args.get('url', 'https://jobs.github.com/positions')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    # ...parse soup as needed...
    jobs = []  # Fill with your parsed job data
    return jsonify(jobs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
