// --- main.js: קובץ סקריפטים ראשי לכל האתר ---

// 1. טעינת ה-Navbar (התפריט העליון)
fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        // הכנסת ה-HTML של התפריט לתוך ה-DIV המיועד
        document.getElementById('navbar-placeholder').innerHTML = data;
        
        // לאחר שהתפריט נטען, נפעיל את הפונקציה שבודקת התחברות
        updateAuthButton();

        // בדיקה מיוחדת לדף הבית: אם קיימת פונקציה לתיקון קישורים (נמצאת ב-home.js), נפעיל אותה
        if (typeof fixLocalLinks === 'function') {
            fixLocalLinks();
        }
    })
    .catch(error => console.error('Error loading navbar:', error));

// 2. טעינת ה-Footer (החלק התחתון)
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));


// 3. פונקציה לניהול כפתור התחברות/התנתקות
function updateAuthButton() {
    // שליפת נתונים מהזיכרון המקומי
    const userName = localStorage.getItem('userName');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // מציאת הכפתור בתפריט
    const authBtn = document.getElementById('authBtn');

    // אם הכפתור קיים + יש שם משתמש + הדגל מראה שאנחנו מחוברים
    if (authBtn && userName && isLoggedIn === 'true') {
        
        // שינוי הטקסט בכפתור
        authBtn.textContent = 'שלום, ' + userName;
        
        // שינוי עיצוב (מצבע מלא לשקוף עם מסגרת)
        authBtn.classList.remove('btn-brand');
        authBtn.classList.add('btn-outline-brand');
        
        // ביטול הקישור הרגיל לעמוד ההתחברות
        authBtn.href = "#"; 
        
        // הגדרת פעולה בעת לחיצה (התנתקות)
        authBtn.onclick = function(event) {
            event.preventDefault(); // מונע קפיצה לראש הדף
            
            if(confirm('האם ברצונך להתנתק?')) {
                // מחיקת דגל ההתחברות בלבד (הנתונים נשמרים)
                localStorage.removeItem('isLoggedIn');
                
                // העברה לעמוד ההתחברות
                window.location.href = "login.html"; 
            }
        };
    }
}