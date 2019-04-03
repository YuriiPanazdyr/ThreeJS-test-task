import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

import GameScene from './gameScene'

export default class Init {
	constructor() {

		// Creating container for app
		let container = document.createElement( 'div' );
		document.body.appendChild( container );

		// Creating and setting camera
		let camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
		camera.position.z = 1000;

		// Creating and setting controls camera
		let controls = new TrackballControls( camera );
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;

		// Creating and setting EventListeners for window resizing
		window.addEventListener( 'resize', onWindowResize, false );
		
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		// Creating and setting renderer
		let renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFShadowMap;
		container.appendChild( renderer.domElement );

		// Initialization Game scene and send props
		new GameScene(container, camera, controls, renderer);
	}
}