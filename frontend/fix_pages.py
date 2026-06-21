import os
import re

frontend_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src\app'

for route in ['topography', 'legal', 'settings', 'support']:
    path = os.path.join(frontend_dir, route, 'page.tsx')
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            code = f.read()
        
        # If the file contains <!DOCTYPE html>, we need to extract from <main>
        if '<!DOCTYPE html>' in code:
            print(f'Fixing {route}')
            match = re.search(r'<main[^>]*>(.*?)</main>', code, re.DOTALL)
            if match:
                main_content = match.group(1)
                # Strip out TopAppBar if it's there
                main_content = re.sub(r'<header[^>]*>.*?</header>', '', main_content, flags=re.DOTALL)
                
                # Re-wrap
                code = f'''export default function {route.capitalize()}Page() {{
  return (
    <div className="p-gutter flex-grow">
      {main_content}
    </div>
  );
}}'''
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(code)
