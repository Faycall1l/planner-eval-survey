const f=document.getElementById("searchInput");f.addEventListener("input",()=>{window.dispatchEvent(new CustomEvent("search",{detail:f.value}))});const p=document.getElementById("classSelect"),y=document.getElementById("yearSelect"),E=document.getElementById("venueSelect"),h=document.getElementById("resetBtn");p.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));y.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));E.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));h.addEventListener("click",()=>{p.value="",y.value="",E.value="",window.dispatchEvent(new CustomEvent("filter"))});const u=JSON.parse(document.getElementById("papers-data").textContent);let v=[...u],c="year",l="desc";const b={1:"Formal Plan Validity",2:"Decomposition and Tool Orchestration",3:"Embodied and Interactive Execution",4:"Robustness and Recovery",5:"Efficiency and Cost",6:"Coordination Structure"};function i(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function L(t){const e=document.getElementById("tableBody");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="5"><div class="no-results">No papers match the current filters.</div></td></tr>';return}e.innerHTML=t.map(n=>`
      <tr data-pid="${n.pid}" onclick="showDetail('${n.pid}')">
          <td>
            ${n.url?`<a href="${n.url}" target="_blank" rel="noopener noreferrer" class="paper-link" onclick="event.stopPropagation()"><strong>${i(n.name)}</strong></a>`:`<strong>${i(n.name)}</strong>`}
          </td>
        <td><span class="class-tag c${n.cls}">C${n.cls}</span></td>
        <td class="year-text">${n.year}</td>
        <td class="venue-text">${i(n.venue||"Preprint")}</td>
        <td>${i(n.benchmarks?n.benchmarks.split(";")[0]:"N/A")}</td>
      </tr>
    `).join("")}}function B(t){return[...t].sort((e,n)=>{let a=e[c],s=n[c];return typeof a=="string"&&(a=a.toLowerCase(),s=s.toLowerCase()),a<s?l==="asc"?-1:1:a>s?l==="asc"?1:-1:0})}function m(){const t=document.getElementById("searchInput")?.value.toLowerCase()||"",e=document.getElementById("classSelect")?.value||"",n=document.getElementById("yearSelect")?.value||"",a=document.getElementById("venueSelect")?.value||"";let s=u.filter(d=>!(e&&d.cls!==e||n&&d.year!==n||a==="peer"&&(!d.venue||d.venue.toLowerCase().includes("arxiv"))||a==="preprint"&&d.venue&&!d.venue.toLowerCase().includes("arxiv")||t&&!(d.name+" "+(d.benchmarks||"")).toLowerCase().includes(t)));v=B(s),L(v)}window.getFilteredPapers=()=>v;window.showDetail=t=>{const e=u.find(d=>d.pid===t);if(!e)return;const n=document.getElementById("modalOverlay"),a=document.getElementById("modalTitle"),s=document.getElementById("modalBody");!n||!a||!s||(a.textContent=e.name,s.innerHTML=`
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Class</div><div class="detail-value">Class ${e.cls}: ${b[e.cls]||"Unknown"}</div></div>
        <div class="detail-item"><div class="detail-label">Year</div><div class="detail-value">${e.year}</div></div>
        <div class="detail-item"><div class="detail-label">Venue</div><div class="detail-value">${i(e.venue||"Preprint")}</div></div>
        <div class="detail-item"><div class="detail-label">Benchmarks</div><div class="detail-value">${i(e.benchmarks||"N/A")}</div></div>
        <div class="detail-item"><div class="detail-label">Repeat Runs</div><div class="detail-value">${e.runs}</div></div>
        <div class="detail-item"><div class="detail-label">Seeds</div><div class="detail-value">${e.seeds}</div></div>
        <div class="detail-item"><div class="detail-label">Prompts</div><div class="detail-value">${e.prompts}</div></div>
        <div class="detail-item"><div class="detail-label">Code</div><div class="detail-value">${e.code}</div></div>
        <div class="detail-item"><div class="detail-label">Dated Model</div><div class="detail-value">${e.modelver}</div></div>
        <div class="detail-item"><div class="detail-label">Coordination Metric</div><div class="detail-value">${e.coord_metric}</div></div>
      </div>
      <div class="finding-box">
        <h4>Key Finding</h4>
        <p>${i(e.finding||"N/A")}</p>
      </div>
    `,n.classList.add("active"))};window.closeModal=t=>{(!t||t.target.id==="modalOverlay")&&document.getElementById("modalOverlay")?.classList.remove("active")};window.addEventListener("search",m);window.addEventListener("filter",m);document.querySelectorAll("th[data-sort]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-sort");c===e?l=l==="asc"?"desc":"asc":(c=e,l="asc"),m()})});document.addEventListener("keydown",t=>{t.key==="Escape"&&window.closeModal()});const C=document.getElementById("exportBtn");function $(t){return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}C.addEventListener("click",()=>{const t=JSON.parse(document.getElementById("papers-data").textContent),e=window.getFilteredPapers?.()??t,n=["pid","name","class","year","venue","arxiv","benchmarks","runs","seeds","prompts","code","modelver","coord_metric","finding"],a=e.map(w=>n.map(g=>$(String(w[g]??""))).join(",")),s=[n.join(","),...a].join(`
`),d=new Blob([s],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(d),o=document.createElement("a");o.href=r,o.download="planner-eval-papers.csv",o.click(),URL.revokeObjectURL(r)});
