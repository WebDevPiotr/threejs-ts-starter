import { Mesh, Scene as THREEScene, Group } from 'three';
declare class Scene extends THREEScene {
    private sceneElements;
    constructor();
    getObjects(): import("three").Object3D<import("three").Event>[];
    addToScene(element: Mesh | Group): void;
    removeFromScene(element: Mesh | Group): void;
    private setupLights;
    private setupSceneElements;
}
export default Scene;
