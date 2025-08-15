import { showLoading, showError, handleApiResponse, validateFile } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const fileInput = document.getElementById('fileInput');
    const scanButton = document.getElementById('scanButton');
    const clearButton = document.getElementById('clearButton');
    const patientName = document.getElementById('patient-name');
    const patientAge = document.getElementById('patient-age');
    const patientGender = document.getElementById('patient-gender');
    const exportButton = document.querySelector('.btn-export');
    const newScanButton = document.querySelector('.btn-newscan');
    const dropZone = document.getElementById('dropZone');
    
    // Validate patient information
    function validatePatientInfo() {
        const errors = [];
        
        if (!patientName.value.trim()) {
            errors.push('Patient name is required');
        }
        
        if (!patientAge.value || isNaN(patientAge.value) || patientAge.value < 1 || patientAge.value > 120) {
            errors.push('Please enter a valid age (1-120)');
        }
        
        if (!patientGender.value) {
            errors.push('Please select gender');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    
    // Update scan button state
    function updateScanButtonState() {
        const hasFile = fileInput.files.length > 0;
        const { isValid } = validatePatientInfo();
        scanButton.disabled = !(hasFile && isValid);
    }
    
    // Event listeners for patient info changes
    [patientName, patientAge, patientGender].forEach(element => {
        element.addEventListener('input', updateScanButtonState);
    });
    
    // File input change handler
    fileInput.addEventListener('change', function(e) {
        try {
            if (e.target.files.length > 0) {
                validateFile(e.target.files[0]);
                updateScanButtonState();
            }
        } catch (error) {
            showError(error.message);
            fileInput.value = '';
            scanButton.disabled = true;
        }
    });
    
    // Drag and drop handling
    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });
        
        dropZone.addEventListener('drop', handleDrop, false);
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropZone.classList.add('highlight');
    }
    
    function unhighlight() {
        dropZone.classList.remove('highlight');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            try {
                validateFile(files[0]);
                fileInput.files = files;
                updateScanButtonState();
            } catch (error) {
                showError(error.message);
            }
        }
    }
    
    // Scan button click handler
    scanButton.addEventListener('click', async function() {
        const { isValid, errors } = validatePatientInfo();
        
        if (!isValid) {
            showError(errors.join(', '));
            return;
        }
        
        try {
            showLoading(true);
            scanButton.disabled = true;
            scanButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            
            const formData = new FormData();
            formData.append('xray', fileInput.files[0]);
            formData.append('patient_name', patientName.value.trim());
            formData.append('patient_age', patientAge.value);
            formData.append('patient_gender', patientGender.value);
            
            const response = await fetch(window.AppConfig.apiBaseUrl + window.AppConfig.endpoints.analyze, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCSRFToken()
                }
            });
            
            const result = await handleApiResponse(response);
            showResult(result.has_pneumonia, result.confidence);
            
        } catch (error) {
            showError(error.message);
        } finally {
            showLoading(false);
            scanButton.disabled = false;
            scanButton.textContent = 'Analyze X-ray';
        }
    });
    
    // Clear button
    clearButton.addEventListener('click', function() {
        fileInput.value = '';
        patientName.value = '';
        patientAge.value = '';
        patientGender.value = '';
        scanButton.disabled = true;
        document.getElementById('resultsSection').style.display = 'none';
    });
    
    // New scan button
    newScanButton?.addEventListener('click', function() {
        fileInput.value = '';
        patientName.value = '';
        patientAge.value = '';
        patientGender.value = '';
        scanButton.disabled = true;
        document.getElementById('resultsSection').style.display = 'none';
    });
    
    // Export button
    exportButton?.addEventListener('click', async function() {
        try {
            showLoading(true);
            
            const response = await fetch(window.AppConfig.apiBaseUrl + window.AppConfig.endpoints.export, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    patient_name: patientName.value.trim(),
                    patient_age: patientAge.value,
                    patient_gender: patientGender.value
                })
            });
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pneumonia_report_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            showError('Failed to export report: ' + error.message);
        } finally {
            showLoading(false);
        }
    });
    
    // Initialize button state
    updateScanButtonState();
});

// Result display function (connected with detector_animations.js)
window.showResult = function(hasPneumonia, confidence) {
    const resultsSection = document.getElementById('resultsSection');
    const resultText = document.getElementById('resultText');
    const resultMessage = document.getElementById('resultMessage');
    const confidenceBar = document.getElementById('confidenceBar');
    const confidenceValue = document.getElementById('confidenceValue');
    
    // Update result display
    if (hasPneumonia) {
        document.querySelector('.result-indicator').className = 'result-indicator pneumonia-positive';
        resultText.textContent = 'Pneumonia Detected';
        resultMessage.textContent = 'The analysis indicates signs of pneumonia. Please consult with a healthcare professional.';
    } else {
        document.querySelector('.result-indicator').className = 'result-indicator pneumonia-negative';
        resultText.textContent = 'No Pneumonia Detected';
        resultMessage.textContent = 'No signs of pneumonia were detected. However, if symptoms persist, please consult a doctor.';
    }
    
    // Animate confidence bar
    confidenceBar.style.width = '0';
    setTimeout(() => {
        confidenceBar.style.width = `${confidence}%`;
        confidenceValue.textContent = `${confidence}% confidence`;
    }, 100);
    
    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
};