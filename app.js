document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('operation-form');
    const landingSection = document.getElementById('landing-section');
    const configSection = document.getElementById('config-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const mainAppHeader = document.getElementById('main-app-header');
    const btnEnterApp = document.getElementById('btn-enter-app');
    const btnEditConfig = document.getElementById('btn-edit-config');
    const documentsGrid = document.getElementById('documents-grid');
    
    // Modal Elements
    const modal = document.getElementById('document-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnPrint = document.getElementById('btn-print');
    const btnWord = document.getElementById('btn-word');
    const modalDocTitle = document.getElementById('modal-doc-title');
    const printArea = document.getElementById('print-area');

    // New Modals Elements
    const inspectionModal = document.getElementById('inspection-modal');
    const btnSimular = document.getElementById('btn-simular');
    const btnCloseInspection = document.getElementById('btn-close-inspection');
    
    const aiAssistant = document.getElementById('ai-assistant');
    const aiText = document.getElementById('ai-text');
    const btnCloseAi = document.getElementById('btn-close-ai');
    
    const declarationCheck = document.getElementById('declaration-check');
    const btnDownloadAll = document.getElementById('btn-download-all');

    const introSplash = document.getElementById('intro-splash');

    // Handle Intro Transition
    if (introSplash) {
        setTimeout(() => {
            introSplash.classList.add('hidden');
        }, 4500); // Wait for animation to finish + buffer
    }

    // Display Elements
    const dispRazonSocial = document.getElementById('display-razonSocial');
    const dispTrabajadores = document.getElementById('display-trabajadores');
    const dispUbicacion = document.getElementById('display-ubicacion');
    const alertOrganText = document.getElementById('sst-organ-text');
    const alertOrganContainer = document.getElementById('sst-organ-alert');

    // Default Date
    const today = new Date().toISOString().split('T')[0];
    const fechaInput = document.getElementById('fechaDoc');
    if(fechaInput) fechaInput.value = today;

    // State
    let operationData = null;
    let logoBase64 = '';
    let firmaBase64 = '';

    // Handle Logo Upload
    const logoInput = document.getElementById('logoEmpresa');
    if (logoInput) {
        logoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    logoBase64 = evt.target.result;
                    console.log('Logo cargado correctamente');
                    // Feedback visual en el label o input
                    logoInput.style.borderColor = 'var(--accent)';
                    logoInput.style.background = 'rgba(16, 185, 129, 0.1)';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle Signature Upload
    const firmaInput = document.getElementById('firmaEmpresa');
    if (firmaInput) {
        firmaInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    firmaBase64 = evt.target.result;
                    console.log('Firma cargada correctamente');
                    // Feedback visual
                    firmaInput.style.borderColor = 'var(--accent)';
                    firmaInput.style.background = 'rgba(16, 185, 129, 0.1)';
                };
                reader.readAsDataURL(file);
            }
        });
    }


    // Handle Landing Page Entrance
    if (btnEnterApp) {
        btnEnterApp.addEventListener('click', () => {
            landingSection.classList.remove('active');
            landingSection.classList.add('hidden');
            
            mainAppHeader.classList.remove('hidden');
            configSection.classList.remove('hidden');
            configSection.classList.add('active');
        });
    }

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rucVal = document.getElementById('ruc').value;
        const codigoDoc = `SST-MIN-${rucVal.slice(-4)}-${new Date().getFullYear()}`;

        // Capture Data
        operationData = {
            razonSocial: document.getElementById('razonSocial').value,
            ruc: rucVal,
            representante: document.getElementById('representante').value,
            dniRepresentante: document.getElementById('dniRepresentante').value,
            ubicacion: document.getElementById('ubicacion').value,
            numTrabajadores: parseInt(document.getElementById('numTrabajadores').value),
            actividad: document.getElementById('actividad').value,
            // Nuevos campos
            logo: logoBase64,
            firma: firmaBase64,
            supervisor: document.getElementById('nombreSupervisor').value,
            version: document.getElementById('versionDoc').value,
            fecha: document.getElementById('fechaDoc').value,
            codigo: codigoDoc
        };

        // Update Dashboard Info
        dispRazonSocial.textContent = operationData.razonSocial;
        dispTrabajadores.textContent = operationData.numTrabajadores;
        dispUbicacion.textContent = operationData.ubicacion;

        // Set Alert for Supervisor vs Committee
        if (operationData.numTrabajadores >= 20) {
            alertOrganText.textContent = "La operación requiere la conformación de un Comité de SST (≥20 trabajadores).";
            alertOrganContainer.className = "alert info-alert";
        } else {
            alertOrganText.textContent = "La operación requiere la elección de un Supervisor de SST (<20 trabajadores).";
            alertOrganContainer.className = "alert info-alert";
        }

        // Generate Cards
        renderDashboard();

        // Switch Views
        configSection.classList.remove('active');
        configSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        dashboardSection.classList.add('active');

        // Show AI Assistant with delay
        setTimeout(() => {
            const act = operationData.actividad.toLowerCase();
            aiText.innerHTML = `¡Oye! Noté que tu operación hace <strong>${act}</strong>. En tu caso es súper importante controlar riesgos específicos. Ya he generado los controles y programas requeridos para ti en tu sistema.`;
            aiAssistant.classList.remove('hidden');
        }, 2000); // 2 seconds delay
    });

    // Handle Inspection Simulation
    if (btnSimular) {
        btnSimular.addEventListener('click', () => {
            inspectionModal.classList.remove('hidden');
            inspectionModal.classList.add('active');
        });
    }

    if (btnCloseInspection) {
        btnCloseInspection.addEventListener('click', () => {
            inspectionModal.classList.remove('active');
            inspectionModal.classList.add('hidden');
        });
    }

    // Handle AI Close
    if (btnCloseAi) {
        btnCloseAi.addEventListener('click', () => {
            aiAssistant.classList.add('hidden');
        });
    }

    // Handle Edit Config
    btnEditConfig.addEventListener('click', () => {
        dashboardSection.classList.remove('active');
        dashboardSection.classList.add('hidden');
        configSection.classList.remove('hidden');
        configSection.classList.add('active');
    });

    // Render Dashboard Cards
    function renderDashboard() {
        documentsGrid.innerHTML = '';
        const templates = getTemplates(operationData); // from templates.js

        templates.forEach(doc => {
            const card = document.createElement('div');
            card.className = `doc-card glass-panel ${doc.disabled ? 'disabled' : ''}`;
            card.dataset.id = doc.id;
            
            // Detect links in desc and convert to anchor tags
            let docDesc = doc.desc;
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            docDesc = docDesc.replace(urlRegex, (url) => `<a href="${url}" target="_blank" style="color: var(--accent); text-decoration: underline;">Ver modelos</a>`);

            // Detect [Cotizar...] and extract label
            let cotizarButton = '';
            if (docDesc.includes('[') && docDesc.includes(']')) {
                const labelMatch = docDesc.match(/\[(.*?)\]/);
                if (labelMatch) {
                    const label = labelMatch[1];
                    docDesc = docDesc.replace(/\[.*?\]/, ''); // Remove from text
                    cotizarButton = `
                        <button class="btn btn-primary btn-small btn-cotizar" style="margin-top: 10px; width: 100%; background: #059669;" data-id="${doc.id}">
                            <i class="ph ph-whatsapp-logo"></i> ${label}
                        </button>
                    `;
                }
            }

            card.innerHTML = `
                <div class="doc-icon">
                    <i class="ph ${doc.icon}"></i>
                </div>
                <h3 class="doc-title">${doc.title}</h3>
                <p class="doc-desc">${docDesc}</p>
                ${cotizarButton}
                <div class="doc-action">
                    ${doc.disabled ? '<i class="ph ph-prohibit"></i> No aplica' : '<i class="ph ph-file-text"></i> Generar / Imprimir'}
                </div>
            `;

            // Handle Cotizar Button Click
            const btnCotizar = card.querySelector('.btn-cotizar');
            if (btnCotizar) {
                btnCotizar.addEventListener('click', (e) => {
                    e.stopPropagation(); // Don't open modal
                    const msg = `Hola Waffles Tech, solicito cotización para: ${doc.title} de la empresa ${operationData.razonSocial}.`;
                    window.open(`https://wa.me/51977740994?text=${encodeURIComponent(msg)}`, '_blank');
                });
            }

            if (!doc.disabled) {
                card.addEventListener('click', () => openDocument(doc));
            }

            documentsGrid.appendChild(card);
        });
    }

    // Modal Logic
    function openDocument(doc) {
        modalDocTitle.textContent = doc.title;
        printArea.innerHTML = doc.content;
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

    btnCloseModal.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.classList.add('hidden');
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
        }
    });

    // Print functionality
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            if (!declarationCheck.checked) {
                alert('Debe declarar que la información es correcta antes de descargar o imprimir.');
                return;
            }
            window.print();
        });
    }

    // Download All Functionality
    if (btnDownloadAll) {
        btnDownloadAll.addEventListener('click', async () => {
            if (!declarationCheck.checked) {
                alert('Debe declarar que la información es correcta antes de descargar todo.');
                return;
            }

            const templates = getTemplates(operationData);
            const activeTemplates = templates.filter(doc => !doc.disabled);
            
            if (confirm(`Se descargarán ${activeTemplates.length} documentos. ¿Continuar?`)) {
                for (const doc of activeTemplates) {
                    const sanitizedTitle = doc.title.replace(/[/\\?%*:|"<>]/g, '-').replace(/\s+/g, '_');
                    const filename = `${sanitizedTitle}_${operationData.codigo}.doc`;
                    exportToWord(doc.content, filename);
                    // Small delay to avoid browser blocking multiple downloads
                    await new Promise(resolve => setTimeout(resolve, 800));
                }
            }
        });
    }

    // Word export functionality
    if (btnWord) {
        btnWord.addEventListener('click', () => {
            if (!declarationCheck.checked) {
                alert('Debe declarar que la información es correcta antes de descargar.');
                return;
            }
            console.log('Botón Word clickeado');
            try {
                // Sanitizar nombre de archivo
                const title = modalDocTitle.textContent || 'Documento';
                const sanitizedTitle = title.replace(/[/\\?%*:|"<>]/g, '-').replace(/\s+/g, '_');
                const codigo = (operationData && operationData.codigo) ? operationData.codigo : 'SST';
                const filename = `${sanitizedTitle}_${codigo}.doc`;
                
                const content = printArea.innerHTML;
                if (!content || content.length < 10) {
                    alert('El documento parece estar vacío. Intente de nuevo.');
                    return;
                }

                console.log('Iniciando exportToWord para:', filename);
                exportToWord(content, filename);
            } catch (err) {
                console.error('Error en el listener de Word:', err);
                alert('Error al preparar la descarga: ' + err.message);
            }
        });
    }

    function exportToWord(html, filename){
        const preHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Export</title>
                <style>
                    body { font-family: Arial, sans-serif; font-size: 11pt; }
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #000; padding: 5px; }
                </style>
            </head>
            <body>
        `;
        const postHtml = "</body></html>";
        const htmlContent = preHtml + html + postHtml;
        
        try {
            const blob = new Blob(['\ufeff', htmlContent], {
                type: 'application/vnd.ms-word;charset=utf-8'
            });
            
            // Método para navegadores modernos
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            
            document.body.appendChild(a);
            a.click();
            
            console.log('Descarga iniciada para:', filename);
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 500); // Aumentado el tiempo para mayor seguridad
            
        } catch (error) {
            console.error('Error en exportToWord:', error);
            // Fallback extremo: data URI si falla Blob
            try {
                const link = document.createElement('a');
                link.href = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlContent);
                link.download = filename;
                link.click();
            } catch (fallbackError) {
                alert('No se pudo generar el archivo Word. Intente usar la opción de Imprimir / PDF.');
            }
        }
    }
});
