/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/animated_demo.glb');
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (props.speaking.speaking === true) {
      actions['listening_start'].stop();
      actions['speaking'].play();
    } else {
      actions['speaking'].stop();
      actions['listening_start'].play();
    }
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.02, 0.1, 0.25]} rotation={[-0.05, 0.01, -0.01]}>
        <primitive object={nodes.Bone} />
        <primitive object={nodes.Bone031} />
        <skinnedMesh
          geometry={nodes.Cube028_1.geometry}
          material={materials['face.002']}
          skeleton={nodes.Cube028_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cube028_2.geometry}
          material={materials['beak.002']}
          skeleton={nodes.Cube028_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cube028_3.geometry}
          material={materials['body.002']}
          skeleton={nodes.Cube028_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cube028_4.geometry}
          material={materials['feet.002']}
          skeleton={nodes.Cube028_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Cube028_5.geometry}
          material={materials['eyes.002']}
          skeleton={nodes.Cube028_5.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/animated_demo.glb');
