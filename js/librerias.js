//librerías
Toastify({
    text: "¡Bievenido!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #FF8065, #FBD369)",
    }
  }).showToast();


 const reporteGuardadoSwal = () => {
  Swal.fire({
    title: "Tu Reporte ha sido guardado satisfactoriamente",
    icon: "success",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  });
  document.getElementById("reporteCompleto").style.display = "none";
}