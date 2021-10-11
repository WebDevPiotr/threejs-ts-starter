import { PerspectiveCamera, Object3D } from 'three';
declare class OrbitCamera extends PerspectiveCamera {
    private target;
    private isMouseDown;
    private cameraRadiusLimit;
    constructor(fov: number, aspect: number, near: number, far: number);
    private init;
    dispose(): void;
    private mouseDownEvent;
    private mouseUpEvent;
    private mouseMoveEvent;
    private mouseWheelEvent;
    setTarget(element: Object3D): void;
    goToOrigin(): void;
    private moveTo;
    private updateRotation;
    zoomIn(): void;
    zoomOut(): void;
}
export default OrbitCamera;
