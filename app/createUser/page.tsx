"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from 'react-query';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string
}

const useAddUser = () => {
  return useMutation(async (user: User) => {
    const response = await axios.post('http://127.0.0.1:8000/users/', user);
    return response.data;
  });
};

export default function CreateUser () {
  const addUser = useAddUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
     email: '',
     password: '' 
    },
    onSubmit: (values) =>{
      addUser.mutate(values);
      router.push('/users');
      console.log(values)
    }
  })
  return (
    <div className="flex justify-content-center align-items-center mt-6">
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="p-field p-mb-3">
          <FloatLabel>
            <InputText
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`w-20rem ${formik.touched.email && formik.errors.email ? 'p-invalid' : ''}`}
            />
            <label>Email</label>
          </FloatLabel>
          {formik.touched.email && formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
        </div>
        <div className="p-field p-mb-3 mt-3">
          <FloatLabel>
            <InputText
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className={formik.touched.password && formik.errors.password ? 'p-invalid' : ''}
            />
            <label>Password</label>
          </FloatLabel>
        </div>
        <Button type="submit" label="Add User" className="mt-4" />
      </form>
    </div>
  )
}
