/**
 * ════════════════════════════════════════════════════════════════════
 *  bitacora_receptor.gs — Receptor de accesos · Google Apps Script
 *  Contexto Histórico y Legal de los Cuidados Paliativos (37542001) · UAN
 * ════════════════════════════════════════════════════════════════════
 *
 *  Recibe los pings de _shared/bitacora.js y los anota en una hoja
 *  PRIVADA. Reemplaza al receptor antiguo en dos cosas:
 *
 *    · NO pide número de cédula. El receptor anterior lo hacía y no
 *      hace falta para saber qué material se consulta. Menos dato,
 *      menos riesgo si la hoja se comparte por error.
 *    · NO devuelve nunca contenido de la hoja. doGet responde un OK
 *      seco. Como la URL tiene que estar en el HTML público, este
 *      endpoint solo debe saber escribir.
 *
 *  ── QUÉ PUEDE PASAR Y QUÉ NO ──────────────────────────────────────
 *  La URL es pública, así que alguien podría enviar filas falsas. Es
 *  el techo del riesgo: ensuciar la bitácora. No hay forma de leer la
 *  hoja, ni de borrarla, ni de llegar a otros datos desde aquí.
 *  Si aparece basura, se borran las filas y se crea un despliegue
 *  nuevo (URL nueva).
 *
 *  ── INSTALACIÓN ───────────────────────────────────────────────────
 *  1. Crear una hoja de cálculo nueva, PRIVADA: «Bitácora de accesos
 *     — Contexto Histórico 2026».
 *  2. Extensiones → Apps Script. Borrar el contenido y pegar esto.
 *  3. Ejecutar una vez `prepararHoja` para crear los encabezados.
 *  4. Implementar → Nueva implementación → Aplicación web:
 *       · Ejecutar como: Yo
 *       · Acceso: Cualquier persona
 *     («Cualquier persona» es necesario: quien consulta el material no
 *      está autenticado. Por eso el endpoint solo escribe.)
 *  5. Copiar la URL y pegarla en URL_RECEPTOR, dentro del bloque
 *     <script> de bitacora que lleva cada página.
 *  6. Al cambiar este código hay que crear una implementación NUEVA;
 *     editar la existente no actualiza nada.
 *
 *  ⚠️ La hoja NO se comparte con nadie. Contiene datos personales
 *     (Ley 1581 de 2012). Ver PROTECCION_DATOS.md.
 * ════════════════════════════════════════════════════════════════════
 */

var HOJA = 'Accesos';
var RETENCION_DIAS = 365;   // ver purgarAntiguos()

/** Crea la hoja y sus encabezados. Ejecutar una sola vez, a mano. */
function prepararHoja() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(HOJA) || libro.insertSheet(HOJA);
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(['Fecha y hora', 'Nombre', 'Correo', 'Página', 'Título', 'Curso']);
    hoja.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#D9E0D2');
    hoja.setFrozenRows(1);
    hoja.setColumnWidth(1, 160);
    hoja.setColumnWidth(2, 180);
    hoja.setColumnWidth(3, 220);
    hoja.setColumnWidth(5, 280);
  }
  return 'Hoja lista.';
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return ok_();
    var d = JSON.parse(e.postData.contents);

    // Recorte defensivo: nada de lo que llega es de fiar, y una fila
    // enorme rompería la hoja.
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA)
            || SpreadsheetApp.getActiveSpreadsheet().insertSheet(HOJA);

    hoja.appendRow([
      Utilities.formatDate(new Date(), 'America/Bogota', 'yyyy-MM-dd HH:mm:ss'),
      recortar_(d.nombre, 80),
      recortar_(d.correo, 120),
      recortar_(d.pagina, 120),
      recortar_(d.titulo, 200),
      recortar_(d.curso, 20)
    ]);
    return ok_();
  } catch (err) {
    // Nunca se devuelve el detalle del error: podría revelar la
    // estructura interna. El cliente usa no-cors y no lo lee de todos modos.
    return ok_();
  }
}

/** Comprobación de vida. No expone ningún dato de la hoja. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', servicio: 'bitacora', version: 1 }))
    .setMimeType(ContentService.MimeType.JSON);
}

function ok_() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function recortar_(v, n) {
  return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').slice(0, n);
}

/**
 * Borra los registros con más de RETENCION_DIAS.
 * El principio de limitación del plazo (Ley 1581 de 2012) pide no
 * conservar datos personales más de lo necesario. Programar con un
 * activador mensual: Activadores → Agregar activador → purgarAntiguos.
 */
function purgarAntiguos() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA);
  if (!hoja || hoja.getLastRow() < 2) return;
  var limite = new Date();
  limite.setDate(limite.getDate() - RETENCION_DIAS);

  var filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, 1).getValues();
  // De abajo arriba: borrar de arriba abajo desplaza los índices.
  for (var i = filas.length - 1; i >= 0; i--) {
    var f = new Date(filas[i][0]);
    if (!isNaN(f) && f < limite) hoja.deleteRow(i + 2);
  }
}

/**
 * Resumen semanal al correo institucional del docente.
 * Cuenta consultas por página; no lista personas una por una.
 * Activador semanal: Activadores → Agregar activador → resumenSemanal.
 */
function resumenSemanal() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA);
  if (!hoja || hoja.getLastRow() < 2) return;

  var desde = new Date();
  desde.setDate(desde.getDate() - 7);

  var datos = hoja.getRange(2, 1, hoja.getLastRow() - 1, 5).getValues();
  var porPagina = {}, personas = {}, total = 0;

  datos.forEach(function (r) {
    var f = new Date(r[0]);
    if (isNaN(f) || f < desde) return;
    total++;
    porPagina[r[4] || r[3]] = (porPagina[r[4] || r[3]] || 0) + 1;
    if (r[2]) personas[r[2]] = true;
  });

  if (!total) return;

  var cuerpo = 'Bitácora de accesos · últimos 7 días\n\n'
             + 'Consultas: ' + total + '\n'
             + 'Personas distintas: ' + Object.keys(personas).length + '\n\n'
             + 'Por material:\n';

  Object.keys(porPagina)
    .sort(function (a, b) { return porPagina[b] - porPagina[a]; })
    .forEach(function (p) { cuerpo += '  ' + porPagina[p] + '  ' + p + '\n'; });

  MailApp.sendEmail({
    to: 'jbogoya63@uan.edu.co',
    subject: 'Bitácora del curso · ' + total + ' consultas esta semana',
    body: cuerpo
  });
}
