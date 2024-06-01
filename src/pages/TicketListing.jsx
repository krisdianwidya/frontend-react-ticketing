
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { classNames } from 'primereact/utils';

export default function TicketListing() {
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null
    });

    const useFetchTickets = () => {
        return useQuery({
            queryKey: ["tickets"],
            queryFn: async () => {
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

    const { isLoading, data, error, refetch } = useFetchTickets();
    if (error) return <h1>Error</h1>;

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Create" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const [ticketDialog, setTicketDialog] = useState(false)

    const openNew = () => {
        setTicket(emptyTicket);
        // setSubmitted(false);
        setTicketDialog(true);
    };

    const hideDialog = () => {
        // setSubmitted(false);
        setTicketDialog(false);
    };

    const saveTicket = () => {
        console.log('save');
    }

    const ticketDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveTicket} />
        </React.Fragment>
    );

    let emptyTicket = {
        id: null,
        title: '',
        description: '',
        status: 'open',
        priority: null,
        created_at: new Date(),
        updated_at: new Date(),
        customer: {
            name: ''
        },
        due_at: new Date(),
        assigned_to: {
            id: null,
            name: "",
            email: ""
        }
    };

    const [ticket, setTicket] = useState(emptyTicket);

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
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

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

            <Dialog visible={ticketDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Create a new ticket" modal className="p-fluid" footer={ticketDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="title" className="font-bold">
                        Title
                    </label>
                    <InputText id="title" value={ticket.title} required autoFocus />

                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={ticket.description} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Priority</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-4">
                            <RadioButton inputId="priority1" name="priority" value="Low" checked={ticket.priority === 'Low'} />
                            <label htmlFor="priority1">Low</label>
                        </div>
                        <div className="field-radiobutton col-4">
                            <RadioButton inputId="priority2" name="priority" value="Medium" checked={ticket.priority === 'Medium'} />
                            <label htmlFor="priority2">Medium</label>
                        </div>
                        <div className="field-radiobutton col-4">
                            <RadioButton inputId="priority3" name="priority" value="High" checked={ticket.priority === 'High'} />
                            <label htmlFor="priority3">High</label>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
