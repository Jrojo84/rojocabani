document.addEventListener('DOMContentLoaded', () => {
  const jsonPath = './products.json';

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

        let hoverInterval = null;
        let currentIndex = 0;

        const startCycle = () => {
          if (imgs.length <= 1) return;
          if (hoverInterval) return;
          hoverInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % imgs.length;
            imgEl.src = imgs[currentIndex];
          }, 600);
        };

        const stopCycle = () => {
          if (hoverInterval) {
            clearInterval(hoverInterval);
            hoverInterval = null;
          }
          currentIndex = 0;
          imgEl.src = imgs[0];
        };

        card.addEventListener('mouseenter', startCycle);
        card.addEventListener('mouseleave', stopCycle);
        card.addEventListener('touchstart', startCycle);
        card.addEventListener('touchend', stopCycle);

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
