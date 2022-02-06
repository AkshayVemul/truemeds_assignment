import { useCallback, useState } from "react"

const useAysnc = () => {

    const [state, setState] = useState({
        isLoading: false,
        isError: false,
        data: {},
    });

    const run = useCallback((promise) => {

        setState({
            isLoading: true,
            isError: false,
            data: {}
        })

        promise.then((res) => {

            setState({
                isLoading: false,
                isError: false,
                data: res
            })

            console.log(res);

        }).catch(function (err) {

            console.log(err);

            setState({
                isLoading: false,
                isError: true,
                data: {}
            })
        })

    }, []);

    return { state, run };

}

export { useAysnc }