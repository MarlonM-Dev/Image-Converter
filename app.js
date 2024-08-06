document
  .getElementById("fileInput")
  .addEventListener("change", handleFileSelect);
document.getElementById("convertImage").addEventListener("click", convertImage);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    // Hide the converted image container and success message initially
    document.getElementById("convertedImageContainer").style.display = "none";
    document.getElementById("successMessage").style.display = "none";
  }
}

function convertImage() {
  const fileInput = document.getElementById("fileInput");
  const formatSelect = document.getElementById("formatSelect");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload an image first.");
    return;
  }

  const format = formatSelect.value;
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function (blob) {
        const convertedFileSize = (blob.size / 1024).toFixed(2); // size in KB
        const url = URL.createObjectURL(blob);

        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = url;
        downloadLink.download = `converted-image.${format.split("/")[1]}`;
        downloadLink.textContent = `Download Converted Image`;

        document.getElementById(
          "convertedFileSizeDisplay"
        ).textContent = `Converted file size: ${convertedFileSize} KB`;
        document.getElementById("convertedImageContainer").style.display =
          "block"; // Show download link

        // Show success message and confetti
        showSuccessMessage();

        // Reset after the user has clicked the download link
        downloadLink.addEventListener("click", function () {
          setTimeout(() => {
            document.getElementById("convertedImageContainer").style.display =
              "none";
            document.getElementById("successMessage").style.display = "none"; // Hide success message
            fileInput.value = ""; // Reset file input
            document.getElementById("convertedFileSizeDisplay").textContent =
              "Converted file size: N/A";
            downloadLink.removeAttribute("href");
            downloadLink.removeAttribute("download");
          }, 1000); // Adjust timeout if needed
        });
      }, format);
    };
  };
  reader.readAsDataURL(file);
}

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// script.js

// Array of favicon URLs
const favicons = ["./icons/icon-indigo.ico", "./icons/icon-ico"];

// Duration of each color in milliseconds
const duration = 1000; // 1 second

let currentIndex = 0;

function changeFavicon() {
  const favicon = document.getElementById("dynamic-favicon");
  favicon.href = favicons[currentIndex];
  currentIndex = (currentIndex + 1) % favicons.length;
}

// Change favicon every `duration` milliseconds
setInterval(changeFavicon, duration);

// Initial favicon change
changeFavicon();
