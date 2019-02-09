// 1998 XO94
//const JD0 = 2451162.0;

// Cacus
const JD0 = 2443568.0;

// Create the visualization and put it in our div.
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  assetPath: '../../src/assets',
  jed: JD0,
  startPaused: true,
  camera: {
    enableDrift: false,
  },
  debug: {
    showAxes: true,
    showGrid: true,
  },
});

// Create a skybox using NASA TYCHO artwork.
//viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

// Create sun and earth
const sun = viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);
const earth = viz.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);

// Create an object for asteroid
const ephemXO94 = new Spacekit.Ephem({
  epoch: 2458600.5,
  a: 2.59606042418,
  e: 0.125657039973,
  i: 13.9887586977,
  om: 233.090320601,
  w: 136.171819336,
  ma: 27.6165122358,
}, 'deg');
const ephemCacus = new Spacekit.Ephem({
  epoch: 2458600.5,
  a: 1.12311722831,
  e: 0.214009725406,
  i: 26.0598473365,
  om: 161.236182852,
  w: 102.175880686,
  ma: 122.22725789,
}, 'deg');
//const orb = new Spacekit.Orbit(ephemXO94);
const orb = new Spacekit.Orbit(ephemCacus);
const astpos = orb.getPositionAtTime(JD0);
const obj = viz.createShape('myobj', {
  position: astpos,
  shape: {
    //url: './1998_XO94.obj',

    //http://astro.troja.mff.cuni.cz/projects/asteroids3D/web.php?page=db_asteroid_detail&asteroid_id=1046
    url: './A1046.M1863.obj',
    //enableRotation: true,
  },
});

//viz.zoomToFit(obj, 5 /* zoom offset */);

// Set up camera
const earthpos = earth.getOrbit().getPositionAtTime(JD0);
viz.getCamera().position.set(earthpos[0], earthpos[1], earthpos[2]);
viz.getControls().target = new THREE.Vector3(astpos[0], astpos[1], astpos[2]);

// Add some light.
//viz.createLight([0, 0, 0]);
viz.createLight();
viz.createAmbientLight();
