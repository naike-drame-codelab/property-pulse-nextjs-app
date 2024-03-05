"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components//Spinner";
import Pagination from "@/components/Pagination";

const Properties = () => {
    const [properties, setProperties] = useState([]); // Array of properties
    const [loading, setLoading] = useState(true); // Loading state
    const [page, setPage] = useState(1); // Current page
    const [pageSize, setPageSize] = useState(6); // Number of properties per page.
    const [totalItems, setTotalItems] = useState(0); // Total number of properties in the database.

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(
                    `/api/properties?page=${page}&pageSize=${pageSize}`
                );

                if (!res.ok) {
                    throw new Error("Error fetching properties");
                } else {
                    const data = await res.json();
                    setProperties(data.properties); // data.properties is the array of properties, returned from the server
                    setTotalItems(data.total); // data.total is the total number of properties, returned from the server
                }
            } catch (error) {
                console.log("Error fetching properties: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return loading ? (
        <Spinner loading={loading} />
    ) : (
        <section className="px-4 py-6">
            <div className="px-4 py-6 m-auto container-xl lg:container">
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))}
                    </div>
                )}
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
};

export default Properties;
