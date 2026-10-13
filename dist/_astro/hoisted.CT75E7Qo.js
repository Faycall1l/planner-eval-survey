const y=document.getElementById("searchInput");y.addEventListener("input",()=>{window.dispatchEvent(new CustomEvent("search",{detail:y.value}))});const g=document.getElementById("classSelect"),w=document.getElementById("yearSelect"),E=document.getElementById("venueSelect"),B=document.getElementById("resetBtn");g.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));w.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));E.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));B.addEventListener("click",()=>{g.value="",w.value="",E.value="",window.dispatchEvent(new CustomEvent("filter"))});const $=["runs","seeds","prompts","code","modelver","coord_metric"];$.forEach(t=>{const e=document.getElementById("pf-"+t);e&&e.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")))});const u=JSON.parse(document.getElementById("papers-data").textContent);let p=[...u],m="year",v="desc";const c=new Set,C={1:"Formal Plan Validity",2:"Decomposition and Tool Orchestration",3:"Embodied and Interactive Execution",4:"Robustness and Recovery",5:"Efficiency and Cost",6:"Coordination Structure"},L=["runs","seeds","prompts","code","modelver","coord_metric"];function l(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function I(t){const e=document.getElementById("tableBody");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6"><div class="no-results">No papers match the current filters.</div></td></tr>';return}e.innerHTML=t.map(n=>`
      <tr data-pid="${n.pid}" onclick="showDetail('${n.pid}')">
        <td><input type="checkbox" ${c.has(n.pid)?"checked":""} onclick="event.stopPropagation(); toggleSelect('${n.pid}', this.checked)" /></td>
        <td>
          ${n.url?`<a href="${n.url}" target="_blank" rel="noopener noreferrer" class="paper-link" onclick="event.stopPropagation()"><strong>${l(n.name)}</strong></a>`:`<strong>${l(n.name)}</strong>`}
        </td>
        <td><span class="class-tag c${n.cls}">C${n.cls}</span></td>
        <td class="year-text">${n.year}</td>
        <td class="venue-text">${l(n.venue||"Preprint")}</td>
        <td>${l(n.benchmarks?n.benchmarks.split(";")[0]:"N/A")}</td>
      </tr>
    `).join("")}}function S(t){return[...t].sort((e,n)=>{let a=e[m],s=n[m];return typeof a=="string"&&(a=a.toLowerCase(),s=s.toLowerCase()),a<s?v==="asc"?-1:1:a>s?v==="asc"?1:-1:0})}function f(){const t=document.getElementById("searchInput")?.value.toLowerCase()||"",e=document.getElementById("classSelect")?.value||"",n=document.getElementById("yearSelect")?.value||"",a=document.getElementById("venueSelect")?.value||"";let s=u.filter(d=>{if(e&&d.cls!==e||n&&d.year!==n||a==="peer"&&(!d.venue||d.venue.toLowerCase().includes("arxiv"))||a==="preprint"&&d.venue&&!d.venue.toLowerCase().includes("arxiv")||t&&!(d.name+" "+(d.benchmarks||"")).toLowerCase().includes(t))return!1;for(const i of L){const o=document.getElementById("pf-"+i);if(o&&o.checked&&!(d[i]==="True"||d[i]==="Y"))return!1}return!0});p=S(s),I(p)}function x(t,e){e?c.add(t):c.delete(t),h()}window.toggleSelect=x;function h(){const t=c.size,e=document.getElementById("compareCount"),n=document.getElementById("compareBtn");e&&(e.textContent=t+" selected"),n&&(n.disabled=t<2||t>3)}window.getFilteredPapers=()=>p;window.getSelectedPapers=()=>Array.from(c).map(t=>u.find(e=>e.pid===t)).filter(Boolean);window.showDetail=t=>{const e=u.find(d=>d.pid===t);if(!e)return;const n=document.getElementById("modalOverlay"),a=document.getElementById("modalTitle"),s=document.getElementById("modalBody");!n||!a||!s||(a.textContent=e.name,s.innerHTML=`
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Class</div><div class="detail-value">Class ${e.cls}: ${C[e.cls]||"Unknown"}</div></div>
        <div class="detail-item"><div class="detail-label">Year</div><div class="detail-value">${e.year}</div></div>
        <div class="detail-item"><div class="detail-label">Venue</div><div class="detail-value">${l(e.venue||"Preprint")}</div></div>
        <div class="detail-item"><div class="detail-label">Benchmarks</div><div class="detail-value">${l(e.benchmarks||"N/A")}</div></div>
        <div class="detail-item"><div class="detail-label">Repeat Runs</div><div class="detail-value">${e.runs}</div></div>
        <div class="detail-item"><div class="detail-label">Seeds</div><div class="detail-value">${e.seeds}</div></div>
        <div class="detail-item"><div class="detail-label">Prompts</div><div class="detail-value">${e.prompts}</div></div>
        <div class="detail-item"><div class="detail-label">Code</div><div class="detail-value">${e.code}</div></div>
        <div class="detail-item"><div class="detail-label">Dated Model</div><div class="detail-value">${e.modelver}</div></div>
        <div class="detail-item"><div class="detail-label">Coordination Metric</div><div class="detail-value">${e.coord_metric}</div></div>
      </div>
      <div class="finding-box">
        <h4>Key Finding</h4>
        <p>${l(e.finding||"N/A")}</p>
      </div>
    `,n.classList.add("active"))};window.closeModal=t=>{(!t||t.target.id==="modalOverlay")&&document.getElementById("modalOverlay")?.classList.remove("active")};const P=document.getElementById("compareBtn");P.addEventListener("click",()=>{c.size>=2&&c.size<=3&&window.openCompare()});window.addEventListener("search",f);window.addEventListener("filter",f);h();document.querySelectorAll("th[data-sort]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-sort");m===e?v=v==="asc"?"desc":"asc":(m=e,v="asc"),f()})});document.addEventListener("keydown",t=>{t.key==="Escape"&&window.closeModal()});function r(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}const M=[{key:"runs",label:"Repeat Runs"},{key:"seeds",label:"Seeds"},{key:"prompts",label:"Prompts"},{key:"code",label:"Code"},{key:"modelver",label:"Dated Model"},{key:"coord_metric",label:"Coord Metric"}];function O(t){const e=document.getElementById("compareBody");e&&(e.innerHTML=t.map(n=>`
      <div class="compare-card">
        <h3>${n.url?`<a href="${n.url}" target="_blank" rel="noopener noreferrer" class="paper-link">${r(n.name)}</a>`:r(n.name)}</h3>
        <div class="compare-meta"><span class="class-tag c${n.cls}">C${n.cls}</span> ${n.year} | ${r(n.venue||"Preprint")}</div>
        <div class="compare-items">
          ${M.map(a=>{const s=n[a.key],d=s==="True"||s==="Y",i=s==="Y"?"Y":s;return`<span class="compare-item ${d?"yes":"no"}">${a.label}: ${i}</span>`}).join("")}
        </div>
        <div class="compare-bench"><strong>Benchmarks:</strong> ${r(n.benchmarks||"N/A")}</div>
        <div class="finding-box">
          <h4>Key Finding</h4>
          <p>${r(n.finding||"N/A")}</p>
        </div>
      </div>
    `).join(""))}window.openCompare=()=>{const t=window.getSelectedPapers?.()??[];if(t.length<2)return;O(t);const e=document.getElementById("compareOverlay");e&&e.classList.add("active")};window.closeCompareModal=t=>{(!t||t.target.id==="compareOverlay")&&document.getElementById("compareOverlay")?.classList.remove("active")};document.addEventListener("keydown",t=>{t.key==="Escape"&&window.closeCompareModal()});const T=document.getElementById("exportBtn");function R(t){return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}T.addEventListener("click",()=>{const t=JSON.parse(document.getElementById("papers-data").textContent),e=window.getFilteredPapers?.()??t,n=["pid","name","class","year","venue","arxiv","benchmarks","runs","seeds","prompts","code","modelver","coord_metric","finding"],a=e.map(b=>n.map(k=>R(String(b[k]??""))).join(",")),s=[n.join(","),...a].join(`
`),d=new Blob([s],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(d),o=document.createElement("a");o.href=i,o.download="planner-eval-papers.csv",o.click(),URL.revokeObjectURL(i)});
