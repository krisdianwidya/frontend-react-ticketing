
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

const useFetchProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:3001/support-tickets");
            return data;
        },
    });
};

export default function TicketListing() {
    const { isLoading, data, error } = useFetchProducts();
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

    return (
        <div className="card mt-5">
            <DataTable value={data} paginator header={header} rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id" >
                <Column field="title" header="Ticket details" sortable style={{ minWidth: '14rem' }} />
                <Column header="Customer Name" sortable sortField="customer.name"
                    style={{ minWidth: '14rem' }} body={customerNameTemplate} />
                <Column field="created_at" header="Date" sortable dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} />
                <Column field="priority" header="Priority" sortable style={{ minWidth: '12rem' }} body={priorityBodyTemplate} />
                <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
}
