// --- schedule.js: לוגיקה ספציפית ללוח הזמנים ---

let currentWeekOffset = 0;

function setWeeklyDates() {
    const today = new Date();
    
    // חישוב התאריך הנוכחי + ההזזה (שבועות קדימה/אחורה)
    const currentViewDate = new Date();
    currentViewDate.setDate(today.getDate() + (currentWeekOffset * 7));

    const currentDayOfWeek = currentViewDate.getDay(); // 0-6

    // מציאת יום ראשון של אותו שבוע
    const startOfWeek = new Date(currentViewDate);
    startOfWeek.setDate(currentViewDate.getDate() - currentDayOfWeek);

    // לולאה לעדכון 7 הימים
    for (let i = 0; i < 7; i++) {
        let loopDate = new Date(startOfWeek);
        loopDate.setDate(startOfWeek.getDate() + i);

        let dateString = loopDate.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' });
        
        let element = document.getElementById(`date-${i}`);
        if (element) {
            element.textContent = dateString;
        }
    }
}

function changeWeek(direction) {
    currentWeekOffset += direction;
    setWeeklyDates();
}

// הפעלה ראשונית של התאריכים
setWeeklyDates();