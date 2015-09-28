import * as m from './model'
import * as s from 'typescript-schema'

function stringifyReplacer(key: string, value: any): any {
  if (key === 'service') {
    return undefined
  } else if (key === 'name' && !value.events) {
    return undefined
  } else if (key === 'type') {
    // TODO
    return undefined
  } else {
    return value
  }
}

export function stringify(service: m.Services<any>): string {
  return JSON.stringify(service, stringifyReplacer, '  ')
}

export function parse(serviceString: string): m.Services<any> {
  let services = <m.Services<any>>JSON.parse(serviceString)

  Object.keys(services).forEach(function(name) {
    let service = services[name]
    service.name = name

    if (service.methods) {
      Object.keys(service.methods).forEach(function(name) {
        let method = service.methods[name]
        method.name = name
        method.service = service

        if (method.type) {
          // TODO
        }
      })
    } else {
      service.methods = {}
    }
    if (service.events) {
      Object.keys(service.events).forEach(function(name) {
        let event = service.events[name]
        event.name = name
        event.service = service

        if (event.type) {
          // TODO
        }
      })
    } else {
      service.events = {}
    }

    if (service.type) {
      // TODO
    }
  })

  return services
}
