'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector(".btn--scroll-to");
const section1=document.querySelector("#section--1");
const nav=document.querySelector(".nav__links");
const tabs=document.querySelectorAll(".operations__tab");
const tabContainer=document.querySelector(".operations__tab-container");
const tabContent=document.querySelectorAll(".operations__content");
const navi=document.querySelector(".nav");
const header=document.querySelector(".header");
const imgSelect=document.querySelectorAll("img[data-src]");




//-----------------Modal Window---------------
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//-----------------Learn More (Smooth Scroll)---------------
btnScrollTo.addEventListener('click',function(e){
  const s1coords=section1.getBoundingClientRect();
  section1.scrollIntoView({behavior:'smooth'});
})


//-----------------Navigation---------------
nav.addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains("nav__link")){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})


//-----------------Tabbed Component---------------
tabContainer.addEventListener('click',function(e){
const clicked=e.target.closest(".operations__tab");
if(!clicked) return;

tabs.forEach(t=>t.classList.remove("operations__tab--active"));
clicked.classList.add('operations__tab--active');
tabContent.forEach(t=>t.classList.remove("operations__content--active"));
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
});


//-----------------Nav Fade animation---------------

const hadleHover=function(e,op){
    if(e.target.classList.contains("nav__link")){
   const link=e.target;
   const sibling=link.closest('.nav').querySelectorAll('.nav__link');
   const logo=link.closest('.nav').querySelector('img');

   sibling.forEach(sb=>{
    if(sb!==link)
      sb.style.opacity=op;
   })
   logo.style.opacity=op;
  }
}

nav.addEventListener('mouseover',function(e){
  hadleHover(e,0.5);
})

nav.addEventListener('mouseout',function(e){
   hadleHover(e,1);
})


//-----------------Sticky Event---------------

const navH=navi.getBoundingClientRect().height;
const stickyNav=function(entries){
  const[entry]=entries;
  
  if(!entry.isIntersecting) navi.classList.add('sticky');
  else navi.classList.remove('sticky');
}
const obsOption={
  threshold:0,
  root:null,
  rootMargin:`-${navH}px`,
}


const headerObserver=new IntersectionObserver(stickyNav,obsOption)
headerObserver.observe(header)

//-----------------Fade scroll animation---------------
const allSections=document.querySelectorAll(".section");

const revealSection=function(entries,observer){
entries.forEach(entry=>{
if(!entry.isIntersecting) return;
entry.target.classList.remove("section--hidden");
observer.unobserve(entry.target);
})

}

const obs2Option={
  threshold:0.15,
  root:null,
}
const sectionObserver=new IntersectionObserver(revealSection,obs2Option)

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden")
})

//-----------------Lazy Loading---------------


const loadImg=function(entries,observer){
const[entry]=entries;

if(!entry.isIntersecting) return;

entry.target.src=entry.target.dataset.src;

entry.target.addEventListener('load',function(e){
entry.target.classList.remove("lazy-img")
})
observer.unobserve(entry.target);
}

const obs3Option={
  threshold:0,
  root:null,
  rootMargin:'200px'
}
const imageObserver=new IntersectionObserver(loadImg,obs3Option)

imgSelect.forEach(function(img){
  imageObserver.observe(img)
})


//-----------------Carasoul Slider---------------
const slides=document.querySelectorAll(".slide");
const btnLeft=document.querySelector(".slider__btn--left");
const btnRight=document.querySelector(".slider__btn--right");
const slider=document.querySelector(".slider");



let currSlide=0;
const maxSlide=slides.length;


const goToSlide=function(cur){
  slides.forEach((slide,i)=>slide.style.transform=`translateX(${100 * (i - cur)}%)`);
}

const nextSlide=function(){
  if(currSlide==maxSlide-1){
    currSlide=0;
  }
  else{
    currSlide++
  }
goToSlide(currSlide);
}


const prevSlide=function(){
  if(currSlide===0){
    currSlide=maxSlide-1;
  }
  else{
    currSlide--;
  }
  goToSlide(currSlide);
}


goToSlide(0);

btnRight.addEventListener('click',nextSlide)

btnLeft.addEventListener('click',prevSlide)

