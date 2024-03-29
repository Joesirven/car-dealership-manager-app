import { useEffect, useState } from "react";
import { FetchWrapper } from "./fetch-wrapper";

function ServiceHistory() {
    const [allAppointments, setAllAppointments] = useState([])
    const [refreshKey, setRefreshKey] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')

    const ServiceAPI = new FetchWrapper('http://localhost:8080/')

    const fetchData = async () => {
        const appointmentsData = await ServiceAPI.get('api/appointments/')
        setAllAppointments(appointmentsData.appointments)
    }

    useEffect(() => {
        fetchData()
    }, [refreshKey])

    const handleSearchTermChange = (event) => {
        const value = event.target.value
        setSearchTerm(value)
    }

    return (
    <>

    <h1>Service History</h1>
    <div>
        <input value={searchTerm} onChange={handleSearchTermChange} ></input><button>Search</button>
    </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Is VIP?</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {allAppointments.filter(appointment => appointment.vin.slice(0,searchTerm.length) === searchTerm ).map(appointment => {
                    return (
                        <tr key={ appointment.id }>
                            <td>{ appointment.vin }</td>
                            <td>No</td>
                            <td>{ appointment.customer }</td>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.date_time }</td>
                            <td>{ appointment.technician.first_name +
                            ' ' +
                            appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>{ appointment.status }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );
}

export default ServiceHistory
