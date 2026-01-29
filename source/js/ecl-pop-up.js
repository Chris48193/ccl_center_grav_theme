document.addEventListener('DOMContentLoaded', function() {
    const modalElement = document.getElementById('eclExamModal');
    
    if (!modalElement.length) return;

    const storageKey = 'ecl_popup_last_seen';
    const now = new Date().getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    const lastSeen = localStorage.getItem(storageKey);

    // Only run if user hasn't seen it in the last 7 days
    if (!lastSeen || (now - lastSeen) > oneWeek) {
        
        // 1. Wait 10 seconds after load
        setTimeout(function() {
            modalElement.foundation('open');
            localStorage.setItem(storageKey, now);
        }, 10000);

        // 2. Handle Checkbox Logic
        const checkbox = document.getElementById('ack-check');
        const closeBtn = document.getElementById('close-ecl-modal');

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                closeBtn.classList.remove('hidden');
            } else {
                closeBtn.classList.add('hidden');
            }
        });
    }
});