document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll("[data-slider]");

	sliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-slider");
		const prevButton = document.querySelector(`[data-slider-prev="${sliderId}"]`);
		const nextButton = document.querySelector(`[data-slider-next="${sliderId}"]`);
		const cards = Array.from(slider.querySelectorAll(".product-card"));
		let currentIndex = 0;

		const goToCard = (targetIndex) => {
			if (!cards.length) return;
			const total = cards.length;
			currentIndex = (targetIndex + total) % total;
			const card = cards[currentIndex];
			const targetLeft = card.offsetLeft - ((slider.clientWidth - card.clientWidth) / 2);
			slider.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
		};

		if (prevButton) {
			prevButton.addEventListener("click", () => {
				goToCard(currentIndex - 1);
			});
		}

		if (nextButton) {
			nextButton.addEventListener("click", () => {
				goToCard(currentIndex + 1);
			});
		}

		slider.addEventListener("scroll", () => {
			if (!cards.length) return;
			let closestIndex = 0;
			let minDistance = Number.POSITIVE_INFINITY;
			cards.forEach((card, index) => {
				const center = card.offsetLeft + (card.clientWidth / 2);
				const sliderCenter = slider.scrollLeft + (slider.clientWidth / 2);
				const distance = Math.abs(center - sliderCenter);
				if (distance < minDistance) {
					minDistance = distance;
					closestIndex = index;
				}
			});
			currentIndex = closestIndex;
		}, { passive: true });

		// Autoplay cada 3 segundos
		let autoplayInterval;
		const startAutoplay = () => {
			autoplayInterval = setInterval(() => {
				goToCard(currentIndex + 1);
			}, 3000);
		};

		const stopAutoplay = () => {
			clearInterval(autoplayInterval);
		};

		slider.addEventListener("mouseenter", stopAutoplay);
		slider.addEventListener("mouseleave", startAutoplay);
		slider.addEventListener("touchstart", stopAutoplay);
		slider.addEventListener("touchend", startAutoplay);

		prevButton?.addEventListener("click", () => {
			stopAutoplay();
			setTimeout(startAutoplay, 5000);
		});

		nextButton?.addEventListener("click", () => {
			stopAutoplay();
			setTimeout(startAutoplay, 5000);
		});

		startAutoplay();
	});

});
