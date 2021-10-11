import { Object3D } from 'three';
import EventDispatcher from './EventDispatcher';
import OrbitCamera from 'Core/Camera/OrbitCamera';
declare class Controller {
    private _camera;
    private _canvas;
    private _eventDispatcher;
    private _raycaster;
    private _selectedObject;
    get eventDispatcher(): EventDispatcher;
    set selectedObject(object: Object3D);
    constructor(_camera: OrbitCamera, _canvas: HTMLCanvasElement);
    init(): void;
    dispose(): void;
    private mouseDownEvent;
    private mouseMoveEvent;
    private mouseUpEvent;
    private mouseWheelEvent;
    private keyDownEvent;
    private keyUpEvent;
    private getMousePosition;
    private intersectScene;
    private updateCursor;
    selectElement(element: Object3D): void;
    private deselectElement;
}
export default Controller;
