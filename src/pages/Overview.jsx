import React from 'react';
import { Card } from 'primereact/card';
import ChartData from '../components/ChartData';
import ListData from '../components/ListData';

const Overview = () => {
    const title = (<span className="text-lg text-400">Unresolved</span>)
    return (
        <React.Fragment>
            <div className="grid mt-5">

                <div className="col-3">
                    <div className="card text-center w-full">
                        <Card title={title}>
                            <span className="font-semibold text-3xl text-900">60</span>
                        </Card>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center w-full">
                        <Card title={title}>
                            <span className="font-semibold text-3xl text-900">60</span>
                        </Card>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center w-full">
                        <Card title={title}>
                            <span className="font-semibold text-3xl text-900">60</span>
                        </Card>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center w-full">
                        <Card title={title}>
                            <span className="font-semibold text-3xl text-900">60</span>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="grid nested-gris mt-2">
                <div className="col-12">
                    <div className="card w-full">
                        <Card >
                            <div className="grid">

                                <div className="col-8">

                                    <ChartData />
                                </div>
                                <div className="col-4 flex flex flex-column text-center border-left-2 border-gray-200">
                                    <div className="border-bottom-2 border-gray-200 h-full flex flex-column justify-content-center">
                                        <span className="text-base text-400 block mb-2">Resolve</span>
                                        <span className="font-semibold text-2xl text-900 block">60</span>
                                    </div>
                                    <div className="border-bottom-2 border-gray-200 h-full flex flex-column justify-content-center">
                                        <span className="text-base text-400 block mb-2">Resolve</span>
                                        <span className="font-semibold text-2xl text-900 block">60</span>
                                    </div>
                                    <div className="border-bottom-2 border-gray-200 h-full flex flex-column justify-content-center">
                                        <span className="text-base text-400 block mb-2">Resolve</span>
                                        <span className="font-semibold text-2xl text-900 block">60</span>
                                    </div>
                                    <div className="border-bottom-2 border-gray-200 h-full flex flex-column justify-content-center">
                                        <span className="text-base text-400 block mb-2">Resolve</span>
                                        <span className="font-semibold text-2xl text-900 block">60</span>
                                    </div>
                                    <div className="h-full flex flex-column justify-content-center">
                                        <span className="text-base text-400 block mb-2">Resolve</span>
                                        <span className="font-semibold text-2xl text-900 block">60</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

            <div className="grid mt-2">
                <div className="col-6">
                    <ListData title={"Unresolved Tickets"} />
                </div>
                <div className="col-6">
                    <ListData title={"Tasks"} />
                </div>
            </div>
        </React.Fragment>
    )
}
export default Overview