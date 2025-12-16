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
      const form = document.getElementById("studentForm");

      form.addEventListener("submit", function(e) {
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

        fetch("https://script.google.com/macros/s/AKfycbydJRdDuu-o60sZFiCbHcC8JRjdpOAOpdzpkPBy50rfEQxjBhw7j20K5hWww3q--IHs/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
          alert("Permohonan berjaya dihantar!");
          form.reset();
        })
        .catch(err => {
          alert("Ralat berlaku. Sila cuba lagi.");
          console.error(err);
        });
      });


