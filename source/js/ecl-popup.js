/* document.addEventListener('DOMContentLoaded', function() {
    // We use querySelector but keep the check simple
    const modalElement = document.getElementById('eclExamModal');
    if (!modalElement) return;

    // 1. Get dynamic data from DOM attributes
    const isActive = modalElement.getAttribute('data-active') == '1';
    const examDateStr = modalElement.getAttribute('data-exam-date');
    
    // Parse date: swap '-' for '/' to ensure all browsers (Safari/IE) parse it correctly
    const examDate = new Date(examDateStr.replace(/-/g, '/')).getTime();
    const now = new Date().getTime();

    // 2. Frequency/Storage Logic
    const storageKey = 'ecl_popup_last_seen';
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const lastSeen = localStorage.getItem(storageKey);

    // 3. THE CONDITIONS: Active in Grav AND Date is in the future AND not seen this week
    if (isActive && examDate > now) {
        if (!lastSeen || (now - lastSeen) > oneWeek) {
            
            // Wait 10 seconds after load
            setTimeout(function() {
                // We use the Foundation jQuery hook only for the 'open' command
                $(modalElement).foundation('open');
            }, 8000);

            const checkbox = document.getElementById('ack-check');
            const closeBtn = document.getElementById('close-ecl-modal');

            // 4. Handle Checkbox Logic
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    closeBtn.classList.remove('hidden');
                } else {
                    closeBtn.classList.add('hidden');
                }
            });

            // 5. Mark as "Seen" ONLY when they click the button to dismiss
            closeBtn.addEventListener('click', function() {
                localStorage.setItem(storageKey, new Date().getTime());
            });
        }
    }
}); */

// -------------------

document.addEventListener('DOMContentLoaded', function() {
    const popups = document.querySelectorAll('.ecl-announcement-modal');
    
    popups.forEach((modal, index) => {
        const popupId = modal.getAttribute('data-popup-id');
        const expiryDate = new Date(modal.getAttribute('data-expiry')).getTime();
        const cooldownDays = parseInt(modal.getAttribute('data-cooldown')) || 7;
        const now = new Date().getTime();

        const storageKey = `ecl_seen_${popupId}`;
        const lastSeen = localStorage.getItem(storageKey);
        const cooldownMillis = cooldownDays * 24 * 60 * 60 * 1000;

        if (expiryDate > now) {
            if (!lastSeen || (now - lastSeen) > cooldownMillis) {
                // Stagger multiple popups so they don't overlap all at once
                setTimeout(() => {
                    $(modal).foundation('open');
                }, 5000 + (index * 2000)); 

                const checkbox = modal.querySelector('.popup-ack-check');
                const closeBtn = modal.querySelector('.close-ecl-modal');

                checkbox.addEventListener('change', function() {
                    this.checked ? closeBtn.classList.remove('hidden') : closeBtn.classList.add('hidden');
                });

                closeBtn.addEventListener('click', () => {
                    localStorage.setItem(storageKey, new Date().getTime());
                });
            }
        }
    });
});