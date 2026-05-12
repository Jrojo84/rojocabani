document.addEventListener("DOMContentLoaded", cargarComponentes);

function cargarComponentes() {

    let headerPath = "./componentes/header.html";
    let footerPath = "./componentes/footer.html";
    let whatsappMessage = "Hola, quiero más información y cotizar un pedido en Rojo Cabani";
    let whatsappUrl = `https://wa.me/51939260711?text=${encodeURIComponent(whatsappMessage)}`;

    fetch(headerPath)
        .then(res => res.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        });

    fetch(footerPath)
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });

    if (!document.querySelector(".whatsapp-float")) {
        const floatBtn = document.createElement("a");
        floatBtn.className = "whatsapp-float";
        floatBtn.href = whatsappUrl;
        floatBtn.target = "_blank";
        floatBtn.rel = "noopener";
        floatBtn.setAttribute("aria-label", "Contactar por WhatsApp");
        floatBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.15-.23.297-.921.927-.129 1.124.292.149 2.247 1.735 2.726 2.032.479.298.974.294 1.266-.08.292-.376 1.494-1.926 1.697-2.614.203-.687.101-.966-.301-1.278z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.059.547 4.063 1.56 5.774L.478 23.73l6.252-1.641C10.169 23.378 10.973 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 18.065c-.591 1.662-2.173 2.724-3.894 2.724a5.992 5.992 0 01-2.882-.735l-.221-.12-2.251.591.640-2.141-.146-.232a5.919 5.919 0 01-.979-3.272c0-3.278 2.669-5.941 5.948-5.941 1.586 0 3.076.619 4.198 1.740 1.122 1.122 1.738 2.611 1.738 4.197 0 3.278-2.669 5.941-5.948 5.941z"/>
            </svg>
        `;
        document.body.appendChild(floatBtn);
    }

}