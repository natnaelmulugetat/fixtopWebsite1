document.addEventListener('DOMContentLoaded',()=>{
  // Carousel (optional)
  const carousel = document.getElementById('carousel');
  if(carousel){
    const slides = [...carousel.querySelectorAll('.slide')];
    let idx = 0, timer = null;
    const go = (i)=>{
      slides.forEach(s=>s.classList.remove('active'));
      slides[i].classList.add('active');
      idx = i;
    }
    const next = ()=> go((idx+1)%slides.length);
    const prev = ()=> go((idx-1+slides.length)%slides.length);
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    if(nextBtn) nextBtn.addEventListener('click',()=>{next(); restart();});
    if(prevBtn) prevBtn.addEventListener('click',()=>{prev(); restart();});
    function start(){ timer = setInterval(next, 4500); }
    function restart(){ clearInterval(timer); start(); }
    start();
  }

  // Modal contact
  const modal = document.getElementById('contactModal');
  const openBtn = document.getElementById('openContact');
  const closeBtn = document.getElementById('closeContact');
  const cancelBtn = document.getElementById('cancelContact');
  if(openBtn && modal) openBtn.addEventListener('click',(e)=>{ e.preventDefault(); modal.setAttribute('aria-hidden','false'); });
  const openBtnNav = document.getElementById('openContactNav');
  if(openBtnNav && modal) openBtnNav.addEventListener('click',(e)=>{ e.preventDefault(); modal.setAttribute('aria-hidden','false'); });
  if(closeBtn && modal) closeBtn.addEventListener('click',()=> modal.setAttribute('aria-hidden','true'));
  if(cancelBtn && modal) cancelBtn.addEventListener('click',()=> modal.setAttribute('aria-hidden','true'));
  if(modal) modal.addEventListener('click',(e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); })

  // Contact form submit (demo: shows quick message)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const data = new FormData(form);
      // In a real app you'd send this to a backend. We'll show a thank-you state.
      const name = data.get('name')||'Friend';
      form.innerHTML = `<p>Thanks, ${name}! We'll reply soon.</p>`;
      if(modal) setTimeout(()=> modal.setAttribute('aria-hidden','true'),1500);
    });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    })
  })

  // Filters
  const filters = document.querySelectorAll('.filter');
  const cards = Array.from(document.querySelectorAll('#productGrid .card'));
  filters.forEach(f=> f.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active'));
    f.classList.add('active');
    const key = f.getAttribute('data-filter');
    cards.forEach(c=>{
      const cat = c.getAttribute('data-category');
      c.style.display = (key==='all' || key===cat)?'block':'none';
    })
  }))

  // Tabbed content on new pages
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(btn=> btn.addEventListener('click', ()=>{
    const target = btn.getAttribute('data-tab');
    tabButtons.forEach(b=> b.classList.toggle('active', b===btn));
    tabPanels.forEach(panel=> panel.classList.toggle('active', panel.id===target));
  }))

  // Accordion expansion for values page
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item=>{
    const trigger = item.querySelector('.accordion-trigger');
    if(trigger){
      trigger.addEventListener('click', ()=>{
        const isOpen = item.classList.contains('open');
        accordionItems.forEach(i=> i.classList.remove('open'));
        if(!isOpen) item.classList.add('open');
      });
    }
  });

  // Contact form on profile pages
  const profileForm = document.getElementById('profileContactForm');
  const toast = document.getElementById('toast');
  if(profileForm){
    profileForm.addEventListener('submit', e=>{
      e.preventDefault();
      const data = new FormData(profileForm);
      const name = data.get('name') || 'Friend';
      profileForm.innerHTML = `<p>Thanks, ${name}! Your message is on the way.</p>`;
      if(toast){
        toast.textContent = 'Message sent successfully';
        toast.classList.add('visible');
        toast.setAttribute('aria-hidden','false');
        setTimeout(()=>{
          toast.classList.remove('visible');
          toast.setAttribute('aria-hidden','true');
        }, 3000);
      }
    });
  }

  // Language switcher
  const translations = {
    en:{
      heroEyebrow:'POWER THAT IGNITES',
      heroTitle:'INDUSTRY',
      heroSub:'FIXTOP TRADING P.L.C — Strength. Precision. Endurance.',
      shopFeatured:'Shop Featured',
      learnMore:'Learn More',
      contactUs:'CONTACT US',
      feature1Title:'Fast Delivery',
      feature1Desc:'Same-day dispatch for urgent site orders.',
      feature2Title:'Certified Quality',
      feature2Desc:'All tools meet industry standards for safety and durability.',
      feature3Title:'Expert Support',
      feature3Desc:'365-day technical guidance and maintenance advice.',
      feature4Title:'Multi-Language Help',
      feature4Desc:'Switch between languages for an easier ordering experience.'
    },
    fr:{
      heroEyebrow:'PUISSANCE QUI ENFLAMME',
      heroTitle:'INDUSTRIE',
      heroSub:'FIXTOP TRADING P.L.C — Force. Précision. Endurance.',
      shopFeatured:'Acheter',
      learnMore:'En savoir plus',
      contactUs:'CONTACTEZ-NOUS',
      feature1Title:'Livraison rapide',
      feature1Desc:'Expédition le jour même pour les commandes urgentes.',
      feature2Title:'Qualité certifiée',
      feature2Desc:'Tous les outils respectent les normes de sécurité et de durabilité.',
      feature3Title:'Assistance expert',
      feature3Desc:'Conseils techniques 365 jours par an.',
      feature4Title:'Assistance multilingue',
      feature4Desc:'Basculez entre les langues pour faciliter la commande.'
    },
    ar:{
      heroEyebrow:'قُوَّة تُشْعِل',
      heroTitle:'الصِّنَاعَة',
      heroSub:'FIXTOP TRADING P.L.C — القوّة. الدقّة. التحمل.',
      shopFeatured:'تسوُّق',
      learnMore:'اعرف المزيد',
      contactUs:'اتصل بنا',
      feature1Title:'تسليم سريع',
      feature1Desc:'شحن في نفس اليوم للطلبات العاجلة.',
      feature2Title:'جودة معتمدة',
      feature2Desc:'جميع الأدوات تلبي معايير السلامة والمتانة.',
      feature3Title:'دعم خبير',
      feature3Desc:'إرشاد فني 365 يومًا في السنة.',
      feature4Title:'دعم بعدة لغات',
      feature4Desc:'التبديل بين اللغات لتجربة أسهل.'
    }
  };
  const langButtons = document.querySelectorAll('.lang-option');
  const textNodes = document.querySelectorAll('[data-key]');
  function setLanguage(lang){
    langButtons.forEach(btn=>btn.classList.toggle('active', btn.getAttribute('data-lang')===lang));
    if(lang==='ar') document.documentElement.dir='rtl'; else document.documentElement.dir='ltr';
    textNodes.forEach(node=>{
      const key = node.getAttribute('data-key');
      if(translations[lang] && translations[lang][key]) node.textContent = translations[lang][key];
    });
  }
  langButtons.forEach(btn=> btn.addEventListener('click', ()=> setLanguage(btn.getAttribute('data-lang'))));
  setLanguage('en');

  // Lazy load images in product grid with fallback
  const lazyImgs = document.querySelectorAll('img.lazy');
  if('IntersectionObserver' in window){
    const lazyObserver = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      })
    },{rootMargin:'100px'});
    lazyImgs.forEach(i=>lazyObserver.observe(i));
  } else {
    // fallback: load immediately
    lazyImgs.forEach(img=>{
      img.src = img.getAttribute('data-src');
      img.classList.remove('lazy');
    });
  }

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.gallery-item').forEach(img=>{
    img.addEventListener('click', ()=>{
      if(lightboxImg) lightboxImg.src = img.getAttribute('data-full') || img.src;
      if(lightbox) lightbox.setAttribute('aria-hidden','false');
    })
  })
  if(lightboxClose) lightboxClose.addEventListener('click', ()=> lightbox.setAttribute('aria-hidden','true'));
  if(lightbox) lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.setAttribute('aria-hidden','true'); })

  // Stats counters when visible
  const counters = document.querySelectorAll('.stat-value');
  if('IntersectionObserver' in window){
    const counterObserver = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'),10) || 0;
          let cur = 0; const step = Math.max(1, Math.floor(target/60));
          const t = setInterval(()=>{
            cur += step; if(cur>=target){ el.textContent = target; clearInterval(t); } else el.textContent = cur;
          }, 20);
          obs.unobserve(el);
        }
      })
    },{threshold:0.4});
    counters.forEach(c=>counterObserver.observe(c));
  } else {
    // fallback: set targets immediately
    counters.forEach(el=> el.textContent = el.getAttribute('data-target') || '0');
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const revealObs = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      })
    },{threshold:0.12});
    revealEls.forEach(e=>revealObs.observe(e));
  } else {
    revealEls.forEach(e=> e.classList.add('visible'));
  }

  // Back to top
  const back = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{ if(window.scrollY>400) back.style.display='block'; else back.style.display='none'; })
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
});
