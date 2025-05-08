const btnVerMas = document.getElementById('btnVerMas');
  const btnVerMenos = document.getElementById('btnVerMenos');
  let itemsOcultos = document.querySelectorAll('.galeria-item.oculto');

  function mostrarMasElementos() {
    const elementosAMostrar = Array.from(itemsOcultos).slice(0, 3);

    if (elementosAMostrar.length === 0) {
      btnVerMas.style.display = 'none';
      return;
    }

    elementosAMostrar.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('oculto');
        item.style.animation = 'fadeIn 0.5s ease-out forwards';
      }, index * 100);
    });

    itemsOcultos = document.querySelectorAll('.galeria-item.oculto');

    // Si ya no quedan ocultos, muestra botón "Ver menos"
    if (itemsOcultos.length === 0) {
      btnVerMas.classList.add('oculto');
      btnVerMenos.classList.remove('oculto');
    }
  }

  function ocultarElementos() {
    const elementosAMostrar = document.querySelectorAll('.galeria-item:not(:nth-child(-n+3))');

    elementosAMostrar.forEach((item) => {
      item.classList.add('oculto');
    });

    btnVerMas.classList.remove('oculto');
    btnVerMenos.classList.add('oculto');
    itemsOcultos = document.querySelectorAll('.galeria-item.oculto');
  }

  btnVerMas.addEventListener('click', mostrarMasElementos);
  btnVerMenos.addEventListener('click', ocultarElementos);

  // Animación fadeIn
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
//slider
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideInterval;
    
    const sliderDots = document.createElement('div');
    sliderDots.className = 'slider-dots';
   
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
            goToSlide(i);
        });
        sliderDots.appendChild(dot);
    }
    
  
    document.querySelector('.slider').appendChild(sliderDots);
    
       function goToSlide(n) {
       
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
   
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === n) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
       
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }
    
   
    window.moveSlide = function(direction) {
        goToSlide(currentSlide + direction);
        resetInterval();
    };
    
    
    function startSlideshow() {
     
        if (slideInterval) clearInterval(slideInterval);
        
        
        slideInterval = setInterval(() => {
            moveSlide(1);
        }, 4000); 
    }
    
   
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideshow();
    }
    
    
    startSlideshow();
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.slider');
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            
            moveSlide(1);
        } else if (touchEndX > touchStartX + 50) {
            
            moveSlide(-1);
        }
    }
});
