import React, {useState} from 'react'
import axios from 'axios'

const check = () => {
    const [password, setPassword] = useState("");
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);
    const [errorCode, setErrorCode] = useState("");

    const CheckDb = async (e, term) => {
        e.preventDefault();
        console.log("checking DB")
        let body = {
            password: password
        }
        try {
            let res = await axios.post(`http://localhost:5001/api/search/${term}`, body);
            console.log(res);
            setResults(res.data);
        } catch (error) {
            console.log(error);
            setErrorCode("Wrong Password");
        }
      
    }
    
    return (
        <div>
            <section className="main column">
                <br />
                <h2>Check New Differences Manually</h2>
                <form className="flex-col" onSubmit={e => CheckDb(e, term)}>
                    <input type="text" name="term" onChange={e => setTerm(e.target.value)} />
                    <label>Insert password</label>
                    <input type="password" name="pass" onChange={e => setPassword(e.target.value)} />
                    <button>Check</button>
                </form>
            </section>
            <div>  error: {errorCode}</div>
            {JSON.stringify(results)}
            {term}
            {errorCode === "" ? "" : errorCode}
        </div>
    )
}

export default check
