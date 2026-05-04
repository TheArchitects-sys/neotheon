(function(){
  'use strict';
  document.documentElement.classList.add('js');
  const body = document.body;
  body.classList.add('neotheon-loading');

  const finishLoading = () => {
    body.classList.add('neotheon-ready');
    body.classList.remove('neotheon-loading');
    const loader = document.getElementById('neotheon-loader') || document.querySelector('.neotheon-loader');
    if(loader){
      loader.setAttribute('aria-hidden','true');
      loader.style.pointerEvents = 'none';
      setTimeout(() => { loader.style.display = 'none'; }, 850);
    }
  };
  if(document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(finishLoading, 900);
  else window.addEventListener('load', () => setTimeout(finishLoading, 900), {once:true});
  setTimeout(finishLoading, 2600);

  const nav = document.querySelector('nav');
  let backdrop = document.querySelector('.nav-backdrop');
  if(nav && !backdrop){
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden','true');
    document.body.appendChild(backdrop);
  }
  if(nav && !nav.querySelector('.mobile-nav-toggle')){
    const btn = document.createElement('button');
    btn.className = 'mobile-nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label','Abrir menu de navegação');
    btn.setAttribute('aria-expanded','false');
    btn.innerHTML = '<span class="bar" aria-hidden="true"></span><span class="menu-word">Menu</span>';
    const discord = nav.querySelector('.nav-discord');
    nav.insertBefore(btn, discord || nav.lastChild);
    const setOpen = (open) => {
      nav.classList.toggle('nav-open', open);
      body.classList.toggle('mobile-menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
      const word = btn.querySelector('.menu-word');
      if(word) word.textContent = open ? 'Fechar' : 'Menu';
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
    backdrop && backdrop.addEventListener('click', () => setOpen(false));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if(e.key === 'Escape') setOpen(false); });
    const mq = window.matchMedia('(min-width:981px)');
    const closeOnDesktop = () => { if(mq.matches) setOpen(false); };
    mq.addEventListener ? mq.addEventListener('change', closeOnDesktop) : mq.addListener(closeOnDesktop);
  }

  document.querySelectorAll('img').forEach((img,i)=>{
    if(!img.hasAttribute('loading')) img.setAttribute('loading', i < 2 ? 'eager' : 'lazy');
    if(!img.hasAttribute('decoding')) img.setAttribute('decoding','async');
    if(!img.getAttribute('alt')) img.setAttribute('alt','Arte visual do universo NEOTHEON');
  });

  document.querySelectorAll('a[href="#"]').forEach(a => {
    const label = (a.textContent || '').toLowerCase();
    if(label.includes('discord') || label.includes('comunidade')){
      a.href = 'https://yoble.com.br/Community/305387';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }else{
      a.classList.add('is-disabled');
      a.setAttribute('aria-disabled','true');
      a.setAttribute('tabindex','-1');
    }
  });

  const revealTargets = document.querySelectorAll('.reveal,.reveal-left');
  if('IntersectionObserver' in window && revealTargets.length){
    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if(entry.isIntersecting){
          setTimeout(() => entry.target.classList.add('on'), index * 45);
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.07});
    revealTargets.forEach(el => io.observe(el));
  }else{
    revealTargets.forEach(el => el.classList.add('on'));
  }

  document.querySelectorAll('.mission-panel summary').forEach(summary => {
    summary.addEventListener('click', () => {
      const current = summary.parentElement;
      setTimeout(() => {
        if(current && current.open){
          current.parentElement && current.parentElement.querySelectorAll('.mission-panel').forEach(panel => {
            if(panel !== current) panel.removeAttribute('open');
          });
        }
      }, 0);
    });
  });

  const canvas = document.getElementById('cosmos');
  if(canvas){
    canvas.setAttribute('aria-hidden','true');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if(ctx && !prefersReduced){
      let width = 0, height = 0, dpr = 1, stars = [], nebulas = [], shooting = [], tick = 0, raf = 0;
      const palette = ['#f1d27a','#d4af37','#cfc7b4','#6a3cc9','#ffffff'];
      function resize(){
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        init();
      }
      function init(){
        const count = Math.max(120, Math.min(280, Math.floor((width * height) / 5200)));
        stars = Array.from({length: count}, () => ({
          x: Math.random()*width, y: Math.random()*height,
          r: Math.random()*1.35+.2, o: Math.random()*.62+.12,
          speed: Math.random()*.28+.035, phase: Math.random()*Math.PI*2,
          color: palette[Math.floor(Math.random()*palette.length)]
        }));
        nebulas = Array.from({length: 4}, () => ({
          x: Math.random()*width, y: Math.random()*height,
          r: Math.random()*220+140,
          hue: Math.random()>.5 ? '106,60,201' : '158,42,42',
          o: Math.random()*.10+.035
        }));
      }
      function spawnShooting(){
        if(Math.random() < .008 && shooting.length < 3){
          shooting.push({x:Math.random()*width, y:Math.random()*height*.45, vx:-(Math.random()*6+5), vy:Math.random()*3+2, life:1});
        }
      }
      function draw(){
        tick += .01;
        ctx.clearRect(0,0,width,height);
        for(const n of nebulas){
          const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
          g.addColorStop(0,`rgba(${n.hue},${n.o})`);
          g.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
        }
        for(const s of stars){
          s.y += s.speed;
          if(s.y > height + 6){ s.y = -6; s.x = Math.random()*width; }
          const alpha = s.o + Math.sin(tick*2 + s.phase) * .18;
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(.05, Math.min(.85, alpha));
          ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
        }
        ctx.globalAlpha = 1;
        spawnShooting();
        shooting = shooting.filter(m => m.life > 0);
        for(const m of shooting){
          const grad = ctx.createLinearGradient(m.x,m.y,m.x-m.vx*8,m.y-m.vy*8);
          grad.addColorStop(0,'rgba(241,210,122,.9)');
          grad.addColorStop(1,'rgba(241,210,122,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(m.x,m.y); ctx.lineTo(m.x-m.vx*8,m.y-m.vy*8); ctx.stroke();
          m.x += m.vx; m.y += m.vy; m.life -= .025;
        }
        raf = requestAnimationFrame(draw);
      }
      resize(); draw();
      window.addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); }, {passive:true});
    }
  }
})();
