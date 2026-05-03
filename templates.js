const getTemplates = (data) => {
    
    // Helper para formatear fecha de hoy para textos (si se usa)
    const today = new Date();
    const yearStr = today.getFullYear();
    const dateStr = today.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });

    // Logo Image Tag - Mejorado para compatibilidad con Word y vista previa
    const logoHtml = data.logo 
        ? `<img src="${data.logo}" width="100" height="auto" style="max-width: 120px; max-height: 80px; display: block; margin: 0 auto; object-fit: contain;">`
        : `<div style="width: 100px; border: 1px dashed #ccc; padding: 10px; text-align: center; color: #999; font-size: 10px; margin: 0 auto;">[Logo Empresa]</div>`;

    // Helper: Generador de Membrete Corporativo (Header)
    const getHeader = (docTitle) => `
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 10pt; text-align: center;">
            <tr>
                <td style="width: 20%; border: 1px solid #000; padding: 10px;">
                    ${logoHtml}
                </td>
                <td style="width: 50%; border: 1px solid #000; padding: 10px; font-weight: bold; font-size: 14pt;">
                    ${docTitle}
                </td>
                <td style="width: 30%; border: 1px solid #000; padding: 5px; text-align: left; font-size: 9pt;">
                    <strong>Código:</strong> ${data.codigo}<br>
                    <strong>Versión:</strong> ${data.version}<br>
                    <strong>Fecha:</strong> ${data.fecha}<br>
                    <strong>Norma:</strong> Ley 29783, D.S. 024-2016-EM
                </td>
            </tr>
        </table>
    `;

    // Helper: Generador de Firmas Dual (Footer)
    const firmaHtml = data.firma 
        ? `<img src="${data.firma}" width="150" height="auto" style="max-width: 180px; max-height: 100px; display: block; margin: 0 auto; object-fit: contain;">`
        : `<div style="margin-top: 40px; border-top: 1px solid #000; width: 150px; margin: 0 auto;"></div>`;

    const getSignatures = () => `
        <div style="margin-top: 60px; width: 100%;">
            <table style="width: 100%; border: none;">
                <tr>
                    <td style="border: none; text-align: center; width: 50%; height: 100px; vertical-align: bottom;">
                        ${firmaHtml}<br>
                        <strong>${data.representante.toUpperCase()}</strong><br>
                        Titular / Representante Legal<br>
                        DNI: ${data.dniRepresentante}
                    </td>
                    <td style="border: none; text-align: center; width: 50%; height: 100px; vertical-align: bottom;">
                        ______________________________________<br>
                        <strong>${data.supervisor.toUpperCase()}</strong><br>
                        ${parseInt(data.numTrabajadores) >= 20 ? 'Presidente del Comité SST' : 'Supervisor de SST'}
                    </td>
                </tr>
            </table>
        </div>
    `;

    return [
        {
            id: 'politica-sst',
            title: 'Política de SST',
            icon: 'ph-file-text',
            desc: 'Política de Seguridad y Salud en el Trabajo.',
            content: `
                <div class="document-page">
                    ${getHeader('POLÍTICA DE SEGURIDAD Y SALUD EN EL TRABAJO')}
                    
                    <p><strong>${data.razonSocial.toUpperCase()}</strong> tiene como propósito principal llevar a cabo sus operaciones de ${data.actividad} bajo estándares óptimos de seguridad y eficiencia. Para lograr este objetivo, la empresa considera que su activo más valioso son sus colaboradores y trabajadores directos e indirectos.</p>
                    
                    <p>En consecuencia, se compromete a mantener condiciones adecuadas de Seguridad y Salud en el Trabajo, priorizando la prevención de riesgos en todas sus áreas de acción. Con ese fin, <strong>${data.razonSocial.toUpperCase()}</strong> establece las siguientes políticas:</p>
                    
                    <ol style="margin-left: 20px; text-align: justify;">
                        <li style="margin-bottom: 15px;"><strong>PROTECCIÓN DE COLABORADORES Y CONTRATISTAS:</strong> Garantizar un entorno de trabajo seguro y saludable para los ${data.numTrabajadores} trabajadores y contratistas. Se fomentará de manera constante una cultura de prevención de accidentes y enfermedades ocupacionales en todas las actividades mineras.</li>
                        
                        <li style="margin-bottom: 15px;"><strong>CUMPLIMIENTO NORMATIVO Y COMPROMISO VOLUNTARIO:</strong> Cumplir estrictamente con la normativa legal vigente, específicamente la Ley N° 29783 y el D.S. N° 024-2016-EM (Reglamento de Seguridad y Salud Ocupacional en Minería), así como con los compromisos asumidos voluntariamente.</li>
                        
                        <li style="margin-bottom: 15px;"><strong>COMUNICACIÓN ACTIVA Y COLABORACIÓN:</strong> Establecer un sistema de comunicación eficaz y garantizar la consulta y participación activa de los trabajadores y sus representantes para facilitar la mejora de las condiciones de seguridad e integridad física.</li>
                        
                        <li style="margin-bottom: 15px;"><strong>MEJORA CONTINUA DEL SISTEMA DE GESTIÓN:</strong> Implementar actualizaciones periódicas en base a las oportunidades de mejora identificadas, con el fin de fortalecer el Sistema de Gestión de SST, minimizando los riesgos de accidentes mediante la identificación de peligros y evaluación de riesgos (IPERC).</li>
                        
                        <li style="margin-bottom: 15px;"><strong>ACCESO A LA INFORMACIÓN Y TRANSPARENCIA:</strong> Asegurar que la información relacionada con el Sistema de Gestión de SST sea accesible para todas las partes interesadas aplicables de nuestras operaciones en ${data.ubicacion}.</li>
                    </ol>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'risst',
            title: 'RISST',
            icon: 'ph-book-open',
            desc: 'Reglamento Interno de Seguridad y Salud en el Trabajo.',
            content: `
                <div class="document-page">
                    ${getHeader('REGLAMENTO INTERNO DE SEGURIDAD Y SALUD EN EL TRABAJO (RISST)')}
                    <h2>I. RESUMEN EJECUTIVO</h2>
                    <p>El presente Reglamento Interno aplica a todas las actividades de <strong>${data.razonSocial}</strong> en su sede ubicada en ${data.ubicacion}, que cuenta con ${data.numTrabajadores} trabajadores.</p>
                    
                    <h2>II. OBJETIVOS Y ALCANCES</h2>
                    <p><strong>Objetivo General:</strong> Promover una cultura de prevención de riesgos laborales garantizando las condiciones de seguridad.</p>
                    <p><strong>Alcance:</strong> Comprende a todos los trabajadores, contratistas y visitantes de la operación minera.</p>

                    <h2>III. LIDERAZGO Y COMPROMISOS</h2>
                    <p>La alta dirección asume la responsabilidad de la prevención de accidentes y enfermedades ocupacionales.</p>

                    <h2>IV. ATRIBUCIONES Y OBLIGACIONES</h2>
                    <p>Se definen las responsabilidades del Titular Minero (${data.representante}), Supervisores y Trabajadores, según el D.S. N° 024-2016-EM.</p>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'iperc',
            title: 'IPERC (Admin)',
            icon: 'ph-table',
            desc: 'Matriz IPERC para Personal Administrativo (Excel Format). [Cotizar IPERC estudio asesoría]',
            content: `
                <div class="document-page" style="width: 29.7cm; min-height: 21cm;">
                    ${getHeader('MATRIZ DE IDENTIFICACIÓN DE PELIGROS Y EVALUACIÓN DE RIESGOS (IPERC) - SEDE ADMINISTRATIVA')}
                    
                    <div style="background: #1e293b; color: white; padding: 10px; font-weight: bold; margin-bottom: 10px; text-align: center;">
                        SOLO PARA PERSONAL ADMINISTRATIVO - OTROS PUESTOS DEBEN SER ELABORADOS POR ESPECIALISTAS (CONTÁCTANOS)
                    </div>

                    <p style="font-size: 9pt; margin-bottom: 5px;"><strong>Unidad:</strong> ${data.razonSocial} | <strong>Ubicación:</strong> ${data.ubicacion} | <strong>Fecha:</strong> ${data.fecha}</p>
                    
                    <table style="font-size: 8pt; width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #e2e8f0; text-align: center;">
                                <th rowspan="2" style="width: 10%;">Proceso / Tarea</th>
                                <th rowspan="2" style="width: 15%;">Peligro</th>
                                <th rowspan="2" style="width: 15%;">Riesgo / Consecuencia</th>
                                <th colspan="3" style="background: #cbd5e1;">Evaluación Inicial</th>
                                <th rowspan="2" style="width: 20%;">Medidas de Control a Implementar</th>
                                <th colspan="3" style="background: #cbd5e1;">Evaluación Residual</th>
                            </tr>
                            <tr style="background: #f1f5f9; text-align: center;">
                                <th style="width: 4%;">P</th>
                                <th style="width: 4%;">S</th>
                                <th style="width: 7%;">R</th>
                                <th style="width: 4%;">P</th>
                                <th style="width: 4%;">S</th>
                                <th style="width: 7%;">R</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: bold;">Trabajo en oficina</td>
                                <td>Postura sentada prolongada</td>
                                <td>Trastornos musculoesqueléticos / Fatiga</td>
                                <td style="text-align: center;">3</td>
                                <td style="text-align: center;">4</td>
                                <td style="text-align: center; background: #fef08a;">12 (M)</td>
                                <td>Pausas activas cada 2 horas. Mobiliario ergonómico. Capacitación en ergonomía.</td>
                                <td style="text-align: center;">4</td>
                                <td style="text-align: center;">5</td>
                                <td style="text-align: center; background: #bbf7d0;">20 (B)</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Uso de equipos de cómputo</td>
                                <td>Exposición a radiación no ionizante / Brillo de pantallas</td>
                                <td>Fatiga visual / Cefaleas</td>
                                <td style="text-align: center;">3</td>
                                <td style="text-align: center;">5</td>
                                <td style="text-align: center; background: #fef08a;">15 (M)</td>
                                <td>Ajuste de brillo y contraste. Uso de filtros o lentes con protección. Iluminación adecuada.</td>
                                <td style="text-align: center;">4</td>
                                <td style="text-align: center;">5</td>
                                <td style="text-align: center; background: #bbf7d0;">20 (B)</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Gestión Administrativa</td>
                                <td>Carga de trabajo / Estrés laboral</td>
                                <td>Estrés / Ansiedad / Síndrome de Burnout</td>
                                <td style="text-align: center;">2</td>
                                <td style="text-align: center;">4</td>
                                <td style="text-align: center; background: #fef08a;">8 (M)</td>
                                <td>Planificación de tareas. Comunicación efectiva. Fomento de clima laboral positivo.</td>
                                <td style="text-align: center;">3</td>
                                <td style="text-align: center;">5</td>
                                <td style="text-align: center; background: #bbf7d0;">15 (B)</td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">Uso de instalaciones</td>
                                <td>Pisos resbaladizos / Obstáculos en pasillos</td>
                                <td>Caídas al mismo nivel / Contusiones</td>
                                <td style="text-align: center;">3</td>
                                <td style="text-align: center;">3</td>
                                <td style="text-align: center; background: #fecaca;">9 (A)</td>
                                <td>Orden y limpieza (5S). Señalización de áreas. Reporte de condiciones inseguras.</td>
                                <td style="text-align: center;">4</td>
                                <td style="text-align: center;">4</td>
                                <td style="text-align: center; background: #bbf7d0;">16 (B)</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="margin-top: 15px; font-size: 8pt; border: 1px solid #000; padding: 10px; background: #f8fafc;">
                        <strong>Leyenda de Evaluación:</strong> P: Probabilidad | S: Severidad | R: Riesgo (Nivel) <br>
                        <strong>Niveles:</strong> (B) Bajo: 17-25 | (M) Medio: 9-16 | (A) Alto: 1-8
                    </div>

                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'mapa-riesgos',
            title: 'Mapa de Riesgos',
            icon: 'ph-map-trifold',
            desc: 'Formato para la elaboración del mapa de riesgos.',
            content: `
                <div class="document-page">
                    ${getHeader('MAPA DE RIESGOS')}
                    <p>El Mapa de Riesgos es una representación gráfica de los riesgos presentes en las instalaciones.</p>
                    <div style="border: 2px dashed #ccc; padding: 100px; text-align: center; margin: 20px 0;">
                        <h2>[ INSERTAR PLANO O CROQUIS AQUÍ ]</h2>
                        <p>Dibujar el layout de la zona de trabajo e incluir la simbología (NTP 399.010-1).</p>
                    </div>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'programa-anual',
            title: 'Programa Anual SST',
            icon: 'ph-calendar-check',
            desc: 'Programa Anual de Seguridad y Salud en el Trabajo.',
            content: `
                <div class="document-page">
                    ${getHeader('PROGRAMA ANUAL DE SEGURIDAD Y SALUD EN EL TRABAJO')}
                    <table>
                        <thead>
                            <tr>
                                <th>Actividad</th>
                                <th>Responsable</th>
                                <th>Frecuencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Actualización IPERC</td><td>${data.supervisor}</td><td>Anual</td></tr>
                            <tr><td>Inspecciones Planeadas</td><td>${data.supervisor}</td><td>Mensual</td></tr>
                            <tr><td>Reuniones SST</td><td>Comité / Supervisor</td><td>Mensual</td></tr>
                            <tr><td>Simulacros de Emergencia</td><td>Brigada</td><td>Semestral</td></tr>
                        </tbody>
                    </table>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'plan-capacitaciones',
            title: 'Plan Anual Capacitaciones',
            icon: 'ph-presentation-chart',
            desc: 'Plan y Programa Anual de Capacitaciones (DS 024-2016-EM).',
            content: `
                <div class="document-page">
                    ${getHeader('PLAN ANUAL DE CAPACITACIONES EN SST')}
                    <p>De acuerdo al Anexo 6 del D.S. 024-2016-EM, se programan las capacitaciones mínimas.</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Tema de Capacitación</th>
                                <th>Duración Min.</th>
                                <th>Mes Programado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Inducción y Orientación Básica</td><td>8 hrs</td><td>Al ingreso</td></tr>
                            <tr><td>IPERC y Mapa de Riesgos</td><td>4 hrs</td><td>Febrero</td></tr>
                            <tr><td>Respuesta a Emergencias y Primeros Auxilios</td><td>4 hrs</td><td>Abril</td></tr>
                            <tr><td>Uso de EPP</td><td>2 hrs</td><td>Mayo</td></tr>
                            <tr><td>Estándares y PETS</td><td>4 hrs</td><td>Julio</td></tr>
                        </tbody>
                    </table>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'plan-emergencias',
            title: 'Plan de Emergencias',
            icon: 'ph-warning',
            desc: 'Plan de Respuesta a Emergencias.',
            content: `
                <div class="document-page">
                    ${getHeader('PLAN DE RESPUESTA A EMERGENCIAS')}
                    <h2>1. OBJETIVO</h2>
                    <p>Establecer procedimientos de respuesta rápida ante situaciones de emergencia.</p>
                    <h2>2. DIRECTORIO TELEFÓNICO</h2>
                    <table>
                        <tr><th>Entidad</th><th>Número</th></tr>
                        <tr><td>Bomberos</td><td>116</td></tr>
                        <tr><td>Policía Nacional</td><td>105</td></tr>
                        <tr><td>Titular (${data.representante})</td><td>[Completar]</td></tr>
                    </table>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'reg-epp',
            title: 'Registro de EPP',
            icon: 'ph-hard-hat',
            desc: 'Registro de entrega de Equipos de Protección Personal.',
            content: `
                <div class="document-page" style="width: 29.7cm; min-height: 21cm;">
                    ${getHeader('REGISTRO DE ENTREGA DE EPP')}
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Nombres</th>
                                <th>DNI</th>
                                <th>EPP Entregado</th>
                                <th>Firma</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td></td><td></td><td></td><td></td><td></td></tr>
                            <tr><td></td><td></td><td></td><td></td><td></td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        {
            id: 'reg-capacitacion',
            title: 'Registro Capacitaciones',
            icon: 'ph-users',
            desc: 'Registro de asistencia a capacitaciones.',
            content: `
                <div class="document-page">
                    ${getHeader('REGISTRO DE CAPACITACIÓN / INDUCCIÓN')}
                    <p><strong>Tema:</strong> _________________________________________ <strong>Fecha:</strong> ___/___/20__</p>
                    <table>
                        <thead><tr><th>N°</th><th>Nombres y Apellidos</th><th>DNI</th><th>Firma</th></tr></thead>
                        <tbody><tr><td>1</td><td></td><td></td><td></td></tr><tr><td>2</td><td></td><td></td><td></td></tr></tbody>
                    </table>
                </div>
            `
        },
        {
            id: 'reg-inspecciones',
            title: 'Registro de Inspecciones',
            icon: 'ph-magnifying-glass',
            desc: 'Registro de inspecciones internas.',
            content: `
                <div class="document-page">
                    ${getHeader('REGISTRO DE INSPECCIONES INTERNAS')}
                    <p><strong>Responsable:</strong> ${data.supervisor} &nbsp;&nbsp; <strong>Fecha:</strong> ___/___/20__</p>
                    <table>
                        <thead><tr><th>Condición Hallada</th><th>Acción Correctiva</th><th>Estado</th></tr></thead>
                        <tbody><tr><td></td><td></td><td></td></tr></tbody>
                    </table>
                </div>
            `
        },
        {
            id: 'reg-accidentes',
            title: 'Registro Accidentes',
            icon: 'ph-first-aid',
            desc: 'Registro de accidentes de trabajo e incidentes.',
            content: `
                <div class="document-page">
                    ${getHeader('REGISTRO DE ACCIDENTES E INCIDENTES')}
                    <h2>DATOS DEL EVENTO</h2>
                    <p><strong>Fecha:</strong> ___/___/20__ &nbsp;&nbsp; <strong>Afectado:</strong> __________________________</p>
                    <h2>MEDIDAS CORRECTIVAS</h2>
                    <table>
                        <tr><th>Medida</th><th>Responsable</th><th>Fecha Cumplimiento</th></tr>
                        <tr><td></td><td></td><td></td></tr>
                    </table>
                </div>
            `
        },
        {
            id: 'emo',
            title: 'Procedimiento EMO',
            icon: 'ph-heartbeat',
            desc: 'Control de Exámenes Médicos Ocupacionales.',
            content: `
                <div class="document-page">
                    ${getHeader('CONTROL DE EXÁMENES MÉDICOS (EMO)')}
                    <table>
                        <thead><tr><th>Trabajador</th><th>DNI</th><th>Fecha EMO</th><th>Aptitud</th><th>Vencimiento</th></tr></thead>
                        <tbody><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody>
                    </table>
                </div>
            `
        },
        {
            id: 'acta-supervisor',
            title: 'Acta Designación Supervisor',
            icon: 'ph-user-focus',
            desc: 'Para empresas con menos de 20 trabajadores.',
            disabled: parseInt(data.numTrabajadores) > 20,
            content: `
                <div class="document-page">
                    ${getHeader('ACTA DE ELECCIÓN DEL SUPERVISOR DE SST')}
                    <p>En las instalaciones de <strong>${data.razonSocial}</strong>, ubicadas en ${data.ubicacion}, se reunieron los trabajadores para proceder a la elección del Supervisor de Seguridad y Salud en el Trabajo, de acuerdo a la Ley N° 29783.</p>
                    <p>Teniendo en cuenta que la empresa cuenta con <strong>${data.numTrabajadores}</strong> trabajadores, corresponde elegir a un Supervisor.</p>
                    <p>Queda elegido como <strong>Supervisor de SST</strong> el Sr./Sra.: <strong>${data.supervisor}</strong>.</p>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'acta-comite',
            title: 'Acta Conformación Comité',
            icon: 'ph-users-three',
            desc: 'Para empresas con 20 o más trabajadores. Ver Modelos Referenciales: https://www2.trabajo.gob.pe/el-ministerio-2/sector-trabajo/dir-gen-de-d-f-s-s-t/dir-de-s-s-t-t/modelos-ref-comite-sst-privado/',
            disabled: parseInt(data.numTrabajadores) < 20,
            content: `
                <div class="document-page">
                    ${getHeader('ACTA DE CONSTITUCIÓN DEL COMITÉ DE SST')}
                    
                    <h2 style="text-align: center; font-size: 13pt;">ACTA N° 001 – CONSTITUCIÓN DEL COMITÉ DE SEGURIDAD Y SALUD EN EL TRABAJO</h2>
                    
                    <p>En la unidad minera <strong>${data.razonSocial}</strong>, ubicada en <strong>${data.ubicacion}</strong>, siendo las 09:00 AM del día <strong>${data.fecha}</strong>, se reunieron los representantes del empleador y de los trabajadores con la finalidad de constituir el Comité de Seguridad y Salud en el Trabajo de la empresa <strong>${data.razonSocial}</strong>, conforme a lo establecido en la normativa vigente.</p>

                    <h3>1. OBJETIVO</h3>
                    <p>Constituir formalmente el Comité de Seguridad y Salud en el Trabajo, órgano encargado de promover, supervisar y fiscalizar el cumplimiento de las disposiciones en materia de seguridad y salud ocupacional en la empresa.</p>

                    <h3>2. BASE LEGAL</h3>
                    <ul>
                        <li>Ley N° 29783</li>
                        <li>D.S. N° 024-2016-EM</li>
                    </ul>

                    <h3>3. CONFORMACIÓN DEL COMITÉ</h3>
                    <p>El Comité de Seguridad y Salud en el Trabajo queda conformado de la siguiente manera:</p>
                    <p><strong>Representantes del Empleador:</strong></p>
                    <ul>
                        <li>${data.representante} – Representante Legal</li>
                        <li>________________________________ – Cargo: ________________</li>
                    </ul>
                    <p><strong>Representantes de los Trabajadores:</strong></p>
                    <ul>
                        <li>________________________________ – Cargo: ________________</li>
                        <li>________________________________ – Cargo: ________________</li>
                    </ul>

                    <h3>4. ELECCIÓN DE CARGOS</h3>
                    <p>En esta misma sesión, los miembros del comité acuerdan la designación de los siguientes cargos:</p>
                    <ul>
                        <li><strong>Presidente:</strong> ${data.supervisor}</li>
                        <li><strong>Secretario:</strong> ________________________________</li>
                    </ul>

                    <h3>5. FUNCIONES DEL COMITÉ</h3>
                    <p>El Comité tendrá, entre otras, las siguientes funciones:</p>
                    <ul>
                        <li>Promover la cultura de prevención de riesgos laborales.</li>
                        <li>Participar en la elaboración, aprobación y evaluación del Programa de SST.</li>
                        <li>Supervisar el cumplimiento del IPERC.</li>
                        <li>Investigar accidentes e incidentes de trabajo.</li>
                        <li>Realizar inspecciones periódicas en la unidad minera.</li>
                    </ul>

                    <h3>6. VIGENCIA</h3>
                    <p>El Comité tendrá una vigencia de un (01) año, a partir de la fecha de su constitución, pudiendo sus miembros ser reelegidos conforme a la normativa aplicable.</p>

                    <h3>7. ACUERDOS</h3>
                    <p>Los miembros acuerdan cumplir y hacer cumplir las disposiciones de SST, reunirse de manera mensual y dejar constancia de sus actividades en actas.</p>

                    <h3>8. CIERRE</h3>
                    <p>No habiendo otros puntos que tratar, se da por concluida la presente acta, firmando los asistentes en señal de conformidad.</p>

                    <h3 style="margin-top: 30px;">✍️ TABLA DE FIRMAS</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background: #f1f5f9;">
                                <th style="border: 1px solid #000; padding: 8px;">Nombre</th>
                                <th style="border: 1px solid #000; padding: 8px;">Cargo</th>
                                <th style="border: 1px solid #000; padding: 8px;">Firma</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #000; padding: 15px;">${data.representante}</td>
                                <td style="border: 1px solid #000; padding: 15px;">Representante Legal</td>
                                <td style="border: 1px solid #000; padding: 15px; text-align: center;">${data.firma ? `<img src="${data.firma}" width="100">` : '__________'}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000; padding: 15px;">${data.supervisor}</td>
                                <td style="border: 1px solid #000; padding: 15px;">Presidente Comité</td>
                                <td style="border: 1px solid #000; padding: 15px; text-align: center;">__________</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000; padding: 15px;">____________________</td>
                                <td style="border: 1px solid #000; padding: 15px;">Secretario</td>
                                <td style="border: 1px solid #000; padding: 15px; text-align: center;">__________</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #000; padding: 15px;">____________________</td>
                                <td style="border: 1px solid #000; padding: 15px;">Miembro</td>
                                <td style="border: 1px solid #000; padding: 15px; text-align: center;">__________</td>
                            </tr>
                        </tbody>
                    </table>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'linea-base',
            title: 'Estudio Línea Base',
            icon: 'ph-chart-bar',
            desc: 'Diagnóstico del estado de cumplimiento de SST. [Cotizar estudio línea base]',
            content: `
                <div class="document-page">
                    ${getHeader('ESTUDIO DE LÍNEA BASE (DIAGNÓSTICO)')}
                    <p>El Estudio de Línea Base permite conocer el nivel de cumplimiento del sistema de gestión de SST de <strong>${data.razonSocial}</strong> frente a la Ley 29783.</p>
                    <div style="border: 1px solid #000; padding: 20px; text-align: center; background: #fffbeb;">
                        <h3>⚠️ REQUIERE EVALUACIÓN EN CAMPO</h3>
                        <p>Para un diagnóstico real y detallado, se requiere una inspección presencial y auditoría de documentos.</p>
                        <p><strong>Contacta a un profesional para cotizar tu Estudio de Línea Base.</strong></p>
                    </div>
                    ${getSignatures()}
                </div>
            `
        },
        {
            id: 'pack-capacitaciones',
            title: '4 Capacitaciones Obligatorias',
            icon: 'ph-graduation-cap',
            desc: 'Pack de cursos virtuales: 1. Normativa SST, 2. Peligros Ergonómicos, 3. IPERC, 4. Actos y Condiciones Subestándares. [Cotizar Pack de Capacitaciones]',
            content: `
                <div class="document-page">
                    ${getHeader('PACK DE CAPACITACIONES OBLIGATORIAS (VIRTUALES)')}
                    <div style="background: #f0fdf4; border-left: 5px solid #10b981; padding: 1.5rem; margin-bottom: 2rem;">
                        <h2 style="color: #065f46; margin-top: 0;">Capacitaciones incluidas:</h2>
                        <ul style="font-size: 1.1rem; line-height: 1.8;">
                            <li><strong>Módulo 1:</strong> Normativa Legal de SST (Ley 29783).</li>
                            <li><strong>Módulo 2:</strong> Identificación de Peligros Ergonómicos.</li>
                            <li><strong>Módulo 3:</strong> Elaboración de Matriz IPERC.</li>
                            <li><strong>Módulo 4:</strong> Identificación de Actos y Condiciones Subestándares.</li>
                        </ul>
                    </div>
                    <p style="text-align: center; font-weight: bold; font-size: 1.2rem; color: #1e293b;">
                        Solicita tus accesos virtuales para certificar a tu personal hoy mismo.
                    </p>
                    <div style="margin-top: 2rem; border: 2px dashed #10b981; padding: 2rem; text-align: center; border-radius: 12px;">
                        <h3>¿Deseas implementar estas capacitaciones?</h3>
                        <p>Haz clic en el botón "Cotizar" en el panel principal.</p>
                    </div>
                </div>
            `
        },
        {
            id: 'induccion-auto',
            title: 'Inducción Automática SST',
            icon: 'ph-monitor-play',
            desc: 'Sistema digitalizado de inducción para nuevos trabajadores. [Cotiza tu sistema de inducción automático SST]',
            content: `
                <div class="document-page">
                    ${getHeader('SISTEMA DE INDUCCIÓN AUTOMÁTICO')}
                    <div style="text-align: center; padding: 2rem;">
                        <i class="ph ph-rocket-launch" style="font-size: 4rem; color: #2563eb;"></i>
                        <h2 style="margin-top: 1rem;">Digitaliza tu Onboarding</h2>
                        <p style="font-size: 1.1rem; color: #475569; max-width: 600px; margin: 1rem auto;">
                            Automatiza la charla de 8 horas con videos interactivos, evaluaciones en línea y certificados automáticos.
                        </p>
                        <div style="background: #f1f5f9; padding: 1.5rem; border-radius: 8px; text-align: left; margin-top: 2rem;">
                            <p>✅ Ahorro de tiempo del supervisor.</p>
                            <p>✅ Registro digital de asistencia inmediato.</p>
                            <p>✅ Evaluaciones con nota aprobatoria mínima configurable.</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'plan-anual-premium',
            title: 'Plan Integral SST - S/ 600 al año',
            icon: 'ph-star-fill',
            desc: 'TODO INCLUIDO: 4 Capacitaciones + Sistema de Inducción + 2 Asesorías anuales. [¡Contratar Plan Integral S/ 600!]',
            content: `
                <div class="document-page" style="background: linear-gradient(to bottom, #ffffff, #f0fdfa);">
                    ${getHeader('OFERTA: PLAN INTEGRAL ANUAL DE SST')}
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h1 style="color: #059669; font-size: 2.5rem; margin-bottom: 0;">S/ 600 <small style="font-size: 1rem; color: #64748b;">/ año</small></h1>
                        <p style="color: #059669; font-weight: bold;">Solución Completa para Pequeña Minería</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            <h3 style="color: #2563eb; margin-top: 0;"><i class="ph ph-video-camera"></i> Formación</h3>
                            <p>4 Capacitaciones Obligatorias (Virtuales) con certificación incluida.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            <h3 style="color: #2563eb; margin-top: 0;"><i class="ph ph-cpu"></i> Tecnología</h3>
                            <p>Sistema de Inducción Virtual Automático para nuevos ingresos.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            <h3 style="color: #2563eb; margin-top: 0;"><i class="ph ph-users-four"></i> Asesoría</h3>
                            <p>2 Asesorías personalizadas al año para resolver dudas legales o técnicas.</p>
                        </div>
                        <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            <h3 style="color: #2563eb; margin-top: 0;"><i class="ph ph-shield-check"></i> Cumplimiento</h3>
                            <p>Tranquilidad total ante fiscalizaciones de SUNAFIL.</p>
                        </div>
                    </div>

                    <div style="background: #1e293b; color: white; padding: 1.5rem; border-radius: 12px; text-align: center;">
                        <p style="margin: 0; font-size: 1.1rem;">Asegura tu operación por menos de <strong>S/ 50 mensuales</strong>.</p>
                    </div>
                </div>
            `
        }
    ];
};
