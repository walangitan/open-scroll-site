/* Paging for the book. Loaded in <head> so one page shows from the first paint;
   if this file never arrives, the pages simply stay stacked as one scroll. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  history.scrollRestoration = 'manual'; // Every page opens at its top, on Back as well.

  document.addEventListener('DOMContentLoaded', function () {
    var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var label = document.getElementById('page-label');
    var bookTitle = document.title;

    function currentIndex() {
      var i = pages.findIndex(function (p) { return '#' + p.id === location.hash; });
      return i < 0 ? 0 : i; // No hash, or one we don't know, is the cover.
    }

    function render(moveFocus) {
      var i = currentIndex();
      pages.forEach(function (p, n) { p.classList.toggle('current', n === i); });
      var page = pages[i];
      prev.disabled = i === 0;
      next.disabled = i === pages.length - 1;
      label.textContent = page.dataset.label;
      label.setAttribute('aria-label', page.dataset.label + ', go to Contents');
      document.title = page.dataset.title ? page.dataset.title + ' · ' + bookTitle : bookTitle;
      if (moveFocus) {
        window.scrollTo(0, 0);
        var heading = page.querySelector('h1, h2');
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }

    function go(i) {
      if (i < 0 || i >= pages.length) return;
      if (i === 0) { // The cover has no hash, and setting an empty one would leave a bare "#".
        history.pushState(null, '', location.pathname + location.search);
        render(true);
      } else {
        location.hash = pages[i].id; // Fires hashchange, which renders.
      }
    }

    prev.addEventListener('click', function () { go(currentIndex() - 1); });
    next.addEventListener('click', function () { go(currentIndex() + 1); });
    window.addEventListener('hashchange', function () { render(true); });
    document.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return; // Alt+Left is the browser's Back.
      if (e.key === 'ArrowLeft') go(currentIndex() - 1);
      if (e.key === 'ArrowRight') go(currentIndex() + 1);
    });

    render(false);
  });
})();
