import type { FC } from 'react'
import type { Project } from '../../types/Project'

interface Props {
  project: Project
  onClose: () => void
}

export const ProjectModal: FC<Props> = ({ project, onClose }) => {
  return (
    <div
      className="pixel-dialog-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <dialog
        open
        className="nes-dialog is-rounded pixel-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <form method="dialog">
          <p className="title" id="dialog-title">{project.title}</p>
          <img
            src={project.image}
            alt={project.title}
            className="pixel-dialog-image"
            loading="lazy"
          />
          <p className="pixel-dialog-desc">{project.description}</p>

          {project.technologies && project.technologies.length > 0 && (
            <div className="pixel-dialog-tech">
              <p className="pixel-tech-title">Technologies:</p>
              <div className="pixel-tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech} className="nes-badge">
                    <span className="is-dark">{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pixel-dialog-actions">
            {project.webUrl && (
              <a
                className="nes-btn is-primary display-flex"
                href={project.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="nes-icon coin is-small"></i>
                Visit website
              </a>
            )}

            {project.githubUrl && (
              <a
                className="nes-btn display-flex"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="nes-icon github is-small"></i>
                View code
              </a>
            )}
          </div>

          <menu className="dialog-menu">
            <button
              type="button"
              className="nes-btn"
              onClick={onClose}
            >
              X
            </button>
          </menu>
        </form>
      </dialog>
    </div>
  )
}
