export type FormItemElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export type FormValues = {
  'first-name': string
  'last-name': string
  days: number
  planned: number
  completed: number
  comment: string
}

export interface NumberOptionsMapping {
  [key: string]: number[]
}
