"use client";


import { useQuery } from "react-query"
import axios from "axios"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


interface Role {
    id: number;
    user_id: number;
    name: string
  }
  
  // Define the User interface
interface User {
    id: number;
    email: string;
    roles: Role[];
  }

const getUsers= () =>{
    return axios.get("http://127.0.0.1:8000/users/")
}

export default function Users(){
    const {isLoading, error, data, isFetching} = useQuery ("users", getUsers, {
        refetchOnMount:true, refetchInterval: 100
    })
console.log(data)
    if (isLoading)
        return <h1>Loading...</h1>
    
    if(error)
        return <h1>error while fetching</h1>

    return (
        <>
            <div className="card">
            <DataTable value={data?.data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="roles" header="Roles" body={(rowData: User) => rowData.roles.map(role => role.name).join(" ")}></Column>
            </DataTable>
          </div>
        </>
    )
}