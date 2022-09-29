import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function AccountList() {
    const [accountData, setAccountData] = useState([]);
    const [loading, setLoading] = useState(true);
    // fetch accounts
    useEffect(() => {
        axios.get(`https://63347aa7301bbc0a62126da3.mockapi.io/api/v1/accounts?sortBy=id&order=desc`)
            .then((response) => {
                setLoading(false);
                setAccountData(response.data);
            })
    }, []);

    const getAccountData = () => {
        axios.get(`https://63347aa7301bbc0a62126da3.mockapi.io/api/v1/accounts?sortBy=id&order=desc`)
            .then((response) => {
                setLoading(false);
                setAccountData(response.data);
            })
    }
    // remove account
    const onDelete = (id) => {
        setLoading(true);
        axios.delete(`https://63347aa7301bbc0a62126da3.mockapi.io/api/v1/accounts/${id}`)
            .then(() => {
                getAccountData();
            })
    }
    return (
        <>
            <div>
                <div className='create-button'>
                    <Link to='/Create'>
                        <Button >Create Account</Button>
                    </Link>
                </div>
            </div>
            {loading === true && (
                <div id="loading">
                    <div className="loader"></div>
                </div>
            )
            }
            <div className="table-wrapper">
                <Table singleLine className='fl-table'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Account Name</Table.HeaderCell>
                            <Table.HeaderCell>Currency</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {accountData.map((data) => {
                            return (
                                <Table.Row key={data.id}>
                                    <Table.Cell>{data.id}</Table.Cell>
                                    <Table.Cell>{data.account_name}</Table.Cell>
                                    <Table.Cell>{data.currency}</Table.Cell>
                                    <Table.Cell>{data.amount}</Table.Cell>
                                    <Table.Cell>
                                        <div className='action-block'>
                                            <Link to={'update/' + data.id}>
                                                <Button>Update</Button>
                                            </Link>
                                            <Button onClick={() => {
                                                const confirmBox = window.confirm(
                                                    "Do you really want to delete this Account?"
                                                )
                                                if (confirmBox === true) {
                                                    onDelete(data.id)
                                                }
                                            }}>Delete</Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}
