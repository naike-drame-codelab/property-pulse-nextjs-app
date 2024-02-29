"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";

const SearchResultsPage = () => {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(
                    `/api/search?location=${location}&propertyType=${propertyType}`
                );

                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data);
                } else {
                    setProperties([]);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [location, propertyType]);

    return loading ? (
        <Spinner loading={loading} />
    ) : (
        <section className="px-4 py-6">
            <div className="px-4 py-6 m-auto container-xl lg:container">
                <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-">
                    <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
                    </Link>
                <h1 className="mb-4 text-2xl">Search Results</h1>
                {properties.length === 0 ? (
                    <p>No search results found</p>
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
            </div>
        </section>
    );
};

export default SearchResultsPage;
 mb-