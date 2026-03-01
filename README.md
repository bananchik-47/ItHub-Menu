# ItHub-Menu

## Запуск

Приложение использует PostgreSQL и Liquibase. Перед запуском задайте доступы к БД через переменные окружения:

- `DB_URL` (пример: `jdbc:postgresql://localhost:5432/ithub_menu`)
- `DB_USERNAME`
- `DB_PASSWORD`

Пример для PowerShell:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/ithub_menu"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_password"
mvn spring-boot:run
```

Если переменные не заданы, используются дефолтные значения из `application.properties`.
