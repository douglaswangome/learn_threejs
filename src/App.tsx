import { useEffect, useRef, useState } from 'react'
import {
	AdditiveBlending,
	AmbientLight,
	BufferGeometry,
	DoubleSide,
	Float32BufferAttribute,
	Group,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	PerspectiveCamera,
	PointLight,
	Points,
	PointsMaterial,
	RingGeometry,
	Scene,
	SphereGeometry,
	Texture,
	type TextureEventMap,
	TextureLoader,
	Vector3,
	WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLANETS } from '@/constants.ts';
import { createStarTexture } from '@/utils/createStarTexture.ts';

const SIZE_SCALE = 1
const DISTANCE_SCALE = 300
const BASE_TIME_SPEED = 0.01
const ORBIT_SPEED = 0.005
const BASE = '/textures'

export function App() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const activeTargetRef = useRef<number>(-1);

	const [activeUITarget, setActiveUITarget] = useState<number>(-1);

	useEffect(() => {
		if (!canvasRef.current) {
			return
		}

		const { devicePixelRatio, innerWidth, innerHeight } = window

		const renderer = new WebGLRenderer({
			canvas: canvasRef.current,
			antialias: true,
		})
		renderer.setSize(innerWidth, innerHeight)

		const maxPixelRatio = Math.min(devicePixelRatio, 2)
		renderer.setPixelRatio(maxPixelRatio)

		const scene = new Scene()

		const textureLoader = new TextureLoader()

		// const starsGeometry = new SphereGeometry(10000, 64, 64)
		// const starsMaterial = new MeshBasicMaterial({
		// 	map: textureLoader.load(`${BASE}/8k_stars_milky_way.jpg`),
		// 	side: BackSide
		// })
		// const starsMesh = new Mesh(starsGeometry, starsMaterial);
		// scene.add(starsMesh);
		// --- PROCEDURAL STARFIELD ---
		const starsGeometry = new BufferGeometry();
		const starsCount = 5000; // How many stars you want

		// Every star needs an X, Y, and Z coordinate
		const positionArray = new Float32Array(starsCount * 3);

		for (let i = 0; i < starsCount * 3; i++) {
			positionArray[i] = (Math.random() - 0.5) * 15000;
		}

		starsGeometry.setAttribute('position', new Float32BufferAttribute(positionArray, 3));

		const starsMaterial = new PointsMaterial({
			size: 15,
			color: 0xffffff,
			map: createStarTexture(),
			transparent: true,
			opacity: 0.8,
			alphaTest: 0.1,
			depthWrite: false,
			blending: AdditiveBlending
		});

		const starField = new Points(starsGeometry, starsMaterial);
		scene.add(starField);

		const sunGeometry = new SphereGeometry(109 * SIZE_SCALE, 32, 32)
		const sunMaterial = new MeshBasicMaterial({ map: textureLoader.load(`${BASE}/2k_sun.jpg`) })
		const sun = new Mesh(sunGeometry, sunMaterial)
		scene.add(sun)

		const ambientLight = new AmbientLight(0xffffff, 0.1)
		scene.add(ambientLight)

		const pointLight = new PointLight(0xffffff, 4, 0, 0)
		scene.add(pointLight)

		const planetSystems: { group: Group, mesh: Mesh, data: any }[] = []
		const moonSystems: { mesh: Mesh, data: any }[] = []

		PLANETS.forEach((planet) => {
			const { name, size, tilt, moons } = planet

			const systemGroup = new Group()
			scene.add(systemGroup)

			const geometry = new SphereGeometry(size * SIZE_SCALE, 32, 32)

			let texture: Texture<HTMLImageElement, TextureEventMap>;
			if (name === "Earth") {
				texture = textureLoader.load(`${BASE}/2k_${name.toLowerCase()}_daymap.jpg`)
			} else {
				texture = textureLoader.load(`${BASE}/2k_${name.toLowerCase()}.jpg`)
			}

			const material = new MeshPhongMaterial({ map: texture })
			const mesh = new Mesh(geometry, material)

			const tiltGroup = new Group()
			tiltGroup.rotation.z = tilt * (Math.PI / 180)

			tiltGroup.add(mesh)
			systemGroup.add(tiltGroup)
			planetSystems.push({ group: systemGroup, mesh, data: planet })

			if (name === 'Saturn') {
				const innerRadius = 12 * SIZE_SCALE;
				const outerRadius = 22 * SIZE_SCALE;

				const ringGeometry = new RingGeometry(innerRadius, outerRadius, 64);

				const ringMaterial = new MeshPhongMaterial({
					map: textureLoader.load(`${BASE}/2k_saturn_ring_alpha.png`, undefined, undefined, () => {
						ringMaterial.color.setHex(0xd1b68a);
						ringMaterial.map = null;
						ringMaterial.needsUpdate = true;
					}),
					side: DoubleSide,
					transparent: true,
					opacity: 0.9
				});

				const ringMesh = new Mesh(ringGeometry, ringMaterial);
				ringMesh.rotation.x = Math.PI / 2;

				mesh.add(ringMesh);
			}

			if (moons.length > 0) {
				moons.forEach((moon) => {
					const moonGeometry = new SphereGeometry(moon.size * SIZE_SCALE, 32, 32);

					// Default to Earth's moon texture, or try to load a specific one
					const moonTexture = `${BASE}/2k_moon.jpg`;
					const moonMaterial = new MeshPhongMaterial({
						map: textureLoader.load(
							moonTexture,
							undefined,
							undefined,
							(_err) => {
								moonMaterial.color.setHex(0xaaaaaa);
								moonMaterial.map = null;
								moonMaterial.needsUpdate = true;
							}
						)
					});

					const moonMesh = new Mesh(moonGeometry, moonMaterial);
					systemGroup.add(moonMesh);

					moonSystems.push({ mesh: moonMesh, data: moon });
				});
			}
		})

		const aspectRatio = innerWidth / innerHeight
		const camera = new PerspectiveCamera(
			75,
			aspectRatio,
			0.1,
			20000
		)
		camera.position.z = 500

		const controls = new OrbitControls(camera, canvasRef.current)
		controls.enableDamping = true

		let animationFrameID: number
		let time: number = 0;

		let lastTargetIndex: number = -1
		const previousTargetPosition = new Vector3()

		function renderLoop() {
			animationFrameID = requestAnimationFrame(renderLoop)
			time += ORBIT_SPEED;

			planetSystems.forEach(({ group, mesh, data }) => {
				mesh.rotation.y += data.rotationSpeed * BASE_TIME_SPEED;

				const currentAngle = time * data.revolutionSpeed;
				const orbitRadius = data.distance * DISTANCE_SCALE;

				group.position.x = Math.cos(currentAngle) * orbitRadius;
				group.position.z = Math.sin(currentAngle) * orbitRadius;
			})

			moonSystems.forEach(({ mesh, data }) => {
				mesh.rotation.y += data.rotationSpeed * BASE_TIME_SPEED;

				const moonAngle = time * data.revolutionSpeed;
				const moonRadius = data.distance * DISTANCE_SCALE;

				mesh.position.x = Math.cos(moonAngle) * moonRadius;
				mesh.position.z = Math.sin(moonAngle) * moonRadius;
			})

			const targetIndex = activeTargetRef.current
			const targetObject = targetIndex === -1 ? sun : planetSystems[targetIndex].group;

			if (lastTargetIndex !== targetIndex) {
				const targetSize = targetIndex === -1 ? 109 : PLANETS[targetIndex].size;
				const zoomDistance = (targetSize * SIZE_SCALE) * 5 + 20;

				camera.position.set(
					targetObject.position.x + zoomDistance,
					targetObject.position.y + zoomDistance * 0.5,
					targetObject.position.z + zoomDistance
				);

				previousTargetPosition.copy(targetObject.position);
				lastTargetIndex = targetIndex;
			}

			const delta = new Vector3().subVectors(targetObject.position, previousTargetPosition);

			camera.position.add(delta);
			controls.target.copy(targetObject.position);
			previousTargetPosition.copy(targetObject.position);

			controls.update();
			renderer.render(scene, camera);
		}

		renderLoop()

		function handleResize() {
			const { innerWidth, innerHeight } = window
			camera.aspect = innerWidth / innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(innerWidth, innerHeight)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			cancelAnimationFrame(animationFrameID)
			window.removeEventListener('resize', handleResize)

			starsGeometry.dispose();
			starsMaterial.dispose();

			sunGeometry.dispose()
			sunMaterial.dispose()

			planetSystems.forEach((system) => {
				if (system.mesh.material instanceof MeshPhongMaterial) {
					system.mesh.material.dispose();
				}
				system.mesh.geometry.dispose();

				system.mesh.children.forEach((child) => {
					if (child instanceof Mesh) {
						child.geometry.dispose();
						if (child.material) child.material.dispose();
					}
				});
			})

			moonSystems.forEach((system) => {
				if (system.mesh.material instanceof MeshPhongMaterial) {
					system.mesh.material.dispose();
				}
				system.mesh.geometry.dispose();
			})

			renderer.dispose()
		}
	}, [])

	function handleTargetChange(index: number) {
		activeTargetRef.current = index
		setActiveUITarget(index)
	}

	return (
		<div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
			<canvas ref={canvasRef} style={{ display: 'block' }}/>

			{/* HTML Navigation UI layered over the canvas */}
			<div style={{
				position: 'absolute',
				bottom: '20px',
				left: '50%',
				transform: 'translateX(-50%)',
				display: 'flex',
				gap: '8px',
				background: 'rgba(0,0,0,0.6)',
				padding: '12px',
				borderRadius: '8px',
				flexWrap: 'wrap',
				justifyContent: 'center',
				maxWidth: '90%'
			}}>
				<button
					onClick={() => handleTargetChange(-1)}
					style={{
						padding: '8px 16px',
						background: activeUITarget === -1 ? '#fff' : '#333',
						color: activeUITarget === -1 ? '#000' : '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						fontWeight: 'bold'
					}}
				>
					Sun
				</button>

				{PLANETS.map((planet, index) => (
					<button
						key={planet.name}
						onClick={() => handleTargetChange(index)}
						style={{
							padding: '8px 16px',
							background: activeUITarget === index ? '#fff' : '#333',
							color: activeUITarget === index ? '#000' : '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						{planet.name}
					</button>
				))}
			</div>
		</div>
	);
}