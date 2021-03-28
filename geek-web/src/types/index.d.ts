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
export type Group = {
  readonly _id: string
  name: string
  users: Array<User>
}
export type User = {
  readonly _id: string
  name: string
  email: string
  online: boolean
  avatar?: 'string'
}
type Message = {
  user: User
  text: string
}
