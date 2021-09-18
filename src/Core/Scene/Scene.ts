import {
    AmbientLight, Color, Fog, Mesh, MeshStandardMaterial, PlaneGeometry,
    Scene as THREEScene, DirectionalLight, Vector3, Group, HemisphereLight
} from 'three';

class Scene extends THREEScene {

    private sceneElements = new Group()

    constructor() {
        super()
        this.setupLights()
        this.setupSceneElements()
    }

    public getObjects() {
        return this.children
    }

    public addToScene(element: Mesh | Group) {
        this.add(element)
    }

    public removeFromScene(element: Mesh | Group) {
        this.remove(element)
    }

    private setupLights() {
        const ambientLight = new AmbientLight(0xffffff, 2);
        this.add(ambientLight)

        const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 1);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        this.add(hemiLight)

        let light = new DirectionalLight(0xfcdec2, 8)
        light.position.set(200, 125, 200)
        light.castShadow = true
        light.shadow.bias = -0.00001
        light.shadow.normalBias = 0.1
        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        this.add(light)

    }

    private setupSceneElements() {
        this.add(this.sceneElements)
        this.background = new Color(0xffffff)
        const floor = new Mesh(
            new PlaneGeometry(200, 200).rotateX(-Math.PI / 2),
            new MeshStandardMaterial({ color: 0x666666, toneMapped: false })
        )
        floor.name = "Floor"
        floor.receiveShadow = true
        this.sceneElements.add(floor)
        this.fog = new Fog(0xffffff, 0, 40)
    }
}

export default Scene
