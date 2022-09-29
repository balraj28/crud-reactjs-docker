import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AccountUpdate() {
    let navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [accountName, setAccountName] = useState('');
    const [currency, setCurrency] = useState("");
    const [amount, setAmount] = useState(0);
    const validAmount = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');
    // fetch account
    useEffect(() => {
        axios.get(`https://63347aa7301bbc0a62126da3.mockapi.io/api/v1/accounts/${id}`)
            .then((response) => {
                if (response?.data && response?.data?.id) {
                    setAccountName(response?.data?.account_name);
                    setAmount(response?.data?.amount);
                    setCurrency(response?.data?.currency);
                }
                setLoading(false);
            })
    }, [id]);
    // update account
    const updateAPIData = () => {
        if (!validAmount.test(amount)) {
            return;
        }
        setLoading(true);
        axios.put(`https://63347aa7301bbc0a62126da3.mockapi.io/api/v1/accounts/${id}`, {
            account_name: accountName,
            amount: amount,
            currency: currency
        }).then(() => {
            navigate('/');
            setLoading(false);
        })
    }
    return (
        <div>
            {loading === true && (
                <div id="loading">
                    <div className="loader"></div>
                </div>
            )
            }
            <Form className="form-style-5">
                <Form.Field>
                    <label>Account Name</label>
                    <input placeholder='Account Name' value={accountName} className="field-input" onChange={(e) => setAccountName(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Amount</label>
                    <input placeholder='Amount' pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="KWD">Kuwaiti Dinar</option>
                        <option value="BHD">Bahraini Dinar</option>
                        <option value="OMR">Omani Rial</option>
                        <option value="JOD">Jordanian Dinar</option>
                        <option value="KYD">Cayman Island Dollar</option>
                        <option value="GIP">Gibraltar Pound</option>
                        <option value="ARS">Argentine peso</option>
                        <option value="CHF">Swiss franc</option>
                        <option value="JMD">Jamaican dollar</option>
                        <option value="PAB">Panamanian balboa</option>
                        <option value="ANG">Netherlands Antillean guilder</option>
                        <option value="XPF">CFP franc</option>
                    </select>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData} disabled={!accountName || !amount || !currency || !id}>Update</Button>
                <Link to='/'>
                    <Button >Back</Button>
                </Link>
            </Form>
        </div>
    )
}
