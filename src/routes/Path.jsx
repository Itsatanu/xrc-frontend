import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import ValidRoutes from './ValidRoutes';
import PrivateRoutes from './PrivateRoutes';
import DynamicImport from './DynamicImport'

//import pages
import NumberPrediction from '../pages/NumberPrediction'
import Vip from '../pages/Vip';
import Account from '../pages/Account'
import DepositAndWithdrawal from '../pages/DepositAndWithdrawal'
import TnxHistory from '../pages/TnxHistory';



import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

import Error404 from '../pages/Error404'
import PageLoading from '../asset/pageLoading/PageLoading';



const AdminHome=DynamicImport(()=>import('../admin/AdminHome'))
const FindUser=DynamicImport(()=>import('../admin/FindUser'))
const AllUsers=DynamicImport(()=>import('../admin/AllUsers'))
const AllWithdrawal=DynamicImport(()=>import('../admin/AllWithdrawal'))
const AllDeposit=DynamicImport(()=>import('../admin/AllDeposit'))
const UpdateDeposit=DynamicImport(()=>import('../admin/UpdateDeposit'))
const UpdateWithdrawal=DynamicImport(()=>import('../admin/UpdateWithdrawal'))
const UserAllWithdrawal=DynamicImport(()=>import('../admin/UserAllWithdrawal'))
const UserAllDeposit=DynamicImport(()=>import('../admin/UserAllDeposit'))


function Path() {

    return (
        <Routes>
            <Route path='*' element={<Error404 />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/loading' element={<PageLoading />} />

            <Route path='/' element={<ValidRoutes requiredRoles={['admin','user']} roleComponent={{user:<NumberPrediction/>,admin:<AdminHome/>}}/>}/>

            <Route element={<PrivateRoutes requiredRoles={['user', 'admin']} />}>                
                <Route path='/account' element={<Account />} />
                <Route path='/balance' element={<DepositAndWithdrawal />} />
                <Route path='/number-pridiction' element={<NumberPrediction/>}/>
                <Route path='/vip' element={<Vip/>}/>
                <Route path='/tnx-history' element={<TnxHistory/>}/>
            </Route>

            <Route element={<PrivateRoutes requiredRoles={['admin']} />}>
                <Route path='/admin/user' element={<FindUser/>}/>
                <Route path='/admin/all-user' element={<AllUsers/>}/>
                <Route path='/admin/deposit' element={<AllDeposit/>}/>
                <Route path='/admin/withdrawal' element={<AllWithdrawal/>}/>
                <Route path='/admin/find-user-deposit-history' element={<UserAllDeposit/>}/>
                <Route path='/admin/find-user-withdrawal-history' element={<UserAllWithdrawal/>}/>
                <Route path='/admin/update-deposit' element={<UpdateDeposit/>}/>
                <Route path='/admin/update-withdrawal' element={<UpdateWithdrawal/>}/>
            </Route>
        </Routes>
    )
}
export default Path