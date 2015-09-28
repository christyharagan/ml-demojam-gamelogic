export function service(serviceName:string) {
  return function <S>(target: S) {
    return target
  }
}
