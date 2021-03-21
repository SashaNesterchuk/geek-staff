export interface Tag {
  name: string
}
export interface Catalog {
  readonly _id: string
  name: string
  description: sting
  link: string
  tags?: Tag[]
}
