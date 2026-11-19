const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxImg.src = item.dataset.full; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');
}));
function closeLightbox(){ lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); lightboxImg.src=''; }
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
document.getElementById('shareBtn').addEventListener('click', async e => {
  e.preventDefault();
  const shareData = {title:'John Jenith & Nagakanni', text:'Join us to celebrate our wedding on 20 January 2027!', url:location.href};
  if(navigator.share){ try { await navigator.share(shareData); } catch(err){} }
  else if(navigator.clipboard){ await navigator.clipboard.writeText(location.href); alert('Invitation link copied!'); }
  else { prompt('Copy your invitation link:', location.href); }
});
