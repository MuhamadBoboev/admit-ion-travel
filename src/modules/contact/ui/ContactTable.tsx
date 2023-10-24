import { LinearProgress } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { IContacts } from "../model/IContacts"
import { contactColumns } from "../model/contactColumns"
import { useContactStore } from "../model/store"

interface Props {
  loading: boolean
  contacts: IContacts[]
}
function ContactTable({ loading, contacts }: Props) {
  const [handleUpdateOpen] = useContactStore(({ handleUpdateOpen }) => [handleUpdateOpen])

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      hideFooter
      loading={loading}
      columns={contactColumns({ handleUpdateOpen })}
      rows={contacts}
      rowSelection={false}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}
export { ContactTable }
