# Bitácora de accesos

Cómo saber qué material del curso se está consultando, sin prometer una seguridad que un
sitio estático no puede dar.

---

## 1. Lo primero: qué es esto y qué no

**Es una bitácora. No es un control de acceso.**

GitHub Pages sirve archivos estáticos desde un repositorio público. No hay servidor que pueda
decidir quién entra. Cualquier cosa que llegue al navegador —HTML, CSS, JavaScript, contraseñas,
claves— es visible con `Ctrl+U`, con la URL directa, con `raw.githubusercontent.com`, clonando el
repositorio o desde la caché de Google.

Una contraseña en JavaScript es un cartel de «no pase», no una cerradura. Esto ya está reconocido
en [`ENDURECER_EXAMEN.md`](ENDURECER_EXAMEN.md) para el `config.js`, y vale igual para cualquier
portal de entrada.

Lo que sí se puede hacer es **preguntar quién es y anotarlo cuando responde**. Con doce
estudiantes que no son adversarios, eso responde a la pregunta real: qué material se usa, cuándo
y por cuántas personas.

### Si hace falta restringir de verdad

Entonces el contenido no va en GitHub Pages. Dos vías con autenticación real:

| Vía | Quién autentica | Cuándo usarla |
|---|---|---|
| **Apps Script como app web con acceso limitado a `uan.edu.co`** | Google, con la cuenta institucional | Exámenes, claves de respuesta, material restringido |
| **Aula virtual de la UAN** | La universidad | Lo mismo, si ya está en uso |

En ambos casos el estudiante inicia sesión de verdad y el servidor decide. Eso es control de
acceso; lo de este documento no lo es.

---

## 2. Cómo se comporta

Tres reglas de diseño, en este orden de prioridad:

1. **No bloquea.** El aviso se puede cerrar con «Continuar sin registrarme» y se lee todo igual.
   El material docente del curso es abierto.
2. **No rompe la portabilidad.** Sin conexión, el envío falla en silencio y la página funciona
   idéntica. Sigue abriendo con doble clic y sin red, que es la regla innegociable del curso
   (decisión D7) y existe porque parte de los estudiantes ejerce donde la conectividad no se da
   por supuesta.
3. **Pregunta una sola vez.** La respuesta queda en el `localStorage` del propio navegador. Las
   visitas siguientes se registran sin volver a preguntar. Quien dijo que no, no vuelve a ver el
   aviso.

Quien se registra ve una marca discreta abajo a la derecha —«Registrado como… · cambiar»— que
borra sus datos de ese navegador y vuelve a preguntar. Es la vía de revocación, y está a un clic.

---

## 3. Instalación

### 3.1 La hoja y el script

1. Crear una hoja de cálculo **privada**: «Bitácora de accesos — Contexto Histórico 2026».
2. **Extensiones → Apps Script**. Borrar el contenido y pegar
   [`scripts/bitacora_receptor.gs`](../scripts/bitacora_receptor.gs).
3. Ejecutar una vez la función `prepararHoja` para crear los encabezados.
4. **Implementar → Nueva implementación → Aplicación web**:
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier persona**
5. Copiar la URL del despliegue.

> **Por qué «Cualquier persona».** Quien consulta el material no está autenticado, así que el
> endpoint tiene que aceptar peticiones anónimas. Por eso el receptor **solo escribe** y `doGet`
> devuelve un OK seco: nunca expone el contenido de la hoja.

### 3.2 Activar el registro en las páginas

En el `<script>` de bitácora que lleva cada página, pegar la URL:

```javascript
var URL_RECEPTOR = 'https://script.google.com/macros/s/TU_ID/exec';
```

**Con `URL_RECEPTOR` vacío el código no hace absolutamente nada**: no pide datos, no envía nada,
no pinta nada. Ese es el estado en que se publica.

### 3.3 Activadores recomendados

En Apps Script → **Activadores**:

| Función | Frecuencia | Para qué |
|---|---|---|
| `purgarAntiguos` | mensual | Borra registros de más de un año. Principio de limitación del plazo |
| `resumenSemanal` | semanal | Envía al correo institucional el conteo por material |

---

## 4. Dónde está el código y cómo propagarlo

[`_shared/bitacora.js`](../_shared/bitacora.js) es **fuente canónica, no enlace**. Igual que
`tokens.css`, se copia en línea dentro de un `<script>` de cada página. Si se enlazara con
`<script src>`, una página descargada suelta dejaría de funcionar.

Ahora mismo está incrustado **solo en el `index.html` del curso**, que es la puerta de entrada.
Es deliberado: cada copia adicional es un sitio más donde actualizar la URL el día que se cambie
el despliegue.

Como la identidad se guarda en `localStorage` del navegador, quien pase por el índice queda
registrado; las páginas de sesión que no lleven el script simplemente no anotan esa consulta
concreta. **Si quiere el detalle por sesión**, hay que incrustar el mismo bloque antes de
`</body>` en cada archivo y actualizar la URL en todos a la vez.

---

## 5. Protección de datos

Se recogen **nombre y correo electrónico**. Son datos personales, y aplica la
**Ley Estatutaria 1581 de 2012** y el **Decreto 1377 de 2013**.

| Requisito | Cómo se cumple |
|---|---|
| Aviso previo | El texto de tratamiento se muestra **antes** de pedir nada, en la misma caja |
| Autorización | El registro es voluntario y explícito: hay que pulsar «Registrarme» |
| Finalidad declarada | Gestión académica del curso, y nada más |
| Responsable identificado | Jorge Wilhem Bogoya López · jbogoya63@uan.edu.co |
| Derecho de supresión | El botón «cambiar» borra los datos del navegador; para la hoja, escribir al docente |
| Plazo de retención | 365 días, aplicado por `purgarAntiguos` |
| Almacenamiento | Hoja **privada**, no compartida. Nunca en el repositorio |

**No se recoge número de cédula.** El receptor antiguo
(`apps_script_receptor.js`, sesión 6) lo pedía; para saber qué material se consulta no hace falta,
y es el dato que más eleva el daño si la hoja se comparte por error.

Ver [`PROTECCION_DATOS.md`](../PROTECCION_DATOS.md) y
[`FORMATO_CONSENTIMIENTO_DATOS.md`](FORMATO_CONSENTIMIENTO_DATOS.md).

---

## 6. Riesgos reales, sin adornos

| Riesgo | ¿Pasa? | Qué se hizo |
|---|---|---|
| La URL del receptor es pública | **Sí, inevitable.** En un sitio estático el navegador tiene que conocerla | El endpoint **solo escribe**. `doGet` no devuelve datos de la hoja |
| Alguien envía filas falsas | Sí, es posible | Es el techo del daño: ensuciar la bitácora. Se borran las filas y se crea un despliegue nuevo, con URL nueva |
| Alguien lee el material sin registrarse | Sí, siempre | Es lo esperado: esto no es un control de acceso |
| Alguien pone un nombre falso | Sí | No hay verificación de identidad. Si hace falta, se necesita autenticación real (§1) |
| Los datos quedan en el navegador ajeno | Sí, en `localStorage` | El botón «cambiar» los borra. En equipo compartido conviene usarlo |

Ninguno de estos riesgos permite **leer** datos de otras personas, que es lo que importaría.

---

## 7. Lo que hay que arreglar del receptor antiguo

`6. Clase 6. Legal Internacional/apps_script_receptor.js`, que sigue en el archivo del curso:

- Pide **`ID/CC`**, número de cédula. Sobra para cualquier propósito del curso.
- Lleva escrito un **correo personal** (`@gmail.com`) para el resumen diario. No está en el
  repositorio, pero conviene cambiarlo al institucional antes de reutilizar ese script.
- El resumen diario lista **nombre, apellido y cédula de cada persona** en el cuerpo de un correo.
  El `resumenSemanal` de la bitácora nueva envía solo conteos agregados.
