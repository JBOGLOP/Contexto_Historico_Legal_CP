# Contexto Histórico y Legal de los Cuidados Paliativos

**Universidad Antonio Nariño · Facultad de Enfermería**
Maestría en Cuidado Paliativo · Código 37542001 · Plan de estudios 2377 · Semestre 2026-I
Docente: Jorge Wilhem Bogoya López · [jbogoya63@uan.edu.co](mailto:jbogoya63@uan.edu.co)

> ### 👉 [Ver el curso completo](https://jboglop.github.io/Contexto_Historico_Legal_CP/)
> El recorrido de las ocho sesiones, de la primera a la última, está en el índice del sitio.
> Este README es la referencia técnica del repositorio.

---

## El curso en una línea

Del hospicio medieval a la Resolución 813 de 2026: cómo el cuidado de quien va a morir pasó de
obra de caridad a derecho exigible, y por qué en Colombia tener el derecho todavía no significa
recibir el cuidado.

**Hilo conductor — la paradoja colombiana.** Colombia depositó su adhesión a la Convención
Interamericana A-70 el 27 de septiembre de 2022 —*hard law* vinculante— y la brecha de acceso a
morfina oral entre Bogotá y los departamentos amazónicos sigue siendo del orden de **90 : 1**
(OCCP 2024). ¿Por qué el instrumento vinculante no cierra la brecha territorial?

---

## Estructura

| Unidad | Sesiones | Contenido |
|---|---|---|
| **1 · Contexto histórico** | 1 – 3 | Antecedentes y principios · historia internacional · América Latina y Colombia |
| **2 · Marco político** | 4 – 5 | OMS, Banco Mundial, BID, OCDE, IAHPC · OPS, CEPAL, ALCP · PAIS MAITE, RIAS, GPC |
| **3 · Marco legal** | 6 – 8 | Legislación internacional · legislación colombiana · enfoque de derechos humanos |

**Evaluación:** tres cortes — 35 % · 35 % · 30 %.

---

## Material publicado

**Las ocho sesiones están publicadas.** Cada una vive en `sesiones/sNN-slug/`; el
[índice del sitio](https://jboglop.github.io/Contexto_Historico_Legal_CP/) es la vía natural de
entrada.

| # | Fecha | Sesión | Material |
|---|---|---|---|
| 1 | 6 feb | Contexto histórico | [Sesión](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s01-contexto-historico/) |
| 2 | 20 feb | Genealogía del cuidado | [Sesión](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s02-genealogia-del-cuidado/) |
| 3 | 6 mar | CP en América Latina | [Panorama regional](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s03-cp-latinoamerica/) · Colombia ante el espejo · guía de actividad · desglose normativo · primer corte · cuatro fichas país |
| 4 | 20 mar | Marcos globales de política | [Encuentro sincrónico](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s04-marcos-globales/) · versión para Moodle |
| 5 | 10 abr | Colombia y América Latina | [Plan de sesión](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s05-colombia-y-america-latina/) · asignación grupal · cuatro ejes de trabajo |
| 6 | 24 abr | Legislación internacional | [Plan de clase](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s06-legal-internacional/) · actividad Doña Carmen · marco legal colombiano · informe integrador · plataforma interactiva |
| 7 | 8 may | Marco normativo y voluntad anticipada | [Actividad DVA](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s07-legal-latinoamerica-dva/) · marco normativo · jurisprudencia 2023–2026 |
| 8 | 29 may | Resolución 813 de 2026 · cierre | [Análisis interactivo](https://jboglop.github.io/Contexto_Historico_Legal_CP/sesiones/s08-resolucion-813/) |

### Documentos descargables

| Archivo | Qué es |
|---|---|
| [`plantilla_dva_personal.docx`](https://github.com/JBOGLOP/Contexto_Historico_Legal_CP/raw/main/plantilla_dva_personal.docx) | Plantilla de voluntad anticipada · 20 variables · Resolución 2665 de 2018 |
| [`fundamentacion_dva.docx`](https://github.com/JBOGLOP/Contexto_Historico_Legal_CP/raw/main/fundamentacion_dva.docx) | Fundamentación normativa y operacional |
| [`Res_813/Resolucion-No-813-de-2026-1.pdf`](https://github.com/JBOGLOP/Contexto_Historico_Legal_CP/raw/main/Res_813/Resolucion-No-813-de-2026-1.pdf) | Texto oficial de la Resolución 813 |

> **Las direcciones antiguas siguen funcionando.** Las sesiones 7 y 8 vivían en la raíz del
> repositorio y sus URLs se compartieron con los estudiantes. Al agruparlas con el resto quedó
> una página de redirección en cada ruta anterior: **ningún enlace compartido deja de servir.**
>
> Los tres archivos descargables **no** se movieron. Un `.pdf` o un `.docx` no admite página de
> redirección: se serviría con el tipo MIME equivocado y no abriría.

---

## Reglas del repositorio

### 1 · Portabilidad sin conexión — innegociable

**Cada HTML abre con doble clic, sin servidor y sin internet.** Parte de los estudiantes ejerce en
municipios donde la conectividad no se puede dar por supuesta.

En la práctica: sin Google Fonts (fuentes del sistema), sin librerías desde CDN (se incrustan en
línea), sin `<iframe>`. Los `<a href>` a fuentes externas sí se conservan: son enlaces, no recursos
que se carguen.

### 2 · Sin datos de estudiantes

Este repositorio es **público e indexable**. No entra ningún nombre, código ni calificación. Los
casos territoriales de las clases están generalizados a propósito: describen un patrón, no a una
persona.

### 3 · No se designa a nadie por su pronóstico

«persona con enfermedad avanzada», no «paciente terminal». La excepción son las citas de normas y
jurisprudencia, donde el término aparece en el texto original y cambiarlo alteraría la cita.

### 4 · Material de terceros: se cita, no se reproduce

Los libros, manuales y atlas de terceros se referencian en APA 7 con DOI. Las normas y las
sentencias son documentos públicos y sí se incluyen o se enlazan a la fuente oficial.

---

## Verificación

```bash
node scripts/verificar.js
```

Comprueba enlaces locales rotos, recursos externos que romperían la portabilidad, rastros de datos
personales y el uso del lenguaje del curso. Distingue infracción de cita normativa.

**Lo que no comprueba: que la página se vea bien.** Eso no tiene sustituto — hay que abrirla en el
navegador con el wifi apagado, revisar que la consola no dé errores, navegar con el teclado y
comprobar que se lee a 375 px de ancho.

---

## Estructura de carpetas

```
index.html                 hub del curso · las ocho sesiones
_shared/                   tokens.css y base.css — fuente canónica del diseño
sesiones/                  material por sesión
recursos/originales/       PPTX y PDF fuente
docs/                      método y documentación
scripts/verificar.js       comprobaciones previas a publicar
.nojekyll                  imprescindible: sin él, _shared/ desaparece del sitio
```

`_shared/tokens.css` es **fuente canónica, no enlace**: por la regla de portabilidad se copia en
línea dentro del `<style>` de cada página. Si cambia un valor ahí, hay que propagarlo.

---

## Referencia metodológica del componente DVA

Castro-Vargas, Castaño-Castrillón y Riveros-Pérez (2024). Contenido de los formularios del
Documento de Voluntades Anticipadas en Colombia. *Colombian Journal of Anesthesiology*, 52, e1093.
doi: [10.5554/22562087.e1093](https://doi.org/10.5554/22562087.e1093)

Hallazgo central: ninguno de los 24 formularios evaluados superó 14 de 20 variables; el 70 % no
pasó de 10. El material del curso apunta a superar sistemáticamente ese techo.

---

*Material docente de acceso abierto · Semestre 2026-I*
