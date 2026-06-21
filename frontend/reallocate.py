import os
import re
import shutil

frontend_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src\app'
design_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\Design'

# 1. Move current page.tsx (Kanban board) to dashboard/page.tsx
dashboard_dir = os.path.join(frontend_dir, 'dashboard')
os.makedirs(dashboard_dir, exist_ok=True)
current_page_path = os.path.join(frontend_dir, 'page.tsx')
dashboard_page_path = os.path.join(dashboard_dir, 'page.tsx')

if os.path.exists(current_page_path):
    with open(current_page_path, 'r', encoding='utf-8') as f:
        code = f.read()
    code = code.replace('export default function DossierBoard', 'export default function DashboardPage')
    code = code.replace('export default function Home', 'export default function DashboardPage')
    with open(dashboard_page_path, 'w', encoding='utf-8') as f:
        f.write(code)
    print("Moved Kanban board to /dashboard")

# 2. Extract sovereign_dossier_intelligence/code.html to page.tsx (Dossiers route)
dossier_design = os.path.join(design_dir, r'sovereign_dossier_intelligence\code.html')
with open(dossier_design, 'r', encoding='utf-8') as f:
    html = f.read()

# Extract from <main>
match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
if match:
    content = match.group(1)
else:
    content = html

# Convert class to className
content = content.replace('class=', 'className=')
content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content)
content = re.sub(r'<img([^>]*[^/])>', r'<img\1/>', content)
content = re.sub(r'<input([^>]*[^/])>', r'<input\1/>', content)
content = re.sub(r'<br([^>]*[^/])>', r'<br\1/>', content)
content = re.sub(r'<hr([^>]*[^/])>', r'<hr\1/>', content)

# Fix value/checked manually
content = re.sub(r'\bchecked=([\"\'])', r'defaultChecked=\1', content)
def replace_value(m):
    tag_content = m.group(1)
    tag_content = re.sub(r'\bvalue=([\"\'])', r'defaultValue=\1', tag_content)
    return '<input' + tag_content + '>'
content = re.sub(r'<input([^>]+)>', replace_value, content)

# Strip out style tags and style= attributes
content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
content = re.sub(r'style="[^"]+"', '', content)
content = content.replace('></path>', ' />')

jsx = f'''export default function DossiersPage() {{
  return (
    <div className="p-gutter flex-grow flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] mx-auto">
      {content}
    </div>
  );
}}
'''

with open(current_page_path, 'w', encoding='utf-8') as f:
    f.write(jsx)
print("Migrated sovereign_dossier_intelligence to /")
