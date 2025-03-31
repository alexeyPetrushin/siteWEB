"use strict"; // Используем строгий режим

// ===== Кастомный Курсор =====
const customCursor = document.querySelector('.cursor');

// Функция для проверки, является ли устройство тач-устройством (упрощенная)
// Более надежные проверки могут потребовать анализа userAgent или feature detection
const isTouchDevice = () => {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

// Инициализация курсора только если он есть и это НЕ тач-устройство
if (customCursor && !isTouchDevice() && window.matchMedia('(hover: hover)').matches) {
    let rafIdCursor; // Для requestAnimationFrame

    // Обновление позиции курсора
    const updateCursorPosition = (event) => {
        const { clientX: x, clientY: y } = event; // Деструктуризация координат

        // Оптимизация через requestAnimationFrame
        if (rafIdCursor) {
            cancelAnimationFrame(rafIdCursor);
        }

        rafIdCursor = requestAnimationFrame(() => {
            // Плавное следование курсора (можно добавить эффект "отставания")
            // Для простоты пока делаем прямое следование
            customCursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            // Показываем курсор при первом движении
            if (customCursor.style.opacity !== '1') {
                customCursor.style.opacity = '1';
            }
        });
    };

    // Скрытие курсора при уходе мыши за пределы окна
    const hideCursor = () => {
        if (rafIdCursor) {
            cancelAnimationFrame(rafIdCursor);
        }
        customCursor.style.opacity = '0';
    };

    // Добавляем слушатели
    window.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mouseleave', hideCursor);

    // Скрытие курсора при потере фокуса окна (опционально)
    // window.addEventListener('blur', hideCursor);
    // window.addEventListener('focus', () => { /* можно показать снова, но требует логики */ });

} else if (customCursor) {
    // Если курсор есть, но это тач-устройство или нет hover, скрываем его
    customCursor.style.display = 'none';
}

// ===== Обновление года в подвале =====
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===== Другие возможные скрипты =====
    // Например, инициализация Intersection Observer для анимаций при скролле,
    // обработка фильтров портфолио, мобильное меню и т.д.
    // Пока оставляем пустым для минимализма.

});

console.log("Дизайнерский сайт загружен!");





//********************** Intersection Observer для появления элементов
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
});

document.querySelectorAll('.stat-card').forEach(card => {
  observer.observe(card);
});