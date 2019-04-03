import * as THREE from 'three';

export default class GameScene {
	constructor(container, camera, controls, renderer){

		let animationLoop;

		// Creating and setting Game scene
		let scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xb8b8b8 );
		scene.add( new THREE.AmbientLight( 0x505050 ) );

		// Creating and setting lights on MAIN scene
		let light = new THREE.SpotLight( 0xffffff, 1.5 );
		light.position.set( 0, 500, 2000 );
		light.angle = Math.PI / 9;
		light.castShadow = true;
		light.shadow.camera.near = 1000;
		light.shadow.camera.far = 4000;
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		scene.add( light );

		// Creating, setting and adding game objects
		let objects = [];
		let geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );
		for ( let i = 0; i < 30; i ++ ) {
			let object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
			object.position.x = Math.random() * 1000 - 500;
			object.position.y = Math.random() * 600 - 300;
			object.position.z = Math.random() * 800 - 400;
			object.rotation.x = Math.random() * 2 * Math.PI;
			object.rotation.y = Math.random() * 2 * Math.PI;
			object.rotation.z = Math.random() * 2 * Math.PI;
			object.scale.x = Math.random() * 2 + 1;
			object.scale.y = Math.random() * 2 + 1;
			object.scale.z = Math.random() * 2 + 1;
			object.castShadow = true;
			object.receiveShadow = true;
			scene.add( object );
			objects.push( object );
		}

		// Creating and setting EventListeners for game objects
		let raycaster = new THREE.Raycaster();
		let mouse = new THREE.Vector2();
		document.addEventListener( 'click', onDocumentMouseDown, false );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		function onDocumentMouseDown( event ) {
			event.preventDefault();
			mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( objects );
			if ( intersects.length > 0 ) {
				var intersect = intersects[ 0 ];
				scene.remove( intersect.object );
				objects.splice( objects.indexOf( intersect.object ), 1 );
			}
		}
		function onDocumentMouseMove( event ) {
			event.preventDefault();
			mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( objects );
			if(intersects.length > 0) {
				container.style.cursor = "pointer";
			} else {
				container.style.cursor = "";
			}
		}

		//Starting animation for game scene
		animate();

		// Creating animation for game scene
		function animate() {
			animationLoop = requestAnimationFrame( animate );
			for ( let i = 0; i < objects.length; i ++ ) {
				objects[i].rotation.x += 0.03;
				objects[i].rotation.y += 0.03;
				objects[i].rotation.z += 0.03;
			}
			render();
		}

		// Rendering scene and camera
		function render() {
			if(objects.length===0){
				cancelAnimationFrame( animationLoop );
				location.reload();
			}
			controls.update();
			renderer.render( scene, camera );
		}
	}
}