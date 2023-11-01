
function calculate(){
    var LBP = parseFloat(document.getElementById("Length").value);
    var B = parseFloat(document.getElementById("Breadth").value);
    var Tf = parseFloat(document.getElementById("Tforward").value);
    var Taft = parseFloat(document.getElementById("Taft").value);
    var T = (Tf+Taft)/2;
    var Speed = parseFloat(document.getElementById("Speed").value)*0.5144;
    // var CB = document.getElementById("CB").value;
    var CM = parseFloat(document.getElementById("CM").value);
    var CWP = parseFloat(document.getElementById("CWP").value);
    var LCB = parseFloat(document.getElementById("LCB").value);
    var rudderSkegArea = parseFloat(document.getElementById("rudderBehindSkeg").value);
    var k2Rudderskeg = parseFloat(document.getElementById("1+k2Rudderskeg").value);
    var rudderSternArea = parseFloat(document.getElementById("rudderBehindStern").value);
    var k2rudderStern =  parseFloat(document.getElementById("1+k2Rudderstern").value);
    var twinScrewArea= parseFloat(document.getElementById("twinScrew").value);
    var shaftBracketsArea = parseFloat(document.getElementById("shaftBrackets").value);
    var skegArea = parseFloat(document.getElementById("Skeg").value);
    var k2skeg = parseFloat(document.getElementById("1+k2Skeg").value);
    var hullBossingArea = parseFloat(document.getElementById("hullBossings").value);
    var strutBossingArea = parseFloat(document.getElementById("strutBossings").value);
    var shaftsArea = parseFloat(document.getElementById("shafts").value);
    var k2shafts = parseFloat(document.getElementById("1+k2Shafts").value);
    var stabilixerFinArea = parseFloat(document.getElementById("stabilizerFins").value);
    var domeArea = parseFloat(document.getElementById("Dome").value);
    var bilgekeelArea = parseFloat(document.getElementById("bilgeKeel").value);
    var bulbousBow = parseFloat(document.getElementById("Bow").value);
    var transom = parseFloat(document.getElementById("Transom").value);
    var dis = CB*LBP*B*T;
    var dis = 37500;
    var CB = dis/(LBP*B*T);
    var CP = CB/CM;
    var Am = CM*B*T;
    var Wpa = CWP*LBP*B;
    // var dis = CB*LBP*B*T;
    var Lr = (1-CP+0.06*CP*LCB/((4*CP)-1))*LBP;  
    var ie = 1+89*Math.exp(-1*((LBP/B)**0.80856)*((1-CWP)**0.30484)*((1-CP-0.0225*LCB)**0.6367)*((Lr/B)**0.34574)*((100*dis/(LBP**3))**0.16302));
    var Fn = Speed/(Math.sqrt(9.81*LBP));                                                                  /* Froudes number */
    var v = 1.16*(10**(-6));                                                                                /* kinematic viscosity */
    var Rn = LBP*Speed/v;
    var Cf=0.075/((Math.log10(Rn)-2)**2);
    var den = 1025;                                                                          /* Reynold's number */
    var ABT = 20;                                                                                     /* Area of transom Need to be formulated */
    var S = LBP*((2*T)+B)*(Math.sqrt(CM))*(0.453+(0.4425*CB)-(0.2682*CM)-(0.003467*(B/T))+(0.3696*CWP))+(2.38*ABT/CB);
    var Rf=Cf*0.5*den*S*(Speed**2); 
    var hB = 4.0;                                                                                      /* hB is the position of the centre of the transverse area. Need to be formulated */
    var pB = 0.56*Math.sqrt(ABT)/(Tf-1.5*hB);
    var Fni = Speed/Math.sqrt(9.81*(Tf-hB-0.25*Math.sqrt(ABT))+0.15*(Speed**2));                    /* Froude number due to immersion */
    var RB;
    if (bulbousBow==0) {
        RB = 0;
    } else {
        RB = 0.11*Math.exp(-3*(pB**-2))*(Fni**3)*(ABT**1.5)*den*9.81/(1+(Fni**2));
    }
    var c16;
    if (CP<0.8) {
        c16=8.07981*CP-13.8673*(CP**2)+6.984388*(CP**3);
    } else {
        c16=1.73014-0.7067*CP;
    }
    var cStern;
    if (document.getElementById("aftBodyForm").value == "V-shaped") {
        cStern = -10;
    }else if(document.getElementById("aftBodyForm").value == "U-shaped"){
        cStern = 10;
    } else {
        cStern = 0;
    }
    var c13 = 1+0.003*cStern;
    var c12;
    if (T/LBP>0.05) {
        c12 = (T/LBP)**0.2228446;
    }else if(T/LBP<0.02){
        c12 = 0.479948;
    } else {
        c12 = 48.20*((T/LBP-0.02)**2.078)+0.479948;
    }

    var formFactor = c13*(0.93+(c12*((B/Lr)**0.92497))*((0.95-CP)**(-0.521448))*((1-CP+(0.0225*LCB))**0.6096));
    var Sapp = (rudderSkegArea+rudderSternArea+twinScrewArea+shaftBracketsArea+skegArea+strutBossingArea+hullBossingArea+shaftsArea+stabilixerFinArea+domeArea+bilgekeelArea);
    var k2eq;
    if (Sapp==0){
        k2eq = 0;
    } else {
        k2eq = (rudderSkegArea*k2Rudderskeg+rudderSternArea*k2rudderStern+twinScrewArea*2.8+shaftBracketsArea*3+skegArea*k2skeg+strutBossingArea*3+hullBossingArea*2+shaftsArea*k2shafts+stabilixerFinArea*2.8+domeArea*2.7+bilgekeelArea*1.4)/Sapp;
    }
    var Rapp = 0.5*den*(Speed**2)*Sapp*k2eq*Cf;
    var c7;
    if (B/LBP<0.11) {
        c7 = 0.229577*(B/LBP)**0.33333;
    }else if(B/LBP>0.25){
        c7 = 0.5-0.0625*LBP/B;
    } else {
        c7 = B/LBP;
    }
    var lamb;
    if (LBP/B<12) {
        lamb = 1.446*CP-0.03*LBP/B;
    } else {
        lamb = 1.446*CP-c16;
    }
    var m1 = 0.0140407*LBP/T-1.75254*(dis**(1/3))/LBP-4.79323*B/LBP-c16;
    var aT = 16.0;                                                                                 /* Immersed transom tranverse area at zero speed Need to formulated */
    var c3 = 0.56*(ABT**1.5)/(B*T*(0.31*(ABT**0.5)+Tf-hB));
    var c1 = 2223105*(c7**3.78613)*((T/B)**1.07961)*((90-ie)**(-1.37565));
    var c2 = Math.exp(-1.89*Math.sqrt(c3));
    var c5 = 1-0.8*aT/(B*T*CM);
    var c15;
    if (LBP**3/dis<512) {
        c15 = -1.69385;
    } else if(LBP**3/dis>1727) {
        c15 = 0;
    } else {
        c15 = -1.69385+(LBP/(dis**(1/3))-8)/2.36;
    }
    var d = -0.9;
    var m2 = c15*(CP**2)*Math.exp(-0.1*(Fn**-(2))); 
    var RW = c1*c2*c5*dis*den*9.81*Math.exp((m1*(Fn**d))+(m2*Math.cos(lamb*(Fn**(-2)))));
    var FnT = Speed/Math.sqrt((2*9.81*aT)/(B+B*CWP));
    var c6;
    if (FnT<5) {
        c6 = 0.2*(1-0.2*FnT);
    } else {
        c6 = 0;
    }
    var Rtr;
    if (transom==0) {
        Rtr=0;
    } else {
        Rtr = 0.5*den*(Speed**2)*aT*c6;
    }
    var c4;
    if(Tf/LBP>0.04){
        c4 = 0.04;
    }else{
        c4 = Tf/LBP;
    }
    var cA = 0.006*((LBP+100)**(-0.16))-0.00205+0.003*((LBP/7.5)**0.5)*(CB**4)*c2*(0.04-c4);
    var RA = 0.5*den*(Speed**2)*S*cA;
    var RTotal = Rf*formFactor+Rapp+RW+RB+Rtr+RA;
    document.getElementById('totalResistance').innerHTML = RTotal;
    document.getElementById('frictionalResistance').innerHTML = Rf;
    document.getElementById('formResistance').innerHTML = formFactor;
    document.getElementById('appandageResistance').innerHTML = Rapp;
    document.getElementById('waveResistance').innerHTML = RW;
    document.getElementById('bowResistance').innerHTML = RB;
    document.getElementById('transomResistance').innerHTML = Rtr;
    document.getElementById('correlationResistance').innerHTML = RA;
    if (Allappanadages=="checked") {
        console.log("worked");
    } else {
        console.log(Rapp);
    }
}
