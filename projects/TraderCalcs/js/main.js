{
    const setboardlot = 
        function(value) {
            if(value >= 0.0001 && value < 0.010) { return 1000000;}
            else if(value >= 0.010 && value < 0.050) { return 100000;}
            else if(value >= 0.050 && value < 0.250) { return 10000;}
            else if(value >= 0.250 && value < 0.495) { return 10000;}
            else if(value >= 0.50 && value < 5.0) { return 1000;}
            else if(value >= 5.0 && value < 10.0) { return 100;}
            else if(value >= 10.0 && value < 19.98) { return 100;}
            else if(value >= 20.0 && value < 49.95) { return 100;}
            else if(value >= 50.0 && value < 99.95) { return 10;}
            else if(value >= 100.0 && value < 199.90) { return 10;}
            else if(value >= 200.0 && value < 499.80) { return 10;}
            else if(value >= 500.0 && value < 999.50) { return 10;}
            else if(value >= 1000.0 && value < 1999) { return 5;}
            else if(value >= 2000.0 && value < 4998) { return 5;}
            else if(value >= 5000) { return 5;}
            else { return null;}
        };

    function calculate() {
        const portfolio = document.getElementById("porfolio").value;
        const risk = document.getElementById("risk").value;
        const price = document.getElementById("price").value;
        const entry = document.getElementById("entry").value;
        const takeprofit = document.getElementById("tpexit").value;
        const stoploss = document.getElementById("slexit").value;

        const boardlot = setboardlot(price);
        const riskreward = Number.parseFloat(((takeprofit-entry)/(entry-stoploss)).toFixed(2));
        const stocksize = setpositionsize(portfolio, risk, entry, stoploss, boardlot);

        const buyamount = Number.parseFloat(stocksize * entry);
        const buyfees = setbuyfees(entry, stocksize);
        const totalbuyamount = buyamount + buyfees;

        const tpamount = Number.parseFloat(stocksize * takeprofit);
        const tpfees = setsellfees(takeprofit, stocksize);
        const nettpamount = tpamount - tpfees;
        const gain = Number.parseFloat((nettpamount - totalbuyamount).toFixed(2));

        const slamount = Number.parseFloat(stocksize * stoploss);
        const slfees = setsellfees(stoploss, stocksize);
        const netslamount = slamount - slfees;
        const loss = Number.parseFloat((netslamount - totalbuyamount).toFixed(2));


        document.getElementById("boardlot").value = boardlot.toLocaleString();
        document.getElementById("riskreward").value = riskreward;
        document.getElementById("stocksize").value = stocksize.toLocaleString();
        
        document.getElementById("buyamount").value = buyamount.toLocaleString();
        document.getElementById("buyfees").value = buyfees.toLocaleString();
        document.getElementById("totalbuyamount").value = totalbuyamount.toLocaleString();
        
        document.getElementById("tpamount").value = tpamount.toLocaleString();
        document.getElementById("tpfees").value = tpfees.toLocaleString();
        document.getElementById("nettpamount").value = nettpamount.toLocaleString();
        document.getElementById("gain").value = gain.toLocaleString() + changepercentage(gain, totalbuyamount);
        
        document.getElementById("slamount").value = slamount.toLocaleString();
        document.getElementById("slfees").value = slfees.toLocaleString();
        document.getElementById("netslamount").value = netslamount.toLocaleString();
        document.getElementById("loss").value = loss.toLocaleString() + changepercentage(loss, totalbuyamount);
    }

    function setpositionsize(capital, risk, entry, stoploss, boardlot) {
        let size = Math.ceil((capital * (risk * 0.01)) / (entry - stoploss));
        size = size - ((size + boardlot) % boardlot);
        return size;
    }

    function setbuyfees(buyprice, stocksize) {
        const commission = (buyprice * stocksize) * 0.0025;
        const vat = commission * 0.12;
        const psetransfee = (buyprice * stocksize) * 0.00005;
        const sccp = (buyprice * stocksize) * 0.0001;
        const fees = commission + vat + psetransfee + sccp;
        return Number.parseFloat(fees.toFixed(2));
    }
    
    function setsellfees(sellprice, stocksize) {
        const commission = (sellprice * stocksize) * 0.0025;
        const vat = commission * 0.12;
        const psetransfee = (sellprice * stocksize) * 0.00005;
        const sccp = (sellprice * stocksize) * 0.0001;
        const salestax = (sellprice * stocksize) * 0.006;
        const fees = commission + vat + psetransfee + sccp + salestax;
        return Number.parseFloat(fees.toFixed(2));
    }

    function changepercentage(gainloss, totalbuyamount) {
        const change = "  (" + ((gainloss/totalbuyamount)*100).toFixed(2) + "%)";
        return change;
    }
}