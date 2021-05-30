export enum Slack {
  DIRECT = 'DIRECT',
  CHANNEL = 'CHANNEL'
}
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
  type: Slack
  users: Array<User>
}
export type User = {
  readonly _id: string
  name: string
  email: string
  avatar?: 'string'
}
export type Message = {
  readonly _id: string
  user: string
  group: Group
  created: Date
  message: string
}
