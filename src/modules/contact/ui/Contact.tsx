import CustomCard from "@shared/ui/CustomCard"
import { CustomPageHeader } from "@shared/ui/CustomPageHeader"
import { useQuery } from '@tanstack/react-query'

function Contact() {

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_SERVER_URL)
  })
  return (
    <>
      <CustomCard >
        <CustomPageHeader title={'Продукты'} leftContent={'Left content'} />

      </CustomCard>
    </>
  )
}

export { Contact }
