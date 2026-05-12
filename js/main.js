document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll("[data-slider]");

	sliders.forEach((slider) => {
		const sliderId = slider.getAttribute("data-slider");
		const prevButton = document.querySelector(`[data-slider-prev="${sliderId}"]`);
		const nextButton = document.querySelector(`[data-slider-next="${sliderId}"]`);

		const getScrollAmount = () => Math.max(320, Math.floor(slider.clientWidth * 0.92));

		if (prevButton) {
			prevButton.addEventListener("click", () => {
				slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
			});
		}

		if (nextButton) {
			nextButton.addEventListener("click", () => {
				slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
			});
		}
	});
});
