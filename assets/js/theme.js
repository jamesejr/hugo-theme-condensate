(function () {
  var root = document.documentElement;

  // Light/dark toggle. In "system" mode there is no data-theme attribute until
  // the reader picks one; the choice is then remembered in localStorage.
  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Click-to-load embeds (YouTube, Vimeo, GitHub Gist). Nothing is requested from
  // the provider until the reader clicks, and the content runs in a sandboxed
  // iframe. The URL is checked against the provider's host before it is used.
  var EMBED_HOSTS = {
    youtube: "https://www.youtube-nocookie.com/embed/",
    vimeo: "https://player.vimeo.com/video/",
    gist: "https://gist.github.com/"
  };
  document.querySelectorAll(".embed[data-embed-src]").forEach(function (embed) {
    var kind = embed.dataset.embedKind;
    var src = embed.dataset.embedSrc;
    var card = embed.querySelector(".embed-card");
    if (!card || !EMBED_HOSTS[kind] || src.indexOf(EMBED_HOSTS[kind]) !== 0 ||
        !/^[\w:\/.?=&%-]+$/.test(src)) return;

    card.addEventListener("click", function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      var frame = document.createElement("iframe");
      frame.title = embed.dataset.embedTitle || "";
      if (kind === "gist") {
        // Opaque origin (no allow-same-origin): the gist script cannot touch this
        // page, its cookies or its storage. It only reports its height back.
        frame.setAttribute("sandbox", "allow-scripts allow-popups allow-popups-to-escape-sandbox");
        frame.referrerPolicy = "no-referrer";
        frame.srcdoc = '<base target="_blank"><style>body{margin:0}</style>' +
          '<script src="' + src + '"><\/script>' +
          '<script>function r(){parent.postMessage({embedHeight:document.documentElement.scrollHeight},"*")}' +
          'addEventListener("load",r);new ResizeObserver(r).observe(document.body)<\/script>';
        window.addEventListener("message", function (m) {
          var h = m.data && m.data.embedHeight;
          if (m.source === frame.contentWindow && typeof h === "number" && h > 0) {
            frame.style.height = Math.min(Math.ceil(h), 1600) + "px";
          }
        });
      } else {
        frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox");
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        frame.allow = "autoplay; fullscreen; picture-in-picture";
        frame.allowFullscreen = true;
        frame.src = src;
      }
      card.replaceWith(frame);
      frame.focus();
    });
  });

  // Copy buttons on code blocks.
  document.querySelectorAll(".prose .highlight, .prose > pre").forEach(function (block) {
    var wrapper = block;
    if (block.tagName === "PRE") {
      wrapper = document.createElement("div");
      wrapper.className = "highlight";
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);
    }
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var codes = wrapper.querySelectorAll("code");
      var code = codes[codes.length - 1];
      if (!code || !navigator.clipboard) return;
      var copy = code.cloneNode(true);
      copy.querySelectorAll(".ln, .lnt").forEach(function (n) { n.remove(); });
      navigator.clipboard.writeText(copy.textContent).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      });
    });
    wrapper.appendChild(btn);
  });
})();
