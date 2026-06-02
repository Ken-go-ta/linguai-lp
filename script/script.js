"use strict";
const section   = document.getElementById('stepsSection');
const stepItems = document.querySelectorAll('.step-item');
const imgPanels = document.querySelectorAll('.img-panel');
const dots      = document.querySelectorAll('.progress-dot');
const PANELS    = 3;

let current = -1;

function activate(index) {
  if (index === current) return;
  current = index;
  stepItems.forEach(el => el.classList.toggle('active', +el.dataset.index === index));
  imgPanels.forEach(el => el.classList.toggle('active', +el.dataset.index === index));
  dots.forEach(el      => el.classList.toggle('active', +el.dataset.index === index));
}

window.addEventListener('scroll', () => {
  if (window.innerWidth < 1000) return;  // ← 768 から 1000 に変更
  const rect     = section.getBoundingClientRect();
  const scrolled = -rect.top;
  const total    = section.offsetHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, scrolled / total));
  const index    = Math.min(Math.floor(progress * PANELS), PANELS - 1);
  activate(index);
}, { passive: true });

window.addEventListener('resize', () => {
  if (window.innerWidth < 1000) activate(0);  // ← 768 から 1000 に変更
});

activate(0);

// animation
const features = document.querySelectorAll('.feature-wrapper');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.3 });

features.forEach((feature, index) => {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  feature.style.transitionDelay = isMobile ? '0s' : `${index * 0.3}s`;
  observer.observe(feature);
});

