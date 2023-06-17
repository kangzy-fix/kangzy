import React from 'react';

const ProjectPage = ({ project }) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.category}</p>
      <img src={project.img} alt={project.title} style={project.style} />
    </div>
  );
};

export default ProjectPage;
