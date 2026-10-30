/**
 * MNEMO — Core Website Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close when clicking outside or clicking any mobile link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 3. Interactive Showcase Tab Switcher
  const showcaseData = {
    notes: {
      title: "Clean, Organized Note-Taking",
      desc: "Structure your thoughts with nested folders, categories, pinned notes, and instant access to your recently used ideas without cluttered distractions.",
      image: "assets/images/screen_home_light.png",
      alt: "Mnemo Notes Home Screen",
      features: [
        "Smart categorisation and tag-based grouping",
        "Pin priority notes to the top of your feed",
        "Recent notes quick-switcher bar",
        "Distraction-free, fluid material motion"
      ]
    },
    editor: {
      title: "Rich Typography & Markdown",
      desc: "Write the way your mind thinks. Full Markdown support paired with advanced text manipulation tools inspired by power-editor workflows like Notepad++.",
      image: "assets/images/screen_editor.png",
      alt: "Mnemo Markdown & Typography Editor",
      features: [
        "Instant live Markdown rendering",
        "Notepad++ inspired line operations & case conversions",
        "Precision character, word, and reading-time metrics",
        "High-fidelity PDF export and clean sharing"
      ]
    },
    ask: {
      title: "Mnemo Ask — Semantic Retrieval",
      desc: "Engage in intelligent dialogue with your entire repository. Ask questions across all your notes to uncover insights, summarize threads, and connect ideas.",
      image: "assets/images/screen_ask.png",
      alt: "Mnemo Ask AI Interface",
      features: [
        "Deep semantic queries over your private notes",
        "Citations referencing the exact source notes",
        "Optional on-device local model integration",
        "Strict boundary: Your notes remain your own"
      ]
    },
    memory: {
      title: "Memory AI — Uncover Forgotten Context",
      desc: "Mnemo continuously maps knowledge patterns across your workspaces, proactively surfacing forgotten ideas, themes, and related research when you need them most.",
      image: "assets/images/screen_memory.png",
      alt: "Mnemo Memory Insights Screen",
      features: [
        "Automatic conceptual linking between notes",
        "Workspace memory recap and recurring topics",
        "Proactive recall without manual tagging",
        "Private local knowledge graph synthesis"
      ]
    },
    search: {
      title: "Unified Fast Search",
      desc: "Find any phrase, hashtag, folder, or concept in milliseconds with full-text instant search and intelligent filtering.",
      image: "assets/images/screen_search.png",
      alt: "Mnemo Unified Search",
      features: [
        "Sub-millisecond local SQLite search indexing",
        "Filter by tags, folders, media type, and dates",
        "Highlighted search matching in note previews",
        "Search drawer with instant recent queries"
      ]
    },
    photo: {
      title: "Photo Notes & Precision Drawing",
      desc: "Capture visual ideas alongside your writing. Annotate pictures with precision strokes, draw sketches directly on the canvas, and bundle visuals effortlessly.",
      image: "assets/images/screen_photo.png",
      alt: "Mnemo Photo & Drawing Screen",
      features: [
        "Embed photos directly into note documents",
        "Precision vector drawing & stylus annotation",
        "High-resolution image retention with local caching",
        "Full export to formatted PDF documents"
      ]
    }
  };

  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const showcaseImage = document.getElementById('showcase-image');
  const showcaseTitle = document.getElementById('showcase-title');
  const showcaseDesc = document.getElementById('showcase-desc');
  const showcaseList = document.getElementById('showcase-list');

  if (showcaseTabs.length && showcaseImage && showcaseTitle) {
    showcaseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabKey = tab.getAttribute('data-tab');
        if (!showcaseData[tabKey]) return;

        showcaseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const data = showcaseData[tabKey];

        // Smooth fade out/in effect
        showcaseImage.style.opacity = '0';
        showcaseImage.style.transform = 'scale(0.97)';

        setTimeout(() => {
          showcaseImage.src = data.image;
          showcaseImage.alt = data.alt;
          showcaseTitle.textContent = data.title;
          showcaseDesc.textContent = data.desc;

          if (showcaseList) {
            showcaseList.innerHTML = data.features.map(f => `
              <li class="showcase-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </li>
            `).join('');
          }

          showcaseImage.style.opacity = '1';
          showcaseImage.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
