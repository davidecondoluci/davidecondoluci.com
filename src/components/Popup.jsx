import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  VscArrowLeft,
  VscChevronLeft,
  VscChevronRight,
  VscLink,
} from "react-icons/vsc";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Popup = ({ project, handleClosePopup }) => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    draggable: project.screens && project.screens.length > 1, // Disabilita il trascinamento se c'è solo un'immagine
    loop: project.screens && project.screens.length > 1, // Disabilita il loop se c'è solo un'immagine
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateScrollButtons);
    updateScrollButtons();
  }, [emblaApi, updateScrollButtons]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const popupVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-20 flex items-center justify-end bg-black/80"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={handleClosePopup}
    >
      <motion.div
        className="relative w-full h-full p-8 space-y-8 overflow-y-auto bg-white shadow-lg lg:w-2/5"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={popupVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="flex items-center space-x-2 text-2xl text-black hover:underline"
          onClick={handleClosePopup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <VscArrowLeft />
          <span className="text-base">{t("popup.goBack")}</span>
        </motion.button>
        <div className="space-y-4">
          <motion.h2
            className="font-serif text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {project.title}
          </motion.h2>
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            {project.screens && project.screens.length > 0 ? (
              <div className="embla" ref={emblaRef}>
                <div className="flex embla__container">
                  {project.screens.map((screen, index) => (
                    <div
                      className="flex-shrink-0 w-full embla__slide"
                      key={index}
                    >
                      <img
                        src={screen}
                        alt={`${project.title} project img ${index + 1}`}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full bg-gray-200 rounded-lg h-96">
                <span className="text-gray-500">{t("popup.noImages")}</span>
              </div>
            )}
            {project.screens && project.screens.length > 1 && (
              <>
                <button
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white bg-black/40 p-2 rounded-full ${
                    !canScrollPrev && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                >
                  <VscChevronLeft size={24} />
                </button>
                <button
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white bg-black/40 p-2 rounded-full ${
                    !canScrollNext && "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                >
                  <VscChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <motion.p
            className="font-sans text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {t(project.descriptionKey)}
          </motion.p>
          <div className="flex flex-wrap">
            {project.programs.map((cat, index) => (
              <div
                key={index}
                className="px-2 py-1 mb-2 mr-2 text-xs border border-black rounded-full w-fit"
              >
                {cat}
              </div>
            ))}
          </div>
          <div className="flex flex-row space-x-4">
            {project.website && (
              <motion.a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center underline text-blue hover:no-underline"
              >
                {t("popup.openWebsite")}
                <VscLink className="ml-1" />
              </motion.a>
            )}
            {project.figma && (
              <motion.a
                href={project.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center underline text-blue hover:no-underline"
              >
                {t("popup.openProject")}
                <VscLink className="ml-1" />
              </motion.a>
            )}
            {project.pdf && (
              <motion.a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center underline text-blue hover:no-underline"
              >
                {t("popup.openPdf")}
                <VscLink className="ml-1" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center underline text-blue hover:no-underline"
              >
                {t("popup.openGithub")}
                <VscLink className="ml-1" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
