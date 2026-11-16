(function(){
var ENDPOINT="https://formsubmit.co/ajax/marcosluciano.rodrigues@v4company.com",KEY="brasland-review-v1";
var slug=location.pathname.split("/").pop().replace(/\.html$/,"");
var h1=document.querySelector("h1"),TITLE=h1?h1.textContent.trim():slug;
var LAB={aprovado:"APROVADO",ajustar:"AJUSTAR",rejeitado:"REJEITADO"};
var st={};try{st=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
var css='.apv{margin:48px 0 8px;border:1px solid #e7e0d2;border-radius:12px;background:#fcfaf5;padding:22px;font-family:"Ubuntu",-apple-system,"Segoe UI",Arial,sans-serif}.apv *{font-family:inherit}.apv h2{margin:0 0 4px;font-size:20px}.apv p.s{margin:0 0 14px;font-size:13px;color:#777}.apv-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.apv button.o{font:inherit;font-weight:600;font-size:14px;border:1px solid #e0d8c6;background:#fff;color:#444;border-radius:9px;padding:11px 6px;cursor:pointer}.apv button.o[data-v=aprovado].on{background:#e7f5ec;border-color:#2e8b57;color:#1d6b3f}.apv button.o[data-v=ajustar].on{background:#fff4dc;border-color:#d99a1b;color:#8a5a00}.apv button.o[data-v=rejeitado].on{background:#fdeaec;border-color:#c8102e;color:#9b0c22}.apv textarea,.apv input{width:100%;box-sizing:border-box;font:inherit;font-size:14px;border:1px solid #e0d8c6;border-radius:9px;padding:10px 12px;background:#fff;margin-top:10px}.apv textarea{min-height:90px;resize:vertical}.apv.err textarea{border-color:#c8102e;box-shadow:0 0 0 2px rgba(200,16,46,.12)}.apv .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px}.apv .row input{flex:1;min-width:180px;margin-top:0}.apv .send{font:inherit;font-weight:700;font-size:14px;border:0;border-radius:9px;padding:11px 22px;background:#c8102e;color:#fff;cursor:pointer}.apv .send:disabled{opacity:.55}.apv .msg{margin-top:10px;font-size:13px;display:none}.apv .msg.show{display:block}.apv .msg.ok{color:#1d6b3f}.apv .msg.bad{color:#9b0c22}@media(max-width:560px){.apv-opts{grid-template-columns:1fr}}';
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
var box=document.createElement("section");box.className="apv";box.setAttribute("aria-label","Aprovação do artigo");
box.innerHTML='<h2>Aprovação deste artigo</h2><p class="s">Sua decisão fica salva e aparece na biblioteca. Ao enviar, o resultado vai por e-mail.</p>'
+'<div class="apv-opts"><button type="button" class="o" data-v="aprovado">✓ Aprovar</button><button type="button" class="o" data-v="ajustar">✎ Ajustar</button><button type="button" class="o" data-v="rejeitado">✕ Rejeitar</button></div>'
+'<textarea placeholder="Comentário (obrigatório para Ajustar ou Rejeitar)" aria-label="Comentário"></textarea>'
+'<div class="row"><input type="text" placeholder="Seu nome" aria-label="Seu nome" autocomplete="name"><button type="button" class="send">Enviar aprovação</button></div><div class="msg" role="status"></div>';
var host=document.querySelector("article")||document.body;host.appendChild(box);
var btns=[].slice.call(box.querySelectorAll(".o")),ta=box.querySelector("textarea"),nm=box.querySelector("input"),msg=box.querySelector(".msg"),send=box.querySelector(".send");
nm.value=st._name||"";nm.oninput=function(){st._name=nm.value;save()};
function paint(){var c=st[slug]||{};btns.forEach(function(b){b.classList.toggle("on",b.dataset.v===c.v)});ta.value=c.c||""}
paint();
btns.forEach(function(b){b.onclick=function(){var c=st[slug]||{};if(c.v===b.dataset.v)delete st[slug];else st[slug]={v:b.dataset.v,c:c.c||""};save();paint();box.classList.remove("err")}});
ta.oninput=function(){if(!st[slug])return;st[slug].c=ta.value;save();box.classList.remove("err")};
function show(t,c){msg.className="msg show "+c;msg.innerHTML=t}
send.onclick=function(){var c=st[slug],n=nm.value.trim();
 if(!c||!c.v){show("Escolha Aprovar, Ajustar ou Rejeitar.","bad");return}
 if(c.v!=="aprovado"&&!(c.c||"").trim()){box.classList.add("err");show("Escreva um comentário para Ajustar ou Rejeitar.","bad");ta.focus();return}
 if(!n){show("Informe seu nome para enviar.","bad");nm.focus();return}
 var url=location.href.split("#")[0],txt="["+LAB[c.v]+"] "+TITLE+"\n  "+url+((c.c||"").trim()?"\n  Comentário: "+c.c.trim():"");
 send.disabled=true;show("Enviando…","");
 fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({_subject:"Brasland SEO · "+LAB[c.v]+" · "+TITLE+" · "+n,_template:"box",_captcha:"false",Revisor:n,Resumo:LAB[c.v]+" · 1 artigo",Enviado_em:new Date().toLocaleString("pt-BR"),Decisoes:txt})})
 .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||j.success==="false")throw new Error(j.message||r.status);})})
 .then(function(){show("Aprovação enviada. Obrigado!","ok");send.disabled=false})
 .catch(function(){send.disabled=false;show('Não foi possível enviar agora. <a href="mailto:marcosluciano.rodrigues@v4company.com?subject='+encodeURIComponent("Brasland SEO · "+LAB[c.v]+" · "+TITLE)+"&body="+encodeURIComponent(txt)+'">Enviar pelo seu e-mail</a>.',"bad")})};
})();
