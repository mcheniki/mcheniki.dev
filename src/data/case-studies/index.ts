import type { CaseStudyRouteId } from '../../i18n/routes';
import { ecoKwaCaseStudy } from './ecokwa';
import { restMoneyCaseStudy } from './restmoney';
import type { CaseStudy } from './types';

/** One entry per case study route id, keyed by that id. */
export const caseStudies = {
	ecokwa: ecoKwaCaseStudy,
	restmoney: restMoneyCaseStudy,
} satisfies { [Id in CaseStudyRouteId]: CaseStudy & { route: Id } };
