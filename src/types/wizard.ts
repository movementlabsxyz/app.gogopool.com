export type WizardStep = 1 | 2 | 3 | 4;

export interface WizardData {
  step: WizardStep;
  header: string;
  title: string;
  description?: string;
  image: string;
}
