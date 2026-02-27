# 🎯 Complete Conversie Gids: React naar WordPress

## 📦 Wat zit er in deze export?

1. **wordpress-export/** - Standalone HTML pagina's
2. **wordpress-theme/** - WordPress thema basis
3. **Deze gids** - Stap-voor-stap instructies

---

## 🚀 SNELLE START (5 minuten)

### Stap 1: Landing Page Importeren

1. Download `wordpress-export/pages/01-landing-page.html`
2. Ga naar je WordPress admin → Pagina's → Nieuwe pagina
3. Klik op "Tekst" (niet Visueel)
4. Plak ALLE HTML code
5. Titel: "Home"
6. Publiceer
7. Ga naar Instellingen → Lezen → Stel in als homepage

✅ **KLAAR!** Je landing page werkt nu.

---

## 🛠️ VOLLEDIGE CONVERSIE (Alle Tools)

### Voor Elke Tool Pagina:

#### STAP 1: Haal React Code Op

Locatie van React bestanden:
```
/app/frontend/src/components/
├── PixelTest.jsx          → Dead Pixel Detector
├── PrinterTest.jsx        → Printer Tester
├── ScreenTest.jsx         → Screen Refresh Tester
├── WebcamAudioTest.jsx    → Webcam & Audio Test
├── PasswordGenerator.jsx  → Password Generator
└── admin/
    ├── AdminLogin.jsx
    ├── AdminDashboard.jsx
    └── AutosoftDashboard.jsx
```

#### STAP 2: Converteer React naar HTML

**Template voor conversie:**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[TOOL NAAM]</title>
    
    <style>
        /* KOPIEER CSS HIER */
        /* Zoek in React bestand naar styled components of className= */
        /* Vervang Tailwind classes met reguliere CSS */
    </style>
</head>
<body>
    <!-- HTML STRUCTUUR -->
    <div class="container">
        <!-- CONTENT HIER -->
    </div>

    <script>
        // JAVASCRIPT LOGICA
        // Converteer React hooks naar vanilla JS
    </script>
</body>
</html>
```

#### STAP 3: React Hooks naar Vanilla JS

| React | Vanilla JS |
|-------|------------|
| `useState()` | `let variableName = initialValue;` |
| `useEffect(() => {...}, [])` | `document.addEventListener('DOMContentLoaded', () => {...})` |
| `useEffect(() => {...}, [dep])` | Gebruik event listeners of manual updates |
| `onClick={handler}` | `onclick="handler()"` |
| `{variable}` | Gebruik `document.getElementById()` en `.textContent` |

**Voorbeeld:**

React:
```jsx
const [color, setColor] = useState('red');
const handleClick = () => setColor('blue');
return <div style={{backgroundColor: color}} onClick={handleClick}>Click</div>
```

Vanilla JS:
```html
<div id="colorBox" style="background-color: red" onclick="handleClick()">Click</div>

<script>
let color = 'red';
function handleClick() {
    color = 'blue';
    document.getElementById('colorBox').style.backgroundColor = color;
}
</script>
```

---

## 🎨 CSS Conversie Gids

### Tailwind naar Custom CSS

| Tailwind Class | CSS Equivalent |
|----------------|----------------|
| `flex` | `display: flex;` |
| `justify-center` | `justify-content: center;` |
| `items-center` | `align-items: center;` |
| `bg-blue-500` | `background-color: #3b82f6;` |
| `text-white` | `color: white;` |
| `p-4` | `padding: 1rem;` |
| `rounded-lg` | `border-radius: 0.5rem;` |
| `shadow-lg` | `box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);` |

### Kopieer Bestaande Stijlen

Alle kleuren en variabelen staan al in:
```
/app/frontend/src/index.css
/app/frontend/src/App.css
```

Kopieer de `:root` variabelen:
```css
:root {
  --color-primary: #8ab4f8;
  --color-dark: #202124;
  /* etc. */
}
```

---

## 📝 SPECIFIEKE TOOL CONVERSIES

### Dead Pixel Detector

**Complexiteit:** ⭐⭐⭐ (Medium)

**Belangrijkste Features:**
- Fullscreen mode
- Kleur cycler
- Keyboard shortcuts

**React Bestand:** `/app/frontend/src/components/PixelTest.jsx`

**Conversie Punten:**
1. **Fullscreen API:**
```javascript
function goFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
}
```

2. **Kleur Switcher:**
```javascript
const colors = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#FFFFFF'];
let currentIndex = 0;

function nextColor() {
    currentIndex = (currentIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[currentIndex];
}
```

3. **Keyboard Shortcuts:**
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextColor();
    if (e.key === 'f') goFullscreen();
});
```

### Password Generator

**Complexiteit:** ⭐ (Makkelijk)

**React Bestand:** `/app/frontend/src/components/PasswordGenerator.jsx`

**Complete Code Voorbeeld:**
```html
<script>
function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('password').value = password;
}

function copyPassword() {
    const password = document.getElementById('password');
    password.select();
    document.execCommand('copy');
    alert('Wachtwoord gekopieerd!');
}
</script>
```

### Webcam & Audio Test

**Complexiteit:** ⭐⭐⭐⭐ (Moeilijk)

**React Bestand:** `/app/frontend/src/components/WebcamAudioTest.jsx`

**MediaDevices API:**
```javascript
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        
        const video = document.getElementById('webcam');
        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}
```

**Audio Visualizer:**
```javascript
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

function visualize() {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / dataArray.length;
    
    dataArray.forEach((value, index) => {
        const barHeight = (value / 255) * canvas.height;
        ctx.fillStyle = `rgb(${value}, 100, 200)`;
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth, barHeight);
    });
    
    requestAnimationFrame(visualize);
}
```

---

## 🔌 WordPress Integratie

### Backend API Calls

Vervang alle `fetch()` calls:

**React (VOOR):**
```javascript
const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tools`);
```

**WordPress (NA):**
```javascript
const response = await fetch(`/wp-admin/admin-ajax.php?action=get_tools`);
```

### AJAX Handler Toevoegen

In `functions.php`:
```php
add_action('wp_ajax_get_tools', 'handle_get_tools');
add_action('wp_ajax_nopriv_get_tools', 'handle_get_tools');

function handle_get_tools() {
    // Jouw logica hier
    wp_send_json_success($data);
}
```

---

## ✅ TESTING CHECKLIST

Voor elke geconverteerde pagina:

- [ ] Pagina laadt zonder JavaScript errors
- [ ] Alle buttons werken
- [ ] Styling ziet er correct uit
- [ ] Responsive op mobiel
- [ ] Fullscreen mode werkt (indien applicable)
- [ ] Keyboard shortcuts werken (indien applicable)
- [ ] Backend API calls werken
- [ ] Analytics tracking werkt (optioneel)
- [ ] Feedback formulier werkt (optioneel)

---

## 🆘 TROUBLESHOOTING

### "Uncaught ReferenceError: React is not defined"
➡️ Je hebt nog React syntax in je code. Vervang JSX met pure HTML.

### "Cannot read property of undefined"
➡️ Check of je DOM elementen bestaan voor je ze probeert te manipuleren.

### "CORS error"
➡️ Gebruik WordPress AJAX in plaats van directe API calls.

### Styling werkt niet
➡️ Check of je CSS in de `<head>` staat en correct ingesloten is met `<style>` tags.

---

## 📞 HULP NODIG?

1. **Bekijk de source code:** Alle originele React code staat in `/app/frontend/src/`
2. **Use console.log():** Debug je JavaScript in de browser console
3. **WordPress Codex:** https://developer.wordpress.org/

---

## 🎓 LEER MEER

- React → Vanilla JS: https://youmightnotneedreact.com/
- WordPress Custom Templates: https://developer.wordpress.org/themes/template-files-section/page-template-files/
- JavaScript API's: https://developer.mozilla.org/en-US/docs/Web/API

---

**💪 Succes met de conversie!**

Deze gids + de HTML voorbeelden geven je alles wat je nodig hebt om de volledige 127.be site naar WordPress te converteren.
