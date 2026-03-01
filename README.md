# ItHub-Menu

## Запуск

Приложение использует PostgreSQL и Liquibase.

> Важно: теперь креды БД **обязательны** и должны передаваться через переменные окружения.

Обязательные переменные:

- `DB_URL` (пример: `jdbc:postgresql://localhost:5432/ithub_menu`)
- `DB_USERNAME`
- `DB_PASSWORD`

Опциональные переменные:

- `LIQUIBASE_ENABLED` (`true` по умолчанию)
- `LIQUIBASE_USERNAME` (если нужно отдельное подключение для миграций)
- `LIQUIBASE_PASSWORD`

Пример для PowerShell:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/ithub_menu"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_real_postgres_password"
mvn spring-boot:run
```

Если вы видите ошибку `password authentication failed for user ...`, значит PostgreSQL отклонил логин/пароль. Проверьте:

1. что пароль пользователя в PostgreSQL действительно такой, как в `DB_PASSWORD`;
2. что подключаетесь к нужному серверу/порту/базе (`DB_URL`);
3. что у пользователя есть доступ к базе `ithub_menu`.
