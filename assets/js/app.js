

/**
 * @author José Armando Hernández Salamanca
 * @description Aplicación de presentaciones HTML con contenido dinámico
 * @version 1.0.0
 * @module Slides-App
 */

const revealConfig = {
    controls: true, // Muestra los controles de la presentación
    controlsTutorial: true,  //Muestra al usuario como funcianan los controles de la presentación
    controlsLayout: 'bottom-right', // 'edges', 'bottom-right' Determina donde deben aparecer los controles de la presentación
    controlsBackArrows: 'faded', //Regla de visibilidad para flechas de navegación,
    progress: true, //Habilita la barra de progreso de la presentación,
    slideNumber: 'c/t', //Mostrar el número de página del slide actual
    showSlideNumber: 'print', // 'all' 'print' 'speaker' Permite establecer en que contexto de aparecer la numeración de los slides,
    hashOneBasedIndex: false, //Indexa enlaces con el numero de dispositivas.
    hash: false, // Permite agregar el index del slide a la url para regresar a la misma al recargar.
    respondToHashChanges: true, //Monitorea y cambia las diapositivas de acuerdo al hash
    history: false, //Agrega el cambio de slide al historial de navegador
    keyboard: false, //Habilita el uso de las teclas para mover cada slide
    keyboardCondition: null, //Función opcional que bloquea los eventos del teclado al volver a sintonizar false
    disableLayout: false, //Deshabilita el diseño predeterminado de las diapositivas para personalizarlo con CSS,
    overview: true, //Habilita el modo de vista general de la presentación
    center: true, //Centrado vertical de los slides,
    touch: true, //Habilita la navegación táctil en dispositivos con entrada táctil,
    loop: false, //Permite generar el bucle de la presentación
    rtl: false, //Cambia la dirección de presentación para que se RTL 'Right To Left'
    navigationMode: 'default', //Cambia el comportamiento de las direcciones e navegación
    shuffle: false, //Habilita el orden random de los slides cada que carga la presentación
    fragments: true, //Activa o desactiva los fragmentos (animaciones de texto) de manera global,
    fragmentInURL: true, //Permite llevar al fragmento actual en caso de que se recarge.
    embedded: false, //Marca si la presentación se esta ejecutando en un modo incrustado.
    help: true, //Muestra la ayuda cuando se presiona el signo de interrogación
    pause: true, //Marca si se puede pausar la presentación.
    showNotes: false, //Permite mostrar / ocultar las notas en la presentación
    autoPlayMedia: true, //Permite la autoreproducción de audio y video incrustado en cada slide.
    preloadIframes: null, //Anulación global para precargar iframes con carga diferida.
    autoAnimate: true, //Permite deshabilitar de manera global la animación automática.
    autoAnimateMatcher: null,  //Permite establecer un elemento personzalizado para saber que elementos animar.
    //Configuración predeterminada para los slides, se elimina si se configura cada slide con el atribute [data-]
    autoAnimateEasing: 'ease',
    autoAnimateDuration: 1.0,
    autoAnimateUnmatched: true,
    autoAnimateStyles: [ //Propiedades CSS que se pueden animar automáticamente.
        'opacity',
        'color',
        'background-color',
        'padding',
        'font-size',
        'line-height',
        'letter-spacing',
        'border-width',
        'border-color',
        'border-radius',
        'outline',
        'outline-offset'
    ],
    autoSlide: 0, //Controla la progresión automática a la siguiente diapositiva
    autoSlideStoppable: false, //Detener el desplazamiento automático después de la entrada de usuario
    autoSlideMethod: null, //Use este método para la navegación cuando se deslice automáticamente (el valor predeterminado es navigateNext)
    defaultTiming: null, //Especifica el tiempo promedio en segundos que se presentará cada slide
    mouseWheel: false,  //Habilita la navegación a través de la rueda del mouse
    previewLinks: false, //Abre enlaces en una superposición de vista previa de iframe
    postMessage: true, //Permite el envío de mensajes a través de window.postMessage
    postMessageEvents: false, //Getiona los eventos de postMessage
    focusBodyOnPageVisibilityChange: true, //Enfoca el body cuando la página cambia
    transition: 'slide', //Establece de manera global la transición del slide
    transitionSpeed: 'default', //Establece la velocidad de la transición del slide
    backgroundTransition: 'none',  //Establece la transición para slides fullpage
    pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY, //Establece el número de páginas en las que se puede  expandir una diapositiva al imprimir
    pdfSeparateFragments: false, //Imprime cada fragmento en una diapositiva separada
    pdfExportShortcut: 'E', //Tecla para impresión
    pdfPageHeightOffset: -1, // Desplazamiento utilizado para reducir la altura del contenido dentro de las páginas PDF exportadas.
    viewDistance: 3, // Número de diapositivas alejadas de la actual que son visibles
    mobileViewDistance: 2, // Número de diapositivas alejadas de la actual que son visibles en el móvil
    display: 'block', //Modo de visualización que se usará para mostrar las dispositivas
    hideInactiveCursor: true, //Ocultar el cursor si esta inactivo
    hideCursorTime: 5000 //Tiempo antes de que se oculte el cursor.
}


const { createApp, nextTick } = Vue;
const app = createApp({

    data() {
        return {

            menu: [],
            isOpenOverview: false,
            isFullScreen: false,
            isCostumizing: false,
            isConfig: false,
            config: {
                showControls: true,
                loop: false,
                slideNumber: true,
                progressbar: true,
                keyboard: false,
                mouse: false,
                overview: false
            },
            custom: {
                background: '#37bc9b',
                transition: 'none',
                transitionSpeed: 'default',
                slideDirection: false,
                controlDirection: 'bottom-right',
                slidesOrder: false
            },

            palette: {
                red: '#DA4453',
                orange: '#E9573F',
                yellow: '#FCBB42',
                green: '#8CC152',
                teal: '#37BC9B',
                blue: '#4A89DC',
                purple: '#967ADC',
            },

            slides: [
                {
                    title: 'Slide 1',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deserunt rem mollitia sit corrupti',
                    subslides: []
                },
                {
                    title: 'Slide 2',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deserunt rem mollitia sit corrupti',
                    subslides: [
                        { title: 'subslide 1', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deserunt rem mollitia sit corrupti' },
                        { title: 'subslide 2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deserunt rem mollitia sit corrupti' }
                    ]
                },
                {
                    title: 'Slide 3',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deserunt rem mollitia sit corrupti',
                    subslides: []
                },

            ]

        }
    },

    created() {

        nextTick(() => {
            document.addEventListener("fullscreenchange", e => {
                !document.fullscreenElement ? (this.isFullScreen = false) : (this.isFullScreen = true)
            });

            Reveal.initialize(revealConfig);
        });

    },

    mounted() {
        nextTick(() => {

            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltip => {
                new bootstrap.Tooltip(tooltip)
            });

            Reveal.getSlides().forEach(slide => {
                slide.slideBackgroundContentElement.style.cssText = `background-color: ${this.custom.background} !important; display: 'block'`;
            });


        });
    },

    computed: {

        getMenu() {

            nextTick(() => {

                const presentation = document.querySelector('.slides');
                const slides = Array.from(presentation.childNodes);
                slides.filter(slide => slide.tagName == 'SECTION')
                    .map(slide => {
                        const subslides = Array.from(slide.querySelectorAll('section'))
                            .map(subslide => Boolean(subslide.querySelector('.slide-title')) ? { title: subslide.querySelector('.slide-title').textContent } : 'Sin Titulo');
                        this.menu.push({ title: slide.querySelector('.slide-title').textContent, subslides })
                    });

            });

            console.log(this.menu)

            return this.menu
        },

        drawColorSelected() {

            if (!Object.values(this.palette).includes(this.custom.background.toUpperCase())) {
                return this.custom.background
            }
        }
    },

    methods: {

        openContent() {
            const contentMenu = new bootstrap.Offcanvas(document.querySelector('#content'));
            contentMenu.show();
        },

        openCustom() {
            const customMenu = new bootstrap.Offcanvas(document.querySelector('#custom'));
            customMenu.show();
        },

        openConfig() {
            const configMenu = new bootstrap.Offcanvas(document.querySelector('#config'));
            configMenu.show();
        },

        openOverview() {
            this.isOpenOverview = true;
            Reveal.toggleOverview();
        },

        fullScreen() {
            this.isFullScreen = true;
            const template = document.documentElement;
            if (template.requestFullscreen) {
                template.requestFullscreen();
            } else if (template.webkitRequestFullscreen) {
                template.webkitRequestFullscreen();
            } else if (template.mozRequestFullScreen) {
                template.mozRequestFullScreen();
            }

        },

        exitFullScreen() {
            this.isFullScreen = false;
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        },



        customPresentation(key, val) {
            this.custom[key] = val;
            this.isCostumizing = true;

            nextTick(() => {
                const alert = new bootstrap.Toast(document.querySelector('#alert'));
                alert.show();
            });

            const { background, transition, transitionSpeed, slideDirection, slidesOrder, controlDirection: controlsLayout } = this.custom;

            nextTick(() => {

                Reveal.getSlides().forEach(slide => {
                    slide.slideBackgroundContentElement.style.cssText = `background-color: ${background} !important; display: 'block'`;

                });
                /* 
                                const styles = document.styleSheets[0];
                                styles.deleteRule(0);
                                styles.insertRule(`.form-check-input:checked{background-color: ${background} !important; border-color: ${background} !important}`, 0); */
            });

            Reveal.configure({
                backgroundTransition: transition,
                transitionSpeed,
                controlsLayout
            });
        },

        configPresentation(key, val) {

            this.config[key] = val;
            this.isConfig = true;

            nextTick(() => {
                const alert = new bootstrap.Toast(document.querySelector('#alert'));
                alert.show();
            });


            const { showControls: controls, loop, slideNumber, progressbar: progress, keyboard, mouse: mouseWheel, overview } = this.config;

            Reveal.configure({
                controls,
                loop,
                autoSlide: loop ? 3000 : 0,
                slideNumber: slideNumber ? 'c/t' : false,
                progress,
                keyboard,
                mouseWheel,
                overview
            });

            if (!slideNumber) {
                nextTick(() => {
                    document.querySelector('.slide-number').style.cssText = 'display: none !important;';
                })
            }
        },



    },

    watch: {
        isCostumizing(val) {

            val && (
                setTimeout(() => {
                    this.isCostumizing = false;
                }, 3000)
            );

        },
        isConfig(val) {

            val && (
                setTimeout(() => {
                    this.isConfig = false;
                }, 3000)
            );

        }
    }
});

app.mount('#app');
