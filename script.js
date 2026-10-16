/* Teststand: Gruppen vorbereitet, PDF-Zuordnungen werden später ergänzt. */
const params=new URLSearchParams(location.search);
const group=params.get('gruppe')||'advent1';
const groups={advent1:{lang:'de'},vegan:{lang:'de'},lwl:{lang:'de'},advent_en:{lang:'en'}};
const settings=groups[group]||groups.advent1;
const en=settings.lang==='en';
document.documentElement.lang=en?'en':'de';
const tr=en?{title:'Advent Calendar 2026',subtitle:'A new favourite recipe every day',eyebrow:'24 favourite recipes in Advent',door:'Day',today:'Today’s recipe',unavailable:'This door opens in December.',test:'Design preview: day 3 is open for testing.',missing:'The recipe PDF will be linked here later.',open:'Open PDF'}:{title:'Adventskalender 2026',subtitle:'Täglich ein neues Lieblingsrezept',eyebrow:'24 Lieblingsrezepte im Advent',door:'Türchen',today:'Heutiges Rezept',unavailable:'Dieses Türchen öffnet sich erst im Dezember.',test:'Gestaltungsvorschau: Türchen 3 ist zum Testen geöffnet.',missing:'Hier wird später das Rezept-PDF verlinkt.',open:'PDF öffnen'};
for(const [id,key] of [['title','title'],['subtitle','subtitle']])document.getElementById(id).textContent=tr[key];
document.title=tr.title;
document.getElementById('groupLabel').textContent=group;
const now=new Date();
const demo=params.get('live')!=='1'; // ?live=1 zeigt echte Datumsfreischaltung; Testmodus ist Standard
const day=demo?3:(now.getFullYear()>2026?24:now.getFullYear()===2026&&now.getMonth()===11?Math.min(24,now.getDate()):0);
const pdfs={}; // Später je Gruppe und Tag: {advent1:{1:'pdf/advent1/01.pdf'}, ...}
const doors=document.getElementById('doors');
for(let i=1;i<=24;i++){
 const b=document.createElement('button');b.type='button';b.className='door '+(i>day?'future':i===day?'today':'past');b.textContent=i;b.disabled=i>day;
 b.setAttribute('aria-label',tr.door+' '+i+(i>day?' – '+tr.unavailable:''));
 if(i<=day)b.addEventListener('click',()=>showRecipe(i));
 doors.appendChild(b);
}
document.getElementById('notice').textContent=demo?tr.test:'';
const dialog=document.getElementById('recipeDialog');
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
function showRecipe(i){
 document.getElementById('dialogEyebrow').textContent=tr.door+' '+i;
 document.getElementById('dialogTitle').textContent=tr.today;
 const path=(pdfs[group]||{})[i];
 document.getElementById('dialogText').textContent=path?'':tr.missing;
 const link=document.getElementById('pdfLink');link.hidden=!path;
 if(path){link.href=path;link.textContent=tr.open}
 dialog.showModal();
}
