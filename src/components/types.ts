export interface DataFile {
  type: string
  name: string
  added?: string
  files?: DataFile[]
}
