const v=document.getElementById("searchInput");v.addEventListener("input",()=>{window.dispatchEvent(new CustomEvent("search",{detail:v.value}))});const m=document.getElementById("classSelect"),f=document.getElementById("yearSelect"),y=document.getElementById("venueSelect"),E=document.getElementById("resetBtn");m.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));f.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));y.addEventListener("change",()=>window.dispatchEvent(new CustomEvent("filter")));E.addEventListener("click",()=>{m.value="",f.value="",y.value="",window.dispatchEvent(new CustomEvent("filter"))});const r=JSON.parse(document.getElementById("papers-data").textContent);let u=[...r],c="year",l="desc";const w={1:"Formal Plan Validity",2:"Decomposition and Tool Orchestration",3:"Embodied and Interactive Execution",4:"Robustness and Recovery",5:"Efficiency and Cost",6:"Coordination Structure"};function s(a){const e=document.createElement("div");return e.textContent=a||"",e.innerHTML}function g(a){const e=document.getElementById("tableBody");if(e){if(a.length===0){e.innerHTML='<tr><td colspan="5"><div class="no-results">No papers match the current filters.</div></td></tr>';return}e.innerHTML=a.map(t=>`
      <tr data-pid="${t.pid}" onclick="showDetail('${t.pid}')">
          <td>
            ${t.arxiv?`<a href="https://arxiv.org/abs/${t.arxiv}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">${s(t.name)}</a>`:`<strong>${s(t.name)}</strong>`}
          </td>
        <td><span class="class-tag c${t.cls}">C${t.cls}</span></td>
        <td class="year-text">${t.year}</td>
        <td class="venue-text">${s(t.venue||"Preprint")}</td>
        <td>${s(t.benchmarks?t.benchmarks.split(";")[0]:"N/A")}</td>
      </tr>
    `).join("")}}function h(a){return[...a].sort((e,t)=>{let d=e[c],n=t[c];return typeof d=="string"&&(d=d.toLowerCase(),n=n.toLowerCase()),d<n?l==="asc"?-1:1:d>n?l==="asc"?1:-1:0})}function o(){const a=document.getElementById("searchInput")?.value.toLowerCase()||"",e=document.getElementById("classSelect")?.value||"",t=document.getElementById("yearSelect")?.value||"",d=document.getElementById("venueSelect")?.value||"";let n=r.filter(i=>!(e&&i.cls!==e||t&&i.year!==t||d==="peer"&&(!i.venue||i.venue.toLowerCase().includes("arxiv"))||d==="preprint"&&i.venue&&!i.venue.toLowerCase().includes("arxiv")||a&&!(i.name+" "+(i.benchmarks||"")).toLowerCase().includes(a)));u=h(n),g(u)}window.showDetail=a=>{const e=r.find(i=>i.pid===a);if(!e)return;const t=document.getElementById("modalOverlay"),d=document.getElementById("modalTitle"),n=document.getElementById("modalBody");!t||!d||!n||(d.textContent=e.name,n.innerHTML=`
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Class</div><div class="detail-value">Class ${e.cls}: ${w[e.cls]||"Unknown"}</div></div>
        <div class="detail-item"><div class="detail-label">Year</div><div class="detail-value">${e.year}</div></div>
        <div class="detail-item"><div class="detail-label">Venue</div><div class="detail-value">${s(e.venue||"Preprint")}</div></div>
        <div class="detail-item"><div class="detail-label">Benchmarks</div><div class="detail-value">${s(e.benchmarks||"N/A")}</div></div>
        <div class="detail-item"><div class="detail-label">Repeat Runs</div><div class="detail-value">${e.runs}</div></div>
        <div class="detail-item"><div class="detail-label">Seeds</div><div class="detail-value">${e.seeds}</div></div>
        <div class="detail-item"><div class="detail-label">Prompts</div><div class="detail-value">${e.prompts}</div></div>
        <div class="detail-item"><div class="detail-label">Code</div><div class="detail-value">${e.code}</div></div>
        <div class="detail-item"><div class="detail-label">Dated Model</div><div class="detail-value">${e.modelver}</div></div>
        <div class="detail-item"><div class="detail-label">Coordination Metric</div><div class="detail-value">${e.coord_metric}</div></div>
      </div>
      <div class="finding-box">
        <h4>Key Finding</h4>
        <p>${s(e.finding||"N/A")}</p>
      </div>
    `,t.classList.add("active"))};window.closeModal=a=>{(!a||a.target.id==="modalOverlay")&&document.getElementById("modalOverlay")?.classList.remove("active")};window.addEventListener("search",o);window.addEventListener("filter",o);document.querySelectorAll("th[data-sort]").forEach(a=>{a.addEventListener("click",()=>{const e=a.getAttribute("data-sort");c===e?l=l==="asc"?"desc":"asc":(c=e,l="asc"),o()})});document.addEventListener("keydown",a=>{a.key==="Escape"&&window.closeModal()});
