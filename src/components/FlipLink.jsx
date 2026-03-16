import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, onClick, target, rel, className = "" }) => {
  const letters = String(children).split("");

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`relative block overflow-hidden whitespace-nowrap leading-2 ${className}`}
    >
      <div>
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l === " " ? "\u00a0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l === " " ? "\u00a0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default FlipLink;
