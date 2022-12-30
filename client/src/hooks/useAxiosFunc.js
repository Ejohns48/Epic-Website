import { useEffect, useState } from "react";

const useAxiosFunc = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try{
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url,{
                ...requestConfig,
                signal: ctrl.signal
            });
            setResponse(res.data);
        }catch {
            console.log(error.message);
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {

        // UseEffect CleanUp Func
        return () => controller && controller.abort();
    }, [controller])

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunc