# Упражнение по CSS

## Въведение

CSS (Cascading Style Sheets) е езикът, който **стилизира** уеб страниците. Ако HTML е скелетът на страницата, то CSS е кожата, дрехите и прическата. С CSS контролираш цветове, шрифтове, подредба, анимации и цялостния визуален облик на сайта.

---

## 1. Как се свързва CSS с HTML

Има три начина да приложиш CSS. В практиката се използва почти изключително третият (външен файл):

### 1.1 Инлайн (inline) — избягвай

```html
<p style="color: red; font-size: 18px;">Червен текст</p>
```

### 1.2 Вътрешен (internal) — за бързи тестове

```html
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
```

### 1.3 Външен файл (external) — правилният начин

```html
<!-- В HTML файла -->
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

```css
/* Във файла style.css */
p {
  color: green;
}
```

> **Защо външен файл?** Един CSS файл обслужва много HTML страници. Промениш на едно място — ефектът е навсякъде.

---

## 2. Анатомия на CSS правило

```css
селектор {
  свойство: стойност;
  свойство: стойност;
}
```

Конкретен пример:

```css
h1 {
  color: #2c3e50;
  font-size: 32px;
  text-align: center;
}
```

| Част      | Какво прави                               |
| --------- | ----------------------------------------- |
| `h1`      | **Селектор** — кой елемент да стилизираме |
| `color`   | **Свойство** — какво променяме            |
| `#2c3e50` | **Стойност** — каква е промяната          |
| `;`       | Разделител между декларации               |
| `{ }`     | Блок с декларации                         |

---

## 3. Селектори

Селекторите определят **кои** елементи ще бъдат стилизирани. Това е една от най-важните теми в CSS.

### 3.1 Основни селектори

```css
/* По таг */
p {
  line-height: 1.6;
}

/* По клас (.) — може да се прилага на много елементи */
.highlight {
  background-color: yellow;
}

/* По ID (#) — уникален, само за един елемент */
#main-title {
  font-size: 40px;
}

/* Универсален — всички елементи */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

```html
<!-- Употреба в HTML -->
<h1 id="main-title">Заглавие</h1>
<p class="highlight">Маркиран параграф</p>
<p class="highlight">Още един маркиран</p>
<p>Обикновен параграф</p>
```

### 3.2 Комбинирани селектори

```css
/* Наследник (descendant) — всички <a> вътре в <nav> */
nav a {
  text-decoration: none;
}

/* Директно дете (child) — само преките деца */
ul > li {
  color: red;
}

/* Съседен елемент (adjacent sibling) */
h2 + p {
  font-weight: bold;
}

/* Множествен селектор — едни и същи стилове за няколко елемента */
h1,
h2,
h3 {
  font-family: 'Georgia', serif;
}
```

### 3.3 Псевдо-класове

Псевдо-класовете стилизират елемент в определено **състояние**:

```css
/* При преминаване с мишката */
a:hover {
  color: crimson;
  text-decoration: underline;
}

/* При фокус (клик или Tab) */
input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

/* Първо/последно дете */
li:first-child {
  font-weight: bold;
}

li:last-child {
  border-bottom: none;
}

/* Четни/нечетни редове */
tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### 3.4 Псевдо-елементи

Псевдо-елементите стилизират **част** от елемент:

```css
/* Първата буква на параграфа */
p::first-letter {
  font-size: 2em;
  color: #e74c3c;
  float: left;
  margin-right: 5px;
}

/* Добавяне на съдържание преди/след елемент */
.required::after {
  content: ' *';
  color: red;
}

blockquote::before {
  content: '❝ ';
  font-size: 1.5em;
}
```

---

## 4. Цветове и фонове

### 4.1 Начини за задаване на цвят

```css
.colors-demo {
  color: red; /* Именуван цвят */
  color: #e74c3c; /* HEX (най-разпространен) */
  color: rgb(231, 76, 60); /* RGB */
  color: rgba(231, 76, 60, 0.8); /* RGBA (с прозрачност) */
  color: hsl(6, 78%, 57%); /* HSL */
}
```

> **Съвет:** Използвай HEX за ежедневна работа, RGBA когато ти трябва прозрачност.

### 4.2 Фонове

```css
/* Плътен цвят */
body {
  background-color: #ecf0f1;
}

/* Фоново изображение */
.hero {
  background-image: url('hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Градиент */
.gradient-box {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Кратък запис (shorthand) */
.banner {
  background: #333 url('pattern.png') repeat center / cover;
}
```

---

## 5. Типография (текст и шрифтове)

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  text-transform: uppercase;
}

.subtitle {
  font-style: italic;
  text-align: center;
  text-decoration: underline;
  text-decoration-color: #e74c3c;
}

/* Импортиране на Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.modern-text {
  font-family: 'Roboto', sans-serif;
}
```

### Единици за размер

| Единица   | Описание                            | Кога се използва                       |
| --------- | ----------------------------------- | -------------------------------------- |
| `px`      | Пиксели — фиксиран размер           | Бордери, малки детайли                 |
| `rem`     | Спрямо root (html) `font-size`      | Шрифтове, spacing — **препоръчително** |
| `em`      | Спрямо parent `font-size`           | Вътрешен spacing                       |
| `%`       | Процент от родителя                 | Ширини, responsive дизайн              |
| `vw / vh` | Процент от viewport ширина/височина | Пълноекранни секции                    |

> **Правило на палеца:** Използвай `rem` за шрифтове и `%` или `vw/vh` за размери на контейнери.

---

## 6. Box Model

Всеки HTML елемент е **правоъгълна кутия** с четири слоя. Това е фундаментална концепция в CSS:

```
┌─────────────── margin ───────────────┐
│  ┌─────────── border ──────────────┐ │
│  │  ┌──────── padding ──────────┐  │ │
│  │  │                           │  │ │
│  │  │        CONTENT            │  │ │
│  │  │                           │  │ │
│  │  └───────────────────────────┘  │ │
│  └─────────────────────────────────┘ │
└──────────────────────────────────────┘
```

```css
.card {
  width: 300px;
  padding: 20px; /* Вътрешно разстояние */
  border: 2px solid #ddd; /* Рамка */
  margin: 15px; /* Външно разстояние */
  border-radius: 8px; /* Заоблени ъгли */
}

/* ВАЖНО: box-sizing прави width да включва padding и border */
* {
  box-sizing: border-box;
}
```

| Свойство         | Какво контролира                        |
| ---------------- | --------------------------------------- |
| `width / height` | Размер на съдържанието                  |
| `padding`        | Разстояние между съдържанието и рамката |
| `border`         | Рамка (дебелина, стил, цвят)            |
| `margin`         | Разстояние между елемента и съседите    |
| `border-radius`  | Заобляне на ъглите                      |
| `box-shadow`     | Сянка на кутията                        |

### Shorthand за padding/margin

```css
/* Всички страни */
padding: 20px;

/* Вертикално | Хоризонтално */
padding: 10px 20px;

/* Горе | Дясно | Долу | Ляво (по часовниковата стрелка) */
margin: 10px 20px 15px 5px;

/* Центриране на блоков елемент хоризонтално */
.container {
  width: 960px;
  margin: 0 auto;
}
```

> **Удобно е да добавим `box-sizing: border-box`** в началото на CSS файла. Без него `width: 300px` + `padding: 20px` = реална ширина 340px, което чупи layout-а.

---

## 7. Display и позициониране

### 7.1 Display

```css
/* Block — заема цял ред */
div,
p,
h1 {
  display: block;
}

/* Inline — заема само колкото съдържанието */
span,
a,
strong {
  display: inline;
}

/* Inline-block — като inline, но приема width/height */
.badge {
  display: inline-block;
  padding: 5px 10px;
  background: #3498db;
  color: white;
  border-radius: 3px;
}

/* None — скрива елемента напълно */
.hidden {
  display: none;
}
```

### 7.2 Position

```css
/* Static (по подразбиране) — нормален поток */
.normal {
  position: static;
}

/* Relative — изместен спрямо нормалната си позиция */
.nudged {
  position: relative;
  top: 10px;
  left: 20px;
}

/* Absolute — позициониран спрямо най-близкия relative родител */
.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}

/* Fixed — фиксиран спрямо viewport-а (не скролира) */
.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Sticky — комбинация от relative и fixed */
.sticky-header {
  position: sticky;
  top: 0;
}
```

---

## 8. Flexbox

Flexbox е модерният начин за подредба на елементи **в една ос** (ред или колона). Това е може би най-полезният инструмент в CSS.

### 8.1 Основи

```css
.container {
  display: flex;
  justify-content: center; /* Подредба по главната ос (хоризонтална) */
  align-items: center; /* Подредба по кръстосаната ос (вертикална) */
  gap: 20px; /* Разстояние между елементите */
}
```

### 8.2 Свойства на контейнера

```css
.flex-container {
  display: flex;

  /* Посока */
  flex-direction: row; /* ← → по подразбиране */
  flex-direction: column; /* ↓ вертикално */
  flex-direction: row-reverse; /* → ← обратно */

  /* Пренасяне на нов ред */
  flex-wrap: wrap;

  /* Подредба по главна ос */
  justify-content: flex-start; /* Начало */
  justify-content: center; /* Център */
  justify-content: space-between; /* Равномерно, без крайни отстояния */
  justify-content: space-around; /* Равномерно, с крайни отстояния */
  justify-content: space-evenly; /* Идеално равномерно */

  /* Подредба по кръстосана ос */
  align-items: stretch; /* Разтяга (по подразбиране) */
  align-items: center; /* Център */
  align-items: flex-start; /* Горе */
  align-items: flex-end; /* Долу */
}
```

### 8.3 Свойства на децата

```css
.flex-item {
  flex-grow: 1; /* Колко от свободното място да заеме */
  flex-shrink: 0; /* Да не се свива */
  flex-basis: 200px; /* Начален размер */

  /* Кратък запис */
  flex: 1; /* grow:1, shrink:1, basis:0 */
  flex: 0 0 300px; /* Фиксирана ширина 300px */

  /* Индивидуално подравняване */
  align-self: flex-end;
}
```

### 8.4 Практически примери

```css
/* Навигация: лого вляво, линкове вдясно */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

/* Перфектно центриране */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Карти в ред, които се пренасят */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card-grid .card {
  flex: 1 1 300px; /* Минимум 300px, растат равномерно */
}

/* Footer: колони */
.footer-columns {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;
}
```

---

## 9. CSS Grid

Grid е мощен инструмент за **двумерни** layout-и (редове И колони едновременно).

### 9.1 Основи

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 равни колони */
  grid-template-rows: auto;
  gap: 20px;
}
```

### 9.2 Дефиниране на колони и редове

```css
.layout {
  display: grid;

  /* Фиксирани колони */
  grid-template-columns: 200px 1fr 200px;

  /* Повтаряне */
  grid-template-columns: repeat(3, 1fr); /* 3 равни */
  grid-template-columns: repeat(4, 1fr); /* 4 равни */

  /* Автоматично адаптивни карти */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  /* Именувани области */
  grid-template-areas:
    'header  header  header'
    'sidebar content aside'
    'footer  footer  footer';
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.content {
  grid-area: content;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

### 9.3 Позициониране на елементи

```css
/* Елемент заема 2 колони */
.wide-item {
  grid-column: span 2;
}

/* Елемент заема 2 реда */
.tall-item {
  grid-row: span 2;
}

/* Точна позиция */
.featured {
  grid-column: 1 / 3; /* От колона 1 до 3 */
  grid-row: 1 / 2;
}
```

### 9.4 Практически пример — layout на страница

```css
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    'nav    nav'
    'sidebar main'
    'footer footer';
  min-height: 100vh;
}
```

> 💡 **Flex vs Grid:** Flex е за еднопосочна подредба (ред ИЛИ колона). Grid е за двупосочна (ред И колона). В практиката се комбинират — Grid за общия layout, Flex за компонентите вътре.

---

## 10. Responsive дизайн

Responsive (адаптивен) дизайн означава, че страницата изглежда добре на всички екрани — от телефон до монитор.

### 10.1 Viewport meta таг (в HTML)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 10.2 Media Queries

```css
/* Базови стилове (mobile-first подход) */
.container {
  padding: 15px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

/* Таблет (768px и нагоре) */
@media (min-width: 768px) {
  .container {
    padding: 30px;
    max-width: 720px;
    margin: 0 auto;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Десктоп (1024px и нагоре) */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
}

/* Голям екран (1200px и нагоре) */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

### 10.3 Responsive изображения и типография

```css
/* Изображения никога не излизат от контейнера */
img {
  max-width: 100%;
  height: auto;
}

/* Responsive шрифт с clamp() */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* минимум 1.5rem, предпочита 4vw, максимум 3rem */
}
```

> **Mobile-first подход:** Пиши CSS първо за малки екрани, после добавяй `@media (min-width: ...)` за по-големи. Това е стандартна индустриална практика.

---

## 11. Преходи и анимации

### 11.1 Transitions (преходи)

Преходите правят промените плавни вместо мигновени:

```css
.button {
  background: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Transition на конкретни свойства */
.link {
  color: #333;
  transition:
    color 0.2s ease,
    border-bottom 0.2s ease;
}

.link:hover {
  color: #e74c3c;
  border-bottom: 2px solid #e74c3c;
}
```

### 11.2 Animations (анимации)

```css
/* Дефиниране на анимация */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Прилагане */
.fade-in {
  animation: fadeIn 0.6s ease forwards;
}

.pulsing {
  animation: pulse 2s ease-in-out infinite;
}
```

### 11.3 Transform

```css
.card:hover {
  transform: scale(1.03); /* Уголемяване */
  transform: rotate(5deg); /* Завъртане */
  transform: translateX(10px); /* Преместване */
  transform: skewX(-3deg); /* Наклон */

  /* Комбинирани трансформации */
  transform: scale(1.02) translateY(-5px);
}
```

---

## 12. Полезни свойства и техники

### 12.1 Сенки

```css
/* Сянка на кутия */
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Сянка на текст */
.hero-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
```

### 12.2 Overflow

```css
/* Скриване на препълване */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Скролируем контейнер */
.scrollable {
  max-height: 400px;
  overflow-y: auto;
}
```

### 12.3 CSS променливи (Custom Properties)

```css
:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --radius: 8px;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.button-primary {
  background: var(--primary);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.button-secondary {
  background: var(--secondary);
  border-radius: var(--radius);
}
```

> 💡 **CSS променливи** правят темата на сайта лесна за поддръжка. Промениш стойността на `--primary` на едно място и всички елементи, които я ползват, се обновяват.

### 12.4 Opacity и Visibility

```css
/* Полупрозрачен */
.faded {
  opacity: 0.5;
}

/* Скрит, но заема място */
.invisible {
  visibility: hidden;
}

/* Скрит и не заема място */
.gone {
  display: none;
}
```

---

## 13. Специфичност и каскада

Когато няколко правила се конкурират за един елемент, браузърът решава кое да приложи по следния приоритет (от нисък към висок):

```
Таг селектор        →  0-0-1     (p, h1, div)
Клас / псевдо-клас  →  0-1-0     (.card, :hover)
ID селектор         →  1-0-0     (#header)
Inline style        →  1-0-0-0   (style="...")
!important          →  бие всичко (ИЗБЯГВАЙ!)
```

Пример:

```css
p {
  color: black;
} /* 0-0-1 */
.intro {
  color: blue;
} /* 0-1-0  — печели над p */
#welcome {
  color: green;
} /* 1-0-0  — печели над .intro */
```

> **Златно правило:** Никога не използвай `!important` освен в краен случай. Вместо това пиши по-специфични селектори.

---

## Практически задачи

### Задача 1 — Стилизирана визитка

Вземи `vizitka.html` от HTML урока и създай `vizitka.css`:

- Задади `box-sizing: border-box` глобално
- Центрирай съдържанието с Flexbox
- Добави фонов цвят или градиент на body
- Стилизирай картата с `padding`, `border-radius`, `box-shadow`
- Приложи Google Font за заглавието
- Добави `hover` ефект на линковете с `transition`

### Задача 2 — Responsive навигация

Създай навигационна лента (`navbar.html` + `navbar.css`):

- Лого вляво, линкове вдясно (Flexbox + `justify-content: space-between`)
- Линковете нямат underline, имат hover ефект с плавен преход
- `position: sticky` за навигацията
- На мобилен екран (`max-width: 768px`) линковете стават вертикални (колона)

### Задача 3 — Карти с Grid

Създай секция с карти (`cards.html` + `cards.css`):

- Използвай CSS Grid: `repeat(auto-fit, minmax(280px, 1fr))`
- Всяка карта има изображение, заглавие, текст и бутон
- Бутонът има hover анимация (промяна на цвят + `translateY`)
- Картата има `box-shadow`, който се засилва при `hover`
- CSS променливи за цветовата схема

### Задача 4 — Пълен responsive layout (обобщаваща)

Създай `layout.html` + `layout.css` с:

- CSS Grid layout: `header`, `nav`, `main`, `aside`, `footer`
- Използвай `grid-template-areas`
- Дефинирай CSS променливи в `:root` за цветове и шрифтове
- `@media` breakpoints: мобилен (1 колона), таблет (2 колони), десктоп (пълен layout)
- Навигация с Flexbox вътре в Grid header-а
- Карти в `main` секцията с Flexbox `flex-wrap: wrap`
- Анимация `fadeIn` за картите при зареждане на страницата
- Стилизиран footer с 3 колони (Flexbox)

---

## Обобщение — какво научихме

1. **Свързване** — външен CSS файл с `<link>` е стандартният подход
2. **Селектори** — таг, клас (`.`), ID (`#`), комбинирани, псевдо-класове (`:hover`, `:nth-child`)
3. **Цветове и фонове** — HEX, RGB/RGBA, градиенти, фонови изображения
4. **Типография** — `font-family`, `font-size`, `line-height`, `rem` единици, Google Fonts
5. **Box Model** — `content → padding → border → margin` + задължително `box-sizing: border-box`
6. **Display и Position** — `block`, `inline`, `inline-block`, `relative`, `absolute`, `fixed`, `sticky`
7. **Flexbox** — еднопосочна подредба с `justify-content`, `align-items`, `gap`, `flex-wrap`
8. **Grid** — двупосочен layout с `grid-template-columns`, `grid-template-areas`, `repeat()`, `minmax()`
9. **Responsive** — `@media` queries, mobile-first подход, `clamp()`, `max-width: 100%`
10. **Анимации** — `transition` за плавни промени, `@keyframes` за сложни анимации, `transform`
11. **Добри практики** — CSS променливи, специфичност, без `!important`, mobile-first

---
