import { useEffect, useState } from 'react'
import Disclosure from './Disclosure'
import { Type as DisclosureTypes } from '@friendlyss/disclosure/types'

type DisclosureNames = keyof DisclosureTypes

export function useDisclosure<N extends DisclosureNames>(name: N) {
  const [isOpen, setOpen] = useState(false)
  const [data, setData] = useState<Partial<DisclosureTypes[N]>>({})

  useEffect(() => {
    Disclosure.on('open', onOpenCallback as any)
    Disclosure.on('close', onCloseCallback as any)

    return () => {
      Disclosure.off('open', onOpenCallback as any)
      Disclosure.off('close', onCloseCallback as any)
    }
  }, [])

  const onOpenCallback = (nameDispatch: N, data: DisclosureTypes[N]) => {
    if (name === nameDispatch) {
      setOpen(true)
      setData(() => data)
    }
  }

  const onCloseCallback = (nameDispatch: N) => {
    if (name === nameDispatch) {
      setOpen(false)
    }
  }

  const onClose = () => {
    Disclosure.close(name)
  }

  const onOpen = (data: DisclosureTypes[N]) => {
    Disclosure.open(name, data)
  }

  return {
    isOpen,
    data,
    onOpen,
    onClose
  }
}
