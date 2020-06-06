export interface Item {
  id: number,
  title: string,
  image_url: string,
}

export interface IBGEUFResponse {
  id: number,
  sigla: string,
}

export interface IBGECityResponse {
  id: number,
  nome: string,
}

export interface UF {
  id: number,
  initial: string,
}

export interface City {
  id: number,
  name: string,
}

export interface FormData {
  name: String,
  email: String,
  whatsapp: String,
}