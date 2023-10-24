import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { IContacts } from "./IContacts";
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  handleUpdateOpen(data: IContacts): void
}


export function contactColumns({ handleUpdateOpen }: Props): GridColDef<IContacts>[] {
  return [
    { field: 'name', headerName: 'Название', flex: 1 },

    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key={'asd'}
          title='Изменить'
          label='Изменить'
          icon={<EditIcon sx={{ fontSize: 24 }} />}
          onClick={() => {
            handleUpdateOpen(row)
          }}
        />
      ]
    },

  ]
}
