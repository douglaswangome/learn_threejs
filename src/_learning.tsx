// useEffect(() => {
// 	if (!canvasRef.current) {
// 		return
// 	}
//
// 	const { devicePixelRatio, innerWidth, innerHeight } = window
//
// 	const pane = new Pane()
//
// 	const renderer = new WebGLRenderer({
// 		canvas: canvasRef.current,
// 		antialias: true,
// 	})
// 	renderer.setSize(innerWidth, innerHeight)
//
// 	const maxPixelRatio = Math.min(devicePixelRatio, 2)
// 	renderer.setPixelRatio(maxPixelRatio)
//
// 	const scene = new Scene()
// 	const group = new Group()
//
// 	const planeGeometry = new PlaneGeometry(2, 2, 16, 16)
// 	const uv2PlaneGeometry = new BufferAttribute(planeGeometry.attributes.uv.array, 2)
// 	planeGeometry.setAttribute('uv2', uv2PlaneGeometry)
//
// 	const cubeGeometry = new BoxGeometry(2, 2, 2, 16, 16)
// 	const uv2CubeGeometry = new BufferAttribute(cubeGeometry.attributes.uv.array, 2)
// 	cubeGeometry.setAttribute('uv2', uv2CubeGeometry)
//
// 	const torusKnotGeometry = new TorusKnotGeometry(2, 0.5, 100, 16)
// 	const uv2TorusKnotGeometry = new BufferAttribute(torusKnotGeometry.attributes.uv.array, 2)
// 	torusKnotGeometry.setAttribute('uv2', uv2TorusKnotGeometry)
//
// 	const sphereGeometry = new SphereGeometry(2, 32, 32)
// 	const uv2SphereGeometry = new BufferAttribute(sphereGeometry.attributes.uv.array, 2)
// 	sphereGeometry.setAttribute('uv2', uv2SphereGeometry)
//
// 	const cylinderGeometry = new CylinderGeometry(2, 2, 4)
// 	const uv2CylinderGeometry = new BufferAttribute(cylinderGeometry.attributes.uv.array, 2)
// 	cylinderGeometry.setAttribute('uv2', uv2CylinderGeometry)
//
// 	const loadingManager = new LoadingManager(
// 		function () {
// 			renderLoop()
// 		},
// 	)
// 	const textureLoader = new TextureLoader(loadingManager)
//
// 	const BASE = '/textures/Foliage_Lilypads_001_SD/Foliage_Lilypads_001'
// 	const textures = {
// 		map: textureLoader.load(`${BASE}_BaseColor.jpg`),
// 		aoMap: textureLoader.load(`${BASE}_AmbientOcclusion.jpg`),
// 		displacementMap: textureLoader.load(`${BASE}_Height.png`),
// 		normalMap: textureLoader.load(`${BASE}_Normal.jpg`),
// 		roughnessMap: textureLoader.load(`${BASE}_Roughness.jpg`),
// 	}
//
// 	const material = new MeshStandardMaterial({ side: DoubleSide, ...textures })
//
// 	const planeMesh = new Mesh(planeGeometry, material)
// 	planeMesh.position.x = -5
// 	group.add(planeMesh)
//
// 	const cubeMesh = new Mesh(cubeGeometry, material)
// 	group.add(cubeMesh)
//
// 	const torusKnotMesh = new Mesh(torusKnotGeometry, material)
// 	torusKnotMesh.position.x = 6
// 	group.add(torusKnotMesh)
//
// 	const sphereMesh = new Mesh(sphereGeometry, material)
// 	sphereMesh.position.y = 5
// 	group.add(sphereMesh)
//
// 	const cylinderMesh = new Mesh(cylinderGeometry, material)
// 	cylinderMesh.position.y = -5
// 	group.add(cylinderMesh)
//
// 	scene.add(group)
//
// 	const light = new AmbientLight('white', 0.4)
// 	scene.add(light)
//
// 	const pointLight = new PointLight('white', 1)
// 	pointLight.position.set(3, 3, 3)
// 	scene.add(pointLight)
//
// 	const aspectRatio = innerWidth / innerHeight
// 	const camera = new PerspectiveCamera(
// 		75,
// 		aspectRatio,
// 		0.1,
// 		1000
// 	)
// 	camera.position.z = 20
// 	camera.position.y = 5
// 	scene.add(camera)
//
// 	const controls = new OrbitControls(camera, canvasRef.current)
// 	controls.enableDamping = true
//
// 	let animationFrameID: number
//
// 	function renderLoop() {
// 		animationFrameID = requestAnimationFrame(renderLoop)
//
// 		group.children.forEach((child) => {
// 			if (child instanceof Mesh) {
// 				child.rotation.y += 0.01
// 			}
// 		})
//
// 		controls.update()
// 		renderer.render(scene, camera)
// 	}
//
// 	renderLoop()
//
// 	function handleResize() {
// 		const { innerWidth, innerHeight } = window
// 		camera.aspect = innerWidth / innerHeight
// 		camera.updateProjectionMatrix()
// 		renderer.setSize(innerWidth, innerHeight)
// 	}
//
// 	window.addEventListener('resize', handleResize)
//
// 	return () => {
// 		cancelAnimationFrame(animationFrameID)
// 		window.removeEventListener('resize', handleResize)
// 		planeGeometry.dispose()
// 		cubeGeometry.dispose()
// 		torusKnotGeometry.dispose()
// 		sphereGeometry.dispose()
// 		cylinderGeometry.dispose()
// 		controls.dispose()
// 		material.dispose()
// 		renderer.dispose()
// 		pane.dispose()
// 	}
// }, [])
