import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let toastifyPopUp = (msg, type={},timing ) => {
    const TypeError=type.error?true:false
    if(TypeError){
        toast.error(msg ? msg : '🦄 Wow so easy!',
            {
                position: "bottom-center",
                autoClose: timing ? timing : 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
    }
    else{
        toast.success(msg ? msg : '🦄 Wow so easy!',
            {
                position: "bottom-center",
                autoClose: timing ? timing : 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
    }
}
function Toastify({ timing }) {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={timing ? timing : 3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    )
}
export { Toastify, toastifyPopUp }