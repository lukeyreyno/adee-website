import * as THREE from 'three';

interface ThreeJSOptions {
  widthRatio: number;
  heightRatio: number;
  canvas: HTMLCanvasElement;
}

class ThreeJSScene {
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;
  protected canvas: HTMLCanvasElement;
  
  private widthRatio: number
  private heightRatio: number

  constructor(options: ThreeJSOptions) {
    this.canvas = options.canvas;

    this.widthRatio = options.widthRatio;
    this.heightRatio = options.heightRatio;

    const calculatedWidth = window.innerWidth * this.widthRatio;
    const calculatedHeight = window.innerHeight * this.heightRatio;

    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, calculatedWidth / calculatedHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(calculatedWidth, calculatedHeight);

    // Bind resize event
    window.addEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    const width = window.innerWidth * this.widthRatio;
    const height = window.innerHeight * this.heightRatio;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  public dispose() {
    window.removeEventListener('resize', this.onWindowResize);
    this.renderer.dispose();
  }
}

export {ThreeJSOptions, ThreeJSScene};
