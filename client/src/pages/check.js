import React, {useState} from 'react'
import axios from 'axios'

const check = () => {
    const [password, setPassword] = useState("");
    const [term, setTerm] = useState("");
    const [results, setResults] = useState();
    const [errorCode, setErrorCode] = useState("");

    const CheckDb = async (e, term) => {
        e.preventDefault();
        console.log("checking DB")
        let body = {
            password: password
        }
        try {
            let res = await axios.post(`https://api.think.martinchammah.dev/api/search/${term}`, body);
            console.log(res);
            setResults(res.data);
        } catch (error) {
            console.log(error);
            setErrorCode("Wrong Password");
        }
      
    }
    console.log(results)
    return (
        <div>
            <section className="main column">
                <br />
                <h2>Query New Laptops</h2>
                <form className="flex-col" onSubmit={e => CheckDb(e, term)}>
                    <input type="text" name="term" onChange={e => setTerm(e.target.value)} />
                    <label>Insert password</label>
                    <input type="password" name="pass" onChange={e => setPassword(e.target.value)} />
                    <button>Check</button>
                </form>
            </section>
            <div> {errorCode !== "" ? errorCode : null}</div>
            {results ? <h1>Query Done</h1> : null}
        </div>
    )
}

export default check
