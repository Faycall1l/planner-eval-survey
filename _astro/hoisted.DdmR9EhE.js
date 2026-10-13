const y=document.getElementById("searchInput");y.addEventListener("input",()=>{window.dispatchEvent(new CustomEvent("search",{detail:y.value}))});const g=document.getElementById("classSelect"),w=document.getElementById("yearSelect"),E=document.getElementById("venueSelect"),k=document.getElementById("resetBtn");g.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));w.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));E.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));k.addEventListener("click",()=>{g.value="",w.value="",E.value="",window.dispatchEvent(new CustomEvent("filter"))});const $=["runs","seeds","prompts","code","modelver","coord_metric"];$.forEach(t=>{const e=document.getElementById("pf-"+t);e&&e.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")))});const u=JSON.parse(document.getElementById("papers-data").textContent);let p=[...u],v="year",o="desc";const m=new Set,B={1:"Formal Plan Validity",2:"Decomposition and Tool Orchestration",3:"Embodied and Interactive Execution",4:"Robustness and Recovery",5:"Efficiency and Cost",6:"Coordination Structure"},C=["runs","seeds","prompts","code","modelver","coord_metric"];function l(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function L(t){const e=document.getElementById("tableBody");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6"><div class="no-results">No papers match the current filters.</div></td></tr>';return}e.innerHTML=t.map(n=>`
      <tr data-pid="${n.pid}" onclick="showDetail('${n.pid}')">
        <td><input type="checkbox" ${m.has(n.pid)?"checked":""} onclick="event.stopPropagation(); toggleSelect('${n.pid}', this.checked)" /></td>
        <td>
          ${n.url?`<a href="${n.url}" target="_blank" rel="noopener noreferrer" class="paper-link" onclick="event.stopPropagation()"><strong>${l(n.name)}</strong></a>`:`<strong>${l(n.name)}</strong>`}
        </td>
        <td><span class="class-tag c${n.cls}">C${n.cls}</span></td>
        <td class="year-text">${n.year}</td>
        <td class="venue-text">${l(n.venue||"Preprint")}</td>
        <td>${l(n.benchmarks?n.benchmarks.split(";")[0]:"N/A")}</td>
      </tr>
    `).join("")}}function I(t){return[...t].sort((e,n)=>{let a=e[v],s=n[v];return typeof a=="string"&&(a=a.toLowerCase(),s=s.toLowerCase()),a<s?o==="asc"?-1:1:a>s?o==="asc"?1:-1:0})}function f(){const t=document.getElementById("searchInput")?.value.toLowerCase()||"",e=document.getElementById("classSelect")?.value||"",n=document.getElementById("yearSelect")?.value||"",a=document.getElementById("venueSelect")?.value||"";let s=u.filter(d=>{if(e&&d.cls!==e||n&&d.year!==n||a==="peer"&&(!d.venue||d.venue.toLowerCase().includes("arxiv"))||a==="preprint"&&d.venue&&!d.venue.toLowerCase().includes("arxiv")||t&&!(d.name+" "+(d.benchmarks||"")).toLowerCase().includes(t))return!1;for(const i of C){const c=document.getElementById("pf-"+i);if(c&&c.checked&&!(d[i]==="True"||d[i]==="Y"))return!1}return!0});p=I(s),L(p)}window.getFilteredPapers=()=>p;window.getSelectedPapers=()=>Array.from(m).map(t=>u.find(e=>e.pid===t)).filter(Boolean);window.showDetail=t=>{const e=u.find(d=>d.pid===t);if(!e)return;const n=document.getElementById("modalOverlay"),a=document.getElementById("modalTitle"),s=document.getElementById("modalBody");!n||!a||!s||(a.textContent=e.name,s.innerHTML=`
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Class</div><div class="detail-value">Class ${e.cls}: ${B[e.cls]||"Unknown"}</div></div>
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
    `,n.classList.add("active"))};window.closeModal=t=>{(!t||t.target.id==="modalOverlay")&&document.getElementById("modalOverlay")?.classList.remove("active")};const S=document.getElementById("compareBtn");S.addEventListener("click",()=>{m.size>=2&&m.size<=3&&window.openCompare()});window.addEventListener("search",f);window.addEventListener("filter",f);document.querySelectorAll("th[data-sort]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-sort");v===e?o=o==="asc"?"desc":"asc":(v=e,o="asc"),f()})});document.addEventListener("keydown",t=>{t.key==="Escape"&&window.closeModal()});function r(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}const x=[{key:"runs",label:"Repeat Runs"},{key:"seeds",label:"Seeds"},{key:"prompts",label:"Prompts"},{key:"code",label:"Code"},{key:"modelver",label:"Dated Model"},{key:"coord_metric",label:"Coord Metric"}];function P(t){const e=document.getElementById("compareBody");e&&(e.innerHTML=t.map(n=>`
      <div class="compare-card">
        <h3>${n.url?`<a href="${n.url}" target="_blank" rel="noopener noreferrer" class="paper-link">${r(n.name)}</a>`:r(n.name)}</h3>
        <div class="compare-meta"><span class="class-tag c${n.cls}">C${n.cls}</span> ${n.year} | ${r(n.venue||"Preprint")}</div>
        <div class="compare-items">
          ${x.map(a=>{const s=n[a.key],d=s==="True"||s==="Y",i=s==="Y"?"Y":s;return`<span class="compare-item ${d?"yes":"no"}">${a.label}: ${i}</span>`}).join("")}
        </div>
        <div class="compare-bench"><strong>Benchmarks:</strong> ${r(n.benchmarks||"N/A")}</div>
        <div class="finding-box">
          <h4>Key Finding</h4>
          <p>${r(n.finding||"N/A")}</p>
        </div>
      </div>
    `).join(""))}window.openCompare=()=>{const t=window.getSelectedPapers?.()??[];if(t.length<2)return;P(t);const e=document.getElementById("compareOverlay");e&&e.classList.add("active")};window.closeCompareModal=t=>{(!t||t.target.id==="compareOverlay")&&document.getElementById("compareOverlay")?.classList.remove("active")};document.addEventListener("keydown",t=>{t.key==="Escape"&&window.closeCompareModal()});const M=document.getElementById("exportBtn");function O(t){return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}M.addEventListener("click",()=>{const t=JSON.parse(document.getElementById("papers-data").textContent),e=window.getFilteredPapers?.()??t,n=["pid","name","class","year","venue","arxiv","benchmarks","runs","seeds","prompts","code","modelver","coord_metric","finding"],a=e.map(h=>n.map(b=>O(String(h[b]??""))).join(",")),s=[n.join(","),...a].join(`
`),d=new Blob([s],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(d),c=document.createElement("a");c.href=i,c.download="planner-eval-papers.csv",c.click(),URL.revokeObjectURL(i)});
