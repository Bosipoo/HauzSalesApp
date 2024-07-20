import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';

const EditableTable = () => {
    const { id } = useParams();
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({
        date: '',
        narration: '',
        debit: '',
        credit: '',
        balance: '',
        voucherNo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRow({
            ...newRow,
            [name]: value,
        });
    };

    const handleAddRow = (e) => {
        e.preventDefault();
        setRows([...rows, newRow]);
        setNewRow({
            date: '',
            narration: '',
            debit: '',
            credit: '',
            balance: '',
            voucherNo: '',
        });
    };

    const calculateTotal = (field) => {
        return rows.reduce((total, row) => total + parseFloat(row[field] || 0), 0);
    };

    return (
        <div className="container mt-5">
            <h2>General Ledgers Data Entry - {id}</h2>
            <Form onSubmit={handleAddRow}>
                <Table striped bordered hover responsive className='edit'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Narration</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Balance</th>
                            <th>Voucher No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.narration}</td>
                                <td>{row.debit}</td>
                                <td>{row.credit}</td>
                                <td>{row.balance}</td>
                                <td>{row.voucherNo}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={newRow.date}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="narration"
                                    value={newRow.narration}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="debit"
                                    value={newRow.debit}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="credit"
                                    value={newRow.credit}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="balance"
                                    value={newRow.balance}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="voucherNo"
                                    value={newRow.voucherNo}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" className="text-end border-0">
                                <div className="totals">
                                    <div>Total Credits: &#8358;{calculateTotal('credit').toFixed(2)}</div>
                                    <div>Total Debits: &#8358;{calculateTotal('debit').toFixed(2)}</div>
                                    <div>Balance: &#8358;{(calculateTotal('debit') - calculateTotal('credit')).toFixed(2)}</div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
                <Button type="submit" className="btn btn-primary w-100">Add Row</Button>
            </Form>
        </div>
    );
};

export default EditableTable;
