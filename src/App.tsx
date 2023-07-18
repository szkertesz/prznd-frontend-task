import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useApi } from './api/clientHook';
import { IPerson } from './api/response.interface';

function App() {
    const [{ data, isLoading, isError }, setUrl] = useApi();
    const [page, setPage] = useState<number>(1);
    const [store, setStore] = useState<IPerson[] | []>([]);
    const baseUrl = import.meta.env.VITE_SWAPI_BASE_URL as string;

    const loadMoreData = () => {
        if (data?.next) {
            setUrl(`${baseUrl}?page=${page + 1}`);
            setPage(page + 1);
        }
    };

    useEffect(() => {
        // use the baseurl only on initial load
        if (page === 1) {
            setUrl(baseUrl);
        }
        // check if store already includes at least one of the items of the new data batch and
        // concat the new data only if it doesn't
        if (data && !store.some(item => item.name === data.results[0].name )) {
          setStore([...store, ...data.results]);
        }
    }, [data]);
    return (
        <>
            <Typography variant='h1' component='h1'>
                Star Wars Character Search
            </Typography>


            {isError && <p>Something went wrong <br/><small>check the console for details</small></p>}

            {isLoading ? (
              <p>Loading ...</p>
              ) : (
                <ul>
                    {store?.map(item => (
                      <li key={item.url}>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => loadMoreData}>Load more</button>
        </>
    );
}

export default App;
