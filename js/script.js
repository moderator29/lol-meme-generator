(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var themeToggle = document.getElementById("themeToggle");
  var storedTheme = localStorage.getItem("courio_theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = storedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    body.setAttribute("data-theme", t);
    themeToggle.textContent = t === "dark" ? "☀️" : "🌙";
    localStorage.setItem("courio_theme", t);
  }

  applyTheme(theme);

  themeToggle.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
  });

  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("mobile-open");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("mobile-open");
    });
  });

  function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.background = getComputedStyle(root).getPropertyValue("--brand");
    toast.style.color = "#fff";
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  var trackForm = document.getElementById("trackForm");
  var trackInput = document.getElementById("trackInput");
  var timeline = document.getElementById("timeline");

  trackForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!trackInput.value.trim()) return;
    timeline.classList.remove("show");
    void timeline.offsetWidth;
    timeline.classList.add("show");
    showToast("Tracking results updated for " + trackInput.value.trim().toUpperCase());
  });

  document.querySelectorAll(".quick-codes button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      trackInput.value = btn.getAttribute("data-sample");
      trackForm.dispatchEvent(new Event("submit"));
    });
  });

  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  var counters = document.querySelectorAll("[data-count]");
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute("data-count"), 10);
      var duration = 1400;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var value = Math.floor(progress * target);
        counter.textContent = value.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(step);
    });
  }

  var statsSection = document.getElementById("stats");
  if (statsSection && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
  } else {
    animateCounters();
  }

  var testimonials = [
    {
      quote: "COURIO cut our average delivery time almost in half. The live tracking alone has reduced our support tickets dramatically.",
      who: "Amara Okafor",
      role: "Operations lead, Lumen Retail"
    },
    {
      quote: "Switching to COURIO for our international orders was the best logistics decision we made this year. Customs clearance is seamless now.",
      who: "Daniel Reyes",
      role: "Founder, Northside Goods"
    },
    {
      quote: "The API integration took our developers under a day to ship. Rates, labels and tracking just work out of the box.",
      who: "Priya Nair",
      role: "CTO, Fernway Commerce"
    },
    {
      quote: "Our customers constantly compliment how accurate the delivery windows are. COURIO genuinely feels next generation.",
      who: "Tomasz Wojcik",
      role: "Customer experience manager, Bramble Co"
    }
  ];

  var testiCard = document.getElementById("testiCard");
  var testiDots = document.getElementById("testiDots");
  var currentTesti = 0;

  testimonials.forEach(function (item, index) {
    var dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", function () {
      currentTesti = index;
      renderTesti();
    });
    testiDots.appendChild(dot);
  });

  function renderTesti() {
    var data = testimonials[currentTesti];
    testiCard.style.opacity = 0;
    setTimeout(function () {
      testiCard.querySelector(".quote").textContent = data.quote;
      testiCard.querySelector(".who").textContent = data.who;
      testiCard.querySelector(".role").textContent = data.role;
      testiCard.style.opacity = 1;
    }, 200);
    testiDots.querySelectorAll("button").forEach(function (dot, index) {
      dot.classList.toggle("active", index === currentTesti);
    });
  }

  testiCard.style.transition = "opacity 0.2s ease";

  setInterval(function () {
    currentTesti = (currentTesti + 1) % testimonials.length;
    renderTesti();
  }, 6000);

  var newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showToast("You are subscribed. Thank you for joining COURIO.");
    newsletterForm.reset();
  });

  document.querySelectorAll('.nav-links a, a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (href && href.length > 1 && href.charAt(0) === "#") {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();
