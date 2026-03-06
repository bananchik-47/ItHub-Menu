# ItHub-Menu

Backend для веб-сайта столовой колледжа на Java Spring Boot.

## 📌 Стек
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Liquibase
- Thymeleaf
- Spring Security
- Lombok
- Maven

## 🗄 База данных
Таблица dish:
- id (BIGSERIAL, PK)
- name (varchar 255, not null)
- price (int, not null)
- description (varchar 500, not null)
- image_url (varchar 500, not null)

## 🎯 Возможности
1. Просмотр меню (/menu)
2. Администрирование блюд (/admin)
   - Добавление блюд
   - Редактирование блюд
   - Удаление блюд

## 🛡 Безопасность
- Один пользователь admin
- Пароль: admin
- Роль: ADMIN
- Доступ к /admin/** только для администраторов
- Доступ к /menu и статическим ресурсам для всех

## 🚀 Запуск
```bash
mvn spring-boot:run
```

Приложение будет доступно по адресу http://localhost:8080
