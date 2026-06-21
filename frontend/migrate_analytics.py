import os
import re

design_path = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\Design\executive_analytics_intelligence\code.html'
out_path = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src\app\analytics\page.tsx'

with open(design_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract the main canvas area (skip the sidebar and topbar)
match = re.search(r'<!-- Canvas -->(.*?)<!-- Canvas End -->', html, re.DOTALL)
if not match:
    # Fallback to extracting from p-gutter
    match = re.search(r'<div class="p-gutter flex-grow">(.*?)</div>\n\s*</main>', html, re.DOTALL)

content = match.group(1) if match else ''

# Convert class to className
content = content.replace('class=', 'className=')

# Convert HTML comments to JSX comments
content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content)

# Fix empty tags
content = re.sub(r'<img([^>]*[^/])>', r'<img\1/>', content)
content = re.sub(r'<input([^>]*[^/])>', r'<input\1/>', content)

# Fix style attributes (e.g. style="background: conic-gradient(...)")
def style_replacer(m):
    style_str = m.group(1)
    # Extremely basic parse for the single conic-gradient in this file
    if "conic-gradient" in style_str:
        return 'style={{ background: "conic-gradient(#88d7a6 0% 45%, #e9c349 45% 75%, #353534 75% 100%)" }}'
    return m.group(0)

content = re.sub(r'style="([^"]+)"', style_replacer, content)

jsx = f'''export default function AnalyticsPage() {{
  return (
    <div className="p-gutter flex-grow">
      {content}
    </div>
  );
}}
'''

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(jsx)

print("Analytics Page Migrated")
