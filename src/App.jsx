import Pathfinding from "./pathfinding/index";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./pathfinding/lang/en.json";
import it from "./pathfinding/lang/it.json";

let lang = navigator.language;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  lng: lang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  return <Pathfinding />;
}

export default App;
