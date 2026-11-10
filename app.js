(function(){
  var d=document;
  d.querySelectorAll('.rok').forEach(function(e){e.textContent=new Date().getFullYear();});

  // menu mobilne
  var b=d.querySelector('.burger'),n=d.getElementById('nav');
  if(b&&n){
    b.addEventListener('click',function(){var o=n.classList.toggle('otw');b.setAttribute('aria-expanded',o);});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('otw');b.setAttribute('aria-expanded','false');}});
  }

  // aktywna pozycja menu na stronie głównej
  var linki=[].slice.call(d.querySelectorAll('.nav a[href^="#"]'));
  if(linki.length&&'IntersectionObserver' in window){
    var mapa={};linki.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)mapa[s.id]=a;});
    var io=new IntersectionObserver(function(w){w.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.classList.remove('akt');a.removeAttribute('aria-current');});var a=mapa[x.target.id];if(a){a.classList.add('akt');a.setAttribute('aria-current','true');}}});},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(mapa).forEach(function(id){io.observe(d.getElementById(id));});
  }

  // wjazd sekcji
  var wj=d.querySelectorAll('.wjazd');
  if('IntersectionObserver' in window){
    var o2=new IntersectionObserver(function(w){w.forEach(function(x){if(x.isIntersecting){x.target.classList.add('jest');o2.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});
    wj.forEach(function(e){o2.observe(e);});
  }else wj.forEach(function(e){e.classList.add('jest');});

  // galeria: palec, mysz, strzałki
  var t=d.getElementById('tor');
  if(t){
    var pasek=d.getElementById('pasek'),btn=d.querySelectorAll('.tor-nawig button');
    function krok(){var k=t.querySelector('.karta');return k?k.getBoundingClientRect().width+20:300;}
    function stan(){
      var max=t.scrollWidth-t.clientWidth,p=max>0?t.scrollLeft/max:0,w=Math.max(.12,t.clientWidth/t.scrollWidth);
      pasek.style.width=(w*100)+'%';pasek.style.left=(p*(1-w)*100)+'%';
      btn[0].disabled=t.scrollLeft<4;btn[1].disabled=t.scrollLeft>max-4;
    }
    btn.forEach(function(x){x.addEventListener('click',function(){t.scrollBy({left:krok()*+x.dataset.kier,behavior:'smooth'});});});
    t.addEventListener('scroll',stan,{passive:true});window.addEventListener('resize',stan);stan();
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){t.scrollBy({left:krok(),behavior:'smooth'});e.preventDefault();}if(e.key==='ArrowLeft'){t.scrollBy({left:-krok(),behavior:'smooth'});e.preventDefault();}});
    var x0=0,s0=0,wcisk=false,ruch=false;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;wcisk=true;ruch=false;x0=e.clientX;s0=t.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!wcisk)return;var dx=e.clientX-x0;if(Math.abs(dx)>4){ruch=true;t.classList.add('ciag');}if(ruch)t.scrollLeft=s0-dx;});
    window.addEventListener('pointerup',function(){if(!wcisk)return;wcisk=false;if(ruch){t.classList.remove('ciag');var k=krok();t.scrollTo({left:Math.round(t.scrollLeft/k)*k,behavior:'smooth'});}});
    t.addEventListener('dragstart',function(e){e.preventDefault();});
  }

  // formularz pokazowy
  var f=d.getElementById('form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('form-info').textContent='To podgląd strony. W wersji docelowej zapytanie trafi na biuro@widakengineering.pl.';});}
})();
