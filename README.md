# Schmearly

Интернет-магазин Schmearly: ржаной хлеб на закваске и пхали. Хостинг — Cloudflare Pages, оплата — Stripe Checkout.

## Структура

```
public/                 ← сайт (то, что публикует Cloudflare)
  index.html
  assets/catalog.js     ← ТОВАРЫ И ЦЕНЫ (в центах: 1400 = $14.00) — менять здесь
  assets/app.js         ← логика сайта: страницы, корзина, оплата
  assets/styles.css
  founder.jpg, favicon.svg, 404.html, _headers, robots.txt
functions/api/checkout.js ← серверная функция: создаёт оплату в Stripe
wrangler.toml           ← настройки Cloudflare Pages
```

Текст в `[КВАДРАТНЫХ СКОБКАХ]` в `catalog.js` и на сайте — заглушка, её нужно заменить настоящими данными.

## Публикация на Cloudflare Pages (один раз)

1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → вкладка **Pages** → **Connect to Git**.
2. Выбрать репозиторий `shternamber-eng/shmerly`.
3. Настройки сборки: Framework preset — **None**, Build command — *пусто*, Build output directory — **public**.
4. **Save and Deploy**. Сайт появится на `https://shmerly.pages.dev` (или похожем адресе).

После этого каждое обновление ветки `main` на GitHub публикуется автоматически.

## Подключение Stripe

1. https://dashboard.stripe.com → **Developers → API keys** → скопировать **Secret key**
   (`sk_test_...` для проверки, `sk_live_...` для настоящих платежей).
2. Cloudflare → проект `shmerly` → **Settings → Variables and Secrets** → **Add** →
   тип **Secret**, имя `STRIPE_SECRET_KEY`, значение — ключ. Сохранить.
3. **Deployments** → у последнего деплоя **Retry deployment** (чтобы ключ подхватился).
4. Apple Pay / Google Pay включаются в Stripe: **Settings → Payment methods**.

Без ключа сайт работает, но кнопка оплаты показывает «Online payment is not set up yet».

Тестовая карта в режиме `sk_test_`: `4242 4242 4242 4242`, любая будущая дата, любой CVC.

## Локальный запуск

```
npx wrangler pages dev
```

Для проверки оплаты локально создайте файл `.dev.vars` со строкой `STRIPE_SECRET_KEY=sk_test_...` (он не попадает в git).
