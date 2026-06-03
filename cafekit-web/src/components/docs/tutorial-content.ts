import type { Locale } from "@/lib/locale-utils";
import type { TutorialContent } from "./tutorial-types";
import { tutorialContentEn } from "./tutorial-content.en";
import { tutorialContentVi } from "./tutorial-content.vi";
import { tutorialContentJa } from "./tutorial-content.ja";

const content: Record<Locale, TutorialContent> = {
  en: tutorialContentEn,
  vi: tutorialContentVi,
  ja: tutorialContentJa,
};

export function getTutorialContent(locale: Locale): TutorialContent {
  return content[locale] ?? content.en;
}
