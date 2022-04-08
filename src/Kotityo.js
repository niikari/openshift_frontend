import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Kotityo() {

    const [kotityot, setKotityot] = useState([])
    const [kuvaus, setKuvaus] = useState('')

    useEffect(() => {
        fetchAllKotityot()
    }, [])

    const fetchAllKotityot = () => {
        fetch("https://openshift-backend-niilesprojekti.apps.hhocp.otaverkko.fi/all")
        .then(res => res.json())
        .then(data => setKotityot(data))
        .catch(err => console.error(err))

        console.log("testi")
    }


    const addNewKotityo = () => {
        fetch("https://openshift-backend-niilesprojekti.apps.hhocp.otaverkko.fi/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                kuvaus: kuvaus,
                tila: false
            })
        })
        .finally(() => {
            fetchAllKotityot()
            setKuvaus('')
        })
        .catch(err => console.error(err))
        
    }

    const deleteKotityo = (id) => {
        fetch(`https://openshift-backend-niilesprojekti.apps.hhocp.otaverkko.fi/all/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .finally(() => fetchAllKotityot())
        .catch(err => console.error(err))
    }

    const changeStatus = (id) => {
        fetch(`https://openshift-backend-niilesprojekti.apps.hhocp.otaverkko.fi/all/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .finally(() => fetchAllKotityot())
        .catch(err => console.error(err))
    }

    return (
        <div>
            <h1>Kotityö sovellus by: Niiles Kari</h1>
            <div style={{ margin: 40,  }}>
                <TextField
                    name="tyo"
                    placeholder="Kotityö"
                    onChange={e => setKuvaus(e.target.value)}
                    value={kuvaus}
                />
                <Button onClick={addNewKotityo} >Lisää</Button>
            </div>
            <div>
                <table style={{
                    border: "1px solid",
                    width: 600,
                    textAlign: "center"
                }}>
                    <tr>
                        <th>ID</th>
                        <th>KOTITYÖ</th>
                        <th>STATUS</th>
                        {/* <th>POISTA</th> */}
                    </tr>
                    {
                        kotityot.map((tyo, index) =>
                        <tr key={index}>
                            <td>{tyo.id}</td>
                            <td>{tyo.kuvaus}</td>
                            <td>{tyo.tila ? "Tehty" : "Vielä tehtävä"}</td>
                            <td><Button onClick={() => changeStatus(tyo.id)} >Vaihda status</Button></td>
                            <td><Button onClick={() => deleteKotityo(tyo.id)} >Poista</Button></td>
                        </tr> )
                    }
                </table>
            </div>
        </div>
    )
}