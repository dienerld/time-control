export interface Client {
  id: string
  userId: string
  name: string
  cnpj?: string
  email?: string
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateClientDTO {
  name: string
  cnpj: string
  address?: string
  phone?: string
  email?: string
  contactName?: string
  description?: string
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {}
