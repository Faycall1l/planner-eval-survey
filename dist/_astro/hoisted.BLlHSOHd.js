const v=document.getElementById("searchInput");v.addEventListener("input",()=>{window.dispatchEvent(new CustomEvent("search",{detail:v.value}))});const m=document.getElementById("classSelect"),f=document.getElementById("yearSelect"),y=document.getElementById("venueSelect"),E=document.getElementById("resetBtn");m.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));f.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));y.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));E.addEventListener("click",()=>{m.value="",f.value="",y.value="",window.dispatchEvent(new CustomEvent("filter"))});const r=JSON.parse(document.getElementById("papers-data").textContent);let u=[...r],c="year",l="desc";const w={1:"Formal Plan Validity",2:"Decomposition and Tool Orchestration",3:"Embodied and Interactive Execution",4:"Robustness and Recovery",5:"Efficiency and Cost",6:"Coordination Structure"};function n(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function g(t){const e=document.getElementById("tableBody");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="5"><div class="no-results">No papers match the current filters.</div></td></tr>';return}e.innerHTML=t.map(d=>`
      <tr data-pid="${d.pid}" onclick="showDetail('${d.pid}')">
        <td><strong>${n(d.name)}</strong></td>
        <td><span class="class-tag c${d.cls}">C${d.cls}</span></td>
        <td class="year-text">${d.year}</td>
        <td class="venue-text">${n(d.venue||"Preprint")}</td>
        <td>${n(d.benchmarks?d.benchmarks.split(";")[0]:"N/A")}</td>
      </tr>
    `).join("")}}function h(t){return[...t].sort((e,d)=>{let a=e[c],s=d[c];return typeof a=="string"&&(a=a.toLowerCase(),s=s.toLowerCase()),a<s?l==="asc"?-1:1:a>s?l==="asc"?1:-1:0})}function o(){const t=document.getElementById("searchInput")?.value.toLowerCase()||"",e=document.getElementById("classSelect")?.value||"",d=document.getElementById("yearSelect")?.value||"",a=document.getElementById("venueSelect")?.value||"";let s=r.filter(i=>!(e&&i.cls!==e||d&&i.year!==d||a==="peer"&&(!i.venue||i.venue.toLowerCase().includes("arxiv"))||a==="preprint"&&i.venue&&!i.venue.toLowerCase().includes("arxiv")||t&&!(i.name+" "+(i.benchmarks||"")).toLowerCase().includes(t)));u=h(s),g(u)}window.showDetail=t=>{const e=r.find(i=>i.pid===t);if(!e)return;const d=document.getElementById("modalOverlay"),a=document.getElementById("modalTitle"),s=document.getElementById("modalBody");!d||!a||!s||(a.textContent=e.name,s.innerHTML=`
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Class</div><div class="detail-value">Class ${e.cls}: ${w[e.cls]||"Unknown"}</div></div>
        <div class="detail-item"><div class="detail-label">Year</div><div class="detail-value">${e.year}</div></div>
        <div class="detail-item"><div class="detail-label">Venue</div><div class="detail-value">${n(e.venue||"Preprint")}</div></div>
        <div class="detail-item"><div class="detail-label">Benchmarks</div><div class="detail-value">${n(e.benchmarks||"N/A")}</div></div>
        <div class="detail-item"><div class="detail-label">Repeat Runs</div><div class="detail-value">${e.runs}</div></div>
        <div class="detail-item"><div class="detail-label">Seeds</div><div class="detail-value">${e.seeds}</div></div>
        <div class="detail-item"><div class="detail-label">Prompts</div><div class="detail-value">${e.prompts}</div></div>
        <div class="detail-item"><div class="detail-label">Code</div><div class="detail-value">${e.code}</div></div>
        <div class="detail-item"><div class="detail-label">Dated Model</div><div class="detail-value">${e.modelver}</div></div>
        <div class="detail-item"><div class="detail-label">Coordination Metric</div><div class="detail-value">${e.coord_metric}</div></div>
      </div>
      <div class="finding-box">
        <h4>Key Finding</h4>
        <p>${n(e.finding||"N/A")}</p>
      </div>
    `,d.classList.add("active"))};window.closeModal=t=>{(!t||t.target.id==="modalOverlay")&&document.getElementById("modalOverlay")?.classList.remove("active")};window.addEventListener("search",o);window.addEventListener("filter",o);document.querySelectorAll("th[data-sort]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-sort");c===e?l=l==="asc"?"desc":"asc":(c=e,l="asc"),o()})});document.addEventListener("keydown",t=>{t.key==="Escape"&&window.closeModal()});
