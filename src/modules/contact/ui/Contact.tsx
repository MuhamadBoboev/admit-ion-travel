// import { getFetcher } from "@shared/api/fetcher/getFetcher"
import CustomCard from "@shared/ui/CustomCard"
import { CustomPageHeader } from "@shared/ui/CustomPageHeader"
import { useQuery } from 'react-query'

import { getFetcher } from "@shared/api/fetcher/getFetcher";
import { useState } from "react";
import { ContactTable } from "./ContactTable";

// async function fetchData() {
//   const { data } = await axios.get(
//     'https://api.amar.tj/api/real-estates'
//   );

//   return data.data
// }

function Contact() {
  const [filter, setFilter] = useState('all');

  // const data = useQuery("coins", fetchData);
  // console.log(data)

  const { data, isLoading, isError } = useQuery(
    ['dater', filter,], () => getFetcher('contact/')
  );

  // ['dater', getFetcher('contact/')]
  console.log(data)

  if (isLoading) {
    return <h1>Loading</h1>
  }
  if (isError) {
    return <h1>Ошибка при получение данных</h1>
  }

  return (
    <>
      <CustomCard >
        <CustomPageHeader title={'Продукты'} leftContent={'Left content'} />

        <h1>{data.phone}</h1>
        <ContactTable
          loading={isLoading}
          contacts={data}
        />
      </CustomCard>
    </>
  )
}

export { Contact }
