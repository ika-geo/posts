import {toast} from "react-toastify";


export default function handleBackEndError (e) {
    if (e){
        return toast.error(e.response.data.message)
    }
    return toast.error('Some error, please try again later')
}