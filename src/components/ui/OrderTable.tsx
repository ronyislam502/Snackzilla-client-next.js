import { TOrder } from "@/types/order";
import { formatDate, orderTime, TimeAgo } from "../utilities/Date";

const OrderTable = ({ order }: { order: TOrder }) => {
  return (
    <tr key={order?._id}>
      <td>
        <p className="font-bold">{TimeAgo(order?.createdAt)}</p>
        <p>{formatDate(order?.createdAt)}</p>
        <p>{orderTime(order?.createdAt)}</p>
      </td>
      <td className="font-bold">{order?.transactionId}</td>
      <td className="font-bold">
        {order?.foods?.map((item: any) => (
          <div className="py-2 text-left" key={item?.food?._id}>
            <div className="flex gap-6">
              <div className="avatar">
                <div className="w-15 rounded-full">
                  <img src={item?.food?.image} />
                </div>
              </div>
              <div>
                <p>{item?.food?.name}</p>
                <p>Quantity:{item?.quantity}</p>
                <p>Price:$ {item?.food?.price}</p>
              </div>
            </div>
          </div>
        ))}
      </td>
      <td>{order?.status}</td>
    </tr>
  );
};

export default OrderTable;
