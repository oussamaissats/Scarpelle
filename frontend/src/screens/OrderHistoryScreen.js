import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
   
   const orderMineList = useSelector(state => state.orderMineList);
   const {loading , error,orders} = orderMineList;
   const dispatch = useDispatch();
   useEffect(()=> {
dispatch (listOrderMine()); 

   }, [dispatch])
    return (
        <div>
            <h1>Historique</h1>
            {loading?  <LoadingBox></LoadingBox>:
            error?<MessageBox variant="danger">{error}</MessageBox>
            : 
            (

                <table className="table">
<thead>
<tr>

<th>ID</th>
<th>date</th>
<th>totale</th>
<th>payé</th>
<th>delivré</th>
<th>actions</th>
</tr>
</thead>

<tbody>
{orders.map((order) =>(
<tr key= {order._id}>
   <td>{order._id}</td>
   <td>{order.createdAt.subString(0,10)}</td>
   <td>{order.totalPrice}</td>
   <td>{order.isPaid? order.paidAt.subString(0,10): 'Non'}</td>
   <td>{order.isDelivered? order.deliveredAt.subString(0,10): 'Non'}</td>
   <td><button type="button" className="small"
   onClick={()=> {props.history.push(`/order/${order._id}`)}}>
       Detailles
       </button>
       </td>
    </tr>


))}

</tbody>




</table>
            )
            
            }
        </div>
    )
}
