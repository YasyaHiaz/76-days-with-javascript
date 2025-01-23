// Fungsi untuk membuat QR-Code menggunakan API goqr.me
const generateQRCode = () => {
    const urlInput = document.getElementById("url-input");
    const qrCodeImage = document.getElementById("qr-code");
    const qrPopup = document.getElementById("qr-popup");
  
    const url = urlInput.value.trim();
    if (!url) {
      alert("Masukkan URL terlebih dahulu!");
      return;
    }
  
    // Endpoint API dengan parameter data dan ukuran
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
  
    // Atur sumber gambar ke URL API
    qrCodeImage.src = apiUrl;
  
    // Tampilkan pop-up QR-Code dengan animasi
    qrPopup.style.display = "block";
  };
  
  // Event Listener untuk tombol Generate
  document.getElementById("generate-btn").addEventListener("click", generateQRCode);
  