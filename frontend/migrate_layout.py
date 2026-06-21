import os
import re

frontend_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src'
page_path = os.path.join(frontend_dir, 'app', 'page.tsx')
layout_path = os.path.join(frontend_dir, 'app', 'layout.tsx')

with open(page_path, 'r', encoding='utf-8') as f:
    page_code = f.read()

# Extract Sidebar
sidebar_match = re.search(r'({\/\* SideNavBar \*\/}.*?<\/nav>)', page_code, re.DOTALL)
sidebar_code = sidebar_match.group(1) if sidebar_match else ''
sidebar_code = sidebar_code.replace('<a ', '<Link ').replace('</a>', '</Link>')

# Replace href='#' with proper routes in sidebar
routes = ['/dashboard', '/', '/topography', '/legal', '/analytics', '/settings', '/support']
for r in routes:
    sidebar_code = sidebar_code.replace('href="#"', f'href="{r}"', 1)

sidebar_component = f'''import Link from "next/link";

export default function Sidebar() {{
  return (
    {sidebar_code}
  );
}}
'''
with open(os.path.join(frontend_dir, 'components', 'Sidebar.tsx'), 'w', encoding='utf-8') as f:
    f.write(sidebar_component)

# Extract TopBar
topbar_match = re.search(r'({\/\* TopAppBar \*\/}.*?<\/header>)', page_code, re.DOTALL)
topbar_code = topbar_match.group(1) if topbar_match else ''
topbar_component = f'''export default function TopBar() {{
  return (
    {topbar_code}
  );
}}
'''
with open(os.path.join(frontend_dir, 'components', 'TopBar.tsx'), 'w', encoding='utf-8') as f:
    f.write(topbar_component)

# Ambient background
ambient_match = re.search(r'({\/\* Ambient Background \*\/}.*?<\/div>\n<\/div>)', page_code, re.DOTALL)
ambient_code = ambient_match.group(1) if ambient_match else ''

# Update Layout.tsx
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_code = f.read()

layout_code = layout_code.replace('import MouseGlow from "@/components/MouseGlow";', 'import MouseGlow from "@/components/MouseGlow";\\nimport Sidebar from "@/components/Sidebar";\\nimport TopBar from "@/components/TopBar";')

shell = f'''<div className="font-body-md text-body-md overflow-hidden bg-surface-lowest min-h-screen text-[#e5e2e1]">
        {ambient_code}
        <Sidebar />
        <main className="ml-0 md:ml-72 h-screen flex flex-col bg-transparent">
          <TopBar />
          <div className="flex-1 overflow-y-auto">
            {{children}}
          </div>
        </main>
      </div>'''

layout_code = re.sub(r'<body className="min-h-full flex flex-col bg-background">\n\s*<MouseGlow \/>\n\s*\{children\}\n\s*<\/body>', f'<body className="min-h-full flex flex-col bg-background">\\n        <MouseGlow />\\n        {shell}\\n      </body>', layout_code)
with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout_code)

# Update page.tsx
main_content = re.sub(r'{\/\* Ambient Background \*\/}.*?<\/header>', '', page_code, flags=re.DOTALL)
main_content = re.sub(r'<div className="font-body-md.*?">', '', main_content, count=1)
main_content = re.sub(r'<main className.*?">', '', main_content, count=1)
main_content = main_content.replace('</main>', '').replace('</div>\n  )\n}', '  )\n}')

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(main_content)

print("Layout refactored.")
