// --- login.js: לוגיקת התחברות ---

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // מונע את רענון הדף

    // קבלת הערכים שהמשתמש הקליד
    const inputEmail = document.getElementById('email').value;
    const inputPassword = document.getElementById('password').value;

    // שליפת הנתונים שנשמרו בזיכרון בזמן ההרשמה
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    const storedName = localStorage.getItem('userName');

    // בדיקת התאמה: האם מה שהוקלד זהה למה ששמור?
    if (inputEmail === storedEmail && inputPassword === storedPassword) {
        
        // יצירת ה"דגל" שמסמן שהמשתמש מחובר כרגע
        localStorage.setItem('isLoggedIn', 'true');
        
        alert('היי ' + storedName + ', התחברת בהצלחה!');
        
        // מעבר לדף הבית
        window.location.href = "home.html"; 
    } else {
        alert('שגיאה: אימייל או סיסמא לא נכונים (נסה להירשם קודם).');
    }
});