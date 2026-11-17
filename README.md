# Schmearly

Интернет-магазин Schmearly: ржаной хлеб на закваске и пхали. Хостинг — Cloudflare Workers (статический сайт + функция оплаты), оплата — Stripe Checkout.

## Структура

```
public/                 ← сайт (статические файлы)
  index.html
  assets/catalog.js     ← ТОВАРЫ И ЦЕНЫ (в центах: 1400 = $14.00) — менять здесь
  assets/app.js         ← логика сайта: страницы, корзина, оплата
  assets/styles.css
  founder.jpg, favicon.svg, 404.html, _headers, robots.txt
src/worker.js           ← точка входа Worker: /api/* → код, остальное → файлы из public/
src/checkout.js         ← POST /api/checkout: создаёт оплату в Stripe
wrangler.toml           ← настройки Cloudflare
```

Текст в `[КВАДРАТНЫХ СКОБКАХ]` в `catalog.js` и на сайте — заглушка, её нужно заменить настоящими данными.

## Публикация

Worker `shmerly` в Cloudflare подключён к этому репозиторию: каждое обновление ветки `main` на GitHub
собирается и публикуется автоматически (команда `npx wrangler deploy`).
Имя Worker в панели Cloudflare должно совпадать с `name` в `wrangler.toml`.

## Подключение Stripe

1. https://dashboard.stripe.com → **Developers → API keys** → скопировать **Secret key**
   (`sk_test_...` для проверки, `sk_live_...` для настоящих платежей).
2. Cloudflare → **Workers & Pages** → `shmerly` → **Settings → Variables and Secrets** → **Add** →
   тип **Secret**, имя `STRIPE_SECRET_KEY`, значение — ключ → **Deploy**.
3. Apple Pay / Google Pay включаются в Stripe: **Settings → Payment methods**.

Без ключа сайт работает, но кнопка оплаты показывает «Online payment is not set up yet».

Тестовая карта в режиме `sk_test_`: `4242 4242 4242 4242`, любая будущая дата, любой CVC.

## Локальный запуск

```
npx wrangler dev
```

Для проверки оплаты локально создайте файл `.dev.vars` со строкой `STRIPE_SECRET_KEY=sk_test_...` (он не попадает в git).
