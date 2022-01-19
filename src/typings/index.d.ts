export type AccountMode = 'default' | 'reset' | 'init'

export type RendererMode = 'pending' | 'default' | 'reset' | 'init'

export interface Item {
  id: string
  title: string
  about: string | null
  value: string
  createdAt: number
  updatedAt: number | null
}

export interface ItemValueNode {
  name: string
  value: string
}

export interface EditableItemVariables {
  title: string
  about?: string
  value: ItemValueNode[]
}

export interface UpdateItemPayload {
  id: string
  variables: EditableItemVariables
}
