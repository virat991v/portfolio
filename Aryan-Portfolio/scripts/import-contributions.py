from html.parser import HTMLParser
from pathlib import Path
import json,re,sys,datetime
class Contributions(HTMLParser):
 def __init__(self):super().__init__();self.days={};self.counts={};self.tip=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'data-date' in a and 'id' in a:self.days[a['id']]=a['data-date']
  if tag=='tool-tip':self.tip=a.get('for')
 def handle_data(self,data):
  if self.tip:
   m=re.match(r'(No|[\d,]+) contributions? on ',data)
   if m:self.counts[self.tip]=0 if m[1]=='No' else int(m[1].replace(',',''))
 def handle_endtag(self,tag):
  if tag=='tool-tip':self.tip=None
p=Contributions();p.feed(Path(sys.argv[1]).read_text());days=sorted([{'date':d,'count':p.counts[i]} for i,d in p.days.items() if i in p.counts],key=lambda d:d['date'])
assert len(days)>=350,'Incomplete contribution history'
assert len({d['date'] for d in days})==len(days),'Duplicate dates'
result={'username':'virat991v','source':'https://github.com/users/virat991v/contributions','updatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'days':days}
Path('src/contributions.json').write_text(json.dumps(result));print('Verified GitHub snapshot:',len(days),'days;',sum(d['count'] for d in days),'contributions; through',days[-1]['date'])
