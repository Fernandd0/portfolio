import { useState, useMemo, useCallback } from 'react'
import type { FC } from 'react'
import projects from '../../../data/projects.json'
import * as assets from '../../../assets'
import type { Project } from '../../../types/Project'
import { ProjectModal } from '../ProjectModal'
import styles from './PortfolioSlider.module.css'

const getAssetImage = (key: string): string => {
  try {
    const asset = assets[key as keyof typeof assets]
    if (!asset) return String(assets.loading || '')

    if (typeof asset === 'string') return asset
    if (typeof asset === 'object' && asset !== null) {
      const assetObj = asset as any
      return assetObj.default || assetObj.src || assetObj.href || assetObj.url || String(asset)
    }
    return String(asset)
  } catch (error) {
    return String(assets.loading || '')
  }
}

const GRID_PATTERN = [
  'cardBig',   // 1 (2x2)
  'card',      // 2 (1x1)
  'card',      // 3 (1x1)
  'cardTall',  // 4 (1x2)
  'cardWide',  // 5 (2x1)
  'card',      // 6 (1x1)
  'card',      // 7 (1x1)
  'cardWide',  // 8 (2x1)
]

export const PortfolioSlider: FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const handleProjectClick = useCallback((project: Project) => {
    setActiveProject(project)
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveProject(null)
  }, [])

  const processedProjects = useMemo(() => {
    const reversedProjects = [...projects].reverse()

    return reversedProjects.map((project, index) => {
      const patternKey = GRID_PATTERN[index % GRID_PATTERN.length] as keyof typeof styles
      const gridClass = styles[patternKey] || styles.card

      return {
        ...project,
        gridClass,
        image: getAssetImage(project.imageUrl)
      }
    })
  }, [])

  return (
    <>
      <div className={styles.bentoGridWrapper}>
        <div className={styles.bentoGrid}>
          {processedProjects.map((project) => (
            <div
              key={project.id}
              className={`${styles.card} ${project.gridClass}`}
              onClick={() => handleProjectClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleProjectClick(project)
                }
              }}
              aria-label={`View project ${project.title}`}
            >
              <div className={styles.cardImageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.cardImage}
                  loading="lazy"
                />
                {!project.image && <div className={styles.cardLoading}>#</div>}
              </div>
              <div className={styles.cardContent}>
                <div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                </div>

                <div className={styles.cardLinks}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLinkBtn}
                      onClick={(e) => e.stopPropagation()}
                      title="View Code"
                    >
                      <svg className={styles.cardLinkIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-1.455-3.795-1.455-.54-1.38-1.335-1.755-1.335-1.755-1.095-.75.09-.735.09-.735 1.2.09 1.83 1.23 1.83 1.23 1.08 1.86 2.805 1.32 3.495 1.005.105-.78.42-1.32.765-1.62-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}

                  {project.webUrl && (
                    <a
                      href={project.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLinkBtn}
                      onClick={(e) => e.stopPropagation()}
                      title="View Site"
                    >
                      <svg className={styles.cardLinkIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      Site
                    </a>
                  )}
                </div>
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