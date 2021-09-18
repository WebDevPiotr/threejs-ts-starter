import { Raycaster, Intersection } from 'three/src/core/Raycaster.js'
import { Vector2, Group, Object3D } from 'three';
import EventDispatcher from './EventDispatcher'
import OrbitCamera from 'Core/Camera/OrbitCamera';

class Controller {

    private _eventDispatcher: EventDispatcher
    private _raycaster: Raycaster
    private _selectedObject: Object3D

    get eventDispatcher() { return this._eventDispatcher }
    set selectedObject(object: Object3D) { this._selectedObject = object }

    constructor(private _camera: OrbitCamera, private _canvas: HTMLCanvasElement) {
        this._raycaster = new Raycaster();
        this._eventDispatcher = new EventDispatcher()
        this.mouseDownEvent = this.mouseDownEvent.bind(this)
        this.mouseUpEvent = this.mouseUpEvent.bind(this)
        this.mouseMoveEvent = this.mouseMoveEvent.bind(this)
        this.mouseWheelEvent = this.mouseWheelEvent.bind(this)
        this.keyDownEvent = this.keyDownEvent.bind(this)
        this.keyUpEvent = this.keyUpEvent.bind(this)
    }

    public init() {
        this._canvas.addEventListener('mousemove', this.mouseMoveEvent, false);
        this._canvas.addEventListener('mousedown', this.mouseDownEvent, false);
        this._canvas.addEventListener('mouseup', this.mouseUpEvent, false);
        this._canvas.addEventListener('mouseleave', this.mouseUpEvent, false);
        this._canvas.addEventListener("wheel", this.mouseWheelEvent, false);
        document.addEventListener("keydown", this.keyDownEvent, false);
        document.addEventListener("keyup", this.keyUpEvent, false);
    }

    public dispose() {
        this._canvas.removeEventListener('mousemove', this.mouseMoveEvent, false);
        this._canvas.removeEventListener('mousedown', this.mouseDownEvent, false);
        this._canvas.removeEventListener('mouseup', this.mouseUpEvent, false);
        this._canvas.removeEventListener('mouseleave', this.mouseUpEvent, false);
        this._canvas.removeEventListener("wheel", this.mouseWheelEvent, false);
        document.removeEventListener("keydown", this.keyDownEvent, false)
        document.removeEventListener("keyup", this.keyUpEvent, false)
    }

    private mouseDownEvent(e: MouseEvent) {
        const hit: Intersection = this.intersectScene(this.getMousePosition(e))
        if (hit && !this._selectedObject) this.selectElement(hit.object)
        else this._camera.dispatchEvent({ type: 'mouseDown', data: e })
    }

    private mouseMoveEvent(e: MouseEvent) {
        this.updateCursor(this.getMousePosition(e))
        this._camera.dispatchEvent({ type: 'mouseMove', data: e })
    }

    private mouseUpEvent(e: MouseEvent) {
        this._camera.dispatchEvent({ type: 'mouseUp', data: e })
    }

    private mouseWheelEvent(e: MouseEvent) {
        this._camera.dispatchEvent({ type: 'mouseWheel', data: e })
    }

    private keyDownEvent(e: KeyboardEvent) {
        if (e.key == 'Escape' && this._selectedObject) this.deselectElement()
        else this._camera.dispatchEvent({ type: 'keyDown', data: e })
    }

    private keyUpEvent(e: KeyboardEvent) {
        this._camera.dispatchEvent({ type: 'keyUp', data: e })
    }

    private getMousePosition(e: MouseEvent) {
        let { clientWidth, clientHeight } = this._canvas;
        return new Vector2((e.offsetX / clientWidth) * 2 - 1, - (e.offsetY / clientHeight) * 2 + 1)
    }

    private intersectScene(mousePosition: Vector2) {
        this._raycaster.setFromCamera(mousePosition, this._camera);
        let intersections = this._raycaster.intersectObjects([], true)
            .filter(({ object }) => !(object instanceof Group) && object.visible);
        return intersections.length ? intersections[0] : null
    }

    private updateCursor(mouseScreenPosition: Vector2) {
        let hit: Intersection = this.intersectScene(mouseScreenPosition)
        if (hit) document.body.style.cursor = 'pointer'
        else document.body.style.cursor = 'default'
    }

    public selectElement(element: Object3D) {
        this._selectedObject = element
    }

    private deselectElement() {
        this._selectedObject = null
    }

}

export default Controller