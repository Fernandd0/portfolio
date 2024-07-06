import styles from "../../styles/NESStyles.module.css";

export const SocialNetworks = () => {
  return (
    <section className="flex flex-col gap-1 absolute top-[35%] right-4">
      <a href="https://www.linkedin.com/in/fernanddo-dev/" target="_blank">
        <i className={`${styles["nes-icon"]} ${styles["linkedin"]} p-0}`}></i>
      </a>
      <a href="https://github.com/Fernandd0" target="_blank">
        <i className={`${styles["nes-icon"]} ${styles["github"]} p-0}`}></i>
      </a>
      <a href="https://x.com/Fernandddd0" target="_blank">
        <i className={`${styles["nes-icon"]} ${styles["twitter"]} p-0}`}></i>
      </a>
      <a href="mailto:fernando.sc.contacto@gmail.com" target="_blank">
        <i className={`${styles["nes-icon"]} ${styles["gmail"]} p-0}`}></i>
      </a>
    </section>
  );
};
