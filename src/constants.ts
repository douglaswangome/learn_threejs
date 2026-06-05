export const PLANETS = [
	{
		name: 'Mercury',
		size: 0.383,
		distance: 0.387,
		rotationSpeed: 0.017,
		tilt: 0.034,
		revolutionSpeed: 4.15,
		moonCount: 0,
		moons: []
	},
	{
		name: 'Venus',
		size: 0.949,
		distance: 0.723,
		rotationSpeed: -0.004,
		tilt: 177.4,
		revolutionSpeed: 1.62,
		moonCount: 0,
		moons: []
	},
	{
		name: 'Earth', size: 1, distance: 1, rotationSpeed: 1, tilt: 23.4, revolutionSpeed: 1, moonCount: 1,
		moons: [
			{ name: 'Moon', size: 0.273, distance: 0.02, rotationSpeed: 13.3, revolutionSpeed: 13.3 }
		]
	},
	{
		name: 'Mars', size: 0.532, distance: 1.52, rotationSpeed: 0.97, tilt: 25.2, revolutionSpeed: 0.53, moonCount: 2,
		moons: [
			{ name: 'Phobos', size: 0.01, distance: 0.01, rotationSpeed: 1100, revolutionSpeed: 1100 },
			{ name: 'Deimos', size: 0.005, distance: 0.015, rotationSpeed: 280, revolutionSpeed: 280 }
		]
	},
	{
		name: 'Jupiter', size: 11.21, distance: 5.20, rotationSpeed: 2.44, tilt: 3.1, revolutionSpeed: 0.084, moonCount: 95,
		moons: [
			// The 4 Galilean Moons
			{ name: 'Io', size: 0.286, distance: 0.06, rotationSpeed: 200, revolutionSpeed: 200 },
			{ name: 'Europa', size: 0.24, distance: 0.09, rotationSpeed: 100, revolutionSpeed: 100 },
			{ name: 'Ganymede', size: 0.413, distance: 0.12, rotationSpeed: 50, revolutionSpeed: 50 },
			{ name: 'Callisto', size: 0.378, distance: 0.16, rotationSpeed: 20, revolutionSpeed: 20 }
		]
	},
	{
		name: 'Saturn', size: 9.45, distance: 9.57, rotationSpeed: 2.22, tilt: 26.7, revolutionSpeed: 0.034, moonCount: 146,
		moons: [
			{ name: 'Titan', size: 0.404, distance: 0.15, rotationSpeed: 22.5, revolutionSpeed: 22.5 },
			{ name: 'Enceladus', size: 0.04, distance: 0.08, rotationSpeed: 260, revolutionSpeed: 260 }
		]
	},
	{
		name: 'Uranus',
		size: 4.01,
		distance: 19.17,
		rotationSpeed: -1.39,
		tilt: 97.8,
		revolutionSpeed: 0.012,
		moonCount: 28,
		moons: [
			{ name: 'Titania', size: 0.123, distance: 0.08, rotationSpeed: 42, revolutionSpeed: 42 },
			{ name: 'Oberon', size: 0.119, distance: 0.11, rotationSpeed: 27, revolutionSpeed: 27 }
		]
	},
	{
		name: 'Neptune',
		size: 3.88,
		distance: 30.18,
		rotationSpeed: 1.49,
		tilt: 28.3,
		revolutionSpeed: 0.006,
		moonCount: 16,
		moons: [
			{ name: 'Triton', size: 0.212, distance: 0.08, rotationSpeed: -62, revolutionSpeed: -62 }
		]
	},
] as const;