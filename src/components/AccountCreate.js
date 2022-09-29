import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function AccountCreate() {
    let navigate = useNavigate();
    const [accountName, setAccountName] = useState('');
     const [loading, setLoading] = useState(false);
    const [accountNo, setAccountNo] = useState('');
    const [amount, setAmount] = useState(0);
    const [Currency, setCurrency] = useState("");
    const validAmount = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');
    // create account
    const postData = () => {
        if (!validAmount.test(amount)) {
            return;
        }
        setLoading(true);
        axios.post(`https://63347aa7301bbc0a62126da3.mockapi.io/api/v1/accounts`, {
            account_name: accountName,
            account_no: accountNo,
            amount: amount,
            currency: Currency
        }).then(() => {
            setLoading(false);
            navigate('/');
        })
    }
    return (
        <div className="form-style-5">
             {loading === true && (
                <div id="loading">
                    <div className="loader"></div>
                </div>
            )
            }
            <Form>
                <Form.Field>
                    <label>Account Name</label>
                    <input placeholder='Account Name' className="field-input" onChange={(e) => setAccountName(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Account No</label>
                    <input placeholder='Account No' onChange={(e) => setAccountNo(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Currency</label>
                    <select onChange={(e) => setCurrency(e.target.value)} required>
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
                <Form.Field>
                    <label>Amount(133.00)</label>
                    <input placeholder='Amount' type='tel' pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$" onChange={(e) => setAmount(e.target.value)} required />
                </Form.Field>

                <Button onClick={postData} disabled={!accountName || !accountNo || !amount || !Currency} type='submit'>Submit</Button>
                <Link to='/'>
                    <Button >Back</Button>
                </Link>
            </Form>
        </div>
    )
}
