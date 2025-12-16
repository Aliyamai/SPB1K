// animasi scroll reveal simple
window.addEventListener('scroll', () => {
  document.querySelectorAll('.card').forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

// coding borang permohonan masuk google sheet
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("studentForm");

  if (!form) {
    console.error("Form tidak dijumpai!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    // Checkbox lulusan → string
    if (Array.isArray(data.lulusan)) {
      data.lulusan = data.lulusan.join(", ");
    }

    // Status kesihatan
    const kesihatanChecked = document.querySelector('input[name="kesihatan"]:checked');
    data.statusKesihatan = kesihatanChecked
      ? "Tiada Masalah Kesihatan"
      : "Ada Masalah Kesihatan";

    fetch("https://script.google.com/macros/s/AKfycbxYw3WMvhLfc0u8oXHNVK8ED8zlL0doS_Gdou_YBOlF80icy59GmlsVPoXDEg-DXHmf/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === "success") {
        alert(res.message);
        form.reset();
      } else {
        alert("Ralat: " + res.message);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Tak boleh connect ke server.");
    });
  });
});



