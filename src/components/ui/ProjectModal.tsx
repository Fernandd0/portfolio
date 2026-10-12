import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import type { Project } from '../../types/Project'

interface Props {
  project: Project
  onClose: () => void
}

export const ProjectModal: FC<Props> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // showModal() gives us Esc to close, focus trapping and the ::backdrop for free
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = document.activeElement as HTMLElement | null
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = 'unset'
      opener?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="nes-dialog is-rounded pixel-dialog"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      // The dialog element itself only receives clicks on the backdrop
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pixel-dialog-inner">
        <p className="title" id="dialog-title">{project.title}</p>
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          className="pixel-dialog-image"
          loading="lazy"
        />
        <p className="pixel-dialog-desc">{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="pixel-dialog-tech">
            <p className="pixel-tech-title">Built with</p>
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
              Check it out
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
              See the code
            </a>
          )}
        </div>

        <menu className="dialog-menu">
          <button type="button" className="nes-btn" onClick={onClose} aria-label="Close">
            X
          </button>
        </menu>
      </div>
    </dialog>
  )
}
