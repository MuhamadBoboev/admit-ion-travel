import { IContacts } from "./IContacts"
import { create} from 'zustand'


type State = {
  open: boolean
  update: IContacts | null
}

type Action = {
  handleCreateOpen(): void
  handleCreateClose(): void
  handleUpdateOpen(data: State['update']): void
  handleUpdateClose(): void
}

export const useContactStore = create<State & Action>((set) => ({
  open: false,
  update: null,
  handleCreateOpen() {
    set(()=>({open: true}))
  },
  handleCreateClose() {
    set(()=>({open: true}))
  },
  handleUpdateOpen(data) {
    set(()=> ({update: data}))
  },
  handleUpdateClose() {
    set(() => ({update: null}))
  },
}))
