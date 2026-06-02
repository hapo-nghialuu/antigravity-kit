import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { AgentGrid, PlatformMatrix, SkillConstellation } from './catalog-visuals';
import { CoreWorkflowMap, WorkflowProofStack, WorkflowStateRail } from './core-workflow-visual';
import { proseComponents } from './mdx-prose-components';
import { SkillDetailPage } from './skill-detail-page';
import { MainSkillIndex, SupportSkillCatalog } from './skill-overview';
import { SddArtifactMap, SddCompareVisual, SddHeroVisual, SddLoopVisual } from './sdd-overview-visuals';
import { SpecArtifactGrid, SpecLifecycleMap, SpecReadinessGrid } from './spec-lifecycle-visuals';
import { CommandFlow, DocsHero, QualityGate, RuntimeBundle } from './workflow-visuals';
import { TutorialGuide } from './tutorial-guide';

export const MDXComponents = {
  ...proseComponents,
  Tabs,
  TabsList,
  TabsTrigger: TabsTab,
  TabsPanel,
  DocsHero,
  CommandFlow,
  CoreWorkflowMap,
  WorkflowProofStack,
  WorkflowStateRail,
  SddHeroVisual,
  SddArtifactMap,
  SddLoopVisual,
  SddCompareVisual,
  SpecLifecycleMap,
  SpecArtifactGrid,
  SpecReadinessGrid,
  MainSkillIndex,
  SupportSkillCatalog,
  SkillDetailPage,
  RuntimeBundle,
  QualityGate,
  SkillConstellation,
  AgentGrid,
  PlatformMatrix,
  TutorialGuide,
};
