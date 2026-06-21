import os
import re

frontend_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src\app'

replacements = {
    'stroke-width': 'strokeWidth',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'fill-opacity': 'fillOpacity',
    'clip-path': 'clipPath',
    'preserveaspectratio': 'preserveAspectRatio',
    'viewbox': 'viewBox',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stroke-miterlimit': 'strokeMiterlimit'
}

for root, _, files in os.walk(frontend_dir):
    for f in files:
        if f.endswith('.tsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                code = file.read()
            
            new_code = code
            for old, new in replacements.items():
                # basic case-insensitive replacement for attributes
                new_code = re.sub(r'\b' + old + r'=', new + '=', new_code, flags=re.IGNORECASE)
            
            if new_code != code:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_code)
                print(f"Fixed SVG props in {path}")
