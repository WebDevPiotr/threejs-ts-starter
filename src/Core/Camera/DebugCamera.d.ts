import { PerspectiveCamera } from "three";
declare class DebugCamera extends PerspectiveCamera {
    private enable;
    isKeyDown: boolean;
    private isMouseDown;
    private pressedKeys;
    private keyHandlers;
    private cameraAngleLimit;
    private cameraPositionLimit;
    private cameraHeightLimit;
    private speed;
    constructor(fov: number, aspect: number, near: number, far: number);
    init(): void;
    updatePosition(): void;
    dispose(): void;
    private handleForwardMove;
    private handleBackwardMove;
    private handleLeftMove;
    private handleRightMove;
    private keyDownEvent;
    private keyUpEvent;
    private updateRotation;
    private mouseDownEvent;
    private mouseUpEvent;
    private mouseMoveEvent;
    private mouseWheelEvent;
}
export default DebugCamera;
