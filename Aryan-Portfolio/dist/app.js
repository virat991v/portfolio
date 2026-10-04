'use strict';
document.getElementById('year').textContent=new Date().getFullYear();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){let ticking=false;const hero=document.querySelector('.hero'),photo=document.querySelector('.portrait img');function update(){const y=window.scrollY;if(y<hero.offsetHeight&&window.innerWidth>700)photo.style.transform=`translateY(${Math.min(y*.12,90)}px) scale(1.02)`;ticking=false}window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true})}
