import { Vector3, Spherical, PerspectiveCamera, Event,  MathUtils, Object3D } from 'three';
import gsap from 'gsap'

class OrbitCamera extends PerspectiveCamera {

    private target = new Vector3(0, 1, 0)
    private isMouseDown: boolean = false
    private cameraRadiusLimit: [number, number] = [3, 9]

    constructor(fov: number, aspect: number, near: number, far: number) {
        super(fov, aspect, near, far)
        this.init()
    }

    private init() {
        this.goToOrigin()
        this.addEventListener('mouseMove', this.mouseMoveEvent);
        this.addEventListener('mouseDown', this.mouseDownEvent);
        this.addEventListener('mouseUp', this.mouseUpEvent);
        this.addEventListener('mouseWheel', this.mouseWheelEvent);
    }

    public dispose() {
        this.removeEventListener('mouseMove', this.mouseMoveEvent);
        this.removeEventListener('mouseDown', this.mouseDownEvent);
        this.removeEventListener('mouseUp', this.mouseUpEvent);
        this.removeEventListener('mouseWheel', this.mouseWheelEvent);
    }

    private mouseDownEvent() {
        this.isMouseDown = true;
    }

    private mouseUpEvent() {
        this.isMouseDown = false;
    }

    private mouseMoveEvent({ data }: Event) {
        if (this.isMouseDown) {
            let movementX = data.movementX || data.mozMovementX || data.webkitMovementX || 0;
            let movementY = data.movementY || data.mozMovementY || data.webkitMovementY || 0;
            this.updateRotation(movementX, movementY)
        }
    }

    private mouseWheelEvent({ data }: Event) {
        data.deltaY < 0 ? this.zoomIn() : this.zoomOut()
    }

    public setTarget(element: Object3D) {
        const worldPosition = new Vector3().setFromMatrixPosition(element.matrixWorld)
        let offset = new Vector3().copy(worldPosition).sub(new Vector3(0, 1, 0));
        const newPosition = worldPosition.clone().add(offset.normalize().multiplyScalar(5));
        this.moveTo(newPosition, worldPosition)
    }

    public goToOrigin() {
        this.moveTo(new Vector3(0, 3, 8), new Vector3(0, 1, 0))
    }

    private moveTo(endPosition: Vector3, target: Vector3) {
        const scope = this
        const tl = gsap.timeline()
        tl.to(
            this.position,
            {
                duration: 1,
                ...endPosition,
                onUpdate: function () { scope.lookAt(new Vector3(0, 1, 0)) },
                onComplet: function () { scope.target.copy(target) }
            })
    }

    private updateRotation(movementX: number, movementY: number) {
        let offset = new Vector3().copy(this.position).sub(this.target);
        let spherical = new Spherical().setFromVector3(offset);
        spherical.theta -= Math.PI * movementX / 1000;
        const currentPhi = spherical.phi
        spherical.phi -= Math.PI * movementY / 1000
        spherical.makeSafe();
        offset.setFromSpherical(spherical);
        this.position.copy(this.target).add(offset);
        if (this.position.y < 0.1) {
            spherical.phi = currentPhi
            offset.setFromSpherical(spherical);
            this.position.copy(this.target).add(offset);
        }
        this.lookAt(this.target);
    }

    // private updatePan(movementX: number, movementY: number) {
    //     let panOffset = new Vector3();
    //     var v = new Vector3();
    //     v.setFromMatrixColumn(this.matrix, 0);
    //     v.multiplyScalar(- movementX * 0.01);
    //     panOffset.add(v);
    //     v.setFromMatrixColumn(this.matrix, 1);
    //     v.multiplyScalar(movementY * 0.01);
    //     panOffset.add(v);
    //     this.target.add(panOffset);
    //     this.position.add(panOffset);
    // }

    public zoomIn() {
        let offset = new Vector3().copy(this.position).sub(this.target);
        let spherical = new Spherical().setFromVector3(offset);
        spherical.radius *= 0.94
        spherical.radius = MathUtils.clamp(spherical.radius, this.cameraRadiusLimit[0], this.cameraRadiusLimit[1]);
        offset.setFromSpherical(spherical);
        this.position.copy(this.target).add(offset);
    }

    public zoomOut() {
        let offset = new Vector3().copy(this.position).sub(this.target);
        let spherical = new Spherical().setFromVector3(offset);
        spherical.radius /= 0.94
        spherical.radius = MathUtils.clamp(spherical.radius, this.cameraRadiusLimit[0], this.cameraRadiusLimit[1]);
        offset.setFromSpherical(spherical);
        this.position.copy(this.target).add(offset);
    }

}

export default OrbitCamera
