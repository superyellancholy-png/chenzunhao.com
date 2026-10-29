(function () {
  var btns = document.querySelectorAll('.filter__btn');
  var cards = document.querySelectorAll('.card');

  function applyFilter(f) {
    btns.forEach(function (b) {
      var on = b.dataset.filter === f;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    cards.forEach(function (c) {
      var tags = (c.dataset.tags || '').split(' ');
      c.hidden = !(f === 'all' || tags.indexOf(f) > -1);
    });
  }

  btns.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.dataset.filter); });
  });

  document.querySelectorAll('[data-filter-jump]').forEach(function (a) {
    a.addEventListener('click', function () { applyFilter(a.dataset.filterJump); });
  });

  document.querySelectorAll('a.is-todo, a.is-disabled').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  var mail = document.querySelector('.contact__email');
  if (mail) {
    mail.addEventListener('click', function () {
      var v = mail.dataset.copy;
      if (!v || !navigator.clipboard) return;
      navigator.clipboard.writeText(v).then(function () {
        var t = mail.textContent;
        mail.textContent = '已复制';
        setTimeout(function () { mail.textContent = t; }, 1500);
      });
    });
  }
})();
