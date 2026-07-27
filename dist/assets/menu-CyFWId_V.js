import"./modulepreload-polyfill-BxR_cmXS.js";import{t as e}from"./main-CRH7s-KD.js";e(`Menu`);var t=`teatoria_menu`;function n(e){let n=localStorage.getItem(t);if(n){let t=JSON.parse(n);if(t[e]&&t[e].length>0)return t[e]}return[]}function r(e){return e.map(e=>`
        <div class="menu-card reveal visible">
          ${e.img?`<img class="menu-card-img" src="${e.img}" alt="${e.name}" loading="lazy" />`:`<div class="menu-card-img" style="background:var(--green-deep);display:flex;align-items:center;justify-content:center;font-size:2rem;">🍵</div>`}
          <div class="menu-card-body">
            <div class="menu-card-name">${e.name}</div>
            <div class="menu-card-sub">${e.sub}</div>
            <span class="menu-card-tag">${e.tag||``}</span>
          </div>
        </div>
      `).join(``)}function i(){return`
        <div style="text-align:center;padding:60px 20px;color:var(--text-light);opacity:0.6;">
          <p style="font-size:2.5rem;margin-bottom:12px;">📋</p>
          <p style="font-size:1.1rem;font-family:'Playfair Display',serif;">No items added yet</p>
          <p style="font-size:0.85rem;margin-top:8px;">Use the <a href="/admin.html" style="color:var(--gold);text-decoration:underline;">Menu Manager</a> to add items.</p>
        </div>`}function a(e){let t=document.getElementById(`menuContainer`),a=n(e);t.innerHTML=a.length>0?`<div class="menu-grid">${r(a)}</div>`:i(),document.querySelectorAll(`.menu-tab`).forEach(e=>e.classList.remove(`active`)),document.querySelector(`[data-cat="${e}"]`).classList.add(`active`)}document.getElementById(`menuTabs`).addEventListener(`click`,e=>{let t=e.target.closest(`.menu-tab`);t&&a(t.dataset.cat)}),a(`chai`);