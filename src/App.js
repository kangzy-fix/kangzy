import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import AppFooter from './components/shared/AppFooter';
import AppHeader from './components/shared/AppHeader';
import { projectsData } from './data/singleProjectData';

const About = lazy(() => import('./pages/AboutMe'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));

function ProjectDetail({ match }) {
  const projectId = parseInt(match.params.id);
  const project = projectsData.find((project) => project.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const { title, category, img, liveLink } = project;

  return (
    <div>
      <h2>{title}</h2>
      <p>Category: {category}</p>
      <img src={img} alt={title} />
      <a href={liveLink} target="_blank" rel="noopener noreferrer">
        View Live Link
      </a>
    </div>
  );
}

function App() {
  return (
    <AnimatePresence>
      <div className="bg-secondary-light dark:bg-primary-dark transition duration-300">
        <Router>
          <ScrollToTop />
          <AppHeader />
          <Suspense fallback={''}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
          <AppFooter />
        </Router>
      </div>
    </AnimatePresence>
  );
}

export default App;
