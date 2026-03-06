// Современный JavaScript для функциональности сайта

// Переключение темы
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
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
    
    // Стили для уведомления
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        backgroundColor: type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db',
        color: 'white',
        zIndex: '10000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Удаление через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
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