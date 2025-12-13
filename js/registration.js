// --- registration.js: לוגיקה ספציפית לדף ההרשמה ---

// --- פונקציות עזר (Helpers) ---

function containsNumbers(str) {
    return /\d/.test(str);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// פונקציה לחישוב גיל
function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // בדיקה אם יום ההולדת עוד לא הגיע השנה
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// --- הסקריפט הראשי: טיפול בטופס ---

const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // 1. בדיקת שדות חובה (לולאה)
        const requiredIds = ['firstName', 'lastName', 'birthdate', 'phoneNumber', 'email', 'password', 'confirmPassword'];
        for (let id of requiredIds) {
            const element = document.getElementById(id);
            if (!element || !element.value) {
                // מנסה למצוא את ה-Label כדי להציג שם יפה, או מציג את ה-ID כברירת מחדל
                const label = document.querySelector(`label[for="${id}"]`);
                const fieldName = label ? label.innerText.replace(':', '') : id;
                alert('נא למלא את כל שדות החובה (' + fieldName + ')');
                return;
            }
        }
        
        if (!document.querySelector('input[name="trainingHabits"]:checked')) {
            alert('נא לבחור הרגלי אימון');
            return;
        }

        // 2. בדיקת גיל 
        const birthdateValue = document.getElementById('birthdate').value;
        const age = calculateAge(birthdateValue);
        
        if (age < 16) {
            alert('רישום לסטודיו מגיל 16 ומעלה');
            return; 
        }

        // 3. בדיקת אימייל
        const email = document.getElementById('email').value;
        if (!isValidEmail(email)) {
            alert('כתובת המייל שהוזנה אינה תקינה. נא לוודא שיש @ ונקודה.');
            return;
        }

        // 4. בדיקת טלפון
        const phoneNumber = document.getElementById('phoneNumber').value;
        if (phoneNumber.length !== 7) {
            alert('מספר הטלפון חייב להכיל בדיוק 7 ספרות (ללא הקידומת)');
            return;
        }

        // 5. בדיקת שמות (שאאין מספרים)
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const city = document.getElementById('city').value;

        if (containsNumbers(firstName)) {
            alert('שם פרטי לא יכול להכיל מספרים');
            return;
        }
        if (containsNumbers(lastName)) {
            alert('שם משפחה לא יכול להכיל מספרים');
            return;
        }
        if (city.length > 0 && containsNumbers(city)) {
            alert('שם העיר לא יכול להכיל מספרים');
            return;
        }

        // 6. בדיקת סיסמאות
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('הסיסמאות אינן תואמות!');
            return; 
        }

        // --- שמירה ב-LocalStorage ---
        const phonePrefix = document.getElementById('phonePrefix').value;
        const fullPhone = phonePrefix + '-' + phoneNumber;
        
        // שליפת ערך כפתור הרדיו שנבחר
        let habit = document.querySelector('input[name="trainingHabits"]:checked').value;
        const comments = document.getElementById('comments').value;

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        localStorage.setItem('userName', firstName);
        localStorage.setItem('userLastName', lastName);
        localStorage.setItem('userBirthdate', birthdateValue);
        localStorage.setItem('userCity', city);
        localStorage.setItem('userPhone', fullPhone);
        localStorage.setItem('userHabit', habit);
        localStorage.setItem('userComments', comments);

        alert('ההרשמה בוצעה בהצלחה! כל הפרטים נשמרו במערכת. מועבר להתחברות...');
        
        setTimeout(function() {
            window.location.href = "login.html";
        }, 500);
    });
}