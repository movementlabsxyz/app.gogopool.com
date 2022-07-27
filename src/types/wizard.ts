export interface WizardData {
  step: number;
  header: string;
  title: string;
  description?: string;
  image: string;
  size: {
    width: number;
    height: number;
  }
}
