import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "it" ? "en" : "it";
    i18n.changeLanguage(newLanguage);
  };

  const isItalian = i18n.language === "it";

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center justify-center"
      whileHover={{ scale: 1.2 }}
      title={isItalian ? "Switch to English" : "Cambia in Italiano"}
    >
      <span className="text-2xl">{isItalian ? "🇮🇹" : "🇬🇧"}</span>
    </motion.button>
  );
};

export default LanguageSelector;
