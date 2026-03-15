// Современный JavaScript для функциональности сайта

// Переключение темы
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Проверяем, был ли уже добавлен обработчик
    if (themeToggle.dataset.listenerAdded) {
        return;
    }
    
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });
    
    // Отмечаем, что обработчик уже добавлен
    themeToggle.dataset.listenerAdded = 'true';
}

// Анимация карточек при загрузке
function animateCards() {
    const cards = document.querySelectorAll('.dish-card, .fade-in-element');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Анимация при прокрутке
function animateOnScroll() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.dish-card, .admin-table, .admin-form-container').forEach(el => {
        observer.observe(el);
    });
}

// Инициализация всех функций при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    animateCards();
    animateOnScroll();
    smoothScroll();
    addLoadingEffects();
    
    // Анимация карточек при загрузке
    const cards = document.querySelectorAll('.dish-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Анимация строк таблицы при загрузке
    const rows = document.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Добавляем обработчик для адаптивного поведения на мобильных устройствах
    handleMobileBehavior();
    
    // Инициализация адаптивности для карточек блюд
    initializeDishCardLayout();
});

// Функция для адаптивного расположения карточек блюд
function initializeDishCardLayout() {
    const dishGrid = document.querySelector('.dish-grid');
    if (!dishGrid) return;
    
    // Проверяем ширину экрана и устанавливаем количество колонок
    function updateDishGridLayout() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 480) {
            // На очень маленьких экранах одна колонка
            dishGrid.style.gridTemplateColumns = '1fr';
        } else if (screenWidth <= 768) {
            // На планшетах и больших мобильных устройствах две колонки
            dishGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            // На больших экранах три и более колонок
            dishGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }
    // Инициализируем сетку при загрузке
    updateDishCardLayout();
    
    // Обновляем сетку при изменении размера окна
    window.addEventListener('resize', updateDishCardLayout);
}

// Функция для обновления макета карточек блюд
function updateDishCardLayout() {
    const dishGrid = document.querySelector('.dish-grid');
    if (!dishGrid) return;
    
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 480) {
        // На очень маленьких экранах одна колонка
        dishGrid.style.gridTemplateColumns = '1fr';
    } else if (screenWidth <= 768) {
        // На планшетах и больших мобильных устройствах две колонки
        dishGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        // На больших экранах три и более колонок
        dishGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
}

// Функция для обработки мобильного поведения
function handleMobileBehavior() {
    // Проверяем ширину экрана
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Уменьшаем размер шрифта для мобильных устройств
        document.body.style.fontSize = '14px';
        
        // Добавляем класс для мобильного стиля
        document.body.classList.add('mobile-device');
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        const isMobileNow = window.innerWidth <= 768;
        
        if (isMobileNow) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    });
}

// Добавляем обработчик события для всех форм
document.addEventListener('submit', function(e) {
    const form = e.target.closest('form');
    if (form && form.classList.contains('ajax-form')) {
        e.preventDefault();
        
        // Показываем индикатор загрузки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Обработка...';
        
        // Отправляем форму
        fetch(form.action, {
            method: form.method,
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Операция выполнена успешно!', 'success');
                form.reset();
            } else {
                showNotification('Произошла ошибка: ' + data.message, 'error');
            }
        })
        .catch(error => {
            showNotification('Произошла ошибка: ' + error.message, 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }
});

// Плавная прокрутка
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Добавление эффектов загрузки
function addLoadingEffects() {
    // Добавляем класс для анимации загрузки
    document.body.classList.add('loaded');
}

// Инициализация всех функций при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    animateCards();
    animateOnScroll();
    smoothScroll();
    addLoadingEffects();
});

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Удаление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем глобальные обработчики для форм
document.addEventListener('submit', function(e) {
    const form = e.target.closest('form');
    if (form && form.classList.contains('ajax-form')) {
        e.preventDefault();
        
        // Показываем индикатор загрузки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        // Отправляем форму
        fetch(form.action, {
            method: form.method,
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('Operation completed successfully!', 'success');
                form.reset();
            } else {
                showNotification('An error occurred: ' + data.message, 'error');
            }
        })
        .catch(error => {
            showNotification('An error occurred: ' + error.message, 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }
});