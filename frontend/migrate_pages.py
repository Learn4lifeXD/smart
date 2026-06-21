import os
import re

frontend_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src\app'
design_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\Design'

pages = {
    'topography': r'geospatial_topography_intelligence\code.html',
    'legal': r'legal_compliance_regulatory_framework\code.html',
    'settings': r'authority_settings_support\code.html',
    'support': r'authority_settings_support\code.html'
}

for route, rel_path in pages.items():
    design_path = os.path.join(design_dir, rel_path)
    if not os.path.exists(design_path):
        print(f'Skipping {route}, file not found')
        continue
    
    with open(design_path, 'r', encoding='utf-8') as f:
        html = f.read()

    match = re.search(r'<!-- Canvas -->(.*?)<!-- Canvas End -->', html, re.DOTALL)
    if not match:
        match = re.search(r'<div class="p-gutter flex-grow">(.*?)</div>\n\s*</main>', html, re.DOTALL)
    
    content = match.group(1) if match else html

    content = content.replace('class=', 'className=')
    content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content)
    content = re.sub(r'<img([^>]*[^/])>', r'<img\1/>', content)
    content = re.sub(r'<input([^>]*[^/])>', r'<input\1/>', content)
    content = re.sub(r'<br([^>]*[^/])>', r'<br\1/>', content)
    content = re.sub(r'<hr([^>]*[^/])>', r'<hr\1/>', content)
    
    # Strip style tags inside the canvas if any
    content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
    
    # Remove inline style strings, but carefully
    content = re.sub(r'style="[^"]+"', '', content)
    
    # If the content has SVG paths without self closing
    content = content.replace('></path>', ' />')

    out_dir = os.path.join(frontend_dir, route)
    os.makedirs(out_dir, exist_ok=True)
    
    jsx = f'''export default function {route.capitalize()}Page() {{
  return (
    <div className="p-gutter flex-grow">
      {content}
    </div>
  );
}}
'''
    with open(os.path.join(out_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(jsx)
    print(f'Migrated {route}')
