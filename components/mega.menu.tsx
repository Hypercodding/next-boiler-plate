// components/MegaMenu.tsx
"use client";

import { MegaMenu } from 'primereact/megamenu';
import { MenuItem } from 'primereact/menuitem';
import { useRouter } from 'next/navigation';

const MegaMenuComponent = () => {
    const router = useRouter();

    const items: MenuItem[] = [
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            command: () => { router.push('/users'); }
        },
        {
            label: 'Add User',
            icon: 'pi pi-user-plus',
            command: () => { router.push('/users/createUser'); }
        },
        {
            label: 'Assign Role',
            icon: 'pi pi-plus',
            command: () => { router.push('/users/createRole'); }
        }
    ];

    return (
        <div>
            <MegaMenu model={items} orientation="horizontal" className=' justify-content-center' />
        </div>
    );
};

export default MegaMenuComponent;
