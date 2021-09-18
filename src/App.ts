import Renderer from "Core/Renderer/Renderer"
import Controller from "Core/Controller/Controller"
import OrbitCamera from 'Core/Camera/OrbitCamera'
import Scene from 'Core/Scene/Scene'
import { Group, Mesh } from "three"

class App {

    private _scene: Scene
    private _camera: OrbitCamera
    private _renderer: Renderer
    private _controller: Controller

    constructor() {
        this._scene = new Scene()
        this._camera = new OrbitCamera(60, null, 0.01, 20000)
        this._renderer = new Renderer(this._scene, this._camera)
        this._controller = new Controller(this._camera, this._renderer.canvas)
    }

    public mount(container: HTMLDivElement) {
        let { clientHeight, clientWidth } = container;
        this._renderer.mount(container)
        this._controller.init()
        this._camera.aspect = clientWidth / clientHeight
        this._camera.updateProjectionMatrix();
    }

    public unmount() {
        this._renderer.unmount()
        this._controller.dispose()
    }

    public addToScene(element: Mesh | Group) {
        this._scene.addToScene(element)
    }

    public removeFromScene(element: Mesh | Group) {
        this._scene.removeFromScene(element)
    }

    public emit(eventName: string, payload: any) {
        this._controller.eventDispatcher.emit(eventName, payload)
    }

    public subscribe(eventName: string, callback: any) {
        this._controller.eventDispatcher.subscribe(eventName, callback)
    }

    public cameraZoomIn() {
        this._camera.zoomIn()
    }

    public cameraZoomOut() {
        this._camera.zoomOut()
    }

}

export default App