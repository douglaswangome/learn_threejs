import { CanvasTexture } from 'three';

export function createStarTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 32;
	canvas.height = 32;
	const context = canvas.getContext('2d');

	if (context) {
		context.fillStyle = 'white';
		context.beginPath();
		context.moveTo(16, 0);   // Top point
		context.lineTo(20, 12);  // Inner top right
		context.lineTo(32, 16);  // Right point
		context.lineTo(20, 20);  // Inner bottom right
		context.lineTo(16, 32);  // Bottom point
		context.lineTo(12, 20);  // Inner bottom left
		context.lineTo(0, 16);   // Left point
		context.lineTo(12, 12);  // Inner top left
		context.closePath();
		context.fill();
	}

	return new CanvasTexture(canvas);
}