import * as THREE from 'three';

import {ThreeJSOptions, ThreeJSScene} from './threejs-scene.ts';

interface MusicNoteSceneOptions extends ThreeJSOptions {
  numMusicNotes: number
}

class MusicNoteScene extends ThreeJSScene {
  private musicNotes: THREE.Mesh[] = [];

  constructor(options: MusicNoteSceneOptions) {
    super(options)

    this.createMusicNotes(options.numMusicNotes);
  }

  private createMusicNotes(count: number) {
    for (let i = 0; i < count; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const note = new THREE.Mesh(geometry, material);

      // Random position for each note
      note.position.set(
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
      );

      this.musicNotes.push(note);
      this.scene.add(note);
    }
  }

  public animate = () => {
    requestAnimationFrame(this.animate);

    // Move each music note randomly
    this.musicNotes.forEach(note => {
      note.position.x += (Math.random() - 0.5) * 0.05;
      note.position.y += (Math.random() - 0.5) * 0.05;
      note.position.z += (Math.random() - 0.5) * 0.05;
    });

    this.renderer.render(this.scene, this.camera);
  };
}

export {MusicNoteSceneOptions, MusicNoteScene};
