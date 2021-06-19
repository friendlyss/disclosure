import { TypedEmitter } from 'tiny-typed-emitter'
import { Type as DisclosureTypes } from '@friendlyss/disclosure'

type DisclosureNames = keyof DisclosureTypes

interface DisclosureEvents {
  open: <N extends DisclosureNames>(name: N, data: any) => void
  close: (name: DisclosureNames) => void
}

class Disclosure extends TypedEmitter<DisclosureEvents> {
  public open<N extends DisclosureNames>(name: N, data?: DisclosureTypes[N]) {
    // @ts-ignore
    this.emit('open', name, {
      name,
      ...(data || {} as any)
    })
  }

  public close(name: DisclosureNames) {
    this.emit('close', name)
  }
}

export default new Disclosure()
