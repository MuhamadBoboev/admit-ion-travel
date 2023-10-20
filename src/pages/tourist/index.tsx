import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"

const TouristPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Page tourist'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>This is your second page.</Typography>
            <Typography>
              Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
              Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie
              wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}


export default TouristPage
