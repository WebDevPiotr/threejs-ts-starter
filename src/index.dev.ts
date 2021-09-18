import './index.css'
import App from './App'
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three'

const container = document.querySelector('.canvasWindow') as HTMLDivElement
const application = new App()
application.mount(container)

const mesh = new Mesh(
    new BoxBufferGeometry(2,2,2),
    new MeshBasicMaterial({color: 'red' })
)
mesh.position.set(0,2,0)
mesh.castShadow = true
application.addToScene(mesh)
