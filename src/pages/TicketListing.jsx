
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';



export default function TicketListing() {
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null
    });

    const useFetchProducts = () => {
        return useQuery({
            queryKey: ["tickets"],
            queryFn: async () => {
                // console.log('log fetch', lazyState);
                const { data, headers } = await axios.get(`${import.meta.env.VITE_BASE_URL}support-tickets?page=${lazyState.page + 1}&limit=${lazyState.rows}&sort=${lazyState.sortField}&order=${lazyState.sortOrder === 1 ? 'asc' : 'desc'}`);
                return {
                    tickets: data,
                    ticketsCount: headers['x-total-count']
                };
            },
            initialData: {
                tickets: [],
                ticketsCount: 0
            },
            refetchOnMount: false,
            refetchOnWindowFocus: false
        });
    };

    const { isLoading, data, error, refetch } = useFetchProducts();
    if (isLoading) return <h1>Loading</h1>;
    if (error) return <h1>Error</h1>;

    const header = (<h4 className="m-0">All Tickets</h4>);

    const customerNameTemplate = (rowData) => {
        const customer = rowData.customer;

        return (
            <div className="flex align-items-center gap-2">
                <img alt={customer.name} src={customer.avatar} width="32" className="border-circle" />
                <span>{customer.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData) => {
        const date = new Date(rowData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const time = new Date(rowData.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        return (
            <div className="flex flex-column">
                <span>{date}</span>
                <span className="text-300">{time}</span>
            </div>
        )
    };

    const getPrioritySeverity = (priority) => {
        switch (priority) {
            case 'high':
                return 'danger';

            case 'medium':
                return 'warning';

            case 'low':
                return 'success';
        }
    };

    const priorityBodyTemplate = (rowData) => {
        return <Tag value={rowData.priority} severity={getPrioritySeverity(rowData.priority)} rounded />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag unstyled value={rowData.status} severity={rowData.status} rounded
            pt={{
                root: ({ props }) => ({
                    className: classNames(
                        'p-tag p-component p-tag-rounded',
                        {
                            'bg-gray-50 border-1 border-black-alpha-80 text-black-alpha-80': props.severity === 'open',
                            'bg-green-500': props.severity === 'approved',
                            'bg-red-500': props.severity === 'rejected',
                            'bg-blue-500': props.severity === 'in progress',
                            'bg-blue-800': props.severity === 'closed',
                        })
                })
            }} />;
    };

    const onPage = (event) => {
        setlazyState(event)
    };

    const onSort = (event) => {
        console.log('event', event);
        setlazyState(event)
    };

    useEffect(() => {
        refetch();
    }, [lazyState]);

    return (
        <div className="card mt-5">
            <DataTable
                value={data.tickets}
                lazy
                loading={isLoading}
                paginator
                header={header}
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                dataKey="id"
                first={lazyState.first}
                totalRecords={data.ticketsCount}
                onPage={onPage}
                onSort={onSort}
                sortField={lazyState.sortField}
                sortOrder={lazyState.sortOrder}
            >
                <Column field="title" header="Ticket details" sortable style={{ minWidth: '14rem' }} />
                <Column field="customer.name" header="Customer Name" style={{ minWidth: '14rem' }} body={customerNameTemplate} />
                <Column field="created_at" header="Date" sortable dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} />
                <Column field="priority" header="Priority" sortable style={{ minWidth: '12rem' }} body={priorityBodyTemplate} />
                <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
}
