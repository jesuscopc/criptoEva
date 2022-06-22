import React, { useEffect, useState } from "react";
import "./App.css";
import Select from "./components/elements/select";
import { SELECT_FILTERS } from "./constants/filters";
import { criptoService } from "./services";

type TCripto = {
  key: string,
  price: string,
  market_cap: string,
  circulatingSupply: string,
  name: string
}

const App = (): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [criptos, setCriptos] = useState<TCripto[]>([]);
  const [toggleVerMas, setToggleVerMas] = useState(false);

  const formatCriptos = (criptosData: any): TCripto[] => {
    console.log(criptosData);
    let criptoFinalData: TCripto[] = [];
    Object.keys(criptosData).map((crypto: any) => {
      return criptoFinalData.push({
        key: crypto,
        price: criptosData[crypto]["USD"]["PRICE"],
        market_cap: criptosData[crypto]["USD"].MKTCAP,
        circulatingSupply: criptosData[crypto]["USD"].SUPPLY,
        name: criptosData[crypto]["USD"]["FROMSYMBOL"],
      });
    });
    console.log(criptoFinalData);
    return criptoFinalData;
  }

  useEffect(() => {
    setLoading(true);
    criptoService.getCriptos().then(result => {
      const res = formatCriptos(result?.DISPLAY);
      setCriptos(res);
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      setLoading(false);
    });
  }, [])

  const handleClick = () => {
    console.log('detaile');
    setToggleVerMas(!toggleVerMas);
  }

  if (loading) {
    return <div className="loader">loading...</div>;
  }

  return (
    <div className="App">
        <div className="filter">
          <Select label="Filter BY" data={SELECT_FILTERS} />
        </div>
        <table className="table">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Circulating supply</th>
          </tr>

          <tbody>
            {criptos.map((data) => {
              return (
                <>
                <tr>
                  <td>Name: {data.name}</td>
                  <td>Price: {data.price}</td>
                  <td>Market Cap: {data.market_cap}</td>
                  <td>Circulating supply: {data.circulatingSupply}</td>
                  <td><button onClick={handleClick}>Ver Mas</button></td>
                </tr>
                {toggleVerMas && (<tr>
                  <td colSpan={5}>
                    <span>Name:<strong>{data.name}</strong></span>
                    <br/>
                    <span>Price:<strong>{data.price}</strong></span>
                  </td>
                </tr>)}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}

export default App;

// class App2 extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       cryptos: {},
//     };
//   }

//   componentDidMount() {
//     this.setState({
//       loading: true,
//     });
//     const url =
//       "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,DOGE,BNB,LTC,ADA,BUSD,BCH,VET,DOT,EOS,SOL,SRM,USDT,BTT,TRX,FIL,LINK,MATIC,UNI,NEO,CHZ,ETC,THETA,XLM,BSV,LUNA,WIN,SXP&tsyms=USD";

//     fetch(url)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then((json) => {
//         let data;

//         data = json.RAW;

//         this.setState({
//           loading: false,
//           cryptos: data,
//         });
//       })
//       .catch((err) => console.log(err));
//   }

//   render() {
//     if (this.state.loading) {
//       return <div>loading...</div>;
//     }

//     let formattedData = [];

//     Object.keys(this.state.cryptos).map((crypto) => {
//       formattedData.push({
//         key: crypto,
//         price: this.state.cryptos[crypto]["USD"]["PRICE"],
//         market_cap: this.state.cryptos[crypto]["USD"].MKTCAP,
//         circulatingSupply: this.state.cryptos[crypto]["USD"].SUPPLY,
//         name: this.state.cryptos[crypto]["USD"]["FROMSYMBOL"],
//       });
//     });

//     return (
//       <div className="App">
//         <div>
//           <label>Filter By</label>
//           <select>
//             <option>Name</option>
//             <option>Price</option>
//             <option>Market Cap</option>
//             <option>Circulating supply</option>
//           </select>
//         </div>
//         <table>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Market Cap</th>
//             <th>Circulating supply</th>
//           </tr>

//           <tbody>
//             {formattedData.map((data) => {
//               return (
//                 <tr>
//                   <td>Name: {data.name}</td>
//                   <td>Price: {data.price}</td>
//                   <td>Market Cap: {data.market_cap}</td>
//                   <td>Circulating supply: {data.circulatingSupply}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
