import type { FC } from 'react'

export const SocialNetworks: FC = () => {

  return (
    <div className="icon-list">
      <a href="https://www.linkedin.com/in/fernandoscript" target="_blank" rel="noreferrer noopener">
        <i className="nes-icon is-medium-custom linkedin" />
      </a>
      <a href="https://github.com/Fernandd0" target="_blank" rel="noreferrer noopener">
        <i className="nes-icon is-medium-custom github" />
      </a>
      <a href="https://x.com/fernando_script" target="_blank" rel="noreferrer noopener">
        <i className="nes-icon is-medium-custom twitter" />
      </a>
      <a href="mailto:hi.fernanddo@gmail.com" target="_blank" rel="noreferrer noopener">
        <i className="nes-icon is-medium-custom gmail" />
      </a>
    </div>
  )
}
