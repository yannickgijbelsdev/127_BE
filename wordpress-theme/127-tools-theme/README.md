# 127 Tools WordPress Theme

Complete WordPress theme voor 127.be diagnostic tools platform

## Features

✅ Landing page met tool cards
✅ 5 Diagnostic Tools:
   - Dead Pixel Detector
   - Printer Tester
   - Screen Refresh Tester
   - Webcam & Audio Test
   - Password Generator
✅ Admin Dashboard
✅ Analytics System
✅ Feedback System
✅ Autosoft Device Management
✅ Blog functionaliteit
✅ Multi-language support (NL/EN)
✅ Pexels API integration voor achtergronden

## Installatie

### Stap 1: WordPress installeren
Zorg dat je een werkende WordPress installatie hebt (versie 6.0+)

### Stap 2: Theme uploaden
1. Pak het `127-tools-theme.zip` bestand uit
2. Upload de map naar `wp-content/themes/`
3. Of: via WordPress admin → Appearance → Themes → Add New → Upload Theme

### Stap 3: Theme activeren
1. Ga naar Appearance → Themes
2. Activeer "127 Yannick Tools"
3. Database tabellen worden automatisch aangemaakt

### Stap 4: Configuratie

#### wp-config.php toevoegen:
```php
// Pexels API Key
define('PEXELS_API_KEY', 'SBv6ZOHirhcApz4iLkxYd7c2RDXBWJPKbc8AWDku666r3zU6Tdc2sOih');
```

### Stap 5: Pagina's aanmaken

Maak de volgende pagina's aan met de juiste templates:

1. **Home Page**
   - Titel: "Home"
   - Template: Default Template
   - Slug: home

2. **Dead Pixel Detector**
   - Titel: "Dead Pixel Detector"
   - Template: Dead Pixel Detector
   - Slug: dpd

3. **Printer Tester**
   - Titel: "Printer Tester"
   - Template: Printer Tester
   - Slug: printer

4. **Screen Refresh Tester**
   - Titel: "Screen Refresh Tester"
   - Template: Screen Refresh Tester
   - Slug: sscreen

5. **Webcam & Audio Test**
   - Titel: "Webcam & Audio Test"
   - Template: Webcam & Audio Test
   - Slug: wea

6. **Password Generator**
   - Titel: "Password Generator"
   - Template: Password Generator
   - Slug: password

7. **Admin Dashboard** (voor ingelogde admins)
   - Titel: "Admin Dashboard"
   - Template: Admin Dashboard
   - Slug: localhost/dashboard

8. **Autosoft**
   - Titel: "Autosoft Device Management"
   - Template: Autosoft Device Management
   - Slug: autosoft

### Stap 6: Settings → Reading
Stel "Home" in als homepage

### Stap 7: Blog
Blog posts werken automatisch. Ga naar Posts → Add New om blog artikelen toe te voegen.

## Admin Panel

Het theme voegt een "127 Tools" menu toe aan WordPress admin met:
- Dashboard (overzicht)
- Analytics (statistieken)
- Feedback (user feedback)
- Autosoft Devices (device management)

## Database Tabellen

Bij activatie worden automatisch aangemaakt:
- `wp_tools_analytics` - Event tracking
- `wp_tools_feedback` - User feedback
- `wp_tools_autosoft_devices` - Autosoft devices

## Aanpassingen

### Logo wijzigen
Upload logo via Appearance → Customize → Site Identity → Logo

### Kleuren aanpassen
Bewerk `/assets/css/custom.css` en pas CSS variabelen aan in `:root`

### Tools in/uitschakelen
Ga naar Diagnostic Tools in WordPress admin en bewerk individuele tools

## Technische Details

- **Framework**: WordPress 6.0+
- **PHP**: 7.4+
- **Database**: MySQL 5.7+ / MariaDB 10.2+
- **JavaScript**: Vanilla JS (geen dependencies)
- **Styling**: Pure CSS met CSS Variables

## Support

Voor vragen of problemen: admin@127.be

## Changelog

### Version 1.0.0
- Initial release
- Alle diagnostic tools
- Admin panel
- Analytics & feedback
- Autosoft integration
- Blog functionaliteit
