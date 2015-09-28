export interface Variable {
  name: string
}

export function variable(name: string): Variable {
  return {
    name: name
  }
}
