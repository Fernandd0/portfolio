import { ReactNode } from "react"
import styles from "@/components/styles/typography.module.css"
import { twMerge } from "tailwind-merge"

interface Props {
	children: ReactNode
	className?: string
	text?: string
}

export const Typography: React.FC<Props> = ({ children, className = "", text = "" }) => {
	return (
		<h2 className={twMerge(styles.mainText, "font-black font-exo text-[48px] leading-[55px] md:text-[52px] md:leading-[80px] lg:text-5xl lg:leading-[60px]", text, className)}>
			{children}
		</h2>
	)
}
