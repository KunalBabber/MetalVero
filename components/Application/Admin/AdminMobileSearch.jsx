import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import SearchModel from './SearchModel';
const AdminMobileSearch = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button type="button" size="icon" onClick={() => setOpen(true)} className="md:hidden h-8 w-8 sm:h-9 sm:w-9 shrink-0 flex" variant="ghost">
                <IoIosSearch className="!size-4 sm:!size-5" />
            </Button>
            <SearchModel open={open} setOpen={setOpen} />
        </>
    )
}

export default AdminMobileSearch
