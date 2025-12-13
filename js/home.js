// --- home.js: לוגיקה ספציפית לדף הבית ---

// פונקציה לתיקון הקישורים בדף הבית
// הפונקציה הזו נקראת אוטומטית מתוך main.js אחרי שהתפריט נטען
function fixLocalLinks() {
    // מוצא את כל הקישורים בתפריט
    const links = document.querySelectorAll('.navbar-nav a, .dropdown-menu a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        // אם הקישור מצביע לדף הבית עם סולמית (למשל home.html#about)
        if (href && href.includes('home.html#')) {
            // משנה אותו לסולמית בלבד (#about) כדי שתהיה גלילה חלקה
            link.setAttribute('href', href.replace('home.html', ''));
        }
    });
}