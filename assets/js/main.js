
(function(){
  document.documentElement.classList.add('js');
  const body=document.body;
  body.classList.add('neotheon-loading');
  const loader=document.getElementById('neotheon-loader');
  const finishLoading=()=>{body.classList.add('neotheon-ready');body.classList.remove('neotheon-loading');if(loader){setTimeout(()=>loader.setAttribute('aria-hidden','true'),650)}};
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(finishLoading, 250);
  }else{
    window.addEventListener('load',()=>setTimeout(finishLoading,250),{once:true});
  }
  setTimeout(finishLoading,1200);

  const nav=document.querySelector('nav');
  let backdrop=document.querySelector('.nav-backdrop');
  if(nav&&!backdrop){backdrop=document.createElement('div');backdrop.className='nav-backdrop';backdrop.setAttribute('aria-hidden','true');document.body.appendChild(backdrop)}
  if(nav&&!nav.querySelector('.mobile-nav-toggle')){
    const btn=document.createElement('button');
    btn.className='mobile-nav-toggle';btn.type='button';
    btn.setAttribute('aria-label','Abrir menu de navegação');btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span class="bar" aria-hidden="true"></span><span class="menu-word">Menu</span>';
    const discord=nav.querySelector('.nav-discord');nav.insertBefore(btn,discord||nav.lastChild);
    const setOpen=(open)=>{nav.classList.toggle('nav-open',open);body.classList.toggle('mobile-menu-open',open);btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Fechar menu de navegação':'Abrir menu de navegação');const w=btn.querySelector('.menu-word');if(w)w.textContent=open?'Fechar':'Menu'};
    btn.addEventListener('click',()=>setOpen(!nav.classList.contains('nav-open')));
    if(backdrop)backdrop.addEventListener('click',()=>setOpen(false));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
    const mq=window.matchMedia('(min-width:981px)');
    const closeOnDesktop=()=>{if(mq.matches)setOpen(false)};
    if(mq.addEventListener)mq.addEventListener('change',closeOnDesktop); else mq.addListener(closeOnDesktop);
  }

  document.querySelectorAll('img').forEach((img,i)=>{if(!img.hasAttribute('loading'))img.setAttribute('loading',i<2?'eager':'lazy');if(!img.hasAttribute('decoding'))img.setAttribute('decoding','async');if(!img.getAttribute('alt'))img.setAttribute('alt','Arte visual do universo NEOTHEON')});
  document.querySelectorAll('a[href="#"]').forEach(a=>{const label=(a.textContent||'').toLowerCase();if(label.includes('discord')||label.includes('comunidade')){a.href='https://yoble.com.br/Community/305387';a.target='_blank';a.rel='noopener noreferrer'}else{a.classList.add('is-disabled');a.setAttribute('aria-disabled','true');a.setAttribute('tabindex','-1')}});
  const c=document.getElementById('cosmos');if(c)c.setAttribute('aria-hidden','true');
})();


/* Failsafe anti-loop do loader */
setTimeout(function(){
  document.body.classList.add('neotheon-ready');
  document.body.classList.remove('neotheon-loading');
  var l=document.getElementById('neotheon-loader');
  if(l){
    l.setAttribute('aria-hidden','true');
    l.style.opacity='0';
    l.style.visibility='hidden';
    l.style.pointerEvents='none';
    setTimeout(function(){ l.style.display='none'; }, 350);
  }
}, 1600);
