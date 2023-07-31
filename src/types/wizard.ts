import { StaticImageData } from 'next/image'

export interface WizardData {
  step: number
  header: string
  title: string
  description?: string
  image: StaticImageData
  size: {
    width: number
    height: number
  }
}
