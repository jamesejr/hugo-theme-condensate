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
      var code = wrapper.querySelector("code");
      if (!code || !navigator.clipboard) return;
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      });
    });
    wrapper.appendChild(btn);
  });
})();
