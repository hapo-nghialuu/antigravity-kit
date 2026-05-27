import { Locale } from '@/lib/locale-utils';
import { skillDetailsEn } from './skill-detail-content-en';
import { skillDetailsJa } from './skill-detail-content-ja';
import { skillDetailsVi } from './skill-detail-content-vi';
import { MainSkillSlug, mainSkillSlugs, SkillDetail, SkillDetailMap } from './skill-detail-types';

const detailsByLocale: Record<Locale, SkillDetailMap> = {
  en: skillDetailsEn,
  vi: skillDetailsVi,
  ja: skillDetailsJa,
};

export function getSkillDetail(locale: Locale, skill: MainSkillSlug): SkillDetail {
  return detailsByLocale[locale][skill] ?? skillDetailsEn[skill];
}

export function getSkillDetails(locale: Locale): Array<[MainSkillSlug, SkillDetail]> {
  return mainSkillSlugs.map((slug) => [slug, getSkillDetail(locale, slug)]);
}

export { mainSkillSlugs };
export type { MainSkillSlug };
