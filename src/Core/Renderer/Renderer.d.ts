import OrbitCamera from '../Camera/OrbitCamera';
import Scene from '../Scene/Scene';
declare class CanvasRenderer {
    private _scene;
    private _camera;
    private renderer;
    private container;
    private stats;
    get canvas(): HTMLCanvasElement;
    constructor(_scene: Scene, _camera: OrbitCamera);
    mount(container: HTMLDivElement): void;
    unmount(): void;
    private onResize;
    private update;
}
export default CanvasRenderer;
