(function(){
var b=document.querySelector('.menu'),nav=document.getElementById('nav');
function setMenu(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
b.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
document.getElementById('yr').textContent=new Date().getFullYear();
var tabs=[].slice.call(document.querySelectorAll('[role=tab]'));
function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
tabs.forEach(function(t,i){t.tabIndex=i?-1:0;t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){var k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();var n=tabs[(i+k+tabs.length)%tabs.length];n.focus();sel(n)}})});
var IM=['images/bg-1.jpg','images/bg-2.jpg','images/bg-3.jpg','images/bg-4.jpg','images/bg-5.jpg','images/bg-6.jpg'];
var secs=[].slice.call(document.querySelectorAll('main > section'));
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
var q=[];while(q.length<secs.length){var n=sh(IM);if(q.length&&n[0]===q[q.length-1])n.push(n.shift());q=q.concat(n)}
secs.forEach(function(el,i){el.classList.add('bg');el.style.setProperty('--img','url("'+new URL(q[i],document.baseURI).href+'")')});
/* Enquiries are collected by Netlify Forms (see the form's data-netlify attribute). */
var f=document.getElementById('f'),st=document.getElementById('status');
function say(t,bad){st.textContent=t;st.className='show'+(bad?' bad':'')}
f.addEventListener('submit',function(e){
e.preventDefault();
var ok=true,first=null;
f.querySelectorAll('[required]').forEach(function(i){
var v=i.value.trim(),valid=v!==''&&(i.type!=='email'||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))&&(!i.minLength||i.minLength<0||v.length>=i.minLength);
i.setAttribute('aria-invalid',!valid);if(!valid){ok=false;first=first||i}});
if(!ok){say('Please correct the highlighted fields.',true);first.focus();return}
var btn=f.querySelector('button');btn.disabled=true;say('Sending your enquiry…');
fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()})
.then(function(r){if(!r.ok)throw 0;say('Thank you. Your enquiry has been sent and we will respond by email.');f.reset()})
.catch(function(){say('Your enquiry could not be sent. Please try again shortly.',true)})
.finally(function(){btn.disabled=false})});
f.addEventListener('input',function(e){if(e.target.getAttribute('aria-invalid')==='true')e.target.setAttribute('aria-invalid','false')});
})();
