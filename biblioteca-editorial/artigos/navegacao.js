(function(){
  var st=document.createElement('style');
  st.textContent=
    '.header-links a.voltar{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #d9c9a3;color:#5c4a1e;padding:8px 14px;border-radius:999px;font-weight:600;font-size:12px;letter-spacing:.2px;transition:background .15s,border-color .15s}'+
    '.header-links a.voltar:hover{background:#f3e9d0;border-color:#b08a3e;color:#3d300f}'+
    '.header-links a.voltar .vt-curto{display:none}'+
    '#subir{position:fixed;right:22px;bottom:26px;width:46px;height:46px;border-radius:50%;border:1px solid #d9c9a3;background:#fffdf8;color:#5c4a1e;box-shadow:0 6px 18px rgba(60,45,15,.18);cursor:pointer;display:grid;place-items:center;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .2s,transform .2s,background .15s;z-index:60;padding:0}'+
    '#subir.on{opacity:1;pointer-events:auto;transform:none}'+
    '#subir:hover{background:#f3e9d0;border-color:#b08a3e}'+
    '#subir svg{width:20px;height:20px}'+
    '@media(max-width:640px){.header-links a.voltar .vt-longo{display:none}.header-links a.voltar .vt-curto{display:inline}#subir{right:14px;bottom:18px;width:42px;height:42px}}'+
    '@media print{#subir{display:none!important}}';
  document.head.appendChild(st);

  var v=document.querySelector('.header-links a[href="../index.html"]');
  if(v){v.className='voltar';v.setAttribute('aria-label','Voltar para a biblioteca editorial');
    v.innerHTML='<span aria-hidden="true">←</span><span class="vt-longo">Voltar à biblioteca</span><span class="vt-curto">Voltar</span>';}

  var b=document.createElement('button');
  b.id='subir';b.type='button';b.setAttribute('aria-label','Voltar ao topo');b.title='Voltar ao topo';
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
  document.body.appendChild(b);
  function t(){b.classList.toggle('on',(window.pageYOffset||document.documentElement.scrollTop)>300)}
  window.addEventListener('scroll',t,{passive:true});t();
})();
