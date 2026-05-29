/* ===========================================================
   MAKE HER SMILE — Main JavaScript
   All interactivity: intro, typewriter, escaping NO button,
   confetti, date ideas, quick fire, cursor trail, easter egg
   =========================================================== */

(function () {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    name: 'Likitha',
    typewriterText: 'Hey Likitha... 💕',
    typewriterSpeed: 85,
    cursorTrailEnabled: true,
    cursorTrailThrottle: 60,      // ms between hearts
    floatingHeartsCount: 20,
    confettiCount: 150,
    noButtonEscapeRadius: 120,    // px — how close cursor needs to be
  };

  // ===== FUNNY MESSAGES (when chasing the NO button) =====
  const funnyMessages = [
    "Nope! Not happening 🏃‍♂️",
    "Are you sure? I'll bring snacks... 🍕",
    "Even my code wants you to say YES 💻",
    "Your cursor right now = me before asking you out 😅",
    "I'll let you pick the restaurant... 🍽️",
    "Fine, I'll even watch that show you like 📺",
    "I promise I won't be awkward... okay maybe a little 🙈",
    "My heart skipped a beat watching you chase that 💓",
    "Likitha please, the button is TIRED 😩",
    "You're really committed huh? Just. Say. YES! 😤",
    "The YES button is literally glowing for you 🥺",
    "I wrote 500+ lines of code for this... just say yes 😭",
    "FINE. I'll bring dessert too. Happy? 🧁",
    "Even the internet is rooting for us rn 🌐",
    "Okay at this point you're bullying the button 😂",
    "It's not giving up. And neither am I 💪",
    "Plot twist: the No button doesn't even work 😏",
  ];

  // ===== MARQUEE ITEMS =====
  const marqueeItems = [
    "Your laugh ✨",
    "Your Vaishno Devi trek stories 🏔️",
    "Your vibe 💫",
    "Our comfortable silence 💫",
    "The fact that you're reading this right now 🤭",
    "Your energy 🌸",
    "How you make everything fun",
    "How I already want a next time 💕",
  ];

  // ===== DATE IDEAS =====
  const dateIdeas = [
    { emoji: '👨‍🍳', title: 'Paneer Curry & Chai(Sorry! Coffee)', desc: "I'm cooking. I promise it's actually good." },
    { emoji: '🎬', title: 'Movie Night', desc: "A Scorsese or Nolan masterpiece. Popcorn is on you." },
    { emoji: '🎮', title: 'Game Night', desc: 'Loser buys the next round of food' },
    { emoji: '☕', title: 'Quiet Cafe', desc: 'Just vibes, good music, and zero weirdos from the park' },
    { emoji: '🌅', title: 'Sunset Drive', desc: 'More good music, no destination' },
    { emoji: '🎪', title: 'Surprise Me!', desc: 'Trust me on this one 😏(inkem alochinchale :) )' },
  ];

  // ===== QUICK FIRE QUESTIONS =====
const quickFireQuestions = [
    "Did I overthink the flower situation way too much? 🌸",
    "Are we officially sworn enemies of those guys at the park? 🥊",
    "Who has better music taste for bike rides? 🎵",
    "Will you judge me if I zone out next time? 😴",
    "Would you trust my cooking skills? 🍳",
  ];


  // ===== STATE =====
  let noAttempts = 0;
  let introOpened = false;
  let selectedIdeas = new Set();
  let lastTrailTime = 0;

  // ===== DOM REFERENCES =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);


  // ==========================================
  // 1. FLOATING BACKGROUND HEARTS
  // ==========================================
  function createFloatingHearts() {
    const container = $('#floating-bg');
    const hearts = ['💕', '💗', '✨', '💖', '🌸', '💫', '♡', '❤️‍🔥', '🩷', '🤍'];

    for (let i = 0; i < CONFIG.floatingHeartsCount; i++) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
      heart.style.animationDuration = (12 + Math.random() * 18) + 's';
      heart.style.animationDelay = (Math.random() * 20) + 's';
      container.appendChild(heart);
    }
  }


  // ==========================================
  // 2. CURSOR HEART TRAIL
  // ==========================================
  function initCursorTrail() {
    if (!CONFIG.cursorTrailEnabled) return;
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const trailHearts = ['💕', '💗', '✨', '💖', '🩷'];

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTrailTime < CONFIG.cursorTrailThrottle) return;
      lastTrailTime = now;

      const heart = document.createElement('span');
      heart.className = 'heart-trail';
      heart.textContent = trailHearts[Math.floor(Math.random() * trailHearts.length)];
      heart.style.left = e.clientX + 'px';
      heart.style.top = e.clientY + 'px';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1000);
    });
  }


  // ==========================================
  // 3. INTRO SPARKLES
  // ==========================================
  function createIntroSparkles() {
    const container = $('#intro-sparkles');
    const colors = ['#f9a8d4', '#d8b4fe', '#fda4af', '#fbcfe8', '#c084fc'];

    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.animationDelay = (Math.random() * 5) + 's';
      sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
      sparkle.style.width = (4 + Math.random() * 6) + 'px';
      sparkle.style.height = sparkle.style.width;
      container.appendChild(sparkle);
    }
  }


  // ==========================================
  // 4. INTRO OVERLAY HANDLING
  // ==========================================
  function initIntro() {
    const overlay = $('#intro-overlay');
    const openBtn = $('#open-btn');
    const heroContent = $('#hero-content');

    openBtn.addEventListener('click', () => {
      if (introOpened) return;
      introOpened = true;

      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
        heroContent.classList.add('show');
        startTypewriter();
      }, 800);
    });
  }


  // ==========================================
  // 5. TYPEWRITER EFFECT
  // ==========================================
  function startTypewriter() {
    const el = $('#typewriter');
    const cursor = $('#cursor-blink');
    const subtitle = $('#hero-subtitle');
    const text = CONFIG.typewriterText;
    let i = 0;

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, CONFIG.typewriterSpeed);
      } else {
        // Typing done — show subtitle
        setTimeout(() => {
          subtitle.classList.add('show');
        }, 400);
        // Hide cursor after a bit
        setTimeout(() => {
          cursor.style.display = 'none';
        }, 2500);
      }
    }

    type();
  }


  // ==========================================
  // 6. SCROLL-BASED REVEAL ANIMATIONS
  // ==========================================
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    $$('[data-animate]').forEach((el) => observer.observe(el));
  }


  // ==========================================
  // 7. MARQUEE
  // ==========================================
  function initMarquee() {
    const track = $('#marquee-track');

    function createItems() {
      return marqueeItems
        .map(
          (item) =>
            `<span class="marquee-item"><span class="dot"></span>${item}</span>`
        )
        .join('');
    }

    // Duplicate for seamless loop
    track.innerHTML = createItems() + createItems();
  }


  // ==========================================
  // 8. THE BIG QUESTION — YES/NO LOGIC
  // ==========================================
  function initBigQuestion() {
    const yesBtn = $('#yes-btn');
    const noBtn = $('#no-btn');
    const buttonsArea = $('#buttons-area');
    const funnyMsg = $('#funny-message');
    const counter = $('#attempt-counter');
    const celebration = $('#celebration');
    const celebrationContinue = $('#celebration-continue');

    // --- YES BUTTON ---
    yesBtn.addEventListener('click', () => {
      // Launch confetti
      launchConfetti();
      // Show celebration
      celebration.classList.add('show');
      // Scroll lock
      document.body.style.overflow = 'hidden';
    });

    // --- CELEBRATION CONTINUE ---
    celebrationContinue.addEventListener('click', () => {
      celebration.classList.remove('show');
      document.body.style.overflow = '';
      // Scroll to date ideas
      const dateIdeasSection = $('#date-ideas');
      setTimeout(() => {
        dateIdeasSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });

    // --- NO BUTTON ESCAPE (Desktop: mouseover) ---
    function escapeNo(e) {
      // Prevent if already celebrating
      if (celebration.classList.contains('show')) return;

      noAttempts++;

      // Show funny message
      const msgIndex = Math.min(noAttempts - 1, funnyMessages.length - 1);
      funnyMsg.innerHTML = `<p>${funnyMessages[msgIndex]}</p>`;

      // Update counter
      if (noAttempts >= 3) {
        counter.textContent = `Attempts to say no: ${noAttempts} (just give up already 😂)`;
      }

      // Teleport the button to random position within the area
      const area = buttonsArea.getBoundingClientRect();
      const btnWidth = noBtn.offsetWidth;
      const btnHeight = noBtn.offsetHeight;

      // Random position within viewport (more chaotic)
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const padding = 20;

      const maxX = viewW - btnWidth - padding;
      const maxY = viewH - btnHeight - padding;

      const randX = padding + Math.random() * (maxX - padding);
      const randY = padding + Math.random() * (maxY - padding);

      noBtn.style.position = 'fixed';
      noBtn.style.left = randX + 'px';
      noBtn.style.top = randY + 'px';
      noBtn.style.zIndex = '50';

      // Teleport animation
      noBtn.classList.remove('teleporting');
      void noBtn.offsetWidth; // force reflow
      noBtn.classList.add('teleporting');

      // Make YES button grow slightly with each attempt
      const scale = Math.min(1 + noAttempts * 0.05, 1.5);
      yesBtn.style.transform = `scale(${scale})`;

      // Prevent the click
      e.preventDefault();
      e.stopPropagation();
    }

    // Desktop: escape on hover
    noBtn.addEventListener('mouseenter', escapeNo);

    // Mobile: escape on touchstart
    noBtn.addEventListener('touchstart', (e) => {
      escapeNo(e);
      e.preventDefault();
    }, { passive: false });

    // If somehow clicked anyway (shouldn't happen but just in case)
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      escapeNo(e);
      funnyMsg.innerHTML = `<p>Nice try! But that button doesn't actually work 😏</p>`;
    });
  }


  // ==========================================
  // 9. CONFETTI
  // ==========================================
  function launchConfetti() {
    const container = $('#confetti-container');
    const colors = ['#ec4899', '#a855f7', '#f472b6', '#d8b4fe', '#fda4af',
      '#fbbf24', '#fb7185', '#c084fc', '#f9a8d4', '#fce7f3'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < CONFIG.confettiCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (6 + Math.random() * 10) + 'px';
      piece.style.height = piece.style.width;
      piece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '2px';
      piece.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
      piece.style.animationDelay = (Math.random() * 0.8) + 's';
      piece.style.opacity = (0.7 + Math.random() * 0.3);
      container.appendChild(piece);
    }

    // Clean up after animation
    setTimeout(() => {
      container.innerHTML = '';
    }, 5000);
  }


  // ==========================================
  // 10. DATE IDEAS
  // ==========================================
  function initDateIdeas() {
    const grid = $('#ideas-grid');
    const summary = $('#selected-summary');
    const countEl = $('#selected-count');

    // Create cards
    dateIdeas.forEach((idea, idx) => {
      const card = document.createElement('div');
      card.className = 'idea-card';
      card.setAttribute('data-animate', '');
      card.setAttribute('data-delay', (idx * 80).toString());
      card.innerHTML = `
        <span class="idea-emoji">${idea.emoji}</span>
        <p class="idea-title">${idea.title}</p>
        <p class="idea-desc">${idea.desc}</p>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        if (card.classList.contains('selected')) {
          selectedIdeas.add(idea.title);
        } else {
          selectedIdeas.delete(idea.title);
        }

        // Show/hide summary
        if (selectedIdeas.size > 0) {
          summary.classList.add('show');
          const responses = [
            `${selectedIdeas.size} selected — I like your taste 😏`,
            `${selectedIdeas.size} dates?! Ambitious. I'm in 😎`,
            `${selectedIdeas.size} picks! We're gonna be busy 🗓️`,
          ];
          countEl.textContent = responses[Math.min(selectedIdeas.size - 1, responses.length - 1)];
        } else {
          summary.classList.remove('show');
        }
      });

      grid.appendChild(card);
    });

    // Re-observe newly created elements
    setTimeout(reobserveNewElements, 100);
  }


  // ==========================================
  // 11. QUICK FIRE QUESTIONS
  // ==========================================
  function initQuickFire() {
    const container = $('#quickfire-container');

    quickFireQuestions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'qf-card';
      card.setAttribute('data-animate', '');
      card.setAttribute('data-delay', (idx * 100).toString());
      card.innerHTML = `
        <p class="qf-question">${q}</p>
        <div class="qf-buttons">
          <button class="qf-yes">Yes 💕</button>
          <button class="qf-no">Nope</button>
        </div>
      `;

      const yesBtn = card.querySelector('.qf-yes');
      const noBtn = card.querySelector('.qf-no');
      const buttonsDiv = card.querySelector('.qf-buttons');

      yesBtn.addEventListener('click', () => {
        if (card.classList.contains('answered')) return;
        card.classList.add('answered');
        buttonsDiv.innerHTML = '';
        const label = document.createElement('p');
        label.className = 'qf-answer-label';
        label.textContent = getYesResponse();
        card.appendChild(label);
      });

      // No button shrinks on hover (desktop) or touch (mobile)
      noBtn.addEventListener('mouseenter', () => {
        noBtn.style.transform = 'scale(0.5)';
        noBtn.style.opacity = '0.3';
        noBtn.textContent = '🥺';
      });

      noBtn.addEventListener('mouseleave', () => {
        noBtn.style.transform = 'scale(1)';
        noBtn.style.opacity = '1';
        noBtn.textContent = 'Nope';
      });

      noBtn.addEventListener('click', () => {
        if (card.classList.contains('answered')) return;
        // Clicking No still registers as Yes 😂
        card.classList.add('answered');
        buttonsDiv.innerHTML = '';
        const label = document.createElement('p');
        label.className = 'qf-answer-label';
        label.textContent = "I'll count that as a yes 😂";
        card.appendChild(label);
      });

      container.appendChild(card);
    });

    setTimeout(reobserveNewElements, 100);
  }

  function getYesResponse() {
    const responses = [
      "I knew it 😏",
      "Good answer 💕",
      "That's what I thought 🤭",
      "Correct! 🎯",
      "Aww 🥹",
      "You're the best 💗",
      "10/10 answer ✨",
      "My heart just did a thing 💓",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }


  // ==========================================
  // 12. EASTER EGG
  // ==========================================
  function initEasterEgg() {
    const trigger = $('#easter-egg');
    const modal = $('#easter-egg-modal');
    const closeBtn = $('#ee-close');

    trigger.addEventListener('click', () => {
      modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }


  // ==========================================
  // 13. RE-OBSERVE DYNAMICALLY CREATED ELEMENTS
  // ==========================================
  function reobserveNewElements() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    $$('[data-animate]:not(.visible)').forEach((el) => observer.observe(el));
  }


  // ==========================================
  // INITIALIZE EVERYTHING
  // ==========================================
  function init() {
    createFloatingHearts();
    createIntroSparkles();
    initCursorTrail();
    initIntro();
    initScrollAnimations();
    initMarquee();
    initBigQuestion();
    initDateIdeas();
    initQuickFire();
    initEasterEgg();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
