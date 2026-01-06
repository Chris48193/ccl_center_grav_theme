// user/themes/ccl/js/countdown.js
document.addEventListener('DOMContentLoaded', () => {
    const countdownEl = document.getElementById('ecl-countdown');
    if (!countdownEl) return;

    const targetDate = new Date(countdownEl.dataset.date).getTime();

    const updateTicker = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            location.reload(); // Reload to let Twig hide the component
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = d.toString().padStart(2, '0');
        document.getElementById('hours').textContent = h.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
    };

    setInterval(updateTicker, 1000);
    updateTicker();
});