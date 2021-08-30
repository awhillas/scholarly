# -*- coding: utf-8 -*-
import argparse
import re
import string
import sys
from pprint import pprint as pp
from functools import lru_cache

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from loguru import logger

app = FastAPI()

# CORS

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# See: https://github.com/Delgan/loguru
logger.add(sys.stderr, format="{time} {level} {message}", filter="my_module", level="INFO")

BASE_URL = 'https://scholar.google.com/scholar'

@lru_cache
def scrape_page(url):
    logger.info("Hitting: {}", url)
    headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'}
    response=requests.get(url, headers=headers)
    soup=BeautifulSoup(response.content,'lxml')
    results = []
    for item in soup.select('[data-lid]'):
        try:
            gid = item['data-cid']
            related_link = item.select('div.gs_fl > a:nth-child(4)')[0]['href']

            cite_line = item.select('div.gs_fl > a:nth-child(3)')[0]
            citations = re.match('Cited by ([0-9]+)', cite_line.get_text()).group(1)
            cited_by_link = cite_line['href']

            deets = item.select('.gs_a')[0].get_text()
            for y in re.finditer('(20|19)[0-9]{2}', deets):
                # get the last match as arXiv has indexes that look like years
                year = y.group()

            r = {
                'gid': gid,
                'title': item.select('h3')[0].get_text(),
                'year': year,
                'paper_link': item.select('a')[0]['href'],
                'description': item.select('.gs_rs')[0].get_text(),
                'citations': citations,
                'cited_by_link': cited_by_link,
                'related_link': related_link
            }

            if gid not in results:
               results += [r]

        except Exception as e:
            #raise e
            print(e)
    logger.info("Found {} results", len(results))
    return results

def query(text, min_year=None):
    logger.debug(f"{text=}, {min_year=}")
    params = {
        'q': text.replace(" ", "+"),
        'hl': 'en'
    }

    if min_year:
        params = {**params, **{'as_y': min_year}}

    query_str = "&".join([f"{k}={v}" for k,v in params.items()])
    return scrape_page(f"{BASE_URL}?{query_str}")

@app.get("/")
async def home():
    html = """
    <html>
        <head>
            <title>Scribe</title>
            <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
        </head>
        <body>
            <h1>Scribe</h1>
        </body>
    </html>
    """
    return HTMLResponse(content=html, status_code=200)

@app.get("/search")
async def search(q, y: int = None):
    return {'results': query(q, y)}

# For testing...

def main(search: str, year: str = None):
    logger.debug("Searching for: '{}'!", search)
    results = query(search, year)
    pp(results)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("search", help="Search string")
    parser.add_argument("-y", "--year", default=None, help="Minimum year of paper limt")
    args = parser.parse_args()

    main(**vars(args))

