import daman_logo from '../daman-logo.png'
import './PageLoading.css'
function PageLoading() {
    return (
        <div className='master-loader'>
            <div className='loader-head'>
                <div className="logo-div">
                    <img src={daman_logo} height={"55px"} alt="" />
                    <div>999</div>
                </div>
            </div>
            <div className='loader-parants'>
                <div className="loader"></div>
            </div>
            <div className='text-loading'>Loading...</div>
        </div>
    )
}


export default PageLoading