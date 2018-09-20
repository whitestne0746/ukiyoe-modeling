import { } from "imports-loader?THREE=three!three/examples/js/QuickHull.js";
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js';
import * as THREE from 'three';

export default function createBridge() {
  let bridge = new THREE.Object3D();

  let bridgeWidth = 200;

  let centerLogGeometry, sideLogGeometry, crossLogGeometry,
    centerLeftLog, centerRightLog, leftLog, rightLog, underLog, topLog, crossLog1, crossLog2,
    centerLogLength, sideLogLength, underLogLength, topLogLength, crossLogLength,
    underLogHeight;

  underLogLength = bridgeWidth - 40;
  topLogLength = bridgeWidth - 60;

  let centerLog_X = 20;
  let sideLog_X = 65;
  let sideLogRotation = Math.PI / 15;

  let underLogGeometry = new THREE.CylinderGeometry(4, 4, underLogLength, 20, 0, false);
  let topLogGeometry = new THREE.BoxGeometry(6, topLogLength, 6);

  let testMaterial = new THREE.MeshPhongMaterial({ color: 0x0000cd });

  let startPoint1 = new THREE.Vector3(0, 90, 0);
  let middlePoint1 = new THREE.Vector3(0, 300, 3000);
  let endPoint1 = new THREE.Vector3(0, 90, 6000);

  let curve1 = new THREE.QuadraticBezierCurve3(
    startPoint1,
    middlePoint1,
    endPoint1
  );

  let curvePoints1 = curve1.getPoints(600);

  for (let i = 0; i < curvePoints1.length; i++) {
    if (i !== 0) {
      let vertices = [
        new THREE.Vector3(curvePoints1[i].x + bridgeWidth / 2, curvePoints1[i].y, curvePoints1[i].z),
        new THREE.Vector3(curvePoints1[i].x - bridgeWidth / 2, curvePoints1[i].y, curvePoints1[i].z),
        new THREE.Vector3(curvePoints1[i].x - bridgeWidth / 2, curvePoints1[i - 1].y, curvePoints1[i - 1].z),
        new THREE.Vector3(curvePoints1[i].x + bridgeWidth / 2, curvePoints1[i - 1].y, curvePoints1[i - 1].z),
        new THREE.Vector3(curvePoints1[i].x + bridgeWidth / 2, curvePoints1[i - 1].y + 10, curvePoints1[i - 1].z),
        new THREE.Vector3(curvePoints1[i].x + bridgeWidth / 2, curvePoints1[i].y + 10, curvePoints1[i].z),
        new THREE.Vector3(curvePoints1[i].x - bridgeWidth / 2, curvePoints1[i].y + 10, curvePoints1[i].z),
        new THREE.Vector3(curvePoints1[i].x - bridgeWidth / 2, curvePoints1[i - 1].y + 10, curvePoints1[i - 1].z),
      ];
      let walkPlaceGeometry = new THREE.ConvexGeometry(vertices);
      let walkPlace = new THREE.Mesh(walkPlaceGeometry, testMaterial);
      bridge.add(walkPlace);

      if (i % 20 === 0) {
        centerLogLength = curvePoints1[i].y;
        sideLogLength = centerLogLength + 5;
        underLogHeight = curvePoints1[i].y * 0.4;
        crossLogLength = calCrossLength(sideLog_X - centerLog_X, centerLogLength - underLogHeight, sideLogLength, sideLogRotation);

        centerLogGeometry = new THREE.CylinderGeometry(5, 5, centerLogLength, 20, 0, false);
        sideLogGeometry = new THREE.CylinderGeometry(5, 5, sideLogLength, 20, 0, false);

        // 真ん中の２本の柱
        centerLeftLog = new THREE.Mesh(centerLogGeometry, testMaterial);
        centerLeftLog.position.set(curvePoints1[i].x + centerLog_X, centerLogLength / 2, curvePoints1[i].z);

        centerRightLog = new THREE.Mesh(centerLogGeometry, testMaterial);
        centerRightLog.position.set(curvePoints1[i].x - centerLog_X, centerLogLength / 2, curvePoints1[i].z);

        // 左端、右端の柱
        leftLog = new THREE.Mesh(sideLogGeometry, testMaterial);
        leftLog.rotation.z = sideLogRotation;
        leftLog.position.set(curvePoints1[i].x + sideLog_X, sideLogLength / 2, curvePoints1[i].z);

        rightLog = new THREE.Mesh(sideLogGeometry, testMaterial);
        rightLog.rotation.z = -sideLogRotation;
        rightLog.position.set(curvePoints1[i].x - sideLog_X, sideLogLength / 2, curvePoints1[i].z);

        // 一番下の柱
        underLog = new THREE.Mesh(underLogGeometry, testMaterial);
        underLog.rotation.z = Math.PI / 2;
        underLog.position.set(curvePoints1[i].x, underLogHeight, curvePoints1[i].z);

        // クロスしている柱
        crossLogGeometry = new THREE.CylinderGeometry(4, 4, bridgeWidth - 40, 20, 0, false);

        bridge.add(centerLeftLog);
        bridge.add(centerRightLog);
        bridge.add(leftLog);
        bridge.add(rightLog);
        bridge.add(underLog);
      }
    }
  }

  return bridge;
}

function calCrossLength(w, h, length, rad) {
  return '';
}
