import React, { useEffect, useState } from "react";
import { Search, ScanText, ScreenShare, ArrowUpFromLine } from "lucide-react";

const MainDisplay = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch("/data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((jsonData) => {
                setTableData(jsonData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        // <div className="p-4 bg-gray-50">
        <div className='flex flex-col p-4 bg-gray-50 sm:p-6 lg:p-8'>
            <div className='border-b-2 pb-8'>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
                    {/* Left Section Top */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 lg:w-2/3">
                        <h3 className="text-xl font-bold text-gray-700">Test Cases</h3>

                        {/* Search Input  */}
                        <div className="flex items-center bg-white border justify-evenly gap-2 rounded-lg p-2 mt-2 w-full lg:w-80">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border-none outline-none w-full h-4 text-lg p-1"
                            />
                            <ScanText />
                        </div>

                        {/* Icons  Mid */}
                        <div className="flex flex-row mt-2 lg:mt-0 items-center justify-start gap-3">
                            <div className="border border-gray-300 rounded-lg p-2 bg-white flex justify-center items-center">
                                <ArrowUpFromLine className='h-4' />
                            </div>
                            <div className="border border-gray-300 rounded-lg p-2 bg-white flex justify-center items-center">
                                <ScreenShare className='h-4' />
                            </div>
                        </div>
                    </div>

                    {/* Right Section Button */}
                    <div className='flex flex-col sm:flex-row gap-3 mr-4'>
                        <button type='submit' className='bg-white text-gray-600  p-2 font-normal cursor-pointer text-sm rounded-lg'>
                            Generate Test Cases
                        </button>
                        <button type='submit' className='bg-purple-700 text-white p-2 font-normal cursor-pointer text-sm rounded-lg'>
                            Create Test Cases
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-8 shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" className="rounded" />
                            </th>
                            <th className="p-3">ID</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Priority</th>
                            <th className="p-3">Result</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Owner</th>
                            <th className="p-3">Automation Status</th>
                            <th className="p-3">Tags</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">
                                    <input type="checkbox" className="rounded" />
                                </td>
                                <td className="p-3 font-medium text-blue-600">{item.id}</td>
                                <td className="p-3 truncate max-w-[150px]">{item.title}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded">
                                        {item.priority}
                                    </span>
                                </td>
                                <td className="p-3">{item.result}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-3">{item.owner}</td>
                                <td className="p-3">
                                    <span className="px-2 py-1 text-xs bg-gray-200 rounded">
                                        {item.automationStatus}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {(Array.isArray(item.tags) ? item.tags : []).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded mr-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </td>
                                <td className="p-3 text-gray-400">⋮</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination contrrol */}
                <div className="flex justify-between items-center p-4 border-t">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-gray-600 border rounded-lg"
                    >
                        ← Previous
                    </button>
                    <div className="flex gap-2">
                        {[...Array(Math.ceil(tableData.length / itemsPerPage))].map((_, idx) => (
                            <button
                                key={idx + 1}
                                onClick={() => paginate(idx + 1)}
                                className={`px-3 py-1 text-xs ${currentPage === idx + 1 ? 'bg-gray-800 text-white' : 'text-gray-600'} border rounded-lg`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)}
                        className="px-3 py-1 text-gray-600 border rounded-lg"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>


        // </div>
    );
}

export default MainDisplay;