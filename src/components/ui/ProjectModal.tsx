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
          <p>{project.description}</p>

          {project.webUrl && (
            <p>
              <a
                className="nes-btn is-primary"
                href={project.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar sitio
              </a>
            </p>
          )}

          {project.githubUrl && (
            <p>
              <a
                className="nes-btn is-normal"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver código
              </a>
            </p>
          )}

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
