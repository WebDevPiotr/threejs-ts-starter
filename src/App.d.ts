import { Group, Mesh } from "three";
declare class App {
    private _scene;
    private _camera;
    private _renderer;
    private _controller;
    constructor();
    mount(container: HTMLDivElement): void;
    unmount(): void;
    addToScene(element: Mesh | Group): void;
    removeFromScene(element: Mesh | Group): void;
    emit(eventName: string, payload: any): void;
    subscribe(eventName: string, callback: any): void;
    cameraZoomIn(): void;
    cameraZoomOut(): void;
}
export default App;
