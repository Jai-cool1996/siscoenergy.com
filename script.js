
// ═══════════════════════════════════════════════════
// HERO SLIDER — product grid bar + prev/next buttons
// ═══════════════════════════════════════════════════
(function(){
  var TOTAL = 7;
  var cur = 0;

  var slides  = [];
  var cells   = [];
  for(var i=0;i<TOTAL;i++){
    slides.push(document.getElementById('hs'+i));
    cells.push(document.getElementById('pg'+i));
  }
  var prevBtn = document.getElementById('hPrev');
  var nextBtn = document.getElementById('hNext');
  var currNum = document.getElementById('hCurrNum');

  var DATA = [/* your data unchanged */];

  function go(n){
    if(n<0||n>=TOTAL) return;

    if(slides[cur]) slides[cur].classList.remove('active');
    if(cells[cur])  cells[cur].classList.remove('active');

    cur = n;

    if(slides[cur]) slides[cur].classList.add('active');
    if(cells[cur])  cells[cur].classList.add('active');

    if(currNum) currNum.textContent = (cur<9?'0':'')+(cur+1);

    if(prevBtn) prevBtn.disabled = (cur===0);
    if(nextBtn) nextBtn.disabled = (cur===TOTAL-1);

    var hEy=document.getElementById('hEyebrow');
    var hTi=document.getElementById('hTitle');
    var hSu=document.getElementById('hSub');

    if(!hEy||!hTi||!hSu) return;

    hEy.style.opacity='0';
    hTi.style.opacity='0';
    hSu.style.opacity='0';

    var DATA = [
    {ey:'38+ Years of Engineering Excellence', h:'Any Concept,<br><em>Fully Engineered.</em>', sub:'From design and analysis to fabrication, testing and commissioning — SISCO delivers certified industrial solutions worldwide.'},

    {ey:'Static Equipment · ASME · EN · IBR · PESO', h:'Precision Built.<br><em>Globally Certified.</em>', sub:'Pressure vessels, storage tanks and heat exchangers designed to ASME Section VIII, EN 13480 and IBR — in all alloy grades.'},

    {ey:'Noise Control · Oil & Gas · Power · Refinery', h:'Silencing.<br><em>Unsilenced Noise.</em>', sub:'Industrial silencers and acoustic enclosures designed to attenuate noise in vent, compressor, turbine and exhaust systems.'},

    {ey:'Prefab Solutions · Blast Rated · Fire Rated', h:'Factory Tested.<br><em>Site Ready.</em>', sub:'Blast-rated and fire-rated prefabricated E-House substations deployed in mining, oil & gas and utility projects worldwide.'},

    {ey:'Skid Packages · Oil & Gas · Water · Power', h:'Integrated.<br><em>Pre-Commissioned.</em>', sub:'Complete process skid packages engineered, fabricated and pre-commissioned — ready for rapid site installation.'},

    {ey:'Defence · Aerospace · Nuclear · AS9100 Rev D', h:'Engineered for<br><em>Critical Missions.</em>', sub:'AS9100 Rev D certified manufacturing for DRDO, ADA and defence programs — including trisonic wind tunnel facilities.'},

    {ey:'Static Equipment · Columns · Reactors · ASME', h:'Complex Process.<br><em>Precisely BUILT.</em>', sub:'Distillation columns, reactors, separators and cryogenic vessels — designed from concept to commissioning.'}
    ];
    var d = DATA[cur];

    setTimeout(function(){
      hEy.textContent = d.ey;
      hTi.innerHTML   = d.h;
      hSu.textContent = d.sub;

      hEy.style.opacity='1';
      hTi.style.opacity='1';
      hSu.style.opacity='1';
    }, 280);
  }

  if(prevBtn) prevBtn.onclick = function(){ go(cur-1); };
  if(nextBtn) nextBtn.onclick = function(){ go(cur+1); };

  window.goHero   = go;
  window.stepHero = function(dir){ go(cur+dir); };

  ['hEyebrow','hTitle','hSub'].forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.style.transition='opacity .28s ease';
  });

  /* AUTO SLIDER */
  setInterval(function(){
    go((cur + 1) % TOTAL);
  }, 5000); // change 5000 to speed (ms)

  go(0);
})();

// ═══════════════════════════════════════════════════
// MEGA DROPDOWNS
// ═══════════════════════════════════════════════════
// MEGA DROPDOWNS
// ═══════════════════════════════════════════════════
(function(){
  var openId = null;
  function close(){
    if(openId){
      var el = document.getElementById('mega-'+openId);
      var btn = document.getElementById('nbtn-'+openId);
      if(el){ el.style.display='none'; el.classList.remove('open'); }
      if(btn) btn.classList.remove('open');
      openId = null;
    }
  }
  window.openMega = function(id){
    if(openId === id){ close(); return; }
    close();
    var el = document.getElementById('mega-'+id);
    var btn = document.getElementById('nbtn-'+id);
    if(!el) return;
    el.style.display = 'grid';
    requestAnimationFrame(function(){
      el.classList.add('open');
      if(btn) btn.classList.add('open');
    });
    openId = id;
  };
  window.closeMega = close;
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav')){ close(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') close();
  });
})();

// ═══════════════════════════════════════════════════
// HORIZONTAL SCROLL BUTTONS
// ═══════════════════════════════════════════════════
function scrollT(id, dir){
  var el = document.getElementById(id);
  if(el) el.scrollBy({left: dir * 320, behavior:'smooth'});
}

// ═══════════════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════════════
function openLb(url, cap){
  document.getElementById('lbImg').src = url;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb(e){
  if(e.target===document.getElementById('lb')||e.target.classList.contains('lb-close')){
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow='';
  }
});

// ═══════════════════════════════════════════════════
// SCROLL REVEAL
var revEls = document.querySelectorAll('.pcard,.cap-card,.cert-card,.ind-card,.stat,.istat,.pj-card,.pgcell');
var ro = new IntersectionObserver(function(entries){
  entries.forEach(function(en,i){
    if(en.isIntersecting){
      setTimeout(function(){ en.target.style.opacity='1'; en.target.style.transform='translateY(0)'; }, i*55);
      ro.unobserve(en.target);
    }
  });
},{threshold:0.06});
revEls.forEach(function(el){
  el.style.opacity='0'; el.style.transform='translateY(16px)';
  el.style.transition='opacity .5s ease,transform .5s ease';
  ro.observe(el);
});
