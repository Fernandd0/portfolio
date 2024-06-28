import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  isMovil?: boolean;
}

export const NavLinks: FC<Props> = ({ isMovil = false }) => {
  const links = [
    { id: "1", path: "/", title: "INICIO", icon: "" },
    { id: "2", path: "/sobre-mi", title: "SOBRE MI", icon: "" },
    {
      id: "3",
      path: "/proyectos",
      title: "PROYECTOS",
      icon: "",
    },
    { id: "4", path: "/contacto", title: "CONTACTO", icon: "" },
  ];

  const { pathname } = useLocation();
  const currentLink = links.find((link) => link.path === pathname);
  const [activeTab, setActiveTab] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (currentLink) {
      setActiveLink(currentLink.id);
      setActiveTab(currentLink.id);
    } else {
      setActiveLink("");
      setActiveTab("");
    }
  }, [currentLink]);

  const hoverAnimation = {
    scale: 1.1,
    transition: { duration: 0.3 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (isMovil) {
    return (
      <motion.ul
        className="flex flex-col px-6 pt-4 pb-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {links.map((link) => (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `${
                isActive && "text-primary"
              } relative cursor-pointer flex items-center justify-center`
            }
            key={link.id}
            onClick={() => setActiveTab(link.id)}
          >
            <motion.div whileHover={hoverAnimation}>{link.icon}</motion.div>
            <li className="ml-2 text-md hover:underline font-retro mb-2">{link.title}</li>
          </NavLink>
        ))}
      </motion.ul>
    );
  } else {
    return (
      <motion.ul
        onMouseLeave={() => setActiveTab(activeLink)}
        className="relative hidden md:flex h-auto items-center"
      >
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              onClick={() => {
                setActiveTab(link.id);
                setActiveLink(link.id);
              }}
              onMouseEnter={() => setActiveTab(link.id)}
              className={`${
                activeTab === link.id && "text-white"
              } relative cursor-pointer py-3 px-4 border-l-4 border-primary h-full`}
            >
              {activeTab === link.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute h-full inset-0 bg-primary"
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10 font-retro text-[13px] after:underline">
                {link.title}
              </span>
            </NavLink>
          </li>
        ))}
      </motion.ul>
    );
  }
};
