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
                    <label>Query Term</label>
                    <input type="text" name="term" onChange={e => setTerm(e.target.value)} />
                    <label>Provide password</label>
                    <input type="password" name="pass" onChange={e => setPassword(e.target.value)} />
                    <button className="check-btn">Check</button>
                </form>
                <div> {errorCode !== "" ? errorCode : null}</div>
            {results ? <h1 className="master">Query Done</h1> : null}
            </section>
           
        </div>
    )
}

export default check
