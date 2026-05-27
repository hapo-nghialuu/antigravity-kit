import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs';
import { AgentGrid, PlatformMatrix, SkillConstellation } from './catalog-visuals';
import { CoreWorkflowMap, WorkflowProofStack, WorkflowStateRail } from './core-workflow-visual';
import { proseComponents } from './mdx-prose-components';
import { SkillDetailPage } from './skill-detail-page';
import { MainSkillIndex, SupportSkillCatalog } from './skill-overview';
import { CommandFlow, DocsHero, QualityGate, RuntimeBundle } from './workflow-visuals';

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
  MainSkillIndex,
  SupportSkillCatalog,
  SkillDetailPage,
  RuntimeBundle,
  QualityGate,
  SkillConstellation,
  AgentGrid,
  PlatformMatrix,
};
