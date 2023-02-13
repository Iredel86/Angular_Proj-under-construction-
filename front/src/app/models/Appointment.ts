import ICustomer from "./Customer";
import ITreatment from "./Treatment";



export default interface IAppointment {
    id?: number
    customer: ICustomer
    treatment: ITreatment
    date: string
    time: string
    status: string
}