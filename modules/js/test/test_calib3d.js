// This file is part of OpenCV project.
// It is subject to the license terms in the LICENSE file found in the top-level directory
// of this distribution and at http://opencv.org/license.html.

if (typeof module !== 'undefined' && module.exports) {
  // The environment is Node.js
  var cv = require('./opencv.js'); // eslint-disable-line no-var
}

QUnit.module('Camera Calibration and 3D Reconstruction', {});

QUnit.test('constants', function(assert) {
  assert.strictEqual(typeof cv.LMEDS, 'number');
  assert.strictEqual(typeof cv.RANSAC, 'number');
  assert.strictEqual(typeof cv.RHO, 'number');
});

QUnit.test('findHomography', function(assert) {
  let srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    56,
    65,
    368,
    52,
    28,
    387,
    389,
    390,
  ]);
  let dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0,
    0,
    300,
    0,
    0,
    300,
    300,
    300,
  ]);

  const mat = cv.findHomography(srcPoints, dstPoints);

  assert.ok(mat instanceof cv.Mat);
});

QUnit.test('estimateAffine2D', function(assert) {
   const inputs = cv.matFromArray(4, 1, cv.CV_32FC2, [
    1, 1, 
    80, 0, 
    0, 80, 
    80, 80
  ]);
  const outputs = cv.matFromArray(4, 1, cv.CV_32FC2, [
    21, 51, 
    70, 77, 
    40, 40, 
    10, 70
  ]);
  const M = cv.estimateAffine2D(inputs, outputs);
  assert.ok(M instanceof cv.Mat);
  assert.deepEqual(Array.from(M.data), [
     23,  55,  97, 126,  87, 139, 227,  63,   0,   0,
      0,   0,   0,   0, 232, 191,  71, 246,  12,  68,
    165,  35,  53,  64,  99,  56,  27,  66,  14, 254,
    212,  63, 103, 102, 102, 102, 102, 102, 182, 191,
    195, 252, 174,  22,  55,  97,  73,  64
  ]);  
});
