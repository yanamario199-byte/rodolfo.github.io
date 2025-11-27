(function(){
const orbitName = document.getElementById('orbitName');
const orbit = document.querySelector('.orbit');
const toggle = document.getElementById('toggleSpin');
const speed = document.getElementById('speedRange');
const centerLabel = document.getElementById('centerLabel');


// Guards — si falta algo, no romper
if(!orbitName || !btn) {
console.warn('Elementos esenciales no encontrados — revisa index.html');
return;
}


// Actualizar nombre en la órbita
function updateName(name){
orbitName.textContent = name || 'TuNombre';
}


btn.addEventListener('click', ()=>{
const val = input.value.trim();
updateName(val);
input.value = '';
});


// Enter para actualizar
input.addEventListener('keydown', (e)=>{
if(e.key === 'Enter') btn.click();
});


// Pausar / Reanudar la órbita
let spinning = true;
toggle.addEventListener('click', ()=>{
spinning = !spinning;
if(orbit) orbit.style.animationPlayState = spinning ? 'running' : 'paused';
orbitName.style.animationPlayState = spinning ? 'running' : 'paused';
toggle.textContent = spinning ? 'Pausar' : 'Reanudar';
});


// Velocidad: modificar duración de la animación
speed.addEventListener('input', ()=>{
const secs = Number(speed.value) || 12;
if(orbit) orbit.style.animationDuration = `${secs}s`;
// también contrarrotación para que el texto quede legible
orbitName.style.animationDuration = `${secs}s`;
});


// Leer querystring ?name=... al cargar
(function initFromQuery(){
try{
const p = new URLSearchParams(location.search);
const n = p.get('name');
if(n) updateName(decodeURIComponent(n));
}catch(e){ /* no crítico */ }
})();


// Mejora UX: animación prefer-reduced-motion
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if(mq.matches){
if(orbit) orbit.style.animation = 'none';
const hearts = document.querySelectorAll('.heart');
hearts.forEach(h => h.style.animation = 'none');
}


// Hook para desarrolladores: exponer API mínima sin contaminar global
window.__HeartFloating = {
setName: updateName,
setCenterLabel: (text)=>{ if(centerLabel) centerLabel.textContent = text }
};


});