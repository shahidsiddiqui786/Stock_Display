import React, {useState} from 'react';
import './style.css'
import LineChart from "./LineChart";

// Material UI imports
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Loader, Button } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

// Redux imports
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getFinancialItem} from "../actions/financialItem";



const FinancialItem = ({financialItem:{financialItem},getFinancialItem}) => {
    
    const [code, setCode] = useState('IBM');
    const [range, setRange] = useState('TIME_SERIES_DAILY_ADJUSTED');
    const [pass,setPass] = useState('Time Series (Daily)');
    const [loader,setLoader] = useState(false);

   

    const handleChange = (e) => {
       e.preventDefault();
       setCode(e.target.value);
    }

    const handleRange = (e1,e2) => {
       setRange(e1);
       setPass(e2);
       handleClick();
    }

    const handleClick = () => {
        setLoader(true);
        getFinancialItem(code,range,pass,setLoader);
        console.log(financialItem)
    }


    const sample = () => {
        return (
            <div>
                <h1> Search Any company stock chart using stock symbol </h1>
                <p> eg. IBM, TSLA</p>
                <input placeholder='Write Code' name="select code" onChange={handleChange} style={{padding:8}} />
                <Button appearance='primary' onClick={handleClick} style={{ padding:10}}> Set </Button>
            </div>
        )
    };


    const displayTheRightPlot = () => {
        return (<LineChart
            color='green'
            financialItem={financialItem}
            financialItemName={financialItem.symbol}
        />);
    };
    

    const loadingScreen = () => {
        return (
            <div className='loader'>
                <Loader size="lg" content="Large" />
            </div>
        )
    }

    const sidebar = () => {
        return (
        <Container maxWidth="sm" style={{backgroundColor:'#cfe8fc' ,position:'inherit'}}>
            <Box style={{padding:10}}>
                <input placeholder='Write Code' name="select code" onChange={handleChange} style={{padding:8}} />
                <Button appearance='primary' onClick={handleClick} style={{ padding:10}}> Set </Button>
            </Box>
            <Box style={{padding:10}}>
                <div className='bar_wrapper'>
                    <h4>Range:</h4>
                    <button className='custom_btn' onClick={() => handleRange('TIME_SERIES_DAILY_ADJUSTED','Time Series (Daily)')}>1W</button>
                    <button className='custom_btn' onClick={() => handleRange('TIME_SERIES_WEEKLY_ADJUSTED','Weekly Adjusted Time Series')}>1M</button>
                    <button className='custom_btn' onClick={() => handleRange('TIME_SERIES_MONTHLY_ADJUSTED','Monthly Adjusted Time Series')}>1Y</button>
                </div>
            </Box>
        </Container>
        )
    }

    
    return (
        <div className='financial-item-big-wrapper'>
            <div>
                {financialItem ? (loader ? loadingScreen() : displayTheRightPlot()) : (loader ? loadingScreen() : sample()) }
            </div>
            <div>
                {
                    financialItem ?
                    sidebar() : null
                }
            </div>
        </div>
    );
};

FinancialItem.propTypes = {
    financialItem: PropTypes.object.isRequired,
    getFinancialItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    financialItem: state.financialItem
})

export default connect(mapStateToProps,{getFinancialItem})(FinancialItem);