import os
import re

frontend_dir = r'c:\Users\Dhanvin\Downloads\Projects\for wakana\frontend\src\app'

def fix_react_props(code):
    # Replace checked= with defaultChecked=
    code = re.sub(r'\bchecked=([\"\'])', r'defaultChecked=\1', code)
    
    # We only want to replace value= with defaultValue= on input, select, textarea
    def replace_value(m):
        tag_content = m.group(1)
        tag_content = re.sub(r'\bvalue=([\"\'])', r'defaultValue=\1', tag_content)
        return '<input' + tag_content + '>'
    code = re.sub(r'<input([^>]+)>', replace_value, code)
    
    def replace_value_textarea(m):
        tag_content = m.group(1)
        tag_content = re.sub(r'\bvalue=([\"\'])', r'defaultValue=\1', tag_content)
        return '<textarea' + tag_content + '>'
    code = re.sub(r'<textarea([^>]+)>', replace_value_textarea, code)
    return code

for root, _, files in os.walk(frontend_dir):
    for f in files:
        if f.endswith('.tsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                original_code = file.read()
            
            # Skip controlled components
            if 'onChange=' in original_code:
                continue

            new_code = fix_react_props(original_code)
            if new_code != original_code:
                print(f'Fixed {path}')
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_code)
