(function () {
  let removed = false;
  const loader = document.getElementById('page-loader');

  function hideLoader(force) {
    if (!loader || removed) return;
    removed = true;

    // Fade out
    loader.classList.add('is-hidden');
    loader.setAttribute('aria-hidden', 'true');

    // Remove from DOM after transition
    const removeAfter = force ? 150 : 650; // quicker if forced by timeout
    setTimeout(() => {
      try { loader.parentNode && loader.parentNode.removeChild(loader); } catch (_) {}
    }, removeAfter);
  }

  // Safety timeout: don't keep users waiting if something blocks the load event
  const safety = setTimeout(() => hideLoader(true), 8000);

  // Hide on full load
  window.addEventListener('load', () => {
    clearTimeout(safety);
    // Give a tiny delay for a polished feel & to avoid flash
    setTimeout(() => hideLoader(false), 300);
  });

  // If DOM ready but cache served, still ensure safety timer exists
})();
