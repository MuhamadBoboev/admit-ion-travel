import { Button, CardHeader, Grid } from "@mui/material"
import { ReactNode } from "react"

interface Props {
  withButton?: boolean
  title: ReactNode | string
  buttonName?: string
  rightContent?: ReactNode
  leftContent: ReactNode
  handleOpen?: () => void
}

function CustomPageHeader({
  buttonName,
  title,
  rightContent,
  leftContent,
  withButton = true,
  handleOpen,
}: Props) {
  return (
    <Grid container alignItems={"center"} justifyContent={'space-between'} >
      <Grid item>
        <CardHeader title={title} />
        {leftContent}
      </Grid>
      <Grid item >
        {withButton && <Button
          variant="contained"
          sx={{ marginRight: 5 }}
          onClick={handleOpen}
        >
          {buttonName || 'Добавить'}
        </Button>}
        {rightContent}
      </Grid>
    </Grid>
  )
}

export { CustomPageHeader }
