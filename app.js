'use strict';
const CATS=[['壹','拆除工程'],['貳','水電工程'],['參','泥作工程'],['肆','木作工程'],['伍','油漆工程'],['陸','鐵件及鋁門窗工程'],['柒','清潔工程'],['捌','系統櫃工程'],['玖','其他工程']];
const SEED={ // [名稱,單位,備註]
'拆除工程':[['原有磚牆拆除','坪','紅磚牆或輕質水泥牆'],['超耐磨木地板拆除','坪',''],['隔間門拆除','樘',''],['踢腳板拆除','式',''],['天花板拆除','坪',''],['設備拆除','處',''],['室內保護','坪',''],['大門保護','式',''],['保護板拆除及清運','式','所有工班完成後保護板移除，不包含除膠及細清'],['門框保護','處',''],['浴室保護','間',''],['粗工搬運/車','車',''],['全室拆除廢棄物清運','車',''],['廚具保護','式','']],
'水電工程':[['插座出線口','處',''],['電視插座出線口','處','不含面板'],['網路插座出線口','處','網路線cat-6'],['開關出線口','處','不含面板'],['雙切開關迴路','式',''],['燈具出線口及配管','處','配CD管/浪管'],['5.5專用迴路','迴','太平洋5.5平方絞線'],['安裝開關/插座面板','個','含星光面板'],['燈具安裝','組','安裝時依業主提供的燈具按實際狀況報價'],['圓形開孔','處',''],['廚房瓦斯偵測器移位安裝','處',''],['煙霧偵測器移位安裝','處',''],['管線打鑿','工',''],['崁燈安裝','個',''],['水電工種垃圾清運','車','']],
'泥作工程':[['水電鑿溝、拆除後牆面水泥修補','式','依水電打鑿數計價'],['原門洞封牆','式','含粉光'],['門窗框抓直角','處',''],['泥作工種垃圾清運','車','']],
'木作工程':[['客廳平釘天花板','坪','日本麗仕每坪加300'],['餐廳平釘天花板','坪',''],['主臥房平釘天花板','坪',''],['次臥房平釘天花板','坪',''],['維修孔','個',''],['天花板高低差','尺',''],['窗簾盒加冷媒管包封','尺',''],['包樑','尺',''],['冷氣室內機基座','式',''],['冷氣室內機天花板上升','式',''],['鋁製推拉門軌道位置預留加強','尺',''],['隱藏門','樘','表面噴漆處理，含自動回歸五金，玫瑰面材質另計'],['電視主牆面造型','尺',''],['隔間電視掛載加強及訊號線管道','式',''],['層板','尺','角材/夾板打底，面貼科技木皮'],['木作工種垃圾清運','式',''],['天花板線板燈溝','尺',''],['超耐磨木地板局部修補鋪設','式','']],
'油漆工程':[['新作天花板','坪','1.披土批土2次 2.用AB膠'],['間照、包管、包柱、窗簾盒、燈盒批土與刷漆','尺',''],['門窗包覆','樘',''],['新成屋牆面刷漆','坪','批土+披補一次，顏色以建商色號為主'],['油漆工種垃圾清運','車','']],
'鐵件及鋁門窗工程':[['鋁框拉門','式',''],['鋁框拉門緩衝吊輪組','式','含緩衝專用軌道'],['更衣室吊衣桿','尺','']],
'清潔工程':[['細清','式','廢物清理法規定需由專業清理業者處理'],['粗清','式','']],
'系統櫃工程':[['系統衣櫃','尺',''],['系統鞋櫃','尺',''],['系統電視櫃','尺',''],['系統書櫃','尺','']],
'其他工程':[['冷氣安裝','式',''],['窗簾','式',''],['其他','式','']]};
const UNITS=['式','坪','才','尺','米','公尺','平方公尺','組','樘','只','個','座','片','處','台','間','工','車','支','面','迴','樘','條','套','次'];
const AREAS=['全室','客廳','餐廳','廚房','主臥室','次臥室','小孩房','客房','書房','和室','主臥衛浴','公共衛浴','浴室','玄關','走道','陽台','前陽台','後陽台','工作陽台','樓梯','儲藏室','更衣室','神明廳','頂樓','外牆'];
function selOpts(list,v,blank){list=[...new Set(list)];let h=blank?'<option value=""></option>':'';if(v&&!list.includes(v))h+=`<option selected>${esc(v)}</option>`;return h+list.map(x=>`<option${x==v?' selected':''}>${esc(x)}</option>`).join('')+'<option value="__c">✎ 自訂…</option>'}
function bindSel(sel,get,set){sel.onchange=()=>{if(sel.value=='__c'){const t=prompt('請輸入自訂內容',get()||'');if(t!==null&&t.trim()){set(t.trim());const o=document.createElement('option');o.textContent=t.trim();sel.insertBefore(o,sel.firstChild.value===''?sel.children[1]:sel.firstChild);sel.value=t.trim()}else sel.value=get()||''}else set(sel.value)}}
const toISO=d=>(d||'').replace(/\//g,'-'),fromISO=d=>(d||'').replace(/-/g,'/');
function datePick(inp,cb){document.querySelector('.dpov')?.remove();const m0=/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(inp.value);let sel=m0?new Date(+m0[1],m0[2]-1,+m0[3]):null,v=sel?new Date(sel):new Date();v.setDate(1);
 const ov=document.createElement('div');ov.className='dpov';ov.onclick=e=>{if(e.target==ov)ov.remove()};const box=document.createElement('div');box.className='dpbox';ov.appendChild(box);document.body.appendChild(ov);
 const r=inp.getBoundingClientRect();box.style.left=Math.max(8,Math.min(r.left,innerWidth-268))+'px';box.style.top=(r.bottom+250>innerHeight?Math.max(8,r.top-252):r.bottom+4)+'px';
 const td=new Date(),same=(a,b)=>a&&a.getFullYear()==b.getFullYear()&&a.getMonth()==b.getMonth()&&a.getDate()==b.getDate();
 const draw=()=>{const y=v.getFullYear(),m=v.getMonth(),first=v.getDay(),days=new Date(y,m+1,0).getDate();let h=`<div class="dph"><button data-n="-1">‹</button><b>${y}年${m+1}月</b><button data-n="1">›</button></div><div class="dpg">${'日一二三四五六'.split('').map(w=>`<i>${w}</i>`).join('')}`;
  for(let i=0;i<first;i++)h+='<span></span>';for(let d=1;d<=days;d++){const dt=new Date(y,m,d);h+=`<button data-d="${d}" class="${same(sel,dt)?'sel':''} ${same(td,dt)?'td':''}">${d}</button>`}
  box.innerHTML=h+'</div>';box.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{v.setMonth(v.getMonth()+ +b.dataset.n);draw()});
  box.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const s=`${y}/${String(m+1).padStart(2,'0')}/${String(b.dataset.d).padStart(2,'0')}`;inp.value=s;cb(s);ov.remove()})};draw()}
const $=s=>document.querySelector(s);const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const n=v=>{const x=parseFloat(v);return isFinite(x)?x:0};
const fmt=v=>Math.round(v).toLocaleString('en-US');
const money=v=>`<span class="money"><span>$</span><span>${v?fmt(v):'-'}</span></span>`;
function defaults(){const items=[];for(const[,c]of CATS)(SEED[c]||[]).forEach(([name,unit,note])=>items.push({id:uid(),cat:c,name,unit,cost:0,margin:20,note}));
 return{company:{name:'嘉鋐企業社',contact:'林禹伸',phone:'(02)2954-3076',mobile:'0935-212-185',fax:'(02)2951-6887',address:'新北市板橋區廣權路63號5樓',email:'',logo:''},
 taxRate:5,payTerms:'',completion:'',validity:'',notes:'1.報價效期：本報價單之有效期限為自報價日起計一個月，逾期請重新詢價。\n2.費用範圍：本報價僅含工程施工費用；其餘如瓦斯管移位、縣市政府規費、相關技師（建築/結構/消防）簽證費及管委會規費等，均按實另計。',items};}
let S=JSON.parse(localStorage.getItem('qs_settings')||'null')||defaults();
let Q=JSON.parse(localStorage.getItem('qs_quotes')||'[]');
let cur=null,editScroll=0;
Q.forEach(q=>{if(!q.taxMode)q.taxMode=q.noTax===false?'incl':'excl';});delete S.completion;delete S.validity;

const save=()=>{if(cur)cur.updated=Date.now();localStorage.setItem('qs_settings',JSON.stringify(S));localStorage.setItem('qs_quotes',JSON.stringify(Q));};
const toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',1800)};
const today=()=>{const d=new Date();return`${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`};
const priceOf=it=>Math.round(n(it.cost)*(1+n(it.margin)/100));
// 中文大寫金額
function chineseAmt(v){v=Math.round(v);if(!v)return'零';const d='零壹貳參肆伍陸柒捌玖',u=['','拾','佰','仟'],b=['','萬','億','兆'];let s='',i=0,zero=false;
 while(v>0){const sec=v%10000;v=Math.floor(v/10000);let t='',z=false;
  for(let j=0,x=sec;j<4;j++,x=Math.floor(x/10)){const dg=x%10;if(dg){t=d[dg]+u[j]+(z?'零':'')+t;z=false}else if(t)z=true;}
  if(sec){s=t+b[i]+(zero?'零':'')+s;zero=sec<1000}else if(s)zero=true;i++;}
 return s.replace(/零+/g,'零').replace(/零$/,'');}
function calc(q){const sub={};CATS.forEach(([,c])=>sub[c]=0);q.lines.forEach(l=>sub[l.cat]=(sub[l.cat]||0)+n(l.qty)*n(l.price));
 const total=Object.values(sub).reduce((a,b)=>a+b,0)-n(q.discount);const tax=q.taxMode=='incl'?Math.round(total*n(S.taxRate)/100):0;return{sub,total,tax,grand:total+tax}}
function newQuote(){return{id:uid(),created:Date.now(),c:{name:'',contact:'',phone:'',fax:'',project:'',site:'',date:today(),caseNo:'',orderNo:''},lines:[],discount:0,taxMode:'excl',payTerms:S.payTerms,completion:'',notes:S.notes}}
// ===== tabs
let pvFrom='list';function openPreview(from){pvFrom=from;tab('preview')}
function tab(t){if(!$('#tab-edit').hidden)editScroll=scrollY;document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.tab==t));document.querySelectorAll('main>section').forEach(s=>s.hidden=s.id!='tab-'+t);
 if(t=='list')renderList();if(t=='edit')renderEdit();if(t=='settings'||t=='itemdb')renderSettings();if(t=='preview')renderPreview();scrollTo(0,t=='edit'?editScroll:0);if(t=='edit')requestAnimationFrame(()=>scrollTo(0,editScroll))}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>tab(b.dataset.tab));
// ===== list
function renderList(){const el=$('#tab-list');el.innerHTML=`<div class="card"><button class="primary" id="nq" style="width:100%">＋ 新增報價單</button></div>
<div class="card"><h2>已存報價單（${Q.length}）</h2>${Q.length?'':'<p class="muted">尚無報價單</p>'}${Q.slice().sort((a,b)=>{const da=a.c.date||'',db=b.c.date||'';if(da!=db){if(!da)return 1;if(!db)return -1;return db.localeCompare(da)}return (b.updated||b.created)-(a.updated||a.created)}).map(q=>`<div class="line"><div><b>${esc(q.c.name||'(未填客戶)')}</b> ${esc(q.c.project)}<div class="muted">${esc(q.c.date)} ・ 總計 $${fmt(calc(q).grand)}</div></div><div class="row btns"><button data-o="${q.id}">開啟</button><button data-cp="${q.id}">複製</button><button data-pv="${q.id}">預覽</button><button class="danger" data-d="${q.id}">刪除</button></div></div>`).join('')}</div>`;
 $('#nq').onclick=()=>{cur=newQuote();Q.push(cur);save();editScroll=0;tab('edit')};
 el.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{cur=Q.find(q=>q.id==b.dataset.o);editScroll=0;tab('edit')});
 el.querySelectorAll('[data-pv]').forEach(b=>b.onclick=()=>{cur=Q.find(q=>q.id==b.dataset.pv);openPreview('list')});
 el.querySelectorAll('[data-cp]').forEach(b=>b.onclick=()=>{const c=JSON.parse(JSON.stringify(Q.find(q=>q.id==b.dataset.cp)));c.id=uid();c.created=Date.now();c.c.date=today();Q.push(c);save();renderList();toast('已複製')});
 el.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{if(confirm('確定刪除這份報價單？')){Q=Q.filter(q=>q.id!=b.dataset.d);if(cur&&cur.id==b.dataset.d)cur=null;save();renderList()}});}
// ===== edit
const F=(k,l,o={})=>`<div><label>${l}</label><input data-f="${k}" value="${esc(o.v)}" ${o.t?`type="${o.t}" inputmode="${o.im||''}"`:''}></div>`;
function renderEdit(){const el=$('#tab-edit');if(!cur){el.innerHTML='<div class="card">請先到「報價單」新增或開啟一份報價單。</div>';return}
 const q=cur,c=q.c;
 el.innerHTML=`<div class="card"><h2>客戶資料</h2><div class="grid2">
 ${F('c.name','客戶名稱',{v:c.name})}${F('c.contact','聯絡人',{v:c.contact})}${F('c.phone','電話',{v:c.phone,t:'tel'})}${F('c.fax','傳真',{v:c.fax,t:'tel'})}</div>
 ${F('c.project','工程名稱',{v:c.project})}${F('c.site','施工地點',{v:c.site})}<div class="grid2"><div><label>日期</label><input readonly class="dp" id="cDate" value="${esc(c.date)}" placeholder="選擇日期"></div>${F('c.caseNo','案號',{v:c.caseNo})}</div></div>
 <div class="card"><h2>新增工項</h2><label>工程類別</label><select id="aCat">${CATS.map(([k,c])=>`<option value="${c}">${k}、${c}</option>`).join('')}</select>
 <label>工項</label><select id="aItem"></select><button class="primary" id="aAdd" style="width:100%;margin-top:10px">＋ 加入</button></div>
 <div class="card"><h2>工項明細</h2><div id="lines"></div></div>
 <div class="card"><h2>其他</h2><div class="grid2">${F('discount','優惠／折讓（元）',{v:q.discount||'',t:'number',im:'decimal'})}<div><label>稅金</label><select id="taxMode"><option value="excl"${q.taxMode!='incl'?' selected':''}>不含稅</option><option value="incl"${q.taxMode=='incl'?' selected':''}>含稅（${n(S.taxRate)}%）</option></select></div></div>
 ${F('payTerms','付款條件',{v:q.payTerms})}<div><label>完工日期</label><input readonly class="dp" id="cDone" value="${esc(q.completion)}" placeholder="選擇日期"></div>
 <label>備註</label><textarea data-f="notes">${esc(q.notes)}</textarea></div>
 <div class="tot" id="tot"></div><div style="height:8px"></div><button class="primary" style="width:100%" onclick="openPreview('edit')">預覽並匯出 PDF →</button>`;
 const fill=()=>{const cat=$('#aCat').value;$('#aItem').innerHTML=S.items.filter(i=>i.cat==cat).map(i=>`<option value="${i.id}">${esc(i.name)}（${esc(i.unit)}，$${fmt(priceOf(i))}）</option>`).join('')+'<option value="">（自訂工項）</option>'};
 $('#aCat').onchange=fill;fill();
 $('#aAdd').onclick=()=>{const cat=$('#aCat').value,it=S.items.find(i=>i.id==$('#aItem').value);
  q.lines.push(it?{id:uid(),cat,name:it.name,unit:it.unit,qty:1,price:priceOf(it),area:'',note:''}:{id:uid(),cat,name:'',unit:'',qty:1,price:0,area:'',note:''});save();drawLines();toast('已加入')};
 el.querySelectorAll('[data-f]').forEach(inp=>inp.oninput=()=>{const k=inp.dataset.f;if(k.startsWith('c.'))q.c[k.slice(2)]=inp.value;else q[k]=inp.value;save();drawTot()});
 $('#taxMode').onchange=e=>{q.taxMode=e.target.value;save();drawTot()};
 $('#cDate').onclick=e=>datePick(e.target,v=>{q.c.date=v;save()});$('#cDone').onclick=e=>datePick(e.target,v=>{q.completion=v;save()});
 drawLines();}
function drawTot(){const t=calc(cur);$('#tot').innerHTML=`合計 $${fmt(t.total)}　稅金 $${fmt(t.tax)}<br>總計 新台幣 ${chineseAmt(t.grand)}元整（$${fmt(t.grand)}）`}
function drawLines(){const q=cur,el=$('#lines');let h='';
 CATS.forEach(([k,c])=>{const ls=q.lines.filter(l=>l.cat==c);if(!ls.length)return;h+=`<div class="cat">${k}、${c}　<span style="float:right">$${fmt(calc(q).sub[c])}</span></div>`;
  ls.forEach((l,i)=>{h+=`<div class="line" data-id="${l.id}"><div class="t"><span>${i+1}. </span><span class="row"><button data-up>↑</button><button data-down>↓</button><button class="danger" data-del>刪除</button></span></div>
  <label>內容</label><input data-k="name" value="${esc(l.name)}"><div class="grid3"><div><label>區域</label><select data-s="area">${selOpts(AREAS,l.area,true)}</select></div><div><label>數量</label><input data-k="qty" type="number" inputmode="decimal" step="any" value="${esc(l.qty)}"></div><div><label>單位</label><select data-s="unit">${selOpts(UNITS,l.unit,true)}</select></div></div>
  <div class="grid2"><div><label>單價</label><input data-k="price" type="number" inputmode="decimal" step="any" value="${esc(l.price)}"></div><div><label>小計</label><input disabled data-sub value="${fmt(n(l.qty)*n(l.price))}"></div></div><label>備註</label><input data-k="note" value="${esc(l.note)}"></div>`})});
 el.innerHTML=h||'<p class="muted">尚未加入工項</p>';
 el.querySelectorAll('.line').forEach(d=>{const l=q.lines.find(x=>x.id==d.dataset.id);
  d.querySelectorAll('[data-k]').forEach(i=>i.oninput=()=>{l[i.dataset.k]=i.value;d.querySelector('[data-sub]').value=fmt(n(l.qty)*n(l.price));save();drawTot()});
  d.querySelectorAll('[data-s]').forEach(sl=>bindSel(sl,()=>l[sl.dataset.s],v=>{l[sl.dataset.s]=v;save()}));
  d.querySelector('[data-down]').onclick=()=>{const same=q.lines.filter(x=>x.cat==l.cat),k=same.indexOf(l);if(k<same.length-1){const a=q.lines.indexOf(same[k+1]),b=q.lines.indexOf(l);[q.lines[a],q.lines[b]]=[q.lines[b],q.lines[a]];save();drawLines()}};
  d.querySelector('[data-del]').onclick=()=>{q.lines=q.lines.filter(x=>x!==l);save();drawLines()};
  d.querySelector('[data-up]').onclick=()=>{const same=q.lines.filter(x=>x.cat==l.cat),k=same.indexOf(l);if(k>0){const a=q.lines.indexOf(same[k-1]),b=q.lines.indexOf(l);[q.lines[a],q.lines[b]]=[q.lines[b],q.lines[a]];save();drawLines()}}});
 drawTot();}
// ===== settings
let coEdit=false,coDraftLogo='';
let defEdit=false;const openCats=new Set();
function renderSettings(){const el=$('#tab-settings'),co=S.company;const G=(k,l,v)=>`<div><label>${l}</label><input data-s="${k}" value="${esc(v)}"></div>`;
 const CF=[['name','公司名稱'],['contact','聯絡人'],['phone','公司電話'],['mobile','行動電話'],['fax','FAX'],['email','Email'],['address','公司地址']];
 const coHtml=coEdit?`<div class="card"><h2>公司資料（編輯中）</h2>${CF.map(([k,l])=>`<div><label>${l}</label><input data-co="${k}" value="${esc(co[k])}"></div>`).join('')}
 <label>Logo（選填）</label><input type="file" accept="image/*" id="logo">${coDraftLogo?`<img src="${coDraftLogo}" style="max-height:50px;margin-top:6px"> <button id="rmLogo">移除</button>`:''}
 <div class="row" style="margin-top:10px"><button class="primary" id="coSave">儲存</button><button id="coCancel">取消</button></div></div>`
 :`<div class="card"><div class="row" style="justify-content:space-between"><h2 style="margin:0">公司資料</h2><button id="coEditBtn">編輯</button></div><table class="items" style="margin-top:8px">${CF.map(([k,l])=>`<tr><td class="muted" style="width:6em">${l}</td><td>${esc(co[k])||'—'}</td></tr>`).join('')}<tr><td class="muted">Logo</td><td>${co.logo?`<img src="${co.logo}" style="max-height:40px">`:'—'}</td></tr></table></div>`;
 el.innerHTML=`${coHtml}
 ${defEdit?`<div class="card"><h2>報價單預設值（編輯中）</h2><label>預設稅率 %</label><input data-d="taxRate" type="number" inputmode="decimal" value="${esc(S.taxRate)}"><label>付款條件</label><input data-d="payTerms" value="${esc(S.payTerms)}"><label>備註</label><textarea data-d="notes" style="min-height:110px">${esc(S.notes)}</textarea><div class="row" style="margin-top:10px"><button class="primary" id="dSave">儲存</button><button id="dCancel">取消</button></div>`
 :`<div class="card"><div class="row" style="justify-content:space-between"><h2 style="margin:0">報價單預設值</h2><button id="dEditBtn">編輯</button></div><table class="items" style="margin-top:8px"><tr><td class="muted" style="width:6em">預設稅率</td><td>${n(S.taxRate)}%</td></tr><tr><td class="muted">付款條件</td><td>${esc(S.payTerms)||'—'}</td></tr><tr><td class="muted">備註</td><td style="white-space:pre-wrap">${esc(S.notes)||'—'}</td></tr></table>`}<p class="muted">稅率會即時套用到所有「含稅」報價單；付款條件與備註只套用到之後新增的報價單。</p></div>
 <div class="card irow" id="toDb" style="padding:16px;align-items:center"><b style="color:#2f5d8a;font-size:16px">工項資料庫</b><span class="muted">共 ${S.items.length} 項　›</span></div>
 <div class="card"><h2>備份</h2><div class="row"><button id="exp">匯出備份 JSON</button><button id="imp">匯入備份</button><input type="file" id="impf" accept=".json,application/json" hidden><button class="danger" id="rst">還原預設工項</button></div></div>`;
 el.querySelectorAll('[data-s]').forEach(i=>i.oninput=()=>{const p=i.dataset.s.split('.');if(p.length==2)S[p[0]][p[1]]=i.value;else S[p[0]]=p[0]=='taxRate'?n(i.value):i.value;save()});
 if(defEdit){$('#dSave').onclick=()=>{el.querySelectorAll('[data-d]').forEach(i=>S[i.dataset.d]=i.dataset.d=='taxRate'?n(i.value):i.value);save();defEdit=false;renderSettings();toast('已儲存')};$('#dCancel').onclick=()=>{defEdit=false;renderSettings()}}else $('#dEditBtn').onclick=()=>{defEdit=true;renderSettings()};
 if(coEdit){$('#coSave').onclick=()=>{el.querySelectorAll('[data-co]').forEach(i=>S.company[i.dataset.co]=i.value);S.company.logo=coDraftLogo;save();coEdit=false;renderSettings();toast('已儲存')};$('#coCancel').onclick=()=>{coEdit=false;renderSettings()}}
 else $('#coEditBtn').onclick=()=>{coEdit=true;coDraftLogo=S.company.logo;renderSettings()};
 if(coEdit)$('#logo').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas'),s=Math.min(1,300/img.width);c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);coDraftLogo=c.toDataURL('image/png');keepDraft()};img.src=r.result};r.readAsDataURL(f)};
 if($('#rmLogo'))$('#rmLogo').onclick=()=>{coDraftLogo='';keepDraft()};
 const keepDraft=()=>{const v={};el.querySelectorAll('[data-co]').forEach(i=>v[i.dataset.co]=i.value);renderSettings();el.querySelectorAll('[data-co]').forEach(i=>i.value=v[i.dataset.co])};
 const draw=()=>{$('#sItems').innerHTML=CATS.map(([k,c])=>{const its=S.items.filter(i=>i.cat==c);return`<details data-cat="${c}" ${openCats.has(c)?'open':''}><summary>${k}、${c}<span class="muted">（${its.length}）</span></summary>${its.map(i=>`<div class="irow" data-id="${i.id}"><span>${esc(i.name)}</span><span class="muted">${esc(i.unit)}　›</span></div>`).join('')}<button class="addi" data-add="${c}">＋ 新增工項</button></details>`}).join('');
  $('#sItems').querySelectorAll('details').forEach(d=>d.ontoggle=()=>d.open?openCats.add(d.dataset.cat):openCats.delete(d.dataset.cat));
  $('#sItems').querySelectorAll('.irow').forEach(r=>r.onclick=()=>itemModal(S.items.find(x=>x.id==r.dataset.id)));
  $('#sItems').querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>itemModal(null,b.dataset.add))};
 const itemModal=(it,cat)=>{const isNew=!it,d=it?{...it}:{id:uid(),cat,name:'',unit:'',cost:0,margin:20,note:''};const ov=document.createElement('div');ov.className='mov';
  ov.innerHTML=`<div class="mbox"><h2>${isNew?'新增工項':'工項內容'}</h2><label>類別</label><select data-m="cat">${CATS.map(([k,c])=>`<option value="${c}"${c==d.cat?' selected':''}>${k}、${c}</option>`).join('')}</select>
  <label>工項名稱</label><input data-m="name" value="${esc(d.name)}"><div class="grid3"><div><label>單位</label><select data-ms="unit">${selOpts(UNITS,d.unit,true)}</select></div><div><label>工班成本</label><input data-m="cost" type="number" inputmode="decimal" value="${esc(d.cost)}"></div><div><label>利潤率%</label><input data-m="margin" type="number" inputmode="decimal" value="${esc(d.margin)}"></div></div>
  <p class="muted">預設單價 $<b data-p>${fmt(priceOf(d))}</b></p><label>備註</label><textarea data-m="note">${esc(d.note)}</textarea>
  <div class="row" style="margin-top:12px"><button class="primary" data-sv style="flex:1">儲存</button><button data-cc style="flex:1">取消</button>${isNew?'':'<button class="danger" data-dl style="flex:1">刪除</button>'}</div></div>`;
  document.body.appendChild(ov);ov.querySelectorAll('[data-m]').forEach(i=>i.oninput=i.onchange=()=>{d[i.dataset.m]=i.value;ov.querySelector('[data-p]').textContent=fmt(priceOf(d))});
  bindSel(ov.querySelector('[data-ms]'),()=>d.unit,v=>d.unit=v);
  ov.querySelector('[data-cc]').onclick=()=>ov.remove();
  ov.querySelector('[data-sv]').onclick=()=>{if(!d.name.trim()){alert('請輸入工項名稱');return}if(isNew)S.items.push(d);else Object.assign(it,d);openCats.add(d.cat);save();ov.remove();draw();toast('已儲存')};
  if(!isNew)ov.querySelector('[data-dl]').onclick=()=>{if(confirm('刪除此工項？')){S.items=S.items.filter(x=>x!==it);save();ov.remove();draw()}}};

 draw();$('#toDb').onclick=()=>tab('itemdb');

 $('#exp').onclick=()=>{const b=new Blob([JSON.stringify({settings:S,quotes:Q},null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`報價單備份_${today().replace(/\//g,'')}.json`;a.click()};
 $('#imp').onclick=()=>$('#impf').click();
 $('#impf').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{const d=JSON.parse(t);if(!d.settings)throw 0;S=d.settings;Q=d.quotes||[];cur=null;save();renderSettings();toast('匯入完成')}catch{alert('檔案格式錯誤')}})};
 $('#rst').onclick=()=>{if(confirm('工項資料庫會還原成預設（成本歸零），確定？')){S.items=defaults().items;save();draw()}};}
// ===== paper rendering
function custTable(q,cls){const c=q.c;return`<table><colgroup><col style="width:13%"><col style="width:30%"><col style="width:12%"><col style="width:20%"><col style="width:10%"><col style="width:15%"></colgroup>
 <tr class="${cls}"><td class="c">客戶名稱</td><td>${esc(c.name)}</td><td class="c">聯絡人</td><td>${esc(c.contact)}</td><td class="c">日期</td><td>${esc(c.date)}</td></tr>
 <tr class="${cls}"><td class="c">工程名稱</td><td>${esc(c.project)}</td><td class="c">電話</td><td>${esc(c.phone)}</td><td class="c">傳真</td><td>${esc(c.fax)}</td></tr>
 <tr class="${cls}"><td class="c">施工地點</td><td>${esc(c.site)}</td><td class="c">案號</td><td>${esc(c.caseNo)}</td><td class="c">單號</td><td></td></tr></table>`}
function coverPage(q){const co=S.company,t=calc(q);let rows='';
 CATS.forEach(([k,c])=>{const v=t.sub[c];rows+=`<tr><td class="c">${k}</td><td colspan="2">${c}</td><td class="c">1</td><td class="c">式</td><td>${money(v)}</td><td>${money(v)}</td><td></td></tr>`});
 const extra=n(q.discount)?1:0;if(extra)rows+=`<tr><td></td><td colspan="2">優惠／折讓</td><td></td><td></td><td></td><td class="money"><span>$</span><span>-${fmt(q.discount)}</span></td><td></td></tr>`;
 for(let i=0;i<9-extra;i++)rows+='<tr><td></td><td colspan="2"></td><td></td><td></td><td></td><td></td><td></td></tr>';
 return`<div class="paper">${co.logo?`<img class="logo" src="${co.logo}">`:''}<h3>工程報價單</h3>
 <table><colgroup><col style="width:9%"><col style="width:20%"><col style="width:13%"><col style="width:7%"><col style="width:7%"><col style="width:14%"><col style="width:14%"><col style="width:16%"></colgroup>
 <tr><td class="c">公司名稱</td><td colspan="2">${esc(co.name)}</td><td class="c" colspan="2">公司電話</td><td>${esc(co.phone)}</td><td class="c">訂單日期</td><td>${esc(q.c.date)}</td></tr>
 <tr><td class="c">聯絡人</td><td colspan="2">${esc(co.contact)}</td><td class="c" colspan="2">行動電話</td><td colspan="3">${esc(co.mobile)}</td></tr>
 <tr><td class="c">公司地址</td><td colspan="2">${esc(co.address)}</td><td class="c" colspan="2">FAX</td><td colspan="3">${esc(co.fax)}${co.email?'　Email: '+esc(co.email):''}</td></tr>
 <tr class="cu"><td class="c">客戶名稱</td><td colspan="2">${esc(q.c.name)}</td><td class="c" colspan="2">聯絡人</td><td>${esc(q.c.contact)}</td><td class="c">日期</td><td>${esc(q.c.date)}</td></tr>
 <tr class="cu"><td class="c">工程名稱</td><td colspan="2">${esc(q.c.project)}</td><td class="c" colspan="2">電話</td><td>${esc(q.c.phone)}</td><td class="c">傳真</td><td>${esc(q.c.fax)}</td></tr>
 <tr class="cu"><td class="c">施工地點</td><td colspan="2">${esc(q.c.site)}</td><td class="c" colspan="2">案號</td><td>${esc(q.c.caseNo)}</td><td class="c">單號</td><td></td></tr>
 <tr class="hd"><td>項目</td><td colspan="2">工 程 種 類</td><td>數量</td><td>單位</td><td>單價</td><td>總 價</td><td>備 註</td></tr>${rows}
 <tr class="ye b"><td colspan="6">合計</td><td>${money(t.total)}</td><td></td></tr>
 <tr><td colspan="8" style="border-left:0;border-right:0"></td></tr>
 <tr class="b"><td>稅金</td><td colspan="5">${q.taxMode=='incl'?n(S.taxRate)+'%':'未稅'}</td><td>${money(t.tax)}</td><td></td></tr>
 <tr class="b"><td>總計</td><td colspan="5" class="r">新台幣　${chineseAmt(t.grand)}元整</td><td>${money(t.grand)}</td><td></td></tr>
 <tr><td colspan="8" style="border-left:0;border-right:0"></td></tr>
 <tr><td class="b" style="white-space:nowrap">付款條件:</td><td colspan="7">${esc(q.payTerms)}</td></tr>
 <tr><td class="b" style="white-space:nowrap">完工日期:</td><td colspan="7">${esc(q.completion)}</td></tr>
 <tr><td colspan="4" class="c">(用印)</td><td colspan="4" class="c">客戶簽章</td></tr>
 <tr><td colspan="4" style="height:120px"></td><td colspan="4"></td></tr>
 <tr><td class="c">有效日期</td><td colspan="7"></td></tr>
 <tr><td class="c">備　註:</td><td colspan="4" style="height:84px;white-space:pre-wrap;font-size:11px;line-height:14px">${esc(q.notes)}</td><td class="c" colspan="1">合約簽署日期</td><td colspan="2" class="r">年　　　月　　　日</td></tr></table>
 <div class="pn">第1頁</div></div>`}
function detailPages(q,startNo){const host=document.createElement('div');host.style.cssText='position:absolute;left:-9999px;top:0';document.body.appendChild(host);
 const head=`<colgroup><col style="width:6%"><col style="width:6%"><col style="width:9%"><col style="width:30%"><col style="width:7%"><col style="width:6%"><col style="width:11%"><col style="width:12%"><col style="width:13%"></colgroup><tr class="lb b"><td class="c">項目</td><td class="c">編號</td><td class="c">區域</td><td>內容</td><td class="c">數量</td><td class="c">單位</td><td class="c">單價</td><td class="c">小計</td><td>備註</td></tr>`;
 const rows=[];const t=calc(q);
 CATS.forEach(([k,c])=>{const ls=q.lines.filter(l=>l.cat==c);if(!ls.length)return;rows.push(`<tr class="pk b"><td>${k}</td><td></td><td></td><td>${c}</td><td></td><td></td><td></td><td></td><td></td></tr>`);
  ls.forEach((l,i)=>rows.push(`<tr><td></td><td class="c">${i+1}</td><td>${esc(l.area)}</td><td>${esc(l.name)}</td><td class="c">${esc(l.qty)}</td><td class="c">${esc(l.unit)}</td><td>${money(n(l.price))}</td><td>${money(n(l.qty)*n(l.price))}</td><td style="font-size:10.5px;line-height:13px">${esc(l.note)}</td></tr>`));
  rows.push(`<tr class="nb"><td colspan="6"></td><td class="r">小計</td><td>${money(t.sub[c])}</td><td></td></tr><tr class="nb"><td colspan="9" style="height:12px"></td></tr>`)});
 if(!rows.length)rows.push('<tr><td colspan="9" class="c">（尚無工項）</td></tr>');
 const pages=[];let i=0,no=startNo;
 while(i<rows.length){const p=document.createElement('div');p.className='paper';p.innerHTML=`<h3>報價單明細</h3>${custTable(q,'gr')}<table style="margin-top:0">${head}</table><div class="pn">第${no}頁</div>`;host.appendChild(p);
  const tb=p.querySelectorAll('table')[1].tBodies[0]||p.querySelectorAll('table')[1];const limit=1123-40;let added=0;
  while(i<rows.length){tb.insertAdjacentHTML('beforeend',rows[i]);const tr=tb.lastElementChild;const bottom=p.querySelectorAll('table')[1].getBoundingClientRect().bottom-p.getBoundingClientRect().top;
   if(bottom>limit&&added>0){tr.remove();break}i++;added++;}
  pages.push(p.outerHTML);no++;}
 host.remove();return pages}
function allPages(q){return[coverPage(q),...detailPages(q,2)]}
function renderPreview(){const el=$('#pages');if(!cur){el.innerHTML='<div class="card">請先開啟一份報價單。</div>';return}
 const w=Math.min(el.clientWidth||innerWidth-24,794),s=w/794;
 el.innerHTML=allPages(cur).map(p=>`<div style="width:${w}px;height:${1123*s}px;margin-bottom:12px"><div class="pagewrap" style="transform:scale(${s})">${p}</div></div>`).join('');}
async function makePdf(q){await document.fonts.ready;const {jsPDF}=window.jspdf;const pdf=new jsPDF({unit:'mm',format:'a4',compress:true});
 const host=document.createElement('div');host.style.cssText='position:fixed;left:-10000px;top:0';document.body.appendChild(host);
 const pages=allPages(q);for(let k=0;k<pages.length;k++){host.innerHTML=pages[k];const cv=await html2canvas(host.firstElementChild,{scale:2,backgroundColor:'#fff',useCORS:true,logging:false,windowWidth:900});
  if(k)pdf.addPage();pdf.addImage(cv.toDataURL('image/jpeg',0.92),'JPEG',0,0,210,297);}
 host.remove();return pdf}
function fname(q){return`報價單_${(q.c.name||q.c.project||'客戶').replace(/[\\/:*?"<>|\s]/g,'')}_${q.c.date.replace(/\//g,'')}.pdf`}
$('#btnPdf').onclick=async()=>{if(!cur)return;const m=$('#pdfMsg');m.textContent='產生中…';try{const pdf=await makePdf(cur);const blob=pdf.output('blob'),name=fname(cur);const file=new File([blob],name,{type:'application/pdf'});
 if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:name});m.textContent='';return}catch(e){if(e.name=='AbortError'){m.textContent='';return}}}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();m.textContent='已下載 '+name}catch(e){console.error(e);m.textContent='產生失敗：'+e.message}};
window.QS={openPreview,tab,get editScroll(){return editScroll},makePdf,get cur(){return cur},set cur(v){cur=v},Q,S,save,tab,chineseAmt};
if(Q.length)cur=Q[Q.length-1];tab('list');
