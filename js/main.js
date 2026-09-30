/* ============================================================
   Nosotros ♥  —  lógica
   ============================================================ */

(function () {
  "use strict";

  /**
   * Calcula el tiempo transcurrido entre una fecha de inicio y ahora,
   * desglosado en años, meses, días, horas, minutos y segundos.
   *
   * Usa aritmética de calendario: resta campo por campo y "pide prestado"
   * cuando un campo queda negativo, de forma que los meses y años reflejen
   * el calendario real (no promedios de 30 días).
   *
   * @param {Date} start - fecha de inicio
   * @param {Date} now   - fecha actual
   * @returns {{years:number, months:number, days:number, hours:number, minutes:number, seconds:number}}
   */
  function elapsed(start, now) {
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      // Días del mes anterior al mes actual
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  /** Rellena a dos dígitos (para horas/min/seg). */
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  // --- Inicializar cronómetros -------------------------------------------
  const timers = Array.from(document.querySelectorAll(".timer")).map(function (el) {
    return {
      start: new Date(el.dataset.start),
      fields: {
        years: el.querySelector('[data-unit="years"]'),
        months: el.querySelector('[data-unit="months"]'),
        days: el.querySelector('[data-unit="days"]'),
        hours: el.querySelector('[data-unit="hours"]'),
        minutes: el.querySelector('[data-unit="minutes"]'),
        seconds: el.querySelector('[data-unit="seconds"]'),
      },
    };
  });

  function updateTimers() {
    const now = new Date();
    timers.forEach(function (timer) {
      if (isNaN(timer.start.getTime())) return; // fecha inválida, saltar
      const e = elapsed(timer.start, now);
      timer.fields.years.textContent = e.years;
      timer.fields.months.textContent = e.months;
      timer.fields.days.textContent = e.days;
      timer.fields.hours.textContent = pad(e.hours);
      timer.fields.minutes.textContent = pad(e.minutes);
      timer.fields.seconds.textContent = pad(e.seconds);
    });
  }

  updateTimers();
  setInterval(updateTimers, 1000);

  // --- Animaciones de aparición al hacer scroll --------------------------
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Vuelve a ocultar los hero al salir (efecto aparecer/desaparecer)
            if (entry.target.classList.contains("hero")) {
              entry.target.classList.remove("is-visible");
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    document
      .querySelectorAll(".hero, .story-card")
      .forEach(function (el) {
        observer.observe(el);
      });
  } else {
    // Sin soporte: mostrar todo directamente
    document
      .querySelectorAll(".hero, .story-card")
      .forEach(function (el) {
        el.classList.add("is-visible");
      });
  }

  // --- Ocultar el indicador de scroll tras el primer scroll --------------
  const scrollHint = document.getElementById("scrollHint");
  let hintHidden = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!hintHidden && window.scrollY > 40) {
        scrollHint.classList.add("is-hidden");
        hintHidden = true;
      } else if (hintHidden && window.scrollY <= 40) {
        scrollHint.classList.remove("is-hidden");
        hintHidden = false;
      }
    },
    { passive: true }
  );
})();
