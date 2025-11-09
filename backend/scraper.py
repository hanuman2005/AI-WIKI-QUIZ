import requests
from bs4 import BeautifulSoup
from typing import Tuple

def scrape_wikipedia(url: str) -> Tuple[str, str, str]:
    """
    Scrape Wikipedia article and extract clean text content.
    
    Args:
        url: Wikipedia article URL
        
    Returns:
        Tuple of (title, clean_text, raw_html)
        
    Raises:
        ValueError: If URL is invalid or content cannot be extracted
        Exception: If scraping fails
    """
    
    # Validate URL
    if not url.startswith("https://en.wikipedia.org/wiki/"):
        raise ValueError("Please provide a valid English Wikipedia URL")
    
    # Set headers to mimic browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        # Fetch the webpage
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract title
        title_elem = soup.find('h1', class_='firstHeading')
        if not title_elem:
            title_elem = soup.find('h1', id='firstHeading')
        title = title_elem.get_text() if title_elem else "Unknown Title"
        
        # Find main content area
        content_div = soup.find('div', id='mw-content-text')
        
        if not content_div:
            raise ValueError("Could not find article content")
        
        # Get the parser div inside content
        parser_output = content_div.find('div', class_='mw-parser-output')
        if parser_output:
            content_div = parser_output
        
        # Remove unwanted elements
        for unwanted in content_div.find_all(['sup', 'table', 'style', 'script', 'noscript']):
            unwanted.decompose()
        
        # Remove navigation boxes
        for nav in content_div.find_all('div', class_=['navbox', 'vertical-navbox', 'reflist', 'refbegin']):
            nav.decompose()
            
        # Remove info boxes
        for infobox in content_div.find_all('table', class_='infobox'):
            infobox.decompose()
        
        # Remove edit buttons and other metadata
        for metadata in content_div.find_all('span', class_=['mw-editsection']):
            metadata.decompose()
            
        # Extract all paragraphs
        paragraphs = content_div.find_all('p')
        
        # Clean and join text
        clean_text = '\n\n'.join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])
        
        # Limit text length (to avoid token limits)
        # Take first ~10000 characters for processing
        if len(clean_text) > 10000:
            clean_text = clean_text[:10000] + "..."
        
        if not clean_text or len(clean_text) < 100:
            raise ValueError("No substantial content extracted from article")
        
        return title, clean_text, response.text
        
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch Wikipedia page: {str(e)}")
    except ValueError as e:
        raise e
    except Exception as e:
        raise Exception(f"Error scraping Wikipedia: {str(e)}")