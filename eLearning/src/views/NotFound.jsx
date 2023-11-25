import { Link } from "react-router-dom"
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import React from 'react'

function NotFound(){

    function addSpace(){
        function addStar(){
            const geometry = new THREE.SphereGeometry(0.25, 24, 24)
            const material = new THREE.MeshBasicMaterial({color: 0xffffff})
            const star = new THREE.Mesh(geometry, material)

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

            star.position.set(x, y, z)
            scene.add(star)
        }

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 30
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.getElementById("mainContainer").appendChild(renderer.domElement)

        new OrbitControls(camera, renderer.domElement)
        
        Array(300).fill().forEach(addStar)

        renderer.render(scene, camera)

        function animate(){
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
    }

    window.addEventListener("load", addSpace)

    return(
        <React.StrictMode>
            <div id="mainContainer" style={{textAlign: "center", width: "100vw", height: "100vh", color: "#fff"}}>
                <div style={{top: "40%", left: "45%", position: "absolute"}}>
                    <h1>404</h1>
                    <p>Page not found!</p>
                    <Link to="/" className="btn btn-outline-danger">Back</Link>
                </div>
            </div>
        </React.StrictMode>
    )
}

export default NotFound