var curser=document.querySelector("#cursor")
var curserblr=document.querySelector("#cursor-blur")

document.addEventListener("mousemove",function(dets){
curser.style.left=dets.x+"px"
curser.style.top=dets.y+"px"
curserblr.style.left=dets.x-250+"px"
curserblr.style.top=dets.y-250+"px"
})

var allH4=document.querySelectorAll("nav h4")

allH4.forEach(function(e){
e.addEventListener("mouseenter",function(){
    curser.style.scale=3
    curser.style.border="1px solid #fff"
    curser.style.backgroundColor="transparent"
})
e.addEventListener("mouseleave",function(){
    curser.style.scale=1
    curser.style.border="0px solid #95c11e"
    curser.style.backgroundColor="#95c11e"
})
})


gsap.to("nav",{
    backgroundColor:"#000",
    duration:0.5,
    height:"110px",
    scrollTrigger:{
        trigger:"nav",
        scroller:"body",
        start:"top -10%",
        end:"top -11%",
        scrub:2,
    }
})

gsap.to("#main",{
    backgroundColor:"#000",
    scrollTrigger:{
        trigger:"#main",
        scroller:"body",
        start:"top -25%",
        end:"top -70%",
        scrub:2,
    }
})

gsap.from("#about img,#about-us",{
    y:50,
    opacity:0,
    duration:2,
    scrollTrigger:{
        trigger:"#about",
        scroller:"body",
        start:"top 70%",
        end:"top 65%",
        scrub:1,
    }
})

gsap.from(".card",{
    scale:0.8,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:".card",
        scroller:"body",
        start:"top 70%",
        end:"top 65%",
        scrub:1,
    }
})

document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        rotateX: 20,
        rotateY: 20,
        duration: 0.1,
      });
    });
  
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.1,
      });
    });
  })