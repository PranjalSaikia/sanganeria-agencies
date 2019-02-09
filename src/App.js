import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';
import Login from './auth_components/js/Login';
import HomePage from './Containers/HomePage';
import FetchingH from './Containers/FetchingH';
import Backup from './Containers/Backup';
import ChangePassword from './Containers/ChangePassword';
import BarcodeContainer from './Containers/BarcodeContainer';
import BarcodePrinter from './Containers/BarcodePrinter';
import Bills from './Containers/Bills';
import ViewBills from './Containers/ViewBills';
import PrintBills from './Containers/PrintBills';
import EditBillContainer from './Containers/EditBillContainer';
import Reports from './Containers/Reports';
import NotFound from './Containers/NotFound';
import MasterContainer from './Containers/MasterContainer';
import StockContainer from './Containers/StockContainer';
import InvoiceContainer from './Containers/InvoiceContainer';
import PrintContainer from './Containers/PrintContainer';
import PrintPurchase from './Components/Purchase/PrintPurchase';
import Test from './Containers/Test';
import ChallanContainer from './Containers/ChallanContainer';
import PrintChallan from './Components/Challan/Print1/PrintChallan';


class App extends Component {
  render() {
    return (
      <Router history={history} >
      
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={HomePage} />
            <Route path="/fetch" component={FetchingH} />
            <Route path="/backup" component={Backup} />
            <Route path="/changepassword" component={ChangePassword} />
            <Route path="/barcode" component={BarcodeContainer} />
            <Route path="/barcode/:id/:st" component={BarcodePrinter} />
            <Route path="/bills" component={Bills} />
            <Route path="/viewbills" component={ViewBills} />
            <Route path="/printinvoice/:id" component={PrintContainer} />
            <Route path="/printchallan/:id" component={PrintContainer} />
            <Route path="/printinvoicer/:id" component={PrintContainer} />
            <Route path="/editbill/:id" component={EditBillContainer} />
            <Route path="/reports" component={Reports}/>

            <Route path="/master" component={MasterContainer} />
            <Route path="/stock" component={StockContainer} />
            <Route path="/invoice" component={InvoiceContainer} />
            <Route path="/challan" component={ChallanContainer} />
            <Route path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </div>
       
      </Router>
    );
  }
}

export default App;
