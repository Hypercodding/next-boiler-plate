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
            command: () => { router.push('/'); }
        },
        {
            label: 'Add User',
            icon: 'pi pi-user-plus',
            command: () => { router.push('/createUser'); }
        },
        {
            label: 'Assign Role',
            icon: 'pi pi-plus',
            command: () => { router.push('/createRole'); }
        }
    ];

    return (
        <div>
            <MegaMenu model={items} orientation="horizontal" className=' justify-content-center' />
        </div>
    );
};

export default MegaMenuComponent;
