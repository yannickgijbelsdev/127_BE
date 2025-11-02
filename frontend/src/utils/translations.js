// Centralized translations for all components
export const translations = {
  // Common
  common: {
    back: { nl: 'Terug', en: 'Back' },
    close: { nl: 'Sluiten', en: 'Close' },
    start: { nl: 'Start', en: 'Start' },
    stop: { nl: 'Stop', en: 'Stop' },
    loading: { nl: 'Laden...', en: 'Loading...' },
    error: { nl: 'Fout', en: 'Error' },
    success: { nl: 'Gelukt!', en: 'Success!' },
    build: { nl: 'Build', en: 'Build' }
  },

  // Landing Page
  landingPage: {
    searchPlaceholder: { nl: 'Zoek een tool...', en: 'Search for a tool...' },
    noToolsFound: { nl: 'Geen tools gevonden', en: 'No tools found' },
    missingTool: { nl: 'Mis je nog een tool?', en: 'Missing a tool?' },
    missingToolDesc: { nl: 'Laat het ons weten en we kijken wat we kunnen doen!', en: 'Let us know and we\'ll see what we can do!' },
    suggestTool: { nl: 'Tool Voorstellen', en: 'Suggest Tool' }
  },

  // Tools
  tools: {
    deadPixelDetector: { nl: 'Dead Pixel Detector', en: 'Dead Pixel Detector' },
    deadPixelDetectorDesc: { nl: 'Test je scherm op dode pixels', en: 'Test your screen for dead pixels' },
    printerTester: { nl: 'Printer Tester', en: 'Printer Tester' },
    printerTesterDesc: { nl: 'Test je printer met verschillende patronen', en: 'Test your printer with different patterns' },
    screenRefreshTester: { nl: 'Screen Refresh Tester', en: 'Screen Refresh Tester' },
    screenRefreshTesterDesc: { nl: 'Meet de refresh rate van je scherm', en: 'Measure your screen refresh rate' },
    webcamAudioTester: { nl: 'Webcam & Audio Tester', en: 'Webcam & Audio Tester' },
    webcamAudioTesterDesc: { nl: 'Test je webcam en microfoon', en: 'Test your webcam and microphone' },
    passwordGenerator: { nl: 'Wachtwoord Generator', en: 'Password Generator' },
    passwordGeneratorDesc: { nl: 'Genereer veilige wachtwoorden', en: 'Generate secure passwords' }
  },

  // Dead Pixel Detector
  pixelTest: {
    instructions: { nl: 'Instructies', en: 'Instructions' },
    instructionTitle: { nl: 'Hoe gebruik je de Dead Pixel Detector?', en: 'How to use the Dead Pixel Detector?' },
    step1: { nl: 'Klik op "Start Test" om te beginnen', en: 'Click "Start Test" to begin' },
    step2: { nl: 'Gebruik pijltjestoetsen of klik om tussen kleuren te wisselen', en: 'Use arrow keys or click to switch between colors' },
    step3: { nl: 'Druk op ESC om te stoppen', en: 'Press ESC to stop' },
    step4: { nl: 'Zoek naar dode of verkeerde pixels op je scherm', en: 'Look for dead or stuck pixels on your screen' },
    availableColors: { nl: 'Beschikbare kleuren', en: 'Available colors' },
    startTest: { nl: 'Start Test', en: 'Start Test' },
    gpuInfo: { nl: 'GPU Informatie', en: 'GPU Information' },
    vendor: { nl: 'Leverancier', en: 'Vendor' },
    renderer: { nl: 'Renderer', en: 'Renderer' }
  },

  // Printer Tester
  printerTest: {
    instructions: { nl: 'Instructies', en: 'Instructions' },
    instructionTitle: { nl: 'Hoe gebruik je de Printer Tester?', en: 'How to use the Printer Tester?' },
    step1: { nl: 'Kies een testpatroon hieronder', en: 'Choose a test pattern below' },
    step2: { nl: 'Klik op "Print" om het patroon te printen', en: 'Click "Print" to print the pattern' },
    step3: { nl: 'Controleer de printkwaliteit', en: 'Check the print quality' },
    selectPattern: { nl: 'Selecteer een patroon', en: 'Select a pattern' },
    colorBars: { nl: 'Kleurbalken', en: 'Color Bars' },
    colorBarsDesc: { nl: 'Test kleurweergave en alignering', en: 'Test color reproduction and alignment' },
    grayscale: { nl: 'Grijswaarden', en: 'Grayscale' },
    grayscaleDesc: { nl: 'Test grijswaarden en contrast', en: 'Test grayscale and contrast' },
    grid: { nl: 'Raster', en: 'Grid' },
    gridDesc: { nl: 'Test alignering en resolutie', en: 'Test alignment and resolution' },
    text: { nl: 'Tekst', en: 'Text' },
    textDesc: { nl: 'Test tekstkwaliteit', en: 'Test text quality' },
    print: { nl: 'Print', en: 'Print' },
    configurePrint: { nl: 'Configureer Print', en: 'Configure Print' }
  },

  // Screen Refresh Tester
  screenTest: {
    instructions: { nl: 'Instructies', en: 'Instructions' },
    instructionTitle: { nl: 'Hoe gebruik je de Screen Refresh Tester?', en: 'How to use the Screen Refresh Tester?' },
    step1: { nl: 'Klik op "Start Test" om te beginnen', en: 'Click "Start Test" to begin' },
    step2: { nl: 'De test meet automatisch je refresh rate', en: 'The test will automatically measure your refresh rate' },
    step3: { nl: 'Bekijk de resultaten onderaan', en: 'View the results at the bottom' },
    currentFps: { nl: 'Huidige FPS', en: 'Current FPS' },
    averageFps: { nl: 'Gemiddelde FPS', en: 'Average FPS' },
    refreshRate: { nl: 'Refresh Rate', en: 'Refresh Rate' }
  },

  // Webcam & Audio Tester
  webcamTest: {
    instructions: { nl: 'Instructies', en: 'Instructions' },
    instructionTitle: { nl: 'Hoe gebruik je de Webcam & Audio Tester?', en: 'How to use the Webcam & Audio Tester?' },
    step1: { nl: 'Geef toestemming voor camera en microfoon toegang', en: 'Grant permission for camera and microphone access' },
    step2: { nl: 'Test je webcam beeld', en: 'Test your webcam video' },
    step3: { nl: 'Test je microfoon audio', en: 'Test your microphone audio' },
    webcam: { nl: 'Webcam', en: 'Webcam' },
    microphone: { nl: 'Microfoon', en: 'Microphone' },
    testWebcam: { nl: 'Test Webcam', en: 'Test Webcam' },
    testMicrophone: { nl: 'Test Microfoon', en: 'Test Microphone' },
    selectCamera: { nl: 'Selecteer Camera', en: 'Select Camera' },
    selectMicrophone: { nl: 'Selecteer Microfoon', en: 'Select Microphone' }
  },

  // Password Generator
  passwordGen: {
    instructions: { nl: 'Instructies', en: 'Instructions' },
    instructionTitle: { nl: 'Hoe gebruik je de Wachtwoord Generator?', en: 'How to use the Password Generator?' },
    step1: { nl: 'Kies de gewenste lengte en opties', en: 'Choose desired length and options' },
    step2: { nl: 'Klik op "Genereer Wachtwoord"', en: 'Click "Generate Password"' },
    step3: { nl: 'Kopieer het wachtwoord naar je klembord', en: 'Copy the password to your clipboard' },
    generate: { nl: 'Genereer Wachtwoord', en: 'Generate Password' },
    length: { nl: 'Lengte', en: 'Length' },
    includeUppercase: { nl: 'Hoofdletters', en: 'Uppercase' },
    includeLowercase: { nl: 'Kleine letters', en: 'Lowercase' },
    includeNumbers: { nl: 'Nummers', en: 'Numbers' },
    includeSymbols: { nl: 'Symbolen', en: 'Symbols' },
    copy: { nl: 'Kopieer', en: 'Copy' },
    copied: { nl: 'Gekopieerd!', en: 'Copied!' },
    strength: { nl: 'Sterkte', en: 'Strength' },
    weak: { nl: 'Zwak', en: 'Weak' },
    medium: { nl: 'Gemiddeld', en: 'Medium' },
    strong: { nl: 'Sterk', en: 'Strong' },
    veryStrong: { nl: 'Zeer Sterk', en: 'Very Strong' }
  },

  // Feedback
  feedback: {
    title: { nl: 'Feedback', en: 'Feedback' },
    placeholder: { nl: 'Laat je feedback achter...', en: 'Leave your feedback...' },
    submit: { nl: 'Verstuur', en: 'Submit' },
    thankYou: { nl: 'Bedankt voor je feedback!', en: 'Thank you for your feedback!' },
    giveFeedback: { nl: 'Geef Feedback', en: 'Give Feedback' }
  },

  // Changelog
  changelog: {
    title: { nl: 'Changelog', en: 'Changelog' },
    currentVersion: { nl: 'Huidige versie', en: 'Current version' }
  },

  // Tool Suggestion
  toolSuggestion: {
    title: { nl: 'Tool Voorstellen', en: 'Suggest a Tool' },
    placeholder: { nl: 'Beschrijf de tool die je graag zou willen zien...', en: 'Describe the tool you would like to see...' },
    submit: { nl: 'Verstuur Suggestie', en: 'Submit Suggestion' },
    thankYou: { nl: 'Bedankt voor je suggestie!', en: 'Thank you for your suggestion!' }
  }
};

// Helper function to get translation
export const getTranslation = (category, key, language) => {
  try {
    return translations[category][key][language] || translations[category][key]['nl'];
  } catch (e) {
    return key;
  }
};
