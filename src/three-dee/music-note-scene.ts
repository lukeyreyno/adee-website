import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {ThreeJSOptions, ThreeJSScene} from './threejs-scene.ts';

interface MusicNoteSceneOptions extends ThreeJSOptions {
  numMusicNotes: number
}

interface MusicNoteObject {
  mesh: THREE.Mesh;
  initialPosition: THREE.Vector3;
  initialRotation: THREE.Euler;
  rotationSpeed: number;
}

class MusicNoteScene extends ThreeJSScene {
  private musicNotes: MusicNoteObject[] = [];

  private frustum: THREE.Frustum;
  private cameraViewMatrix: THREE.Matrix4;

  constructor(options: MusicNoteSceneOptions) {
    super(options)

    this.scene.background = new THREE.Color(0x1fafbf);

    this.frustum = new THREE.Frustum();
    this.cameraViewMatrix = new THREE.Matrix4();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    this.scene.add(light);

    this.createMusicNotes(options.numMusicNotes);
  }

  private createMusicNotes(count: number) {
    const musicNoteSrcs = [
      './models/eighth-note.glb',
      './models/beam-eighth-notes.glb'
    ];
    const musicNoteModels: THREE.Mesh[] = []
    const gltfLoader = new GLTFLoader();

    let loadedModels = 0;

    const checkModelsLoaded = () => {
      if (loadedModels === musicNoteSrcs.length) {
        placeNotes();
      }
    }

    const placeNotes = () => {
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * musicNoteModels.length);
        const noteMesh = musicNoteModels[randomIndex].clone();
        this.scene.add(noteMesh);

        // Random position for each note
        noteMesh.position.set(
          Math.random() * 28 - 14,
          Math.random() * 2 - 1,
          2 + Math.random() * 0.01
        );

        noteMesh.rotation.set(
          noteMesh.rotation.x,
          Math.random() * Math.PI / 4 - Math.PI / 8,
          noteMesh.rotation.z
        )

        this.musicNotes.push({
          mesh: noteMesh,
          initialPosition: noteMesh.position.clone(),
          initialRotation: noteMesh.rotation.clone(),
          rotationSpeed: Math.random() * 0.001
        });
        this.scene.add(noteMesh);
      }
    }

    const loadModel = (url: string) => {
      gltfLoader.load(url, (gltf) => {
        const model = gltf.scene.children[0] as THREE.Mesh;
        musicNoteModels.push(model);
        loadedModels++;

        checkModelsLoaded();
        }, undefined, (error) => {
        console.error('Failed to load music note model:', error);
        loadedModels++;
      });
    }

    loadModel('./models/eighth-note.glb');
    loadModel('./models/beam-eighth-notes.glb');
  }

  // Update frustum bounds based on camera's view
  private updateFrustum() {
    // Calculate frustum from camera projection matrix
    this.camera.updateMatrixWorld(); // Ensure world matrix is up to date
    this.cameraViewMatrix.copy(this.camera.matrixWorld).invert(); // Get camera's inverse world matrix
    this.frustum.setFromProjectionMatrix(this.camera.projectionMatrix.clone().multiply(this.cameraViewMatrix));
  }

  // Constrain the notes within the frustum's bounds
  private constrainPosition(note: THREE.Mesh) {
    const frustum = this.frustum;

    // Convert note position to camera space and check if it's within the frustum
    const notePosition = note.getWorldPosition(new THREE.Vector3());
    const isInFrustum = frustum.containsPoint(notePosition);

    // If the note is outside the frustum, adjust its position
    if (!isInFrustum) {
      // Here, we can move the note back to within bounds, for simplicity:
      note.position.set(
        THREE.MathUtils.clamp(note.position.x, -2, 2),
        THREE.MathUtils.clamp(note.position.y, -2, 2),
        THREE.MathUtils.clamp(note.position.z, 0, 5)
      );
    }
  }

  public animate = () => {
    requestAnimationFrame(this.animate);

    // Move each music note randomly
    this.musicNotes.forEach(note => {
      note.mesh.rotation.y = note.initialRotation.y + Math.sin(Date.now() * note.rotationSpeed) * 0.5;
    });

    this.renderer.render(this.scene, this.camera);
  };
}

export {MusicNoteSceneOptions, MusicNoteScene};
