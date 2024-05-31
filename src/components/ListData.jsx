
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';

const dataLists = [
    {
        title: "Waiting on Feature Request",
        total: 100
    },
    {
        title: "Awaiting Customer Response",
        total: 80
    },
    {
        title: "Awaiting Developer Fix",
        total: 50
    },
    {
        title: "Pending",
        total: 200
    }
]

export default function ListData({ title }) {
    const listTemplate = (items) => {
        let renderedItems = items.map((item, index) => {
            return (
                <div className={classNames('flex justify-content-between align-content-center py-3 px-5', { 'border-top-1 surface-border': index !== 0 })} key={index}>
                    <span className='block'>{item.title}</span>
                    <span className='block'>{item.total}</span>
                </div>
            );
        });
        return <div className="block">{renderedItems}</div>;
    };

    return (
        <div className="card border-round-lg border-1 surface-border">
            <h2 className='text-500 text-xl px-5 py-2'>{title}</h2>
            <DataView value={dataLists} listTemplate={listTemplate} />
        </div>
    )
}
