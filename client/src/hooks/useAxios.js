import { useEffect, useState } from "react";

const useAxios = (configObj) => {
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try{
                const res = await axiosInstance[method.toLowerCase()](url,{
                    ...requestConfig,
                    signal: controller.signal
                });
                setResponse(res.data);
            }catch {
                console.log(error.message);
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchData();

        // UseEffect CleanUp Func
        return () => controller.abort();
    }, [])

    return [response, error, loading];
}

export default useAxios