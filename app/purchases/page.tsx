/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Purchases({userId} : {userId: string}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [purchases, setPurchases] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPurchases(){
            const res = await axios.get(`/api/purchase/user/${userId}`);
            setPurchases(res.data.purchases)
        }
        fetchPurchases();
    },[userId])


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Purchases</h1>
            {purchases.length === 0 && <p> No courses purchased yet..</p>}
            {purchases.map((p: any) => (
                <div key={p._id} className="p-4 border rounded mb-2">
                    <h2 className="text-lg font-semibold">{p.courseId.title}</h2>
                    <Link href={`/purchases/${p.courseId._id}`}>
                    <button className="bg-green-600 text-white  px-3 py-1 rounded mt-2">
                        View Course</button></Link>
                </div>
            ))}
        </div>
    )

}