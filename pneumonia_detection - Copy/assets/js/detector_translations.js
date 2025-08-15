// Translation dictionary for detection page
const detectionTranslations = {
    en: {
        title: "Pneumonia Detection",
        subtitle: "Upload a chest X-ray image to detect signs of pneumonia",
        uploadTitle: "Upload X-ray Image",
        dragDrop: "Drag & Drop X-ray Here",
        selectFile: "Select File",
        supportedFormats: "Supported formats:",
        analyzeBtn: "Analyze X-ray",
        clearBtn: "Clear All",
        resultsTitle: "Analysis Results",
        pneumoniaDetected: "Pneumonia Detected",
        noPneumonia: "No Pneumonia Detected",
        positiveMessage: "The analysis indicates signs of pneumonia. Please consult with a healthcare professional.",
        negativeMessage: "No signs of pneumonia were detected in the X-ray. However, if symptoms persist, please consult a doctor.",
        exportBtn: "Export Report",
        newScanBtn: "New Analysis"
    },
    es: {
        title: "Detección de Neumonía",
        subtitle: "Sube una imagen de rayos X del tórax para detectar signos de neumonía",
        uploadTitle: "Subir Imagen de Rayos X",
        dragDrop: "Arrastrar y Soltar Rayos X Aquí",
        selectFile: "Seleccionar Archivo",
        supportedFormats: "Formatos soportados:",
        analyzeBtn: "Analizar Rayos X",
        clearBtn: "Limpiar Todo",
        resultsTitle: "Resultados del Análisis",
        pneumoniaDetected: "Neumonía Detectada",
        noPneumonia: "No se Detectó Neumonía",
        positiveMessage: "El análisis indica signos de neumonía. Consulte con un profesional de la salud.",
        negativeMessage: "No se detectaron signos de neumonía en la radiografía. Sin embargo, si los síntomas persisten, consulte a un médico.",
        exportBtn: "Exportar Reporte",
        newScanBtn: "Nuevo Análisis"
    },
    fr: {
        title: "Détection de Pneumonie",
        subtitle: "Téléchargez une image radiographique pulmonaire pour détecter des signes de pneumonie",
        uploadTitle: "Téléverser une Radiographie",
        dragDrop: "Glisser-Déposer la Radiographie Ici",
        selectFile: "Sélectionner un Fichier",
        supportedFormats: "Formats pris en charge:",
        analyzeBtn: "Analyser la Radiographie",
        clearBtn: "Tout Effacer",
        resultsTitle: "Résultats de l'Analyse",
        pneumoniaDetected: "Pneumonie Détectée",
        noPneumonia: "Pas de Pneumonie Détectée",
        positiveMessage: "L'analyse indique des signes de pneumonie. Veuillez consulter un professionnel de la santé.",
        negativeMessage: "Aucun signe de pneumonie n'a été détecté sur la radiographie. Cependant, si les symptômes persistent, veuillez consulter un médecin.",
        exportBtn: "Exporter le Rapport",
        newScanBtn: "Nouvelle Analyse"
    }
};

function updateDetectionContent(lang) {
    const t = detectionTranslations[lang] || detectionTranslations['en'];
    
    // Update all translatable elements
    document.querySelector('.hero-title').textContent = t.title;
    document.querySelector('.hero-subtitle').textContent = t.subtitle;
    document.querySelector('.section-header h2').textContent = t.uploadTitle;
    document.querySelector('.upload-area h3').textContent = t.dragDrop;
    document.querySelector('.btn-select').textContent = t.selectFile;
    document.querySelector('.file-types span').textContent = t.supportedFormats;
    document.getElementById('scanButton').textContent = t.analyzeBtn;
    document.getElementById('clearButton').textContent = t.clearBtn;
    
    // Update results section if visible
    if (document.getElementById('resultsSection').style.display !== 'none') {
        document.querySelector('.results-section .section-header h2').textContent = t.resultsTitle;
        document.querySelector('.btn-export').textContent = t.exportBtn;
        document.querySelector('.btn-newscan').textContent = t.newScanBtn;
    }
}

// Listen for language changes from language.js
document.addEventListener('languageChange', function(e) {
    updateDetectionContent(e.detail.lang);
});

// Initialize with current language
const currentLang = document.documentElement.lang || 'en';
updateDetectionContent(currentLang);