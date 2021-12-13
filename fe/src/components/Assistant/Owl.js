/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const prevAnimationRef = useRef();
  const { nodes, materials, animations } = useGLTF('/final_i_believe_2.glb');
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    group,
  );

  useEffect(() => {
    prevAnimationRef.current = props.animation;
  });
  const prevAnimation = prevAnimationRef.current;

  useEffect(() => {
    if (!actions) {
      return;
    }
    if (prevAnimation === props.animation) {
      return;
    }

    if (prevAnimation !== "idle" && props.animation === "hello") {
      return;
    }

    // console.log(actions);
    const reset_all = () => {
      Object.entries(actions).forEach(([key, _]) => {
        if (key !== props.animation) {
          actions[key]?.stop();
        }
      });
    };
    console.log(prevAnimation + " ====> " + props.animation);

    if (props.animation === 'listening') {
      reset_all();
      actions.listening_start.timeScale = 3.0;
      actions?.listening_start?.play();
      setTimeout(() => {
        actions?.listening_start?.stop();
        actions?.listening_long?.play();
      }, 500);
    } else if (props.animation === 'speaking' && prevAnimation === 'hello') {
      // console.log(prevAnimation + " ====> 2222 ====> " + props.animation);
      setTimeout(() => {
        reset_all();
        actions?.speaking?.play();
      }, 650);
    } else if (props.animation === 'naklon') {
      reset_all();
      actions.listening_end.timeScale = 3.0;
      actions?.listening_end?.play();
      setTimeout(() => {
        actions?.listening_end?.stop();
        actions?.naklon?.play();
      }, 500);
    } else if (props.animation === 'idle' && prevAnimation === 'speaking') {
      reset_all();
      // actions.here_it_is.timeScale = 3.0;
      actions?.here_it_is?.play();
      setTimeout(() => {
        actions?.here_it_is?.stop();
        actions?.idle?.play();
      }, 1500);
    } else {
      reset_all();
      if (props.animation === "hello") {
        actions[props.animation].timeScale = 2.0;
      }
      // console.log(prevAnimation + " ====> 1111 ====> " + props.animation);
      // console.log('prev: ' + prevAnimation, 'cur: ' + props.animation);
      actions[props.animation]?.play();
    }

    // if (props.speaking.speaking === true) {
    //   actions['listening_start'].stop();
    //   actions['speaking'].play();
    // } else {
    //   actions['speaking'].stop();
    //   actions['listening_start'].play();
    // }
  }, [actions, prevAnimation, props.animation]);

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

useGLTF.preload('/final_i_believe_2.glb');
