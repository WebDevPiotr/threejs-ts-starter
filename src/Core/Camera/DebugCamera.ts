import { PerspectiveCamera, Euler, Vector3, Event, MathUtils } from "three"

class DebugCamera extends PerspectiveCamera {

    private enable: boolean
    public isKeyDown: boolean
    private isMouseDown: boolean
    private pressedKeys: { [key: string]: boolean } = {}
    private keyHandlers: Map<string, any>
    private cameraAngleLimit: number = Math.PI / 3
    private cameraPositionLimit: number = 10
    private cameraHeightLimit: number = 5
    private speed: number = 0.15

    constructor(fov: number, aspect: number, near: number, far: number) {
        super(fov, aspect, near, far)
        this.enable = true
        this.isKeyDown = false
        this.isMouseDown = false
        this.keyHandlers = new Map<string, any>()
    }

    public init(){
        this.setRotationFromEuler(new Euler(0, 0, 0, 'YXZ'))
        this.position.set(0, 3, 6)
        this.lookAt(0, 0, 0)

        this.keyHandlers.set('w', this.handleForwardMove.bind(this))
        this.keyHandlers.set('a', this.handleLeftMove.bind(this))
        this.keyHandlers.set('s', this.handleBackwardMove.bind(this))
        this.keyHandlers.set('d', this.handleRightMove.bind(this))

        this.addEventListener('mouseMove', this.mouseMoveEvent);
        this.addEventListener('mouseDown', this.mouseDownEvent);
        this.addEventListener('mouseUp', this.mouseUpEvent);
        this.addEventListener('mouseWheel', this.mouseWheelEvent);
        this.addEventListener("keyDown", this.keyDownEvent)
        this.addEventListener("keyUp", this.keyUpEvent)
    }

    public updatePosition() {
        if (this.enable) {
            let keys = Object.keys(this.pressedKeys)
            keys.forEach(key => {
                if (this.keyHandlers.get(key))
                    this.keyHandlers.get(key)()
            })
            this.updateMatrix()
        }
    }

    public dispose() {
        this.removeEventListener('mouseMove', this.mouseMoveEvent);
        this.removeEventListener('mouseDown', this.mouseDownEvent);
        this.removeEventListener('mouseUp', this.mouseUpEvent);
        this.removeEventListener("keyDown", this.keyDownEvent)
        this.removeEventListener("keyUp", this.keyUpEvent)
    }

    private handleForwardMove() {
        let direction = new Vector3();
        this.getWorldDirection(direction)
        this.position.x += direction.x * this.speed
        this.position.x = MathUtils.clamp(this.position.x, -this.cameraPositionLimit, this.cameraPositionLimit)
        this.position.z += direction.z * this.speed
        this.position.z = MathUtils.clamp(this.position.z, -this.cameraPositionLimit, this.cameraPositionLimit)
    }

    private handleBackwardMove() {
        let direction = new Vector3();
        this.getWorldDirection(direction)
        this.position.x = this.position.x -= direction.x * this.speed
        this.position.x = MathUtils.clamp(this.position.x, -this.cameraPositionLimit, this.cameraPositionLimit)
        this.position.z -= direction.z * this.speed
        this.position.z = MathUtils.clamp(this.position.z, -this.cameraPositionLimit, this.cameraPositionLimit)
    }

    private handleLeftMove() {
        let cameraZAxis = new Vector3()
        let cameraXAxis = new Vector3()
        this.getWorldDirection(cameraZAxis)
        cameraXAxis.crossVectors(this.up, cameraZAxis)
        this.position.x += cameraXAxis.x * this.speed
        this.position.x = MathUtils.clamp(this.position.x, -this.cameraPositionLimit, this.cameraPositionLimit)
        this.position.z += cameraXAxis.z * this.speed
        this.position.z = MathUtils.clamp(this.position.z, -this.cameraPositionLimit, this.cameraPositionLimit)
    }

    private handleRightMove() {
        let cameraZAxis = new Vector3()
        let cameraXAxis = new Vector3()
        this.getWorldDirection(cameraZAxis)
        cameraXAxis.crossVectors(cameraZAxis, this.up)
        this.position.x += cameraXAxis.x * this.speed
        this.position.x = MathUtils.clamp(this.position.x, -this.cameraPositionLimit, this.cameraPositionLimit)
        this.position.z += cameraXAxis.z * this.speed
        this.position.z = MathUtils.clamp(this.position.z, -this.cameraPositionLimit, this.cameraPositionLimit)
    }

    private keyDownEvent({ data }: Event) {
        this.isKeyDown = true;
        this.pressedKeys[data.key] = true
    }

    private keyUpEvent({ data }: Event) {
        delete this.pressedKeys[data.key]
        if (!Object.keys(this.pressedKeys).length)
            this.isKeyDown = false;
    }

    private updateRotation(moveX: number, moveY: number) {
        var euler = new Euler(0, 0, 0, 'YXZ');
        euler.setFromQuaternion(this.quaternion);
        euler.y += moveX * 0.002;
        euler.x += moveY * 0.002;
        euler.x = Math.max(-this.cameraAngleLimit, Math.min(this.cameraAngleLimit, euler.x));
        this.quaternion.setFromEuler(euler);
    }

    private mouseDownEvent() {
        this.isMouseDown = true
    }

    private mouseUpEvent() {
        this.isMouseDown = false
    }

    private mouseMoveEvent({ data }: Event) {
        let moveX = data.movementX || data.mozMovementX || data.webkitMovementX || 0;
        let moveY = data.movementY || data.mozMovementY || data.webkitMovementY || 0;
        if (this.isMouseDown && this.enable) this.updateRotation(moveX, moveY)
    }

    private mouseWheelEvent({ data }: Event) {
        data.deltaY < 0 ? this.position.y += this.speed : this.position.y -= this.speed
        this.position.y = MathUtils.clamp(this.position.y, 0.3, this.cameraHeightLimit)
    }
}

export default DebugCamera