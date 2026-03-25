from pypdf import PdfReader
from urllib.request import urlopen
import io,re
url='https://www.padelfip.com/wp-content/themes/padelfiptheme/cache/rankings/men_master_rev1205.pdf'
raw=urlopen(url, timeout=30).read()
reader=PdfReader(io.BytesIO(raw))
text='\n'.join((p.extract_text() or '') for p in reader.pages)
lines=[ln.strip() for ln in text.splitlines() if ln.strip()]
print('TOTAL_LINES',len(lines))
print('--- FIRST 120 ---')
for i,ln in enumerate(lines[:120],1):
    print(f'{i:03d}: {ln}')
print('--- NUMERIC-LIKE FIRST 80 ---')
n=0
for ln in lines:
    if re.match(r'^\d+', ln):
        n+=1
        print(f'{n:03d}: {ln}')
        if n>=80:
            break
