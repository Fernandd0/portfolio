import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import type { FC } from 'react'
import { gsap } from 'gsap'
import projects from '../../data/projects.json'
import * as assets from '../../assets'
import type { Project } from '../../types/Project'
import { ProjectModal } from './ProjectModal'


const getAssetImage = (key: string): string => {
  try {
    const asset = assets[key as keyof typeof assets]

    if (!asset) {
      return String(assets.loading || '')
    }

    let imageUrl: string = ''

    if (typeof asset === 'string') {
      imageUrl = asset
    } else if (typeof asset === 'object' && asset !== null) {
      const assetObj = asset as any
      imageUrl = assetObj.default || assetObj.src || assetObj.href || assetObj.url || String(asset)
    } else {
      imageUrl = String(asset)
    }

    return imageUrl

  } catch (error) {
    return String(assets.loading || '')
  }
}

export const PortfolioSlider: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [projectIndex, setProjectIndex] = useState<number>(0)

  const randomTransforms = useMemo(() => {
    return projects.map(() => ({
      rotate: (Math.random() * 6 - 3).toFixed(2),
      x: (Math.random() * 10 - 5).toFixed(2),
      y: (Math.random() * 10 - 5).toFixed(2),
    }))
  }, [])

  const projectsWithImages = useMemo(() => {
    return projects.reverse().map(project => ({
      ...project,
      image: getAssetImage(project.imageUrl),
    }))
  }, [])

  useEffect(() => {
    const cards = gsap.utils.toArray('.pixel-card')
    if (cards.length > 0) {
      gsap.from(cards, {
        y: 50,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveProject(null)
  }, [])

  const handleProjectClick = useCallback((project: Project) => {
    setActiveProject(project)
  }, [])

  const positionedProjects = useMemo(() => {
    return projectsWithImages.map((project, index) => {
      const isActive = index === projectIndex
      const transform = randomTransforms[index]

      return {
        ...project,
        style: {
          transform: `rotate(${transform.rotate}deg) translate(${transform.x}px, ${transform.y}px)`,
          zIndex: isActive ? 10 : 1,
          filter: isActive ? 'drop-shadow(0 0 10px white)' : 'none',
          transition: 'all 0.3s ease-in-out',
        },
        className: `pixel-card${isActive ? ' pixel-card-active' : ''}`,
      }
    })
  }, [projectsWithImages, projectIndex, randomTransforms])

  return (
    <>
      <div className="pixel-gallery-wrapper">
        <div className="pixel-gallery" ref={containerRef}>
          {positionedProjects.map((project) => (
            <div
              className={project.className}
              key={project.id}
              onClick={() => handleProjectClick(project)}
              style={project.style}
              role="button"
              tabIndex={0}
              aria-label={`Project ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleProjectClick(project)
                }
              }}
            >
              <div
                className="pixel-card-image"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                {!project.image && (
                  <div className="pixel-card-loading">
                    <span>...</span>
                  </div>
                )}
              </div>
              <div className="pixel-card-hover">
                <span className="pixel-click-hint">More</span>
              </div>
            </div>
          ))}
        </div>


      </div>
      {activeProject && (
        <ProjectModal project={activeProject} onClose={handleCloseModal} />
      )}
    </>
  )
}