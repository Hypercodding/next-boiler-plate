"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useMutation, useQuery } from 'react-query';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from "next/navigation";

interface Role {
    name: string;
    userId: string;
}

interface User {
    email: string;
    id: number;
}

const getUsers = async () => {
    const response = await axios.get("http://127.0.0.1:8000/users/");
    return response.data;
}

const useAddRole = () => {
    return useMutation(async (role: Role) => {
        const response = await axios.post(`http://127.0.0.1:8000/roles/${role.userId}`, role);
        return response.data;
    });
};

export default function CreateRole() {
    const { data } = useQuery('users', getUsers);
    const router = useRouter();

    const userOptions = Array.isArray(data) ? data.map((user: User) => ({
        label: user.email,
        value: user.id
    })) : [];

    const roleOptions = [
        { label: 'Edit', value: 'Edit' },
        { label: 'Update', value: 'Update' },
        { label: 'Delete', value: 'Delete' },
    ];

    const addRole = useAddRole();

    const formik = useFormik({
        initialValues: {
            name: '',
            userId: ''
        },

        onSubmit: async (values) => {
            try {
                await addRole.mutateAsync(values); 
                router.push('/users');
                console.log(values);
            } catch (error) {
                console.error("Failed to add role:", error);
            }
        }
    });

    return (
        <div className="flex justify-content-center align-items-center mt-4">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="p-field p-mb-3 mt-4 w-20rem">
                    <FloatLabel>
                        <Dropdown
                            id="name"
                            options={roleOptions}
                            optionLabel="label"
                            optionValue="value"
                            onChange={(e) => formik.setFieldValue('name', e.value)}
                            value={formik.values.name}
                            placeholder="Select a Role"
                        />
                        <label htmlFor="role">Role</label>
                    </FloatLabel>
                </div>
                <div className="p-field p-mb-3 mt-4">
                    <FloatLabel>
                        <Dropdown
                            id="userId"
                            options={userOptions}
                            optionLabel="label"
                            optionValue="value"
                            onChange={(e) => formik.setFieldValue('userId', e.value)}
                            value={formik.values.userId}
                            placeholder="Select a User"
                        />
                        <label htmlFor="userId">User ID</label>
                    </FloatLabel>
                </div>
                <Button type="submit" label="Add Role" className="mt-4" />
            </form>
        </div>
    );
}
