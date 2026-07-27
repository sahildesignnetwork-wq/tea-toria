function e(e){let t=[{name:`Home`,href:`/`},{name:`Menu`,href:`/menu.html`},{name:`Services`,href:`/services.html`},{name:`About`,href:`/about.html`}],n=t.map(t=>`<li><a href="${t.href}" class="${t.name===e?`active`:``}">${t.name}</a></li>`).join(``),r=t.map(t=>`<a href="${t.href}" class="${t.name===e?`active`:``}" onclick="closeMobileMenu()">${t.name}</a>`).join(``);document.body.insertAdjacentHTML(`afterbegin`,`
    <nav>
      <a href="/" class="nav-logo">
        <img src="/images/tea-toria-logo-green.jpg" alt="Tea Toria" class="nav-logo-img" />
        <span>Tea Toria</span>
      </a>
      <ul class="nav-links">${n}</ul>
      <a href="https://wa.me/916263126954" class="nav-order-btn">Order Now</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${r}
      <a href="https://wa.me/916263126954" style="color:var(--gold);font-weight:700;">📲 Order Now</a>
    </div>
  `);let i=document.getElementById(`hamburger`),a=document.getElementById(`mobileMenu`);i.addEventListener(`click`,()=>{i.classList.toggle(`open`),a.classList.toggle(`open`)}),window.closeMobileMenu=()=>{i.classList.remove(`open`),a.classList.remove(`open`)}}function t(){let e=document.createElement(`footer`);e.innerHTML=`
    <div class="footer-content">
      <div class="footer-logo"><img src="/images/tea-toria-logo-green.jpg" alt="Tea Toria" class="footer-logo-img" /> Tea Toria</div>
      <p class="footer-tagline">"Traditional Taste With Tandoor"</p>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/menu.html">Menu</a>
        <a href="/services.html">Services</a>
        <a href="/about.html">About</a>
      </div>
      <div class="footer-socials">
        <a href="https://wa.me/916263126954" aria-label="WhatsApp">💬</a>
        <a href="https://instagram.com/tea.toria" aria-label="Instagram">📷</a>
        <a href="#" aria-label="Facebook">📘</a>
      </div>
      <p class="footer-copy">© ${new Date().getFullYear()} <span>Tea Toria</span> · Bhopal, India · All rights reserved</p>
    </div>
  `,document.body.appendChild(e)}function n(){let e=document.createElement(`a`);e.href=`https://wa.me/916263126954`,e.className=`fab-wa`,e.target=`_blank`,e.rel=`noopener`,e.setAttribute(`aria-label`,`Chat on WhatsApp`),e.innerHTML=`💬`,document.body.appendChild(e)}function r(e){let t=document.getElementById(e);if(!t)return;let n=new Date,r=n.getTime()+n.getTimezoneOffset()*6e4,i=new Date(r+5.5*36e5),a=i.getHours(),o=i.getMinutes(),s=a*60+o,c=s>=630&&s<1350;t.innerHTML=`
    <div class="status-badge ${c?`open`:`closed`}">
      <div class="status-dot"></div>
      ${c?`Open Now · Until 10:30 PM`:`Closed · Opens at 10:30 AM`}
    </div>
  `}function i(){let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)})},{threshold:.12});document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))}function a(r){e(r),t(),n(),i()}export{r as n,a as t};