import { WebGLRenderer, ReinhardToneMapping, PCFSoftShadowMap } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import OrbitCamera from '../Camera/OrbitCamera';
import Scene from '../Scene/Scene';

class CanvasRenderer {

    private renderer: WebGLRenderer
    private container: HTMLDivElement
    private stats: Stats

    get canvas() { return this.renderer.domElement }

    constructor(private _scene: Scene, private _camera: OrbitCamera) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("webgl2", { alpha: false });
        this.renderer = new WebGLRenderer({ canvas, context, antialias: true, powerPreference: 'high-performance' })
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFSoftShadowMap
        this.renderer.physicallyCorrectLights = true
        this.renderer.toneMapping = ReinhardToneMapping;

        this.stats = Stats()
        this.onResize = this.onResize.bind(this)
    }

    public mount(container: HTMLDivElement) {
        this.container = container
        let { clientHeight, clientWidth } = this.container;

        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onResize)

        this.renderer.setSize(clientWidth, clientHeight);

        this.update()

        if (process.env.NODE_ENV !== "production") {
            this.stats.dom.style.position = 'absolute'
            this.container.appendChild(this.stats.dom);
        }

    }

    public unmount() {
        window.removeEventListener('resize', this.onResize)
    }

    private onResize() {
        let { clientHeight, clientWidth } = this.container;
        this._camera.aspect = clientWidth / clientHeight
        this._camera.updateProjectionMatrix();
        this.renderer.setSize(clientWidth, clientHeight);
    }

    private update() {
        this.renderer.render(this._scene, this._camera)
        if (process.env.NODE_ENV !== "production") this.stats.update()
        setTimeout(() => requestAnimationFrame(this.update.bind(this)), 1000 / 1000);
    }
}

export default CanvasRenderer
