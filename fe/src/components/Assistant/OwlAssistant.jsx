import { useState, useEffect, useReducer } from 'react';
import useStyles from '../../utils/hooks/useStyles';
import styles from './styles';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Owl from './Owl';

export const OwlAssistant = () => {
  return (
    <Canvas style={{ width: '150px', height: '150px' }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Owl position={[0, -1.5, 1.4]} rotation={[-0.01, -0.4, 0.0]} />
        <Environment preset={'lobby'} />
      </Suspense>
    </Canvas>
  );
};
