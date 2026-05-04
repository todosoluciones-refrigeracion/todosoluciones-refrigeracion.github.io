document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const formStatus = document.getElementById("formStatus");
  const WHATSAPP_NUMBER = "5491135525512";

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }

      const formData = new FormData(bookingForm);

      const nombre = (formData.get("nombre") || "").toString().trim();
      const apellido = (formData.get("apellido") || "").toString().trim();
      const telefono = (formData.get("telefono") || "").toString().trim();
      const direccion = (formData.get("direccion") || "").toString().trim();
      const tipoTrabajo = (formData.get("tipoTrabajo") || "").toString().trim();
      const detalle = (formData.get("detalle") || "").toString().trim();

      if (!nombre || !apellido || !telefono || !direccion || !tipoTrabajo) {
        if (formStatus) {
          formStatus.textContent = "Por favor, completá todos los campos obligatorios.";
          formStatus.classList.add("error");
        }
        return;
      }

      const tipoTrabajoLabel = {
        instalacion: "Instalación",
        reparacion: "Reparación",
        mantenimiento: "Mantenimiento",
        otro: "Otro"
      }[tipoTrabajo] || tipoTrabajo;

      const mensaje = [
        "Hola, quiero solicitar un turno.",
        "",
        `Nombre: ${nombre} ${apellido}`,
        `Teléfono: ${telefono}`,
        `Dirección: ${direccion}`,
        `Tipo de trabajo: ${tipoTrabajoLabel}`,
        `Detalle: ${detalle || "Sin detalle adicional"}`
      ].join("\n");

      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
      const whatsappWindow = window.open(whatsappURL, "_blank");

      if (whatsappWindow) {
        if (formStatus) {
          formStatus.textContent = "Redirigiendo a WhatsApp...";
          formStatus.classList.add("success");
        }
        bookingForm.reset();
      } else {
        if (formStatus) {
          formStatus.textContent =
            "No se pudo abrir WhatsApp. Revisá si el navegador bloqueó la ventana emergente.";
          formStatus.classList.add("error");
        }
      }
    });
  }

  const testimonialTicker = document.getElementById("testimonialTicker");
  const testimonialSlides = Array.from(document.querySelectorAll(".testimonial-slide"));
  const testimonialPrev = document.getElementById("testimonialPrev");
  const testimonialNext = document.getElementById("testimonialNext");

  if (testimonialTicker && testimonialSlides.length > 0) {
    let currentTestimonial = 0;
    let testimonialInterval = null;

    function showTestimonial(index) {
      testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });
    }

    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
      currentTestimonial =
        (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
    }

    function startTestimonialAutoplay() {
      stopTestimonialAutoplay();
      testimonialInterval = setInterval(nextTestimonial, 4500);
    }

    function stopTestimonialAutoplay() {
      if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
      }
    }

    if (testimonialNext) {
      testimonialNext.addEventListener("click", () => {
        nextTestimonial();
        startTestimonialAutoplay();
      });
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener("click", () => {
        prevTestimonial();
        startTestimonialAutoplay();
      });
    }

    testimonialTicker.addEventListener("mouseenter", stopTestimonialAutoplay);
    testimonialTicker.addEventListener("mouseleave", startTestimonialAutoplay);

    showTestimonial(currentTestimonial);
    startTestimonialAutoplay();
  }
});