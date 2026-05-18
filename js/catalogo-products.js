document.addEventListener('DOMContentLoaded', () => {
  let basePath = window.location.hostname === 'jrojo84.github.io' ? '/rojocabani' : '';
  const jsonPath = basePath + '/products.json';

  const normalize = (s) => s?.trim().toLowerCase();

  fetch(jsonPath)
    .then((r) => r.json())
    .then((products) => {
      const selector = '.catalogo-card, .product-card, [data-product-id]';
      const cards = document.querySelectorAll(selector);

      const prefetchImage = (src) => {
        const img = new Image();
        img.src = src;
      };

      const applyProductToCard = (card, product) => {
        const imgEl = card.querySelector('img');
        const titleEl = card.querySelector('h3');
        const linkEl = card.querySelector('a.btn-whatsapp');
        if (!imgEl) return;

        const imgs = Array.isArray(product.images) ? product.images : [];
        if (!imgs.length) return;

        imgEl.src = imgs[0];
        if (product.whatsapp && linkEl) linkEl.href = product.whatsapp;
        imgs.slice(1).forEach(prefetchImage);

        let imageInterval = null;
        let currentIndex = 0;

        // Iniciar ciclic automático de imágenes (3 segundos por imagen)
        const autoStartCycle = () => {
          if (imgs.length <= 1) return;
          if (imageInterval) return;
          imageInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % imgs.length;
            imgEl.src = imgs[currentIndex];
          }, 3000);
        };

        // Iniciar el ciclic automático inmediatamente
        autoStartCycle();

        // En hover, acelerar el ciclic (para compatibilidad)
        const startFastCycle = () => {
          if (imageInterval) clearInterval(imageInterval);
          imageInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % imgs.length;
            imgEl.src = imgs[currentIndex];
          }, 3000);
        };

        const resetToAutoSpeed = () => {
          if (imageInterval) clearInterval(imageInterval);
          autoStartCycle();
        };

        card.addEventListener('mouseenter', startFastCycle);
        card.addEventListener('mouseleave', resetToAutoSpeed);
        card.addEventListener('touchstart', startFastCycle);
        card.addEventListener('touchend', resetToAutoSpeed);

        imgEl.addEventListener('error', () => {
          if (imgEl.dataset.fallback) return;
          imgEl.dataset.fallback = '1';
          imgEl.src = imgs[0];
        });
      };

      cards.forEach((card) => {
        // priority: data-product-id -> title match
        const dataId = card.getAttribute('data-product-id');
        let product = null;
        if (dataId) {
          product = products.find((p) => p.id === dataId);
        }

        if (!product) {
          const titleEl = card.querySelector('h3');
          if (titleEl) {
            const title = normalize(titleEl.textContent);
            product = products.find((p) => normalize(p.title) === title);
          }
        }

        if (product) applyProductToCard(card, product);
      });
    })
    .catch((err) => {
      console.error('No se pudo cargar products.json', err);
    });
});
