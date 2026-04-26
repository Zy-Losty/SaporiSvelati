import os
import re

def fix_file(filepath):
    with open(filepath, 'rb') as f:
        content = f.read()
    
    # Try to decode as UTF-8
    try:
        text = content.decode('utf-8')
    except UnicodeDecodeError:
        # If it fails, it might be in some other encoding? 
        # But we want to fix the double-encoded mess.
        # Let's try to decode as latin-1 then encode as utf-8 then decode as utf-8 again? 
        # No, let's just do direct replacements on the bytes or the decoded string.
        text = content.decode('latin-1')

    # Fix the `r`n mess
    text = text.replace('`r`n', '\n')
    
    # Fix the structural </div> issue
    text = re.sub(r'(<div id="site-newsletter"></div>)\s+</div>\s+</main>', r'\1\n    </main>', text)

    # Replacements for common corrupted UTF-8 sequences
    replacements = {
        'â€¢': '•',
        'Ã¬': 'ì',
        'Ã\xa0': 'à',
        'Ã²': 'ò',
        'Ã¹': 'ù',
        'Ã©': 'é',
        'Ã¨': 'è',
        'Ã³': 'ó',
        'Ã¡': 'á',
        'Ã¢': 'â',
        'Ã®': 'î',
        'Ã”': 'Ô',
        'Ã»': 'û',
        'Ã‰': 'É',
        'Ãˆ': 'È',
        'â€™': "'",
        'Â°': '°',
        'Ã\xaf': 'ï',
        'Ãª': 'ê'
    }

    for target, replacement in replacements.items():
        text = text.replace(target, replacement)
    
    # Fix Saponi typo
    text = text.replace('Saponi Svelati', 'Sapori Svelati')

    # Save as UTF-8 (no BOM)
    with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)

pages_dir = r'c:\Users\huzhe\Documents\GitHub\SaporiSvelati\pages'
for filename in os.listdir(pages_dir):
    if filename.endswith('.html'):
        fix_file(os.path.join(pages_dir, filename))

# Also root files
root_dir = r'c:\Users\huzhe\Documents\GitHub\SaporiSvelati'
for filename in os.listdir(root_dir):
    if filename.endswith('.html'):
        fix_file(os.path.join(root_dir, filename))
