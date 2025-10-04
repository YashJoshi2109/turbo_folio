import React from 'react';
import { Canvas } from '@react-three/fiber';
import { SkillCategory } from './SkillCategory';

const Skills = () => {
  return (
    <div className="skills">
      <h2>Skills</h2>
      <div className="skill-categories">
        {/* Keep all skill categories and tech icons grid intact */}
        <SkillCategory />
      </div>
      <Canvas>
        {/* Simplified rendering logic without the Float component */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* Add any 3D objects here */}
      </Canvas>
    </div>
  );
};

export default Skills;